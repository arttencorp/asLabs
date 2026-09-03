import type { Metadata } from "next"
import ExcellentClient from "./excellent-client"

const url = "https://aslaboratorios.com/excellent"

export const metadata: Metadata = {
  title: "exCELLlent | Análisis Moleculares en Perú",
  description:
    "exCELLlent es la marca de AS Laboratorios especializada en análisis moleculares: PCR, qPCR, RT-PCR, secuenciación, genética vegetal y soporte para investigación.",
  keywords: [
    "análisis moleculares Perú", "PCR Trujillo", "qPCR Perú", "RT-PCR Perú",
    "secuenciación Sanger Perú", "identificación molecular de bacterias",
    "identificación molecular de hongos", "análisis 16S rRNA", "análisis ITS",
    "diagnóstico molecular de fitopatógenos", "genética vegetal Perú",
    "biología molecular Trujillo", "exCELLlent AS Laboratorios",
  ],
  alternates: { canonical: url, languages: { "es-PE": url } },
  openGraph: {
    type: "website", locale: "es_PE", url, siteName: "AS Laboratorios",
    title: "exCELLlent | Precisión molecular para decisiones que importan",
    description: "Soluciones de análisis molecular para agricultura, microbiología, ambiente, alimentos e investigación.",
    images: [{ url: "/images/excellent-logo.png", width: 638, height: 156, alt: "exCELLlent, análisis moleculares de AS Laboratorios" }],
  },
  twitter: {
    card: "summary_large_image", title: "exCELLlent | Análisis Moleculares",
    description: "PCR, qPCR, secuenciación e identificación molecular con acompañamiento técnico.",
    images: ["/images/excellent-logo.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "Análisis molecular y biotecnología",
}

const structuredData = {
  "@context": "https://schema.org", "@type": "Service",
  name: "exCELLlent — Análisis Moleculares",
  description: "Servicios de análisis molecular para agricultura, microbiología, ambiente, alimentos e investigación.",
  provider: { "@type": "Organization", name: "AS Laboratorios Control Biológico S.A.C.", url: "https://aslaboratorios.com" },
  areaServed: { "@type": "Country", name: "Perú" },
  serviceType: ["PCR y qPCR", "RT-PCR", "Identificación molecular", "Secuenciación Sanger", "Genética vegetal", "Bioinformática"],
  url,
}

export default function ExcellentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ExcellentClient />
    </>
  )
}
