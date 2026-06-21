import type { Metadata } from "next"
import LaboratoryDetailClient from "@/components/research/laboratory-detail-client"

export const metadata: Metadata = {
  title: "Laboratorio de Bioprocesos Industriales | AS Laboratorios Trujillo",
  description: "Laboratorio especializado en formulación de bacterias, cianobacterias y microorganismos para aplicaciones industriales y agroindustriales en Trujillo, Perú.",
}

export default function BioprocesoIndustrialPage() {
  const labData = {
    id: "bioprocesos-industriales",
    name: "Laboratorio de Bioprocesos Industriales",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Laboratorio dedicado a la formulación de bacterias, cianobacterias y microorganismos para aplicaciones industriales y agroindustriales.",
    fullDescription: "Nuestro Laboratorio de Bioprocesos Industriales es una unidad de investigación avanzada especializada en el desarrollo y optimización de procesos fermentativos para producción de microorganismos benéficos. Formulamos bacterias, cianobacterias y otros microorganismos destinados a aplicaciones industriales y agroindustriales, combinando biotecnología moderna con sostenibilidad ambiental. Nuestro equipo de especialistas trabaja en la creación de soluciones biológicas innovadoras que reducen dependencia de químicos sintéticos.",
    capabilities: [
      {
        title: "Formulación de Bacterias Benéficas",
        description: "Desarrollo y optimización de formulaciones bacterianas para diferentes aplicaciones industriales",
      },
      {
        title: "Cultivo de Cianobacterias",
        description: "Producción masiva de cianobacterias para biofertilización y fijación de nitrógeno",
      },
      {
        title: "Desarrollo de Bioprocesos",
        description: "Diseño y escala de procesos fermentativos sostenibles para producción microbiana",
      },
      {
        title: "Aplicaciones Industriales",
        description: "Adaptación de microorganismos para usos en agroindustria, tratamiento de aguas y otros sectores",
      },
    ],
    equipment: [
      "Bioreactores de diferentes capacidades",
      "Sistemas de fermentación anaeróbica",
      "Equipos de esterilización y control de calidad",
      "Sistemas de aireación y control de parámetros",
      "Equipos de precipitación y concentración",
    ],
    services: [
      "Formulación de microorganismos para industria",
      "Optimización de procesos fermentativos",
      "Producción a escala piloto y comercial",
      "Asesoramiento técnico en bioprocesos",
      "Consultoría en sostenibilidad biotecnológica",
    ],
    director: "Mblga Rosa Nancy Mejia Malabrigo",
    staff: [
      "Practicante: Helem Iveth Guevara Nuñez",
      "Practicante: Andy Hassan Espinales Gutierrez",
      "Practicante: Luis Alonso Flores Ramirez",
    ],
    objectives: [
      "Formular productos biológicos de alta calidad para industria y agroindustria",
      "Desarrollar cepas de cianobacterias productivas",
      "Optimizar procesos de fermentación a escala industrial",
      "Crear soluciones sostenibles para la industria agrícola",
      "Investigar nuevas aplicaciones de microorganismos benéficos",
    ],
    applications: [
      "Biofertilizantes con bacterias fijadoras de nitrógeno",
      "Formulaciones con cianobacterias para cultivos",
      "Productos de biocontrol a escala industrial",
      "Inoculantes microbianos especializados",
      "Aditivos biológicos para la agroindustria",
      "Procesos de fermentación escalables",
    ],
  }

  return (
    <>
      <LaboratoryDetailClient labData={labData} />
    </>
  )
}
