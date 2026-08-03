import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import TrabajaConNosotrosClient from "@/components/trabaja-con-nosotros/components/trabaja-con-nosotros-client"

export const metadata: Metadata = {
  title: "Trabaja con Nosotros: Prácticas y Convocatorias | AS Laboratorios",
  description:
    "Conoce las convocatorias de AS Laboratorios en Trujillo para prácticas y oportunidades en microbiología, biología, biotecnología y laboratorio.",
  keywords: [
    "trabajo laboratorio Trujillo",
    "prácticas pre-profesionales Trujillo",
    "practicante microbiología",
    "practicante biología",
    "técnico laboratorio empleo",
    "biotecnología vegetal empleo",
    "AS Laboratorios empleo",
    "convocatoria laboratorio Perú",
    "prácticas biotecnología",
    "empleo microbiología Trujillo",
    "financiamiento tesis Perú",
    "trabajo investigación Trujillo",
  ],
  authors: [{ name: "AS Laboratorios" }],
  openGraph: {
    title: "Trabaja con Nosotros | AS Laboratorios",
    description:
      "Convocatoria abierta para practicantes en Microbiología, Biología y Técnicos en Laboratorio. Únete a nuestro equipo de investigación en biotecnología vegetal.",
    url: "https://aslaboratorios.com/trabaja-con-nosotros",
    siteName: "AS Laboratorios",
    images: [
      {
        url: "/research/research-lab.png",
        width: 1200,
        height: 630,
        alt: "Trabaja con AS Laboratorios - Convocatoria Prácticas Pre-Profesionales",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trabaja con Nosotros | AS Laboratorios",
    description:
      "Convocatoria abierta para practicantes en Microbiología, Biología y Técnicos en Laboratorio. Únete a nuestro equipo.",
    images: ["/research/research-lab.png"],
  },
  alternates: {
    canonical: "https://aslaboratorios.com/trabaja-con-nosotros",
  },
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo, La Libertad, Perú",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
  },
}

export default function TrabajaConNosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Trabaja con nosotros | AS Laboratorios",
            description:
              "Convocatorias, prácticas y oportunidades para desarrollar ciencia y biotecnología en AS Laboratorios.",
            url: "https://aslaboratorios.com/trabaja-con-nosotros",
            isPartOf: {
              "@type": "WebSite",
              name: "AS Laboratorios",
              url: "https://aslaboratorios.com",
            },
            about: {
              "@type": "Organization",
              name: "AS Laboratorios",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar overlay />
      <TrabajaConNosotrosClient />
      <Footer />
    </>
  )
}
