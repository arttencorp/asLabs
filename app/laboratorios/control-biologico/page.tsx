import type { Metadata } from "next"
import LaboratoryDetailClient from "@/components/research/laboratory-detail-client"

export const metadata: Metadata = {
  title: "Laboratorio de Control Biológico | AS Laboratorios Trujillo",
  description: "Laboratorio especializado en producción de agentes de control biológico. Trichoderma, Beauveria y bacterias entomopatógenas para control sostenible de plagas en Trujillo, Perú.",
}

export default function ControlBiologicoPage() {
  const labData = {
    id: "control-biologico",
    name: "Laboratorio de Control Biológico",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Unidad dedicada al desarrollo y producción de agentes de control biológico. Producimos hongos, bacterias y otros microorganismos para el control de plagas agrícolas de forma sostenible.",
    fullDescription: "Nuestro laboratorio de Control Biológico es pionero en la región en la producción de agentes microbianos para control de plagas. Nos especializamos en hongos entomopatógenos como Beauveria y Trichoderma, así como bacterias beneficiosas. Todos nuestros biopreparados cumplen con estándares de calidad internacionales.",
    capabilities: [
      {
        title: "Producción de Trichoderma harzianum",
        description: "Hongo biocontrolador para control de enfermedades de raíz y hongos patógenos",
      },
      {
        title: "Cultivo de Beauveria bassiana",
        description: "Hongo entomopatógeno para control de insectos plagas de importancia agrícola",
      },
      {
        title: "Producción de Bacterias Entomopatógenas",
        description: "Desarrollo de cepas de bacterias para control biológico de insectos",
      },
      {
        title: "Formulación de Biopreparados",
        description: "Formulación y estabilización de agentes biológicos para aplicación agrícola",
      },
    ],
    equipment: [
      "Biorreactores para fermentación",
      "Incubadoras controladas",
      "Sistemas de refrigeración",
      "Equipos de empaque y formulación",
      "Cámaras de aislamiento",
    ],
    services: [
      "Producción y suministro de biopreparados",
      "Asesoramiento en estrategias de control biológico",
      "Ensayos de eficacia de agentes biológicos",
      "Capacitación en manejo de biocontroles",
    ],
  }

  return (
    <>
      <LaboratoryDetailClient labData={labData} />
    </>
  )
}
