import type { Metadata } from "next"
import GeneticaClient from "./genetica-client"

export const metadata: Metadata = {
  title: "Genética Molecular | AS Laboratorios",
  description:
    "Descubre los fundamentos de la genética molecular: inserción de genes, plásmidos, PCR, Taq polimerasa y biotecnología aplicada en agricultura.",
  keywords:
    "genética molecular, plásmidos, PCR, Taq polimerasa, inserción de genes, biotecnología, ingeniería genética",
}

export default function GeneticaPage() {
  return <GeneticaClient />
}
