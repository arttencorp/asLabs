import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PitchDeckExperience from "@/components/pitch/pitch-deck-experience"

export const metadata: Metadata = constructMetadata({
  title: "Pitch de Innovación: Fondos y Concursos Financiados",
  description:
    "Presentación institucional de AS Laboratorios para fondos concursables, cofinanciamiento no reembolsable, innovación agrícola e investigación aplicada.",
  keywords: ["pitch deck innovación", "fondos concursables Perú", "cofinanciamiento no reembolsable", "ProInnóvate", "innovación agrícola", "biotecnología", "investigación aplicada"],
  path: "/pitch-deck",
  image: "/new/bannerasnuevo.webp",
})

export default function PitchDeckPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar overlay />
      <PitchDeckExperience />
      <Footer />
    </div>
  )
}
