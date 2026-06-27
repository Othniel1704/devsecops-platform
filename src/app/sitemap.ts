import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/tools",
    "/tools/rgpd-generator",
    "/tools/security-scanner",
    "/tools/prompt-assistant",
    "/boilerplate",
    "/ressources",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...postRoutes];
}
