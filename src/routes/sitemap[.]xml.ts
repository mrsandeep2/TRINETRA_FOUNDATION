import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { workAreas } from "@/lib/site";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

type Entry = { path: string; changefreq?: string; priority?: string };

const staticPaths: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/work", changefreq: "monthly", priority: "0.9" },
  { path: "/impact", changefreq: "monthly", priority: "0.8" },
  { path: "/events", changefreq: "weekly", priority: "0.7" },
  { path: "/donate", changefreq: "monthly", priority: "0.9" },
  { path: "/volunteer", changefreq: "monthly", priority: "0.8" },
  { path: "/partner", changefreq: "monthly", priority: "0.7" },
  { path: "/transparency", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/policies/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/policies/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/policies/donation", changefreq: "yearly", priority: "0.3" },
  { path: "/policies/volunteer", changefreq: "yearly", priority: "0.3" },
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
          })),
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
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
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});