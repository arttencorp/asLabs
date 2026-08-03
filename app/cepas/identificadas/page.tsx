import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { StrainCatalogStructuredData } from "@/components/strains/strain-seo"
import { identifiedStrains } from "@/data/cepas-seo"
import IdentificadasEnhancedClient from "./identificadas-enhanced-client"

export const metadata: Metadata = constructMetadata({
  title: "Cepas Identificadas en Perú: Catálogo Microbiano",
  description:
    "Compra cepas bacterianas y fúngicas identificadas en Perú. Catálogo para investigación, biofertilización, biocontrol y docencia con ficha técnica.",
  keywords: [
    "comprar cepas identificadas Perú",
    "cepas microbianas Perú",
    "cepas bacterianas para investigación",
    "cepas de Bacillus subtilis",
    "Pseudomonas fluorescens",
    "Trichoderma reesei",
    "microorganismos para biocontrol",
    "biofertilizantes microbianos",
    "colección de cultivos microbianos Perú",
  ],
  path: "/cepas/identificadas",
  image: "/lab-header-bg.jpg",
})

export default function CepasIdentificadasPage() {
  return (
    <>
      <StrainCatalogStructuredData kind="identified" strains={identifiedStrains} />
      <IdentificadasEnhancedClient />
    </>
  )
}
