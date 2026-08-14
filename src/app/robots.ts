import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "Googlebot-Favicon",
        allow: ["/favicon.ico", "/icon*", "/apple-icon*", "/logo.png"],
      },
    ],
    sitemap: "https://www.lentone.in/sitemap.xml",
  };
}
