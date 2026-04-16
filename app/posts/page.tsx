import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/data/posts";

export const metadata: Metadata = {
  title: "Posts | frostsalix",
  description: "A pile of notes, experiments, and blog crumbs that escaped the homepage.",
  alternates: {
    canonical: "/posts",
  },
};

export default function PostsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main className="shell posts-page">
      <div className="posts-head">
        <p className="kicker">Writing goblins</p>
        <h1>Posts</h1>
        <p>Markdown and MDX powered notes with reading time, headings, and just enough structure to stay out of trouble.</p>
        <div className="page-actions">
          <Link href="/archive">Year pile</Link>
          <a href="/feed.xml">RSS</a>
        </div>
      </div>

      <ul className="tag-pills" aria-label="Tag filters">
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/posts/tags/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>

      <ul className="posts-index" aria-label="Posts list">
        {posts.map((post) => (
          <li key={post.slug} className="posts-index-item">
            <p className="meta">{post.date}</p>
            <h2>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.excerpt}</p>
            <p className="chips">
              {post.tags.join(" / ")} · {post.readingText}
            </p>
          </li>
        ))}
      </ul>

      <p className="footnote">
        <Link href="/">Back to the den</Link>
      </p>
    </main>
  );
}
