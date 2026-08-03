import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import GeneticaClient from "./genetica-client"

export const metadata: Metadata = constructMetadata({
  title: "Genética Molecular Aplicada a la Agricultura",
  description:
    "Conoce conceptos de genética molecular, PCR, plásmidos e ingeniería genética aplicados a la biotecnología y la investigación agrícola.",
  keywords: ["genética molecular", "PCR", "ingeniería genética", "plásmidos", "biotecnología agrícola", "investigación genética Perú"],
  path: "/genetica",
})

export default function GeneticaPage() {
  return <GeneticaClient />
}
