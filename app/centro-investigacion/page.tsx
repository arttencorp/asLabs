import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import CentroInvestigacionClient from "./centro-investigacion-client"

export const metadata: Metadata = constructMetadata({
  title: "Centro de Investigación en Biotecnología | AS Laboratorios",
  description:
    "Centro de investigación aplicada de AS Laboratorios: microbiología, biología molecular, genómica, biotecnología vegetal, bioquímica y desarrollo de cepas.",
  path: "/centro-investigacion",
  image: "/research/research-lab.png",
})

export default function CentroInvestigacionPage() {
  return <CentroInvestigacionClient />
}
