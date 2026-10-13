import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/editor",
        "/settings",
        "/onboarding",
        "/api/",
      ],
    },
    sitemap: "https://cv.decslab.in/sitemap.xml",
  };
}
