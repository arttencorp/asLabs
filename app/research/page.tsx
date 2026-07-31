import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ResearchPageExperience from "./ResearchPageExperience"

export const metadata: Metadata = {
  title: "Investigación en Biotecnología Agrícola | AS Laboratorios",
  description:
    "Proyectos de AS Laboratorios en control biológico, secuenciamiento, mejoramiento genético y biotecnología molecular para la agricultura peruana.",
  keywords: [
    "control biológico",
    "Trichoderma Trujillo",
    "Trichogramma Perú",
    "Paratheresia claripalpis",
    "biocontrolador",
    "agentes de control biológico",
    "manejo integrado de plagas",
    "MIP",
    "investigación agrícola Trujillo",
    "biotecnología Perú",
    "Bacillus biocontrolador",
    "control de plagas sostenible",
    "consorcio microbiano",
    "hongos entomopatógenos",
    "AS Laboratorios",
    "La Libertad",
    "agricultura orgánica",
    "plagas agrícolas",
    "Fusarium oxysporum",
    "alternativa a plaguicidas",
    "producción microbiana",
    "laboratorio microbiología Trujillo",
  ],
  authors: [
    { name: "AS Laboratorios" },
    { name: "Antonio Victor Gabriel Guevara Escobar" },
    { name: "Hellem Iveth Guevara Nuñez" },
  ],
  openGraph: {
    title: "Investigación en Biotecnología Agrícola | AS Laboratorios Trujillo",
    description:
      "Proyectos de investigación en control biológico, secuenciamiento, mejoramiento vegetal y biotecnología molecular para la agricultura peruana.",
    url: "https://aslaboratorios.com/research",
    siteName: "AS Laboratorios",
    images: [
      {
        url: "/research-preview.png",
        width: 1200,
        height: 630,
        alt: "Control Biológico - AS Laboratorios Trujillo",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investigación en Biotecnología | AS Laboratorios Trujillo, Perú",
    description:
      "Conoce nuestros proyectos de investigación aplicada para una agricultura más sostenible y productiva.",
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
    "DC.title": "Investigación en Control Biológico - Trichoderma, Trichogramma, Paratheresia",
    "DC.creator": "AS Laboratorios",
    "DC.subject": "Control Biológico, Trichoderma, Trichogramma, Paratheresia claripalpis, Investigación Agrícola",
    "DC.description": "Centro de investigación en control biológico y biocontrol en Trujillo, Perú",
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
      <Navbar overlay />
      <ResearchPageExperience />
      <Footer />
    </>
  )
}
