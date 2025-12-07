import type { Metadata } from "next"
import MedioAmbienteClient from "./medio-ambiente-client"
import {
  ServiceStructuredData,
  BreadcrumbStructuredData,
  ItemListStructuredData,
  ProfessionalServiceStructuredData,
  LocalBusinessStructuredData,
} from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Análisis Ambiental en Trujillo Perú | Análisis de Agua, Coliformes, E. coli | AS Laboratorios",
  description:
    "Laboratorio de análisis ambiental en Trujillo, La Libertad, Perú. Análisis microbiológico de agua, coliformes totales y fecales, E. coli, aerobios mesófilos, enterobacterias, pH. Certificado para industria alimentaria. Cotiza: +51 961 996 645.",
  keywords: [
    // Keywords geográficas principales
    "análisis ambiental Trujillo",
    "análisis ambiental La Libertad",
    "análisis ambiental Perú",
    "laboratorio ambiental Trujillo",
    // Keywords de agua
    "análisis de agua Trujillo",
    "análisis de agua Perú",
    "análisis microbiológico agua Trujillo",
    "análisis agua potable Trujillo",
    "calidad de agua Trujillo",
    "análisis bacteriológico agua La Libertad",
    // Keywords de microorganismos
    "coliformes totales Trujillo",
    "coliformes fecales Perú",
    "detección E. coli Trujillo",
    "Escherichia coli análisis",
    "aerobios mesófilos Trujillo",
    "enterobacterias análisis",
    // Keywords de servicios
    "recuento bacteriano Trujillo",
    "análisis superficies Trujillo",
    "control microbiológico La Libertad",
    "medición pH laboratorio",
    "sensibilidad desinfectante",
    "cámara Neubauer",
    // Keywords long-tail
    "laboratorio análisis agua certificado Trujillo",
    "monitoreo ambiental La Libertad",
    "análisis microbiológico industrial Perú",
    "certificación sanitaria agua",
    "AS Laboratorios análisis ambiental",
  ],
  alternates: {
    canonical: "https://aslaboratorios.com/servicios/medio-ambiente",
    languages: {
      "es-PE": "https://aslaboratorios.com/servicios/medio-ambiente",
    },
  },
  openGraph: {
    title: "Análisis Microbiológico Ambiental en Trujillo, Perú | AS Laboratorios",
    description:
      "Control de calidad microbiológica de agua, superficies y ambientes en Trujillo, La Libertad. Recuento bacteriano, detección de coliformes y E. coli certificado.",
    url: "https://aslaboratorios.com/servicios/medio-ambiente",
    siteName: "AS Laboratorios",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/servicios/image.png",
        width: 1200,
        height: 630,
        alt: "Análisis Microbiológico Ambiental - AS Laboratorios Trujillo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Análisis Ambiental en Trujillo | AS Laboratorios Perú",
    description:
      "Control de calidad microbiológica certificado. Análisis de agua, superficies y ambientes en Trujillo, La Libertad.",
    images: ["/servicios/image.png"],
    creator: "@aslaboratorios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Análisis Microbiológico Ambiental",
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Análisis Ambiental AS Laboratorios Trujillo",
    "DC.subject": "Análisis Agua, Coliformes, E. coli, Aerobios Mesófilos, Trujillo, Perú",
    "revisit-after": "7 days",
  },
}

const medioAmbienteServices = [
  {
    name: "Recuento Aerobios Mesófilos",
    description:
      "Cuantificación de microorganismos aerobios mesófilos en muestras de agua, alimentos y superficies en Trujillo, La Libertad.",
    position: 1,
  },
  {
    name: "Coliformes Totales/Fecales",
    description:
      "Detección y recuento de coliformes totales y fecales como indicadores de contaminación fecal en agua y alimentos. Laboratorio certificado Trujillo.",
    position: 2,
  },
  {
    name: "Detección de Escherichia coli",
    description:
      "Identificación específica de E. coli en muestras ambientales y alimentarias. Análisis certificado en Perú.",
    position: 3,
  },
  {
    name: "Recuento de Enterobacterias",
    description:
      "Cuantificación de enterobacterias como indicadores de higiene y calidad microbiológica en La Libertad.",
    position: 4,
  },
  {
    name: "Medición de pH",
    description:
      "Determinación precisa del pH en muestras de agua, suelos y productos para control de calidad en Trujillo.",
    position: 5,
  },
  {
    name: "Sensibilidad Desinfectante",
    description:
      "Evaluación de eficacia de desinfectantes contra microorganismos específicos en laboratorio certificado.",
    position: 6,
  },
  {
    name: "Recuento Cámara Neubauer",
    description:
      "Conteo celular preciso utilizando cámara de Neubauer para cuantificación de células y microorganismos.",
    position: 7,
  },
]

export default function MedioAmbientePage() {
  return (
    <>
      <LocalBusinessStructuredData />
      <ServiceStructuredData
        serviceName="Análisis Microbiológico Ambiental en Trujillo"
        serviceDescription="Laboratorio especializado en análisis microbiológico ambiental en Trujillo, La Libertad, Perú: control de calidad de agua, superficies y ambientes. Detección de coliformes, E. coli y enterobacterias certificado."
        serviceUrl="https://aslaboratorios.com/servicios/medio-ambiente"
        serviceType="Análisis Microbiológico Ambiental"
        serviceArea={["La Libertad", "Lambayeque", "Piura", "Cajamarca", "Ancash", "Lima"]}
        offers={medioAmbienteServices.map((s) => ({ name: s.name, description: s.description }))}
        image="/servicios/image.png"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Servicios", url: "https://aslaboratorios.com/servicios" },
          { name: "Análisis Ambiental Trujillo", url: "https://aslaboratorios.com/servicios/medio-ambiente" },
        ]}
      />
      <ItemListStructuredData
        listName="Servicios de Análisis Ambiental AS Laboratorios Trujillo"
        listUrl="https://aslaboratorios.com/servicios/medio-ambiente"
        items={medioAmbienteServices}
      />
      <ProfessionalServiceStructuredData
        serviceName="Análisis Ambiental Trujillo"
        description="Laboratorio de análisis microbiológico ambiental certificado en Trujillo, La Libertad, Perú. Control de calidad de agua, superficies y ambientes."
        url="https://aslaboratorios.com/servicios/medio-ambiente"
        priceRange="$$"
        image="/servicios/image.png"
      />
      <MedioAmbienteClient />
    </>
  )
}
