import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/data/posts";

type RouteParams = { tag: string };
type ParamsInput = RouteParams | Promise<RouteParams>;

async function resolveParams(params: ParamsInput) {
  return await params;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: ParamsInput;
}): Promise<Metadata> {
  const { tag } = await resolveParams(params);
  return {
    title: `Tag ${tag} | frostsalix`,
    description: `Posts tagged ${tag}, arranged for convenient rummaging.`,
    alternates: {
      canonical: `/posts/tags/${tag}`,
    },
  };
}

export default async function PostsByTagPage({
  params,
}: {
  params: ParamsInput;
}) {
  const { tag } = await resolveParams(params);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="shell posts-page">
      <div className="posts-head">
        <p className="kicker">Tag fishing</p>
        <h1>#{tag}</h1>
        <p>
          <Link href="/posts">Back to the full pile</Link>
        </p>
      </div>

      <ul className="posts-index" aria-label={`Posts tagged ${tag}`}>
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
    </main>
  );
}
