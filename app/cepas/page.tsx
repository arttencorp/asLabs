import type { Metadata } from "next"
import CepasClient from "./cepas-client"

export const metadata: Metadata = {
  title: "Cepas Biológicas | AS Laboratorios",
  description: "Venta de cepas bacterianas y biológicas para control biológico y mejora agrícola",
}

export default function CepasPage() {
  return <CepasClient />
}
