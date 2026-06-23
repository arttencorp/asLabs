import type { Metadata } from "next"
import IdentificadasClient from "./identificadas-client"

export const metadata: Metadata = {
  title: "Cepas Identificadas | AS Laboratorios",
  description: "Catálogo de cepas bacterianas identificadas cultivadas en AS Laboratorios",
}

export default function CepasIdentificadasPage() {
  return <IdentificadasClient />
}
