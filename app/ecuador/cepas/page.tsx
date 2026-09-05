import type { Metadata } from "next"
import CepasEcuadorClient from "./cepas-ecuador-client"

export const metadata: Metadata = {
  title: "Cepas Identificadas en Ecuador | Catálogo en USD",
  description: "Catálogo de cepas identificadas molecularmente por AS Labs para Ecuador, con búsqueda, cotización en dólares y soporte técnico.",
  keywords: ["comprar cepas Ecuador", "cepas microbiológicas Quito", "cepas identificadas Ecuador", "cultivos microbianos Ecuador"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/cepas" },
  openGraph: {
    title: "Cepas Identificadas AS Labs | Ecuador",
    description: "Cepas identificadas molecularmente con precios referenciales en USD.",
    url: "https://aslaboratorios.com/ecuador/cepas",
    locale: "es_EC",
    images: [{ url: "/lab-header-bg.jpg", width: 1200, height: 630, alt: "Catálogo microbiológico de AS Labs" }],
  },
}

export default function CepasEcuadorPage() {
  return <CepasEcuadorClient />
}
