import Link from "next/link";
import type { Metadata } from "next";
import { getPostsGroupedByYear } from "@/data/posts";

export const metadata: Metadata = {
  title: "Archive | frostsalix",
  description: "A yearly pile of posts for anyone who enjoys rummaging through old thoughts.",
  alternates: {
    canonical: "/archive",
  },
};

export default function ArchivePage() {
  const years = getPostsGroupedByYear();

  return (
    <main className="shell archive-page">
      <div className="posts-head">
        <p className="kicker">Archive</p>
        <h1>Year pile</h1>
        <p>All posts sorted by year, like a closet full of notebooks with opinions.</p>
        <div className="page-actions">
          <Link href="/posts">All posts</Link>
          <a href="/feed.xml">RSS</a>
        </div>
      </div>

      <div className="archive-list">
        {years.map((group) => (
          <section key={group.year} className="archive-year" aria-labelledby={`year-${group.year}`}>
            <h2 id={`year-${group.year}`}>{group.year}</h2>
            <ul>
              {group.posts.map((post) => (
                <li key={post.slug} className="archive-item">
                  <p className="meta">{post.date} · {post.readingText}</p>
                  <h3>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="footnote">
        <Link href="/posts">Back to the post heap</Link>
      </p>
    </main>
  );
}