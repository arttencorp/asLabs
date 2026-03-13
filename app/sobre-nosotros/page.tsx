import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHeader from "@/components/about-us/about-header"
import AboutNavigation from "@/components/about-us/about-navigation"
import AboutMission from "@/components/about-us/about-mission"
import AboutValues from "@/components/about-us/about-values"
import AboutOrganigram from "@/components/about-us/about-organigram"
import AboutImpact from "@/components/about-us/about-impact"
import AboutCTA from "@/components/about-us/about-cta"

export const metadata: Metadata = constructMetadata({
  title: "Sobre Nosotros",
  description:
    "Conozca más sobre AS Laboratorios, nuestra misión, valores y el impacto que generamos en la biotecnología y el medio ambiente.",
  keywords: ["sobre nosotros", "misión", "valores", "impacto", "biotecnología", "AS Laboratorios"],
  path: "/sobre-nosotros",
  image: "/about-us-preview.png",
})

function SobreNosotrosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <AboutHeader />
      <AboutNavigation />
      <AboutMission />
      <AboutValues />
      <AboutOrganigram />
      <AboutImpact />
      <AboutCTA />
      <Footer />
    </div>
  )
}

export default SobreNosotrosPage