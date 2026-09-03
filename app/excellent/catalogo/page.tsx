import type { Metadata } from "next"
import ExcellentCatalogClient from "./catalog-client"

export const metadata: Metadata = {
  title: "Catálogo de Análisis Moleculares | exCELLlent",
  description: "Explora el catálogo exCELLlent de diagnóstico molecular, secuenciación, PCR, genética vegetal, inocuidad, ambiente, bioinformática y desarrollos a medida.",
  alternates: { canonical: "https://aslaboratorios.com/excellent/catalogo" },
}

export default function ExcellentCatalogPage() {
  return <ExcellentCatalogClient />
}
