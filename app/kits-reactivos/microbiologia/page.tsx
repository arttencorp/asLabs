import type { Metadata } from "next"
import CatalogCategoryPage from "../catalog-category-page"
import { constructMetadata } from "@/lib/metadata"

const config = {
  scope: "microbiologia" as const,
  eyebrow: "Microbiología",
  title: "Reactivos para microbiología e identificación bacteriana",
  description: "Pruebas bioquímicas, reactivos bacteriológicos y soluciones para identificación de microorganismos con soporte técnico e importación en Perú.",
  image: "/servicios/micro.jpeg",
}

export const metadata: Metadata = constructMetadata({
  title: "Reactivos para Microbiología en Perú",
  description: config.description,
  keywords: ["reactivos microbiología Perú", "identificación bacteriana Perú", "pruebas bioquímicas bacterianas", "kits microbiología Perú", "reactivos bacteriología Perú"],
  path: "/kits-reactivos/microbiologia",
  image: config.image,
})

export default function MicrobiologiaCatalogPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/microbiologia" />
}
