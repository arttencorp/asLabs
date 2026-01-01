import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutUsHeader from "@/components/about-us/about-us-header"
import AboutUsStats from "@/components/about-us/about-us-stats"
import AboutUsImpact from "@/components/about-us/about-us-impact"
import AboutUsFramework from "@/components/about-us/about-us-framework"
import AboutUsValues from "@/components/about-us/about-us-values"
import AboutUsMindsets from "@/components/about-us/about-us-mindsets"
import AboutUsHeadquarters from "@/components/about-us/about-us-headquarters"
import AboutUsTeam from "@/components/about-us/about-us-team"

export const metadata: Metadata = constructMetadata({
  title: "Sobre Nosotros",
  description:
    "Conozca más sobre AS Laboratorios, nuestra misión, valores y el impacto que generamos en la biotecnología y el medio ambiente.",
  keywords: ["sobre nosotros", "misión", "valores", "impacto", "biotecnología", "AS Laboratorios"],
  path: "/sobre-nosotros",
  image: "/about-us-preview.png",
})

export default function SobreNosotros() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AboutUsHeader />
      <AboutUsTeam />
      <AboutUsStats />
      <AboutUsImpact />
      <AboutUsFramework />
      <AboutUsValues />
      <AboutUsMindsets />
      <AboutUsHeadquarters />
      <Footer />
    </div>
  )
}
