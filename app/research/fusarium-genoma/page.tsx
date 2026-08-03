import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import ResearchProjectDetail from "@/components/research/research-project-detail"
import ResearchProjectStructuredData from "@/components/research/research-project-structured-data"
import { researchProjects } from "@/data/research-project-details"

export const metadata: Metadata = constructMetadata({
  title: "Genoma de Fusarium oxysporum Raza 4",
  description:
    "Proyecto de secuenciación completa, ensamblaje y análisis comparativo del genoma del patógeno Fusarium oxysporum f. sp. cubense Raza 4 para identificar genes de virulencia.",
  keywords: [
    "fusarium oxysporum",
    "secuenciación genómica",
    "genoma",
    "patógeno",
    "raza 4",
    "análisis comparativo",
    "genes de virulencia",
    "biotecnología",
    "fitopatología",
  ],
  path: "/research/fusarium-genoma",
})

export default function FusariumGenomaPage() {
  const project = researchProjects["fusarium-genoma"]
  return (
    <>
      <ResearchProjectStructuredData project={project} />
      <ResearchProjectDetail project={project} />
    </>
  )
}
