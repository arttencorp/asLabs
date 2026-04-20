import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHeader from "@/components/about-us/about-header"
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
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="about-nosotros-font">
        <AboutHeader />
        <AboutMission />
        <AboutOrganigram />
        <AboutValues />
        <AboutImpact />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  )
}

export default SobreNosotrosPage