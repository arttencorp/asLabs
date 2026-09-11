import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { StrainCatalogStructuredData } from "@/components/strains/strain-seo"
import { atccStrains } from "@/data/cepas-seo"
import ATCCEnhancedClient from "./atcc-enhanced-client"

export const metadata: Metadata = constructMetadata({
  title: "Importación de Cepas ATCC en Perú para Investigación",
  description:
    "Gestión de importación de cepas ATCC en Perú exclusivamente para investigación y docencia. Precios referenciales, códigos, formatos y trazabilidad.",
  keywords: [
    "importación de cepas ATCC Perú",
    "cepas ATCC en Perú",
    "microorganismos de referencia",
    "cepas ATCC para investigación",
    "cepas ATCC para docencia",
    "Bacillus subtilis ATCC",
    "Escherichia coli ATCC 25922",
    "colección ATCC Perú",
    "importación de cepas ATCC",
  ],
  path: "/cepas/atcc",
  image: "/lab-header-bg.jpg",
})

export default function ATCCPage() {
  return (
    <>
      <StrainCatalogStructuredData kind="atcc" strains={atccStrains} />
      <ATCCEnhancedClient />
    </>
  )
}
