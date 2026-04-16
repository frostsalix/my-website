import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import rehypePrettyCode from "rehype-pretty-code";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/data/posts";

type RouteParams = { slug: string };
type ParamsInput = RouteParams | Promise<RouteParams>;

async function resolveParams(params: ParamsInput) {
  return await params;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: ParamsInput;
}): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Missing In Action | frostsalix",
    };
  }

  return {
    title: `${post.title} | frostsalix`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/posts/${slug}`,
      publishedTime: new Date(post.date).toISOString(),
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: ParamsInput;
}) {
  const { slug } = await resolveParams(params);
  const post = getPostBySlug(slug);
  const navigation = getAdjacentPosts(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, { theme: "github-light" }]],
      },
    },
  });

  return (
    <main className="shell post-page">
      <p className="post-back">
        <Link href="/posts">Back to the post heap</Link>
      </p>

      <article className="post-article" aria-labelledby="post-title">
        <header>
          <p className="meta">
            {post.date} · {post.readingText}
          </p>
          <h1 id="post-title">{post.title}</h1>
          <p className="chips">{post.tags.join(" / ")}</p>
        </header>

        {post.toc.length > 0 ? (
          <section className="post-toc" aria-label="Table of contents">
            <h2>On this page, if you dare</h2>
            <ul>
              {post.toc.map((item) => (
                <li key={item.id} className={item.level === 3 ? "toc-sub" : undefined}>
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="post-content">
          {content}
        </section>

        <nav className="post-nav" aria-label="Post navigation">
          {navigation.previous ? (
            <Link href={`/posts/${navigation.previous.slug}`} className="post-nav-card">
              <span className="post-nav-label">前一只</span>
              <strong>{navigation.previous.title}</strong>
              <span>{navigation.previous.date}</span>
            </Link>
          ) : (
            <span />
          )}

          {navigation.next ? (
            <Link href={`/posts/${navigation.next.slug}`} className="post-nav-card post-nav-card-next">
              <span className="post-nav-label">后一只</span>
              <strong>{navigation.next.title}</strong>
              <span>{navigation.next.date}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </main>
  );
}
