import type { Metadata } from "next"

export const SITE_URL = "https://aslaboratorios.com"
export const SITE_NAME = "AS Laboratorios"
export const DEFAULT_OG_IMAGE = "/new/bannerasnuevo.webp"

type MetadataProps = {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  path?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}

export function constructMetadata({
  title = SITE_NAME,
  description = "Biotecnología agrícola, plantines in vitro, análisis de laboratorio, control biológico e investigación aplicada en Trujillo, Perú.",
  keywords = [
    "biotecnología agrícola Perú",
    "laboratorio en Trujillo",
    "plantines in vitro",
    "análisis microbiológicos",
    "fitopatología",
    "control biológico",
    "cultivo de tejidos",
    "investigación agrícola",
  ],
  image = DEFAULT_OG_IMAGE,
  path = "",
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: MetadataProps = {}): Metadata {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`
  const canonical = `${SITE_URL}${normalizedPath}`
  const metaTitle =
    title === "Inicio" || title === SITE_NAME
      ? "Biotecnología Agrícola y Laboratorio en Perú | AS Laboratorios"
      : title.includes(SITE_NAME)
        ? title
        : `${title} | ${SITE_NAME}`

  return {
    title: metaTitle,
    description,
    keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical },
    openGraph: {
      title: metaTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "es_PE",
      type,
      publishedTime,
      modifiedTime,
      images: [{ url: image, alt: metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "Biotecnología agrícola y servicios de laboratorio",
    referrer: "origin-when-cross-origin",
  }
}
