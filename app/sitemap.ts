import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, getSiteUrl } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const latestPostDate = getAllPosts()[0]?.date;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/archive`,
      lastModified: latestPostDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagRoutes = getAllTags().map((tag) => ({
    url: `${siteUrl}/posts/tags/${tag}`,
    lastModified: latestPostDate,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}