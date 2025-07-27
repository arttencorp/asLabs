import type { Metadata } from "next"

type MetadataProps = {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  path?: string
  type?: "website" | "article" | "product"
  publishedTime?: string
  modifiedTime?: string
}

export function constructMetadata({
  title = "AS Laboratorios",
  description = "AS Laboratorios - Líder en biotecnología vegetal en Perú. Plantines in vitro, control biológico, materiales de laboratorio y asesoría técnica para agricultura sostenible. Servicio a universidades, estudiantes y agricultores desde el año 2000.",
  keywords = [
    "biotecnología vegetal",
    "plantines in vitro",
    "control biológico",
    "laboratorio Perú",
    "agricultura sostenible",
    "estudiantes biología",
    "materiales laboratorio",
    "asesoría técnica",
    "cultivo tejidos",
    "micropropagación",
    "banano baby",
    "pitahaya",
    "fresa",
    "piña",
    "Trujillo",
    "La Libertad",
    "universidad",
    "investigación",
    "genética molecular",
    "PCR",
    "electroforesis",
    "reactivos",
    "medios cultivo",
    "placas petri",
    "microscopio",
    "AS Labs",
    "biotechnology Peru",
    "plant tissue culture",
    "biological control",
  ],
  image = "/aslabs-logo.png",
  path = "",
  type = "website",
  publishedTime,
  modifiedTime,
}: MetadataProps = {}): Metadata {
  const metaTitle =
    title === "AS Laboratorios"
      ? "AS Laboratorios - Biotecnología Vegetal y Materiales de Laboratorio en Perú"
      : `${title} | AS Laboratorios - Biotecnología Vegetal Perú`

  const baseUrl = "https://aslaboratorios.com"
  const fullUrl = `${baseUrl}${path}`

  return {
    title: metaTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "AS Laboratorios", url: "https://aslaboratorios.com" }],
    creator: "AS Laboratorios",
    publisher: "AS Laboratorios",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        "es-PE": fullUrl,
        es: fullUrl,
      },
    },
    openGraph: {
      title: metaTitle,
      description,
      url: fullUrl,
      siteName: "AS Laboratorios",
      locale: "es_PE",
      type: type,
      publishedTime,
      modifiedTime,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: metaTitle,
          type: "image/png",
        },
        {
          url: "/aslabs-logo.png",
          width: 800,
          height: 600,
          alt: "AS Laboratorios Logo",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [image],
      creator: "@aslaboratorios",
      site: "@aslaboratorios",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "AS-Laboratorios-Peru-Biotecnologia-Vegetal",
      yandex: "AS-Laboratorios-Peru",
      yahoo: "AS-Laboratorios-Peru",
    },
    category: "Biotechnology",
    classification: "Business",
    referrer: "origin-when-cross-origin",
    applicationName: "AS Laboratorios",
    generator: "Next.js",
    manifest: "/manifest.json",
    other: {
      "google-site-verification": "AS-Laboratorios-Peru-Biotecnologia-Vegetal",
      "msvalidate.01": "AS-Laboratorios-Peru-Microsoft",
      "facebook-domain-verification": "AS-Laboratorios-Peru-Facebook",
      "p:domain_verify": "AS-Laboratorios-Peru-Pinterest",
    },
  }
}
