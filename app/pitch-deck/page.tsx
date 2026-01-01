import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PitchHero from "@/components/pitch/pitch-hero"
import PitchProblem from "@/components/pitch/pitch-problem"
import PitchSolution from "@/components/pitch/pitch-solution"
import PitchMarket from "@/components/pitch/pitch-market"
import PitchProduct from "@/components/pitch/pitch-product"
import PitchBusiness from "@/components/pitch/pitch-business"
import PitchCompetition from "@/components/pitch/pitch-competition"
import PitchTeam from "@/components/pitch/pitch-team"
import PitchTraction from "@/components/pitch/pitch-traction"
import PitchVision from "@/components/pitch/pitch-vision"
import PitchInvestment from "@/components/pitch/pitch-investment"
import PitchContact from "@/components/pitch/pitch-contact"

export const metadata: Metadata = constructMetadata({
  title: "Pitch Deck",
  description:
    "Presentación de AS Laboratorios para inversores: problema, solución, mercado, producto, modelo de negocio y equipo.",
  keywords: ["pitch deck", "inversores", "startup", "biotecnología", "modelo de negocio", "equipo"],
  path: "/pitch-deck",
  image: "/pitch-hero.png",
})

export default function PitchDeckPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PitchHero />
      <PitchProblem />
      <PitchSolution />
      <PitchMarket />
      <PitchProduct />
      <PitchBusiness />
      <PitchCompetition />
      <PitchTeam />
      <PitchTraction />
      <PitchVision />
      <PitchInvestment />
      <PitchContact />
      <Footer />
    </div>
  )
}
