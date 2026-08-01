import type { Metadata } from "next"
import TrichodermaFusariumClient from "./trichoderma-fusarium-client"

export const metadata: Metadata = {
  title: "Trichoderma vs Fusarium Oxysporum Raza 2 - Control Biológico en Trujillo | AS Laboratorios Perú",
  description:
    "Investigación científica sobre la capacidad antagonista de Trichoderma contra Fusarium Oxysporum Raza 2. Análisis de mecanismos moleculares y biocontrol de enfermedades fúngicas en La Libertad, Perú. Proyecto CATFOM-001 dirigido por Antonio Victor Gabriel Guevara Escobar y Hellem Iveth Guevara Nuñez.",
  keywords: [
    "Trichoderma antagonista",
    "Trichoderma Trujillo",
    "Trichoderma Perú",
    "Fusarium oxysporum Raza 2",
    "control biológico de Fusarium",
    "biocontrol de enfermedades fúngicas",
    "mecanismos moleculares Trichoderma",
    "La Libertad",
    "investigación microbiología",
    "Trichoderma nativo",
    "antagonismo fúngico",
    "control sostenible de plagas",
    "AS Laboratorios",
    "biotecnología agrícola",
    "investigación agrónoma Perú",
    "laboratorio microbiología Trujillo",
  ],
  authors: [
    { name: "Antonio Victor Gabriel Guevara Escobar" },
    { name: "Hellem Iveth Guevara Nuñez" },
  ],
  openGraph: {
    title: "Trichoderma vs Fusarium - Control Biológico de Enfermedades | AS Laboratorios",
    description:
      "Investigación avanzada sobre mecanismos de antagonismo de Trichoderma contra Fusarium Oxysporum Raza 2 aislados de La Libertad, Perú.",
    url: "https://aslaboratorios.com/research/trichoderma-fusarium",
    siteName: "AS Laboratorios",
    images: [
      {
        url: "/biological-control.png",
        width: 1200,
        height: 630,
        alt: "Investigación Trichoderma vs Fusarium - Control Biológico",
      },
    ],
    locale: "es_PE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trichoderma vs Fusarium - Control Biológico | AS Laboratorios",
    description:
      "Investigación de mecanismos moleculares de Trichoderma contra Fusarium Oxysporum Raza 2 en Trujillo, Perú",
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
    "DC.title": "Trichoderma vs Fusarium Oxysporum Raza 2 - Mecanismos Moleculares de Antagonismo",
    "DC.creator": "Antonio Victor Gabriel Guevara Escobar, Hellem Iveth Guevara Nuñez",
    "DC.subject": "Control Biológico, Trichoderma, Fusarium, Mecanismos Moleculares, Microbiología",
    "DC.description":
      "Investigación sobre la capacidad antagonista de Trichoderma contra Fusarium Oxysporum Raza 2 aislados de La Libertad",
    "DC.publisher": "AS Laboratorios",
    "DC.date": "2027",
    "DC.type": "Research Project",
    "DC.format": "text/html",
    "DC.identifier": "CATFOM-001",
    "DC.language": "es-PE",
  },
}

export default function TrichodermaFusariumPage() {
  return <TrichodermaFusariumClient />
}
