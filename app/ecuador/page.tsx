import type { Metadata } from "next"
import EcuadorClient from "./ecuador-client"
import { EcuadorLocalBusinessStructuredData, OrganizationStructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Laboratorio de Biología Molecular en Ecuador | AS Labs Quito",
  description: "Servicios de biología molecular, PCR, secuenciamiento, formulaciones bacterianas, cepas y plantines in vitro para clientes de Quito y todo Ecuador.",
  keywords: ["laboratorio biología molecular Ecuador", "laboratorio biología molecular Quito", "PCR Ecuador", "secuenciamiento Ecuador", "análisis molecular Ecuador", "formulaciones bacterianas Ecuador", "plantines in vitro Ecuador", "cepas bacterianas Ecuador", "AS Labs Quito"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador", languages: { "es-EC": "https://aslaboratorios.com/ecuador", "es-PE": "https://aslaboratorios.com/", "x-default": "https://aslaboratorios.com/" } },
  openGraph: { type: "website", locale: "es_EC", url: "https://aslaboratorios.com/ecuador", siteName: "AS Laboratorios", title: "Laboratorio de Biología Molecular en Ecuador | AS Labs", description: "PCR, secuenciamiento, formulaciones bacterianas, cepas y plantines in vitro para Ecuador.", images: [{ url: "/ecuador/carolina-millenium.jpg", width: 1200, height: 1200, alt: "Sede de AS Labs Ecuador en Quito" }] },
  twitter: { card: "summary_large_image", title: "Laboratorio de Biología Molecular en Ecuador | AS Labs", description: "Servicios científicos y biotecnológicos para Quito y todo Ecuador.", images: ["/ecuador/carolina-millenium.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  other: { "content-language": "es-EC", "geo.region": "EC-P", "geo.placename": "Quito", "geo.position": "-0.1807;-78.4678", ICBM: "-0.1807, -78.4678" },
}

export default function EcuadorPage() {
  return <><OrganizationStructuredData /><EcuadorLocalBusinessStructuredData /><EcuadorClient /></>
}
