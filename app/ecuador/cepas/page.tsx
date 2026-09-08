import type { Metadata } from "next"
import CepasEcuadorClient from "./cepas-ecuador-client"
import { StrainCatalogStructuredData } from "@/components/strains/strain-seo"
import { identifiedStrains } from "@/data/cepas-seo"

export const metadata: Metadata = {
  title: "Cepas Bacterianas Identificadas en Ecuador | Catálogo en USD",
  description: "Catálogo de cepas bacterianas y fúngicas identificadas molecularmente para Ecuador, con cotización en dólares, trazabilidad y soporte técnico de AS Labs.",
  keywords: ["cepas bacterianas Ecuador", "comprar cepas Ecuador", "cepas microbiológicas Quito", "cepas identificadas Ecuador", "cultivos microbianos Ecuador", "Bacillus Ecuador", "microorganismos para investigación Ecuador"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/cepas", languages: { "es-EC": "https://aslaboratorios.com/ecuador/cepas", "es-PE": "https://aslaboratorios.com/cepas/identificadas", "x-default": "https://aslaboratorios.com/cepas" } },
  openGraph: {
    title: "Cepas Identificadas AS Labs | Ecuador",
    description: "Cepas identificadas molecularmente con precios referenciales en USD.",
    url: "https://aslaboratorios.com/ecuador/cepas",
    locale: "es_EC",
    images: [{ url: "/lab-header-bg.jpg", width: 1200, height: 630, alt: "Catálogo microbiológico de AS Labs" }],
  },
}

export default function CepasEcuadorPage() {
  return <><StrainCatalogStructuredData kind="identified" strains={identifiedStrains} market="ecuador" /><CepasEcuadorClient /></>
}
