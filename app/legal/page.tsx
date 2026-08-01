import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LegalHeader from "@/components/legal/legal-header"
import LegalTerms from "@/components/legal/legal-terms"
import LegalPrivacy from "@/components/legal/legal-privacy"
import LegalCookies from "@/components/legal/legal-cookies"
import LegalIntellectual from "@/components/legal/legal-intellectual"

export const metadata: Metadata = constructMetadata({
  title: "Información Legal",
  description:
    "Términos y condiciones, política de privacidad, política de cookies y propiedad intelectual de AS Laboratorios.",
  keywords: ["legal", "términos y condiciones", "privacidad", "cookies", "propiedad intelectual"],
  path: "/legal",
})

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <LegalHeader />
      <LegalTerms />
      <LegalPrivacy />
      <LegalCookies />
      <LegalIntellectual />
      <Footer />
    </div>
  )
}
