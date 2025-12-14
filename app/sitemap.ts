// app/sitemap.ts

import { MetadataRoute } from "next";
import { getSitemapData } from "@/lib/queries";
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://shadmansakib22-blog.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicData = await getSitemapData();

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // 2. Dynamic Content (Posts and Categories)
  const dynamicRoutes: MetadataRoute.Sitemap = dynamicData.map((item) => {
    let urlPath = "";
    let priority = 0.6;
    let changeFrequency: "daily" | "weekly" = "weekly";

    if (item.type === "post") {
      urlPath = `/blog/${item.slug}`;
      priority = 0.7;
      changeFrequency = "daily";
    } else if (item.type === "category") {
      urlPath = `/category/${item.slug}`;
      priority = 0.5;
      changeFrequency = "weekly";
    }

    return {
      url: `${BASE_URL}${urlPath}`,
      lastModified: item.modified,
      changeFrequency: changeFrequency,
      priority: priority,
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
}
