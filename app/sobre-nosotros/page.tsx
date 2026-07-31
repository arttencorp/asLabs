
import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHeader from "@/components/about-us/about-header"
import AboutNavigation from "@/components/about-us/about-navigation"
import AboutMission from "@/components/about-us/about-mission"
import AboutValues from "@/components/about-us/about-values"
import AboutOrganigram from "@/components/about-us/about-organigram"
import AboutISO from "@/components/about-us/about-iso"
import AboutImpact from "@/components/about-us/about-impact"
import AboutCTA from "@/components/about-us/about-cta"

export const metadata: Metadata = constructMetadata({
  title: "AS Laboratorios: Biotecnología Agrícola desde 1997",
  description:
    "Conoce la historia, el directorio, la misión y el trabajo de AS Laboratorios en biotecnología agrícola, control biológico e investigación desde 1997.",
  keywords: ["AS Laboratorios", "biotecnología agrícola Trujillo", "laboratorio peruano", "control biológico", "investigación agrícola", "directorio AS Labs"],
  path: "/sobre-nosotros",
  image: "/about-us-preview.png",
})

function SobreNosotrosContent() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar overlay />
      <AboutHeader />
      <AboutNavigation />
      <AboutMission />
      <AboutOrganigram />
      <AboutISO />
      <AboutValues />
      <AboutImpact />
      <AboutCTA />
      <Footer />
    </div>
  )
}

export default SobreNosotrosContent
