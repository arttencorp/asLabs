import type { Metadata } from "next"
import LaboratoryDetailClient from "@/components/research/laboratory-detail-client"

export const metadata: Metadata = {
  title: "Laboratorio de Biotecnología | AS Laboratorios Trujillo",
  description: "Laboratorio integral de biotecnología molecular con PCR, qPCR, secuenciación genómica y análisis molecular de ADN en Trujillo, La Libertad, Perú.",
}

export default function BiotecnologiaPage() {
  const labData = {
    id: "biotecnologia",
    name: "Laboratorio de Biotecnología",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Laboratorio integral de biotecnología molecular con equipamiento avanzado. Realizamos análisis genómico, PCR, secuenciación e ingeniería genética aplicada a mejoramiento vegetal.",
    fullDescription: "Nuestro laboratorio de Biotecnología es un centro de investigación molecular de última generación. Contamos con equipamiento avanzado para análisis genómico integral, amplificación de genes, secuenciación de ADN y técnicas de ingeniería genética. Nuestro equipo realiza investigaciones fundamentales y aplicadas en mejoramiento vegetal.",
    capabilities: [
      {
        title: "PCR y qPCR",
        description: "Amplificación y cuantificación de fragmentos de ADN mediante reacción en cadena de la polimerasa",
      },
      {
        title: "Secuenciación Genómica",
        description: "Secuenciación de alto rendimiento para análisis de genomas completos y parciales",
      },
      {
        title: "Análisis Molecular de ADN",
        description: "Identificación, caracterización y análisis de variabilidad genética",
      },
      {
        title: "Amplificación de Fragmentos Genómicos",
        description: "Aislamiento y amplificación de genes de interés para investigación y aplicaciones biotecnológicas",
      },
    ],
    equipment: [
      "Termocicladores PCR en tiempo real",
      "Secuenciadores automatizados",
      "Espectrofotómetros",
      "Electroforesis capilar",
      "Centrífugas de alta velocidad",
      "Congeladores -80°C",
    ],
    services: [
      "Análisis genómico integral",
      "Servicios de secuenciación",
      "Identificación molecular de organismos",
      "Asesoramiento en diseño de investigaciones moleculares",
    ],
  }

  return (
    <>
      <LaboratoryDetailClient labData={labData} />
    </>
  )
}
