import type { Metadata } from "next"
import EcuadorClient from "./ecuador-client"

export const metadata: Metadata = {
  title: "AS Labs Ecuador | Biología Molecular y Formulaciones Bacterianas en Quito",
  description: "Nueva sede de AS Labs en Quito, Ecuador. Servicios especializados de biología molecular, PCR, secuenciación y formulaciones bacterianas.",
  keywords: ["laboratorio biología molecular Quito", "PCR Ecuador", "secuenciación Ecuador", "formulaciones bacterianas Quito", "AS Labs Ecuador", "análisis moleculares Ecuador"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador", languages: { "es-EC": "https://aslaboratorios.com/ecuador", "es-PE": "https://aslaboratorios.com" } },
  openGraph: { type: "website", locale: "es_EC", url: "https://aslaboratorios.com/ecuador", siteName: "AS Labs Ecuador", title: "AS Labs Ecuador | Ciencia molecular en Quito", description: "Biología molecular y formulaciones bacterianas desde nuestra nueva sede en Quito.", images: [{ url: "/research/research-lab.png", width: 1200, height: 630, alt: "AS Labs Ecuador en Quito" }] },
  robots: { index: true, follow: true },
  other: { "geo.region": "EC-P", "geo.placename": "Quito", "geo.position": "-0.1807;-78.4678", ICBM: "-0.1807, -78.4678" },
}

export default function EcuadorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AS Labs Ecuador",
    url: "https://aslaboratorios.com/ecuador",
    image: "https://aslaboratorios.com/research/research-lab.png",
    description: "Servicios de biología molecular y formulaciones bacterianas en Quito, Ecuador.",
    address: { "@type": "PostalAddress", streetAddress: "Andrade Marin 24, Edificio Carolina Millenium", postalCode: "170518", addressLocality: "Quito", addressCountry: "EC" },
    areaServed: { "@type": "Country", name: "Ecuador" },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Servicios AS Labs Ecuador", itemListElement: [{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Biología molecular" } }, { "@type": "Offer", itemOffered: { "@type": "Service", name: "Formulaciones bacterianas" } }] },
  }

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><EcuadorClient /></>
}
