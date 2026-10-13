import { MetadataRoute } from "next";
import { SAMPLE_PROFILES } from "@/seed/sample-profiles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cv.decslab.in";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  const demoRoutes = Object.keys(SAMPLE_PROFILES).map((styleId) => ({
    url: `${baseUrl}/demo/${styleId}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const publicProfiles = Object.values(SAMPLE_PROFILES).map((p) => ({
    url: `${baseUrl}/${p.username}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...demoRoutes, ...publicProfiles];
}
