import type { MetadataRoute } from "next"

const SITE_URL = "https://aslaboratorios.com"
const LAST_MODIFIED = new Date("2026-07-26")

const pages = [
  ["", "weekly", 1],
  ["/servicios", "weekly", 0.95],
  ["/plantines", "weekly", 0.9],
  ["/control-biologico", "weekly", 0.9],
  ["/biotecnologia-vegetal", "monthly", 0.85],
  ["/cepas", "weekly", 0.85],
  ["/research", "weekly", 0.85],
  ["/servicios/microbiologicos", "monthly", 0.82],
  ["/servicios/fitopatologia", "monthly", 0.82],
  ["/servicios/bacteriologia-general", "monthly", 0.8],
  ["/servicios/medio-ambiente", "monthly", 0.8],
  ["/servicios/biotecnologia-vegetal", "monthly", 0.82],
  ["/servicios/apoyo-investigacion", "monthly", 0.8],
  ["/cepas/identificadas", "weekly", 0.88],
  ["/cepas/atcc", "weekly", 0.88],
  ["/sobre-nosotros", "monthly", 0.75],
  ["/research/secuenciamiento-fusarium", "monthly", 0.75],
  ["/research/fusarium-genoma", "monthly", 0.75],
  ["/research/banano-baby", "monthly", 0.72],
  ["/research/trichoderma-fusarium", "monthly", 0.72],
  ["/research/bioreactores-bacterianos", "monthly", 0.72],
  ["/solucion-estudiantes", "monthly", 0.65],
  ["/genetica", "monthly", 0.6],
  ["/tienda", "weekly", 0.6],
  ["/trabaja-con-nosotros", "weekly", 0.5],
  ["/pitch-deck", "monthly", 0.4],
  ["/legal", "yearly", 0.2],
] as const

const identifiedPages = Array.from({ length: 6 }, (_, index) => `/cepas/identificadas/id-${index + 1}`)
const atccPages = Array.from({ length: 24 }, (_, index) => `/cepas/atcc/atcc-${index + 1}`)

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryPages: MetadataRoute.Sitemap = pages.map(([path, changeFrequency, priority]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }))

  const catalogPages: MetadataRoute.Sitemap = [...identifiedPages, ...atccPages].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.68,
  }))

  return [...primaryPages, ...catalogPages]
}
