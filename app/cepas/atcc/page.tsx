import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { StrainCatalogStructuredData } from "@/components/strains/strain-seo"
import { atccStrains } from "@/data/cepas-seo"
import ATCCEnhancedClient from "./atcc-enhanced-client"

export const metadata: Metadata = constructMetadata({
  title: "Cepas ATCC para Investigación y Tesistas en Perú",
  description:
    "Cepas ATCC disponibles en AS Laboratorios para proyectos de investigación, docencia y tesis. Consulta códigos, formatos, aplicaciones y trazabilidad.",
  keywords: [
    "cepas ATCC en Perú",
    "microorganismos de referencia",
    "cepas ATCC para investigación",
    "cepas ATCC para docencia",
    "cepas ATCC para tesistas",
    "Bacillus subtilis ATCC",
    "Escherichia coli ATCC 25922",
    "colección ATCC Perú",
    "cepas de referencia para tesis Perú",
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
