import { createFileRoute } from "@tanstack/react-router";

// Keep in sync with the page routes in this folder.
const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/expertise-comptable", priority: "0.9", changefreq: "monthly" },
  { path: "/audit-commissariat-aux-comptes", priority: "0.9", changefreq: "monthly" },
  { path: "/conseil", priority: "0.8", changefreq: "monthly" },
  { path: "/expertises", priority: "0.8", changefreq: "monthly" },
  { path: "/le-cabinet", priority: "0.7", changefreq: "yearly" },
  { path: "/contact", priority: "0.7", changefreq: "yearly" },
  { path: "/mentions-legales", priority: "0.2", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const today = new Date().toISOString().split("T")[0];
        const urls = ROUTES.map(
          (r) =>
            `  <url>\n    <loc>${origin}${r.path === "/" ? "/" : r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
