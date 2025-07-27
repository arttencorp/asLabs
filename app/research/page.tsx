import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ResearchPageClient from "./ResearchPageClient"

export const metadata: Metadata = {
  title: "Investigación y Desarrollo | AS Laboratorios - Biotecnología Vegetal en Perú",
  description:
    "Descubre nuestros proyectos de investigación en biotecnología vegetal, mejoramiento genético, control biológico y secuenciamiento genómico. Más de 20 proyectos activos en Trujillo, Perú.",
  keywords: [
    "investigación biotecnología",
    "mejoramiento genético",
    "control biológico",
    "secuenciamiento genómico",
    "AS Laboratorios",
    "Trujillo",
    "Perú",
    "biotecnología vegetal",
    "agricultura sostenible",
    "Fusarium oxysporum",
    "banano baby",
    "clonación plantas",
  ],
  authors: [{ name: "AS Laboratorios" }, { name: "Antonio Guevara Escobar" }, { name: "Hellem Iveth Guevara Nuñez" }],
  openGraph: {
    title: "Investigación y Desarrollo | AS Laboratorios",
    description:
      "Proyectos de investigación en biotecnología vegetal, mejoramiento genético y control biológico en Perú.",
    url: "https://aslaboratorios.com/research",
    siteName: "AS Laboratorios",
    images: [
      {
        url: "/research-preview.png",
        width: 1200,
        height: 630,
        alt: "Investigación AS Laboratorios",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investigación y Desarrollo | AS Laboratorios",
    description:
      "Proyectos de investigación en biotecnología vegetal, mejoramiento genético y control biológico en Perú.",
    images: ["/research-preview.png"],
  },
  alternates: {
    canonical: "https://aslaboratorios.com/research",
  },
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo, La Libertad, Perú",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Investigación y Desarrollo en Biotecnología Vegetal",
    "DC.creator": "AS Laboratorios",
    "DC.subject": "Biotecnología, Investigación, Mejoramiento Genético, Control Biológico",
    "DC.description": "Portal de investigación y desarrollo de AS Laboratorios",
    "DC.publisher": "AS Laboratorios",
    "DC.date": "2024",
    "DC.type": "Research Portal",
    "DC.format": "text/html",
    "DC.language": "es-PE",
  },
}

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <ResearchPageClient />
      <Footer />
    </>
  )
}
