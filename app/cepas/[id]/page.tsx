import type { Metadata } from "next"
import CepaDetailClient from "./cepa-detail-client"

const cepasData = [
  { id: "1", nombre: "Bacillus subtilis", descripcion: "Bacteria promotora del crecimiento vegetal y fijadora de nitrógeno" },
  { id: "2", nombre: "Pseudomonas fluorescens", descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento" },
  { id: "3", nombre: "Azospirillum sp.", descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas" },
  { id: "4", nombre: "Bacillus megaterium", descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal" },
  { id: "5", nombre: "Rhizobium sp.", descripcion: "Bacteria fijadora de nitrógeno en simbiosis con leguminosas" },
  { id: "6", nombre: "Escherichia coli", descripcion: "Bacteria modelo para investigación científica y producción de proteínas recombinantes" },
  { id: "7", nombre: "Bacillus cereus", descripcion: "Bacteria para estudios de control de plagas y patología" },
  { id: "8", nombre: "Bacillus thuringiensis", descripcion: "Bacteria natural para control biológico de insectos plaga" },
  { id: "9", nombre: "Pseudomonas aeruginosa", descripcion: "Bacteria para investigación molecular y microbiología clínica" },
  { id: "10", nombre: "Streptomyces spp", descripcion: "Actinobacteria productora de compuestos antimicrobianos naturales" },
  { id: "11", nombre: "Bacillus firmus", descripcion: "Bacteria activadora de crecimiento radicular y tolerante a estrés hídrico" },
]

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const cepa = cepasData.find(c => c.id === params.id)
  
  return {
    title: cepa ? `${cepa.nombre} | AS Laboratorios` : "Cepa | AS Laboratorios",
    description: cepa ? cepa.descripcion : "Cepa biológica certificada de AS Laboratorios",
  }
}

export default function CepaPage({ params }: { params: { id: string } }) {
  return <CepaDetailClient cepaId={params.id} />
}
