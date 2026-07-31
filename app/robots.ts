import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/imprimir/"],
    },
    sitemap: "https://aslaboratorios.com/sitemap.xml",
    host: "https://aslaboratorios.com",
  }
}
