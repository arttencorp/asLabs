import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FusariumGenomaClient from "./fusarium-genoma-client"

export const metadata: Metadata = constructMetadata({
  title: "Secuenciación del Genoma de Fusarium oxysporum f. sp. cubense Raza 4",
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
  return (
    <div>
      <Navbar />
      <FusariumGenomaClient />
      <Footer />
    </div>
  )
}
