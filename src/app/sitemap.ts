import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const publicRoutes = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/over-mij", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/behandelingen", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/afspraak", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/cadeaubon", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/algemene-voorwaarden", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
