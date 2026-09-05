import type { Metadata } from "next"
import CepasEcuadorClient from "./cepas-ecuador-client"

export const metadata: Metadata = {
  title: "Cepas Identificadas y ATCC en Ecuador | Catálogo en USD",
  description: "Catálogo de cepas identificadas por AS Labs y cepas de referencia ATCC para Ecuador, con búsqueda, cotización en dólares y soporte técnico.",
  keywords: ["cepas ATCC Ecuador", "comprar cepas Ecuador", "cepas microbiológicas Quito", "cepas identificadas Ecuador", "cultivos de referencia Ecuador"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/cepas" },
  openGraph: {
    title: "Catálogo de Cepas AS Labs | Ecuador",
    description: "Cepas identificadas y referencias ATCC con precios referenciales en USD.",
    url: "https://aslaboratorios.com/ecuador/cepas",
    locale: "es_EC",
    images: [{ url: "/lab-header-bg.jpg", width: 1200, height: 630, alt: "Catálogo microbiológico de AS Labs" }],
  },
}

export default function CepasEcuadorPage() {
  return <CepasEcuadorClient />
}
