import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const lastPublished = posts[0] ? new Date(posts[0].publishedAt) : new Date();

  return [
    {
      url: DATA.url,
      lastModified: lastPublished,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${DATA.url}/blog`,
      lastModified: lastPublished,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${DATA.url}/blog/${post._meta.path.replace(/\.mdx$/, "")}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
