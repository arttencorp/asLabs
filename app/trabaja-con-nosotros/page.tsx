import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import TrabajaConNosotrosClient from "@/components/trabaja-con-nosotros/components/trabaja-con-nosotros-client"

export const metadata: Metadata = {
  title: "Trabaja con Nosotros | Convocatoria Prácticas Pre-Profesionales | AS Laboratorios",
  description:
    "Únete a AS Laboratorios en Trujillo, Perú. Buscamos practicantes en Microbiología, Biología y Técnicos en Laboratorio. Trabaja en biotecnología vegetal, embriogénesis y detección de patógenos. Posibilidad de financiamiento de tesis.",
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
        url: "/images/trabaja-con-nosotros-preview.png",
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
    images: ["/images/trabaja-con-nosotros-preview.png"],
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
      <Navbar />
      <TrabajaConNosotrosClient />
      <Footer />
    </>
  )
}
