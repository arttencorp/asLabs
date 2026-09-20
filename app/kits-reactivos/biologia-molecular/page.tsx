import type { Metadata } from "next"
import CatalogCategoryPage from "../catalog-category-page"
import { constructMetadata } from "@/lib/metadata"

const config = {
  scope: "molecular" as const,
  eyebrow: "Biología molecular",
  title: "Reactivos y kits de biología molecular",
  description: "Referencias para PCR, qPCR, extracción, purificación, cuantificación, electroforesis y análisis de ADN y ARN con importación coordinada en Perú.",
  image: "/kit-biologia-molecular.png",
}

export const metadata: Metadata = constructMetadata({
  title: "Reactivos y Kits de Biología Molecular en Perú",
  description: config.description,
  keywords: ["reactivos biología molecular Perú", "kits PCR Perú", "reactivos qPCR Perú", "extracción ADN Perú", "purificación ADN Perú", "reactivos ADN ARN Perú"],
  path: "/kits-reactivos/biologia-molecular",
  image: config.image,
})

export default function BiologiaMolecularCatalogPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/biologia-molecular" />
}
