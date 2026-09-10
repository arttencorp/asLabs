import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { StrainCatalogStructuredData } from "@/components/strains/strain-seo"
import { identifiedStrains } from "@/data/cepas-seo"
import IdentificadasEnhancedClient from "./identificadas-enhanced-client"

export const metadata: Metadata = constructMetadata({
  title: "Cepas Bacterianas en Perú | Catálogo Microbiano",
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
  languages: {
    "es-PE": "https://aslaboratorios.com/cepas/identificadas",
    "es-EC": "https://aslaboratorios.com/ecuador/cepas",
    "x-default": "https://aslaboratorios.com/cepas",
  },
})

export default function CepasIdentificadasPage() {
  return (
    <>
      <StrainCatalogStructuredData kind="identified" strains={identifiedStrains} />
      <IdentificadasEnhancedClient />
    </>
  )
}
