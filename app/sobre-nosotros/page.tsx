import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHeader from "@/components/about-us/about-header"
import AboutNavigation from "@/components/about-us/about-navigation"
import AboutMission from "@/components/about-us/about-mission"
import AboutValues from "@/components/about-us/about-values"
import AboutOrganigram from "@/components/about-us/about-organigram"
import AboutImpact from "@/components/about-us/about-impact"
import AboutCTA from "@/components/about-us/about-cta"

export default function SobreNosotrosContent() { 
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <AboutHeader />
      <AboutNavigation />
      <AboutMission />
      <AboutOrganigram />
      <AboutValues />
      <AboutImpact />
      <AboutCTA />
      <Footer />
    </div>
  )
}