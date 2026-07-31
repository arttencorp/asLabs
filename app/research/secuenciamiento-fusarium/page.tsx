import type { Metadata } from "next"
import ResearchProjectDetail from "@/components/research/research-project-detail"
import ResearchProjectStructuredData from "@/components/research/research-project-structured-data"
import { researchProjects } from "@/data/research-project-details"

export const metadata: Metadata = {
  title: "Secuenciación Genómica de Fusarium oxysporum Raza 4",
  description:
    "Proyecto de secuenciación, ensamblaje y análisis del genoma de Fusarium oxysporum f. sp. cubense Raza 4, patógeno asociado al banano.",
  keywords: [
    "Fusarium oxysporum",
    "secuenciación genómica",
    "enfermedad de Panamá",
    "banano",
    "biotecnología",
    "Trujillo",
    "Perú",
    "AS Laboratorios",
    "genoma completo",
    "patógeno vegetal",
    "Guevara Escobar Antonio Victor",
    "Guevara Nuñez Hellem Iveth",
  ],
  authors: [{ name: "Guevara Escobar Antonio Victor" }, { name: "Guevara Nuñez Hellem Iveth" }],
  openGraph: {
    title: "Secuenciación del Genoma de Fusarium oxysporum | AS Laboratorios",
    description:
      "Proyecto pionero de secuenciación genómica del patógeno causante de la enfermedad de Panamá en bananos.",
    url: "https://aslaboratorios.com/research/secuenciamiento-fusarium",
    siteName: "AS Laboratorios",
    images: [
      {
        url: "/lab-header-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Laboratorio de Genómica AS Laboratorios",
      },
    ],
    locale: "es_PE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secuenciación del Genoma de Fusarium oxysporum | AS Laboratorios",
    description:
      "Proyecto pionero de secuenciación genómica del patógeno causante de la enfermedad de Panamá en bananos.",
    images: ["/lab-header-bg.jpg"],
  },
  alternates: {
    canonical: "https://aslaboratorios.com/research/secuenciamiento-fusarium",
  },
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo, La Libertad, Perú",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Secuenciación del Genoma de Fusarium oxysporum f. sp. cubense Raza 4",
    "DC.creator": "Guevara Escobar Antonio Victor, Guevara Nuñez Hellem Iveth",
    "DC.subject": "Genómica, Biotecnología, Fitopatología",
    "DC.description": "Proyecto de secuenciación genómica del patógeno Fusarium oxysporum f. sp. cubense Raza 4",
    "DC.publisher": "AS Laboratorios",
    "DC.date": "2024",
    "DC.type": "Research Project",
    "DC.format": "text/html",
    "DC.identifier": "SGF-015",
    "DC.language": "es-PE",
  },
}

export default function SecuenciamientoFusariumPage() {
  const project = researchProjects["secuenciamiento-fusarium"]
  return (
    <>
      <ResearchProjectStructuredData project={project} />
      <ResearchProjectDetail project={project} />
    </>
  )
}
