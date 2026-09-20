import type { Metadata } from "next"
import CatalogCategoryPage from "../catalog-category-page"
import { constructMetadata } from "@/lib/metadata"

const config = {
  scope: "medios" as const,
  eyebrow: "Medios de cultivo",
  title: "Medios de cultivo HiMedia para microbiología",
  description: "Agares y medios deshidratados HiMedia de importación en presentaciones de 500 g, 1 kg y 2 kg para diagnóstico, investigación y control microbiológico.",
  image: "/kit-microbiologia.png",
}

export const metadata: Metadata = constructMetadata({
  title: "Medios de Cultivo HiMedia en Perú",
  description: config.description,
  keywords: ["medios de cultivo HiMedia Perú", "agar MacConkey Perú", "agar Mueller Hinton Perú", "agar TSA Perú", "agar Sabouraud Perú", "medios microbiológicos Perú"],
  path: "/kits-reactivos/medios-de-cultivo",
  image: config.image,
})

export default function MediosCultivoCatalogPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/medios-de-cultivo" />
}
