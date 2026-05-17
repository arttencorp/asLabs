import type { Metadata } from "next"
import CepaDetailClient from "./cepa-detail-client"

const cepasData = [
  { id: "1", nombre: "Trichoderma harzianum", descripcion: "Hongo antagonista para control de enfermedades fúngicas del suelo" },
  { id: "2", nombre: "Beauveria bassiana", descripcion: "Hongo entomopatógeno para control biológico de plagas" },
  { id: "3", nombre: "Bacillus subtilis", descripcion: "Bacteria promotora del crecimiento vegetal y fijadora de nitrógeno" },
  { id: "4", nombre: "Pseudomonas fluorescens", descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento" },
  { id: "5", nombre: "Azospirillum brasilense", descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas" },
  { id: "6", nombre: "Metarhizium anisopliae", descripcion: "Hongo entomopatógeno para control de insectos del suelo" },
  { id: "7", nombre: "Streptomyces lydicus", descripcion: "Actinobacteria productora de antibióticos naturales para control de patógenos" },
  { id: "8", nombre: "Bacillus megaterium", descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal" },
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
