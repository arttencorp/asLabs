import type { Metadata } from "next"
import FitopatologiaClient from "./fitopatologia-client"
import {
  ServiceStructuredData,
  BreadcrumbStructuredData,
  ItemListStructuredData,
  ProfessionalServiceStructuredData,
  LocalBusinessStructuredData,
} from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Fitopatología en Trujillo Perú | Detección Patógenos, Análisis Suelos Agrícolas | AS Laboratorios",
  description:
    "Laboratorio de fitopatología en Trujillo, La Libertad, Perú. Detección de patógenos en plantas, análisis de suelos agrícolas, pruebas de susceptibilidad, hongos y bacterias fitopatógenas. Diagnóstico fitosanitario certificado. Cotiza: +51 961 996 645.",
  keywords: [
    // Keywords geográficas principales
    "fitopatología Trujillo",
    "fitopatología La Libertad",
    "fitopatología Perú",
    "laboratorio fitopatología Trujillo",
    "análisis fitopatológico Trujillo",
    // Keywords de servicios
    "detección patógenos plantas Trujillo",
    "detección patógenos plantas Perú",
    "análisis suelos agrícolas Trujillo",
    "análisis suelos agrícolas La Libertad",
    "análisis suelos Perú",
    "prueba susceptibilidad plantas",
    "prueba susceptibilidad fitopatógenos",
    // Keywords de patógenos
    "hongos fitopatógenos Trujillo",
    "bacterias fitopatógenas Perú",
    "enfermedades plantas Trujillo",
    "enfermedades cultivos La Libertad",
    "patógenos vegetales Perú",
    // Keywords long-tail
    "diagnóstico fitosanitario Trujillo",
    "diagnóstico fitosanitario certificado",
    "laboratorio agrícola Trujillo",
    "laboratorio agrícola La Libertad",
    "sanidad vegetal Trujillo",
    "sanidad vegetal Perú",
    "microbiología agrícola Trujillo",
    "control fitosanitario La Libertad",
    // Keywords de negocio
    "AS Laboratorios fitopatología",
    "mejor laboratorio fitopatología Trujillo",
    "laboratorio certificado fitosanitario",
    "análisis plantas Perú",
  ],
  alternates: {
    canonical: "https://aslaboratorios.com/servicios/fitopatologia",
    languages: {
      "es-PE": "https://aslaboratorios.com/servicios/fitopatologia",
    },
  },
  openGraph: {
    title: "Servicios de Fitopatología en Trujillo, Perú | AS Laboratorios",
    description:
      "Laboratorio líder en fitopatología en Trujillo, La Libertad. Detección de patógenos, análisis de suelos agrícolas y diagnóstico fitosanitario certificado para agricultura peruana.",
    url: "https://aslaboratorios.com/servicios/fitopatologia",
    siteName: "AS Laboratorios",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/image.png",
        width: 1200,
        height: 630,
        alt: "Servicios de Fitopatología - AS Laboratorios Trujillo Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitopatología en Trujillo | AS Laboratorios Perú",
    description:
      "Detección de patógenos, análisis de suelos y diagnóstico fitosanitario certificado. Laboratorio especializado en Trujillo, La Libertad.",
    images: ["/images/image.png"],
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
  category: "Fitopatología y Diagnóstico Fitosanitario",
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Fitopatología AS Laboratorios Trujillo",
    "DC.subject": "Fitopatología, Patógenos Plantas, Análisis Suelos, Trujillo, Perú",
    "revisit-after": "7 days",
  },
}

const fitopatologiaServices = [
  {
    name: "Detección de Patógenos en Muestras Vegetales",
    description:
      "Análisis microbiológico para identificar bacterias, hongos y virus fitopatógenos en tejidos vegetales. Servicio en Trujillo, La Libertad.",
    position: 1,
  },
  {
    name: "Prueba de Susceptibilidad",
    description:
      "Evaluación de la sensibilidad de microorganismos fitopatógenos frente a agentes antimicrobianos y fungicidas. Laboratorio certificado Trujillo.",
    position: 2,
  },
  {
    name: "Suspensión de Bacterias y Hongos Fitopatógenos",
    description:
      "Preparación de inóculos estandarizados de microorganismos fitopatógenos para investigación y pruebas de patogenicidad en Perú.",
    position: 3,
  },
  {
    name: "Análisis de Suelos Agrícolas",
    description:
      "Evaluación completa de la microbiota del suelo agrícola en La Libertad. Identificación de patógenos y microorganismos benéficos.",
    position: 4,
  },
  {
    name: "Presencia de Bacterias en Suelo",
    description:
      "Detección y cuantificación de bacterias patógenas en muestras de suelo agrícola de Trujillo y norte del Perú.",
    position: 5,
  },
  {
    name: "Presencia de Hongos en Suelo",
    description:
      "Identificación de hongos fitopatógenos en suelos de cultivo para prevenir enfermedades radiculares en La Libertad.",
    position: 6,
  },
]

export default function FitopatologiaPage() {
  return (
    <>
      <LocalBusinessStructuredData />
      <ServiceStructuredData
        serviceName="Servicios de Fitopatología en Trujillo"
        serviceDescription="Laboratorio especializado en fitopatología en Trujillo, La Libertad, Perú: detección de patógenos en plantas, análisis de suelos agrícolas, pruebas de susceptibilidad y diagnóstico fitosanitario certificado para agricultura."
        serviceUrl="https://aslaboratorios.com/servicios/fitopatologia"
        serviceType="Fitopatología y Diagnóstico Fitosanitario"
        serviceArea={["La Libertad", "Lambayeque", "Piura", "Cajamarca", "Ancash", "Lima"]}
        offers={fitopatologiaServices.map((s) => ({ name: s.name, description: s.description }))}
        image="/images/image.png"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Servicios", url: "https://aslaboratorios.com/servicios" },
          { name: "Fitopatología Trujillo", url: "https://aslaboratorios.com/servicios/fitopatologia" },
        ]}
      />
      <ItemListStructuredData
        listName="Servicios de Fitopatología AS Laboratorios Trujillo"
        listUrl="https://aslaboratorios.com/servicios/fitopatologia"
        items={fitopatologiaServices}
      />
      <ProfessionalServiceStructuredData
        serviceName="Fitopatología Trujillo"
        description="Laboratorio de fitopatología certificado en Trujillo, La Libertad, Perú. Detección de patógenos en plantas, análisis de suelos agrícolas y diagnóstico fitosanitario."
        url="https://aslaboratorios.com/servicios/fitopatologia"
        priceRange="$$"
        image="/images/image.png"
      />
      <FitopatologiaClient />
    </>
  )
}
