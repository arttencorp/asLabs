import type { Metadata } from "next"
import LaboratoryDetailClient from "@/components/research/laboratory-detail-client"

export const metadata: Metadata = {
  title: "Laboratorio de Biotecnología Vegetal | AS Laboratorios Trujillo",
  description: "Laboratorio especializado en cultivo de tejidos, micropropagación y clonación de plantas in vitro. Producción masiva de plantas mejoradas genéticamente en Trujillo, Perú.",
}

export default function BiotecnologiaVegetalPage() {
  const labData = {
    id: "biotecnologia-vegetal",
    name: "Laboratorio de Biotecnología Vegetal",
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Laboratorio especializado en técnicas avanzadas de cultivo de tejidos, micropropagación y clonación de plantas. Producimos plantas in vitro con tecnología de punta para mejoramiento genético y producción masiva.",
    fullDescription: "Nuestro laboratorio de Biotecnología Vegetal es una unidad de investigación avanzada dedicada a desarrollar y optimizar técnicas de cultivo in vitro. Trabajamos con diversas especies vegetales para producir clones de alta calidad, libres de patógenos y con características genéticas mejoradas. Nuestro equipo utiliza protocolos estandarizados basados en las mejores prácticas internacionales.",
    capabilities: [
      {
        title: "Cultivo de Tejidos y Micropropagación",
        description: "Producción masiva de plantas a partir de tejidos vegetales en condiciones controladas",
      },
      {
        title: "Clonación de Plantas in Vitro",
        description: "Generación de plantas genéticamente idénticas para mantener características deseables",
      },
      {
        title: "Producción de Plantas Libres de Patógenos",
        description: "Eliminación de virus y patógenos mediante técnicas de meristema",
      },
      {
        title: "Optimización de Protocolos",
        description: "Diseño y validación de nuevos protocolos de regeneración para diferentes especies",
      },
    ],
    equipment: [
      "Cámaras de cultivo controladas",
      "Autoclaves de esterilización",
      "Sistemas de iluminación LED",
      "Microscopios estereoscópicos",
      "Campanas de flujo laminar",
    ],
    services: [
      "Servicios de micropropagación a escala comercial",
      "Producción de plantas certificadas libre de patógenos",
      "Asesoramiento técnico en biotecnología vegetal",
      "Capacitación en técnicas de cultivo in vitro",
    ],
  }

  return (
    <>
      <LaboratoryDetailClient labData={labData} />
    </>
  )
}
