import type { Metadata } from "next"
import BananoBabyClient from "./banano-baby-client"

export const metadata: Metadata = {
  title: "Proyecto Banano Baby - Variedad Resistente a Hongos | AS Laboratorios",
  description:
    "Desarrollo de una variedad de banano baby resistente a hongos fitopatógenos. Proyecto de mejoramiento genético liderado por Antonio Guevara Escobar en AS Laboratorios, Trujillo, Perú.",
  keywords: [
    "banano baby",
    "resistencia hongos",
    "mejoramiento genético",
    "biotecnología vegetal",
    "AS Laboratorios",
    "Trujillo",
    "Perú",
    "Antonio Guevara Escobar",
    "cultivo in vitro",
    "fitopatógenos",
  ],
  authors: [{ name: "Antonio Guevara Escobar" }],
  openGraph: {
    title: "Proyecto Banano Baby - Variedad Resistente a Hongos | AS Laboratorios",
    description:
      "Desarrollo de una variedad de banano baby resistente a hongos fitopatógenos mediante técnicas de mejoramiento genético.",
    url: "https://aslaboratorios.com/research/banano-baby",
    siteName: "AS Laboratorios",
    images: [
      {
        url: "/sustainable-agriculture.png",
        width: 1200,
        height: 630,
        alt: "Proyecto Banano Baby AS Laboratorios",
      },
    ],
    locale: "es_PE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyecto Banano Baby - Variedad Resistente a Hongos",
    description:
      "Desarrollo de una variedad de banano baby resistente a hongos fitopatógenos mediante técnicas de mejoramiento genético.",
    images: ["/sustainable-agriculture.png"],
  },
  alternates: {
    canonical: "https://aslaboratorios.com/research/banano-baby",
  },
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo, La Libertad, Perú",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Proyecto Banano Baby - Variedad Resistente a Hongos",
    "DC.creator": "Antonio Guevara Escobar",
    "DC.subject": "Mejoramiento Genético, Biotecnología Vegetal, Resistencia a Enfermedades",
    "DC.description": "Desarrollo de una variedad de banano baby resistente a hongos fitopatógenos",
    "DC.publisher": "AS Laboratorios",
    "DC.date": "2024",
    "DC.type": "Research Project",
    "DC.format": "text/html",
    "DC.identifier": "BB-001",
    "DC.language": "es-PE",
  },
}

export default function BananoBabyPage() {
  return <BananoBabyClient />
}
