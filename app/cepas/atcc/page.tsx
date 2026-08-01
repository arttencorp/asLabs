import type { Metadata } from "next"
import ATCCClient from "./atcc-client"

export const metadata: Metadata = {
  title: "Cepas ATCC | AS Laboratorios",
  description: "Catálogo de cepas ATCC importadas - Referencia internacional con certificación y trazabilidad",
}

export default function ATCCPage() {
  return <ATCCClient />
}
