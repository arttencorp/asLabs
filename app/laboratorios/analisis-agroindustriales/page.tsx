import type { Metadata } from "next"
import LaboratoryDetailClient from "@/components/research/laboratory-detail-client"

export const metadata: Metadata = {
      title: "Laboratorio de Análisis Industriales | AS Laboratorios Trujillo",
      description: "Laboratorio especializado en análisis físico-químicos de productos agroindustriales. Análisis de suelos, aguas, fertilizantes y productos agrícolas en Trujillo, Perú.",
    }

export default function AnalisisIndustrialesPage() {
  const labData = {
    id: "analisis-industriales",
    name: "Laboratorio de Análisis Industriales",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Laboratorio especializado en análisis físico-químicos de productos agroindustriales. Realiza caracterización de suelos, aguas, fertilizantes y productos finales con estándares internacionales.",
    fullDescription: "Nuestro laboratorio de Análisis Agroindustriales realiza análisis exhaustivos de parámetros físico-químicos conforme a estándares internacionales. Contamos con equipamiento moderno para caracterizar la composición de suelos, aguas de riego, fertilizantes y productos agrícolas terminados. Nuestros informes técnicos brindan información precisa para tomar decisiones agrícolas informadas.",
    capabilities: [
      {
        title: "Análisis de Composición de Suelos",
        description: "Determinación de textura, estructura, pH, materia orgánica y nutrientes disponibles",
      },
      {
        title: "Determinación de Nutrientes",
        description: "Cuantificación de macro y micronutrientes en suelos y productos agrícolas",
      },
      {
        title: "Análisis de Aguas de Riego",
        description: "Evaluación de calidad de agua para riego con determinación de contaminantes",
      },
      {
        title: "Evaluación de Calidad de Productos",
        description: "Análisis físico-químicos de productos agrícolas finales para verificar calidad",
      },
    ],
    equipment: [
      "Espectrofotómetros UV-Vis",
      "Cromatografía de gases",
      "Equipos de medición de pH y conductividad",
      "Balanzas analíticas de precisión",
      "Equipos de digestión de muestras",
      "Destiladores y extractores",
    ],
    services: [
      "Análisis de suelos y plantas",
      "Control de calidad de productos agroindustriales",
      "Evaluación de aguas de riego",
      "Asesoramiento en fertilización",
    ],
    director: "Ing. Agroind. Renzo Tarrillo",
    staff: ["Mblga. Rosa Nancy Mejia"],
    objectives: [
      "Realizar análisis precisos de suelos, plantas y aguas con estándares internacionales",
      "Garantizar la calidad de productos agroindustriales",
      "Proporcionar recomendaciones de fertilización basadas en datos",
      "Identificar deficiencias de nutrientes y contaminantes",
      "Apoyar la toma de decisiones en manejo agrícola",
    ],
    applications: [
      "Análisis de macronutrientes (N, P, K, Ca, Mg, S)",
      "Determinación de micronutrientes (Fe, Zn, Cu, Mn, B)",
      "PH y conductividad eléctrica",
      "Materia orgánica y textura del suelo",
      "Análisis de residuos de plaguicidas",
      "Certificaciones de productos orgánicos",
    ],
  }

  return (
    <>
      <LaboratoryDetailClient labData={labData} />
    </>
  )
}
