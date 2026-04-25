import type { Metadata } from "next"
import LaboratoryDetailClient from "@/components/research/laboratory-detail-client"

export const metadata: Metadata = {
  title: "Laboratorio de Bioreactores | AS Laboratorios Trujillo",
  description: "Laboratorio en construcción para diseño, modelado y escalado de bioreactores. Fermentación y producción de metabolitos de interés industrial en Trujillo, Perú.",
}

export default function BioreactoresPage() {
  const labData = {
    id: "bioreactores",
    name: "Laboratorio de Diseño y Modelado de Bioreactores",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Unidad en construcción dedicada al diseño, modelado y escalado de bioreactores para producción a mayor escala. Aquí optimizaremos procesos fermentativos y producción de metabolitos de interés.",
    fullDescription: "Este laboratorio está en etapa de construcción y será la unidad más avanzada de AS Laboratorios. Se especializará en el diseño, modelado matemático y escalado de bioreactores para procesos fermentativos. Una vez operativo, permitirá la producción a mayor escala de metabolitos de interés agroindustrial.",
    capabilities: [
      {
        title: "Modelado de Bioreactores",
        description: "Simulación y diseño matemático de sistemas de fermentación (En desarrollo)",
      },
      {
        title: "Diseño de Sistemas de Fermentación",
        description: "Ingeniería de biorreactores para procesos anaeróbicos y aeróbicos (En desarrollo)",
      },
      {
        title: "Escalado de Procesos",
        description: "Transposición de procesos de escala laboratorio a escala industrial (En desarrollo)",
      },
      {
        title: "Optimización de Cultivos",
        description: "Control y optimización de parámetros biológicos en fermentación (En desarrollo)",
      },
    ],
    equipment: [
      "Biorreactores de diferentes capacidades (En adquisición)",
      "Sistemas de control de temperatura y pH (En adquisición)",
      "Sensores de oxígeno disuelto (En adquisición)",
      "Software de modelado de bioprocesos (En adquisición)",
      "Sistemas de aireación y agitación (En adquisición)",
    ],
    services: [
      "Servicio disponible a partir de 2024",
      "Consultoría en escalado de bioprocesos",
      "Diseño de sistemas de fermentación personalizados",
      "Optimización de procesos fermentativos",
    ],
  }

  return (
    <>
      <LaboratoryDetailClient labData={labData} />
    </>
  )
}
