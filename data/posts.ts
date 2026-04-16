import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const POSTS_DIR = path.join(process.cwd(), "posts");
const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"]);
const DEFAULT_DEV_SITE_URL = "http://localhost:3000";
const DEFAULT_PROD_SITE_URL = "https://matsumae.top";

function inferProjectBasePath() {
  const [repoOwner, repoName] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  const isProjectPagesRepo =
    Boolean(repoOwner) &&
    Boolean(repoName) &&
    repoName.toLowerCase() !== `${repoOwner.toLowerCase()}.github.io`;

  return process.env.GITHUB_ACTIONS === "true" && isProjectPagesRepo
    ? `/${repoName}`
    : "";
}

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
  readingText: string;
  toc: TocItem[];
};

export type BlogPostDetail = BlogPost & {
  content: string;
};

export type PostNavigation = {
  previous?: BlogPost;
  next?: BlogPost;
};

export type ArchiveYear = {
  year: string;
  posts: BlogPost[];
};

function compareByDateDesc(a: Pick<BlogPost, "date">, b: Pick<BlogPost, "date">) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function getSortedPosts() {
  return getAllPosts();
}

function getPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()));
}

function toSlug(fileName: string) {
  return fileName.replace(path.extname(fileName), "");
}

function readPostFileBySlug(slug: string) {
  for (const extension of SUPPORTED_EXTENSIONS) {
    const fullPath = path.join(POSTS_DIR, `${slug}${extension}`);

    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, "utf-8");
    }
  }

  return null;
}

function normalizeFrontmatter(data: Partial<PostFrontmatter>, slug: string): PostFrontmatter {
  return {
    title: data.title?.trim() || slug,
    date: data.date || "1970-01-01",
    excerpt: data.excerpt?.trim() || "",
    tags: Array.isArray(data.tags)
      ? data.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
  };
}

function extractToc(content: string): TocItem[] {
  const lines = content.split(/\r?\n/);
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const headingMatch = /^(##|###)\s+(.+)$/.exec(line);

    if (!headingMatch) {
      continue;
    }

    const level = headingMatch[1] === "##" ? 2 : 3;
    const text = headingMatch[2].trim();
    const id = slugger.slug(text);
    toc.push({ id, text, level });
  }

  return toc;
}

function parsePostFromSource(slug: string, source: string): BlogPostDetail {
  const { data, content } = matter(source);
  const frontmatter = normalizeFrontmatter(data as Partial<PostFrontmatter>, slug);
  const stats = readingTime(content || "");
  const minutes = Math.max(1, Math.ceil(stats.minutes));

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    tags: frontmatter.tags,
    readingMinutes: minutes,
    readingText: `${minutes} min read`,
    toc: extractToc(content),
    content,
  };
}

function toPostSummary(post: BlogPostDetail): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
    readingMinutes: post.readingMinutes,
    readingText: post.readingText,
    toc: post.toc,
  };
}

export function getAllPosts(): BlogPost[] {
  const posts = getPostFiles()
    .map((fileName) => {
      const slug = toSlug(fileName);
      const source = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf-8");
      return toPostSummary(parsePostFromSource(slug, source));
    })
    .sort(compareByDateDesc);

  return posts;
}

export function getRecentPosts(limit = 3) {
  return getSortedPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPostDetail | undefined {
  const source = readPostFileBySlug(slug);

  if (!source) {
    return undefined;
  }

  return parsePostFromSource(slug, source);
}

export function getPostsByTag(tag: string): BlogPost[] {
  const normalizedTag = tag.trim().toLowerCase();
  return getSortedPosts().filter((post) =>
    post.tags.some((value) => value.toLowerCase() === normalizedTag),
  );
}

export function getAllTags() {
  return Array.from(
    new Set(getSortedPosts().flatMap((post) => post.tags.map((tag) => tag.toLowerCase()))),
  ).sort((a, b) => a.localeCompare(b));
}

export function getAdjacentPosts(slug: string): PostNavigation {
  const posts = getSortedPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index < 0) {
    return {};
  }

  return {
    previous: posts[index - 1],
    next: posts[index + 1],
  };
}

export function getPostsGroupedByYear(): ArchiveYear[] {
  const grouped = new Map<string, BlogPost[]>();

  for (const post of getSortedPosts()) {
    const year = post.date.slice(0, 4) || "Unknown";
    const entries = grouped.get(year) ?? [];
    entries.push(post);
    grouped.set(year, entries);
  }

  return Array.from(grouped.entries()).map(([year, posts]) => ({ year, posts }));
}

export function getSiteUrl() {
  const fallback = process.env.NODE_ENV === "production" ? DEFAULT_PROD_SITE_URL : DEFAULT_DEV_SITE_URL;
  return (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || fallback).replace(/\/$/, "");
}

export function buildPostUrl(slug: string) {
  return `${getSiteUrl()}/posts/${slug}`;
}

export function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? inferProjectBasePath();
}
