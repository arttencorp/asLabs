import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { atccStrains } from "@/data/cepas-seo"
import { StrainDetailStructuredData } from "@/components/strains/strain-seo"
import ATCCDetailEnhancedClient from "./atcc-detail-enhanced-client"

export function generateStaticParams() {
  return Object.keys(atccStrains).map((id) => ({ id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const strain = atccStrains[params.id]
  return constructMetadata({
    title: strain ? `${strain.name} ${strain.code}: Cepa ATCC en Perú` : "Cepa ATCC de referencia",
    description: strain
      ? `Ficha, documentación y disponibilidad de ${strain.name} ${strain.code}, cepa ATCC de referencia para investigación, docencia y tesis en Perú.`
      : "Información de una cepa ATCC de referencia disponible para investigación y tesis en AS Laboratorios.",
    keywords: strain
      ? [
          strain.name,
          strain.code,
          `${strain.code} para investigación Perú`,
          "cepa ATCC Perú",
          "microorganismo de referencia",
          "control de calidad microbiológico",
          "validación de métodos microbiológicos",
          "cepas ATCC para tesistas",
        ]
      : undefined,
    path: `/cepas/atcc/${params.id}`,
    image: "/lab-header-bg.jpg",
    noIndex: !strain,
  })
}

export default function ATCCDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <StrainDetailStructuredData kind="atcc" strains={atccStrains} id={params.id} />
      <ATCCDetailEnhancedClient cepaId={params.id} />
    </>
  )
}
