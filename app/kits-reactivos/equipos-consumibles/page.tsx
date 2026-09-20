import type { Metadata } from "next"
import CatalogCategoryPage from "../catalog-category-page"
import { constructMetadata } from "@/lib/metadata"

const config = {
  scope: "equipos" as const,
  eyebrow: "Equipos y consumibles",
  title: "Equipos y consumibles para laboratorio molecular",
  description: "Instrumentos, consumibles para PCR y materiales de laboratorio seleccionados para flujos de biología molecular, investigación y análisis.",
  image: "/lab-equipment.png",
}

export const metadata: Metadata = constructMetadata({
  title: "Equipos y Consumibles de Laboratorio en Perú",
  description: config.description,
  keywords: ["equipos laboratorio Perú", "consumibles PCR Perú", "materiales biología molecular Perú", "equipos moleculares Perú", "insumos de laboratorio Perú"],
  path: "/kits-reactivos/equipos-consumibles",
  image: config.image,
})

export default function EquiposConsumiblesCatalogPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/equipos-consumibles" />
}
