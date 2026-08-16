import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { workAreas } from "@/lib/site";

const BASE_URL = "https://trinetrafoundation.in";

type Entry = { path: string; changefreq: string; priority: string; lastmod: string };

const currentDate: string = new Date().toISOString().split("T")[0] || "2026-08-16";

const staticPaths: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: currentDate },
  { path: "/about", changefreq: "monthly", priority: "0.9", lastmod: currentDate },
  { path: "/work", changefreq: "weekly", priority: "0.9", lastmod: currentDate },
  { path: "/donate", changefreq: "daily", priority: "0.9", lastmod: currentDate },
  { path: "/impact", changefreq: "weekly", priority: "0.8", lastmod: currentDate },
  { path: "/events", changefreq: "weekly", priority: "0.8", lastmod: currentDate },
  { path: "/transparency", changefreq: "monthly", priority: "0.8", lastmod: currentDate },
  { path: "/volunteer", changefreq: "monthly", priority: "0.8", lastmod: currentDate },
  { path: "/partner", changefreq: "monthly", priority: "0.7", lastmod: currentDate },
  { path: "/contact", changefreq: "monthly", priority: "0.7", lastmod: currentDate },
  { path: "/policies/privacy", changefreq: "yearly", priority: "0.4", lastmod: currentDate },
  { path: "/policies/terms", changefreq: "yearly", priority: "0.4", lastmod: currentDate },
  { path: "/policies/donation", changefreq: "yearly", priority: "0.4", lastmod: currentDate },
  { path: "/policies/volunteer", changefreq: "yearly", priority: "0.4", lastmod: currentDate },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = [
          ...staticPaths,
          ...workAreas.map((area) => ({
            path: `/work/${area.slug}`,
            changefreq: "monthly",
            priority: "0.8",
            lastmod: currentDate,
          })),
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...entries.map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});