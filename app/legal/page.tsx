import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LegalExperience from "@/components/legal/legal-experience"

export const metadata: Metadata = constructMetadata({
  title: "Centro Legal: Términos, Privacidad y Cookies",
  description:
    "Consulta los términos de uso, política de privacidad, cookies, almacenamiento local y propiedad intelectual de AS Laboratorios en Perú.",
  keywords: ["legal AS Laboratorios", "términos y condiciones", "privacidad Perú", "Ley 29733", "cookies", "propiedad intelectual"],
  path: "/legal",
})

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar overlay />
      <LegalExperience />
      <Footer />
    </div>
  )
}
