import type { Metadata } from "next"
import TrichodermaFusariumClient from "./trichoderma-fusarium-client"

export const metadata: Metadata = {
  title: "Trichoderma vs Fusarium - Mecanismos Moleculares | AS Laboratorios",
  description:
    "Investigación de la capacidad antagonista de especies de Trichoderma contra Fusarium Oxysporum Raza 2. Análisis de mecanismos moleculares en aislados de La Libertad, Perú.",
  keywords: [
    "Trichoderma",
    "Fusarium oxysporum",
    "control biológico",
    "mecanismos moleculares",
    "biocontrol",
    "La Libertad",
    "Perú",
    "AS Laboratorios",
    "antagonismo",
    "resistencia a enfermedades",
  ],
  authors: [
    { name: "Antonio Victor Gabriel Guevara Escobar" },
    { name: "Hellem Iveth Guevara Nuñez" },
  ],
  openGraph: {
    title: "Trichoderma vs Fusarium - Mecanismos Moleculares | AS Laboratorios",
    description:
      "Investigación de mecanismos moleculares de antagonismo de Trichoderma contra Fusarium Oxysporum Raza 2.",
    url: "https://aslaboratorios.com/research/trichoderma-fusarium",
    siteName: "AS Laboratorios",
    images: [
      {
        url: "/biological-control.png",
        width: 1200,
        height: 630,
        alt: "Proyecto Trichoderma Fusarium AS Laboratorios",
      },
    ],
    locale: "es_PE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trichoderma vs Fusarium - Mecanismos Moleculares",
    description:
      "Investigación de mecanismos moleculares de antagonismo de Trichoderma contra Fusarium Oxysporum Raza 2.",
    images: ["/biological-control.png"],
  },
  alternates: {
    canonical: "https://aslaboratorios.com/research/trichoderma-fusarium",
  },
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo, La Libertad, Perú",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Trichoderma vs Fusarium - Mecanismos Moleculares",
    "DC.creator": "Antonio Victor Gabriel Guevara Escobar, Hellem Iveth Guevara Nuñez",
    "DC.subject": "Control Biológico, Mecanismos Moleculares, Fusarium, Trichoderma",
    "DC.description":
      "Investigación de la capacidad antagonista de Trichoderma contra Fusarium Oxysporum Raza 2",
    "DC.publisher": "AS Laboratorios",
    "DC.date": "2024",
    "DC.type": "Research Project",
    "DC.format": "text/html",
    "DC.identifier": "CATFOM-001",
    "DC.language": "es-PE",
  },
}

export default function TrichodermaFusariumPage() {
  return <TrichodermaFusariumClient />
}
