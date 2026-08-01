import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BiotechHero from "@/components/biotech/biotech-hero"
import BiotechIntro from "@/components/biotech/biotech-intro"
import BiotechProcess from "@/components/biotech/biotech-process"
import BiotechBenefits from "@/components/biotech/biotech-benefits"
import BiotechTechnologies from "@/components/biotech/biotech-technologies"
import BiotechFAQ from "@/components/biotech/biotech-faq"
import { ProductStructuredData } from "@/components/structured-data"

export const metadata: Metadata = constructMetadata({
  title: "Biotecnología Vegetal",
  description:
    "Servicios de biotecnología vegetal, cultivo de tejidos, micropropagación y clonación de plantas para agricultura sostenible.",
  keywords: [
    "biotecnología vegetal",
    "cultivo de tejidos",
    "micropropagación",
    "clonación de plantas",
    "agricultura sostenible",
  ],
  path: "/biotecnologia-vegetal",
  image: "/biotecnologia-preview.png",
})

export default function BiotecnologiaVegetalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProductStructuredData
        name="Servicio de Biotecnología Vegetal"
        description="Servicios de biotecnología vegetal, cultivo de tejidos, micropropagación y clonación de plantas para agricultura sostenible."
        image="https://aslaboratorios.com/biotech-hero.png"
        url="https://aslaboratorios.com/biotecnologia-vegetal"
      />
      <Navbar />
      <BiotechHero />
      <BiotechIntro />
      <BiotechProcess />
      <BiotechBenefits />
      <BiotechTechnologies />
      <BiotechFAQ />
      <Footer />
    </div>
  )
}
