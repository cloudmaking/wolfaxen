import { Handlers } from "$fresh/server.ts";
import manifest from "../fresh.gen.ts";

const BASE_URL = "https://wolfaxen.com";

export const handler: Handlers = {
  GET(_req, _ctx) {
    const routes = Object.keys(manifest.routes)
      .filter((path) => {
        // Exclude internal routes, api routes if any, and dynamic routes that need specific params
        // For now, we'll include all static routes and specific known dynamic ones if we had them.
        // We exclude _app, _404, _500, and api/ routes.
        return (
          !path.includes("/_") &&
          !path.includes("/api/") &&
          !path.includes("[") // Exclude dynamic routes for now until we have data to populate them
        );
      })
      .map((path) => {
        // Convert internal route path to URL path
        let urlPath = path.replace("./routes", "").replace(".tsx", "").replace(
          ".ts",
          "",
        );

        if (urlPath.endsWith("/index")) {
          urlPath = urlPath.replace("/index", "");
        }

        // Ensure root is just "/"
        if (urlPath === "") {
          urlPath = "/";
        }

        return urlPath;
      });

    // Add manually known dynamic routes or ensure specific important pages are there if the auto-discovery misses something
    // For now, the auto-discovery above covers the static routes we are about to create.

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${
      routes
        .map((route) => {
          return `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
        })
        .join("")
    }
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  },
};
