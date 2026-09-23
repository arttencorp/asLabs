import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { identifiedStrains } from "@/data/cepas-seo"
import { StrainDetailStructuredData } from "@/components/strains/strain-seo"
import IdentificadasDetailEnhancedClient from "./identificadas-detail-enhanced-client"

interface IdentificadasDetailPageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return Object.keys(identifiedStrains).map((id) => ({ id }))
}

export function generateMetadata({ params }: IdentificadasDetailPageProps): Metadata {
  const strain = identifiedStrains[params.id]
  return constructMetadata({
    title: strain ? `${strain.name} ${strain.code}: Cepa Identificada en Perú` : "Cepa microbiana identificada",
    description: strain
      ? `Ficha, presentación y disponibilidad de ${strain.name} ${strain.code}, cepa identificada para investigación y aplicaciones microbiológicas en Perú.`
      : "Información de una cepa microbiana identificada por AS Laboratorios.",
    keywords: strain
      ? [
          strain.name,
          strain.code,
          `comprar ${strain.name} Perú`,
          "cepa identificada Perú",
          "microorganismos para investigación",
          "AS Laboratorios cepas",
        ]
      : undefined,
    path: `/cepas/identificadas/${params.id}`,
    image: strain?.image ?? "/lab-header-bg.jpg",
    noIndex: !strain,
  })
}

export default function IdentificadasDetailPage({ params }: IdentificadasDetailPageProps) {
  return (
    <>
      <StrainDetailStructuredData kind="identified" strains={identifiedStrains} id={params.id} />
      <IdentificadasDetailEnhancedClient cepaId={params.id} />
    </>
  )
}
