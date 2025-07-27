import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import StudentHero from "@/components/students/student-hero"
import StudentMaterialsPopup from "@/components/students/student-materials-popup"
import StudentDiscount from "@/components/students/student-discount"
import StudentFAQ from "@/components/students/student-faq"
import { FAQStructuredData } from "@/components/structured-data"

export const metadata: Metadata = constructMetadata({
  title: "Estudiantes",
  description:
    "Soluciones para estudiantes universitarios de biología, biotecnología y ciencias afines. Materiales, kits y descuentos especiales.",
  keywords: ["estudiantes", "universidad", "biología", "biotecnología", "materiales de laboratorio", "kits educativos"],
  path: "/estudiantes",
  image: "/estudiantes-preview.png",
})

export default function EstudiantesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <FAQStructuredData
        questions={[
          {
            question: "¿Qué materiales ofrecen para estudiantes?",
            answer:
              "Ofrecemos kits de laboratorio, reactivos, medios de cultivo, equipos y materiales educativos especializados para estudiantes de biología y biotecnología.",
          },
          {
            question: "¿Tienen descuentos para estudiantes?",
            answer: "Sí, ofrecemos descuentos especiales para estudiantes universitarios con carnet vigente.",
          },
          {
            question: "¿Realizan envíos a todo el Perú?",
            answer: "Sí, realizamos envíos a todo el Perú con tarifas especiales para estudiantes.",
          },
          {
            question: "¿Cómo puedo solicitar un presupuesto?",
            answer:
              "Puedes contactarnos a través del formulario en nuestra web o escribirnos directamente a info@aslaboratorios.com.",
          },
        ]}
      />
      <Navbar />
      <StudentHero />
      <StudentMaterialsPopup />
      <StudentDiscount />
      <StudentFAQ />
      <Footer />
    </div>
  )
}
