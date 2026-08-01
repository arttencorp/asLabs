import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import StudentHero from "@/components/solucion/student-hero"
import StudentServices from "@/components/solucion/student-services"
import StudentMaterials from "@/components/solucion/student-materials"
import StudentBenefits from "@/components/solucion/student-benefits"
import StudentDelivery from "@/components/solucion/student-delivery"
import StudentTestimonials from "@/components/solucion/student-testimonials"
import StudentContact from "@/components/solucion/student-contact"

export const metadata: Metadata = constructMetadata({
  title: "Soluciones para Estudiantes",
  description:
    "Materiales, kits y servicios especializados para estudiantes universitarios de biología, biotecnología y ciencias afines.",
  keywords: [
    "soluciones estudiantes",
    "kits de laboratorio",
    "materiales biología",
    "reactivos",
    "equipos",
    "universidad",
  ],
  path: "/solucion-estudiantes",
  image: "/student-solution-hero.png",
})

export default function SolucionEstudiantesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <StudentHero />
      <StudentServices />
      <StudentMaterials />
      <StudentBenefits />
      <StudentDelivery />
      <StudentTestimonials />
      <StudentContact />
      <Footer />
    </div>
  )
}
