
import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHeader from "@/components/about-us/about-header"
import AboutNavigation from "@/components/about-us/about-navigation"
import AboutMission from "@/components/about-us/about-mission"
import AboutSites from "@/components/about-us/about-sites"
import AboutValues from "@/components/about-us/about-values"
import AboutOrganigram from "@/components/about-us/about-organigram"
import AboutISO from "@/components/about-us/about-iso"
import AboutCTA from "@/components/about-us/about-cta"

export const metadata: Metadata = constructMetadata({
  title: "Sobre AS Laboratorios | Historia, Sedes y Liderazgo",
  description:
    "Conoce la historia de AS Laboratorios desde 1997, sus sedes en Trujillo y Quito, misión, visión, liderazgo y capacidades científicas y productivas.",
  keywords: ["AS Laboratorios", "biotecnología agrícola Trujillo", "laboratorio peruano", "control biológico", "investigación agrícola", "directorio AS Labs"],
  path: "/sobre-nosotros",
  image: "/about-us-preview.png",
  languages: {
    "es-PE": "https://aslaboratorios.com/sobre-nosotros",
    "es-EC": "https://aslaboratorios.com/ecuador/sobre-nosotros",
    "x-default": "https://aslaboratorios.com/sobre-nosotros",
  },
})

function SobreNosotrosContent() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7f4] font-[var(--font-poppins)]">
      <Navbar overlay />
      <AboutHeader />
      <AboutNavigation />
      <AboutMission />
      <AboutSites />
      <AboutOrganigram />
      <AboutISO />
      <AboutValues />
      <AboutCTA />
      <Footer />
    </div>
  )
}

export default SobreNosotrosContent
