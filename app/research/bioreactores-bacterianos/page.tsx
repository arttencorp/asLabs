import type { Metadata } from "next"
import BioreactoresBacterianoClient from "./bioreactores-bacterianos-client"

export const metadata: Metadata = {
  title: "Bioreactores para Suspensiones Bacterianas | AS Laboratorios",
  description:
    "Diseño y producción de bioreactores para suspensiones bacterianas a gran escala. Optimización de producción de agentes de control biológico.",
  keywords: [
    "bioreactores",
    "suspensiones bacterianas",
    "producción a escala",
    "biocontrol",
    "fermentación",
    "AS Laboratorios",
    "Trujillo",
    "Perú",
    "ingeniería bioquímica",
    "biotecnología",
  ],
  authors: [
    { name: "Andy Hassan Espinales Gutiérrez" },
    { name: "Luis Alonso Flores Ramírez" },
  ],
  openGraph: {
    title: "Bioreactores para Suspensiones Bacterianas | AS Laboratorios",
    description:
      "Diseño y producción de bioreactores optimizados para suspensiones bacterianas de control biológico a gran escala.",
    url: "https://aslaboratorios.com/research/bioreactores-bacterianos",
    siteName: "AS Laboratorios",
    images: [
      {
        url: "/bioreactors.png",
        width: 1200,
        height: 630,
        alt: "Proyecto Bioreactores AS Laboratorios",
      },
    ],
    locale: "es_PE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bioreactores para Suspensiones Bacterianas",
    description:
      "Diseño y producción de bioreactores optimizados para suspensiones bacterianas de control biológico.",
    images: ["/bioreactors.png"],
  },
  alternates: {
    canonical: "https://aslaboratorios.com/research/bioreactores-bacterianos",
  },
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo, La Libertad, Perú",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Bioreactores para Suspensiones Bacterianas",
    "DC.creator": "Andy Hassan Espinales Gutiérrez, Luis Alonso Flores Ramírez",
    "DC.subject": "Bioreactores, Suspensiones Bacterianas, Biocontrol, Fermentación",
    "DC.description":
      "Diseño y producción de bioreactores para suspensiones bacterianas a gran escala",
    "DC.publisher": "AS Laboratorios",
    "DC.date": "2024",
    "DC.type": "Research Project",
    "DC.format": "text/html",
    "DC.identifier": "DPBSB-002",
    "DC.language": "es-PE",
  },
}

export default function BioreactoresBacterianoPage() {
  return <BioreactoresBacterianoClient />
}
