import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { StrainCatalogStructuredData } from "@/components/strains/strain-seo"
import { atccStrains } from "@/data/cepas-seo"
import ATCCEnhancedClient from "./atcc-enhanced-client"

export const metadata: Metadata = constructMetadata({
  title: "Cepas ATCC en Perú: Microorganismos de Referencia",
  description:
    "Solicita cepas ATCC de referencia en Perú para control de calidad, validación de métodos, docencia e investigación. Revisa códigos, formatos y trazabilidad.",
  keywords: [
    "comprar cepas ATCC Perú",
    "cepas ATCC en Perú",
    "microorganismos de referencia",
    "cepas para control de calidad microbiológico",
    "cepas para validación de métodos",
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
