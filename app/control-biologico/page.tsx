import type { Metadata } from "next"
import { ControlBiologicoClient } from "./control-biologico-client"
import {
  ServiceStructuredData,
  BreadcrumbStructuredData,
  ProfessionalServiceStructuredData,
  ControlBiologicoStructuredData,
  AgricultureServiceStructuredData,
  LocalBusinessStructuredData,
} from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Control Biológico en Trujillo Perú | Billaea claripalpis, Trichogramma sp | AS Laboratorios",
  description:
    "Control biológico de plagas en Trujillo, La Libertad, Perú. Billaea claripalpis para Diatraea saccharalis en caña de azúcar, Trichogramma sp para cultivos. Asesoría técnica a agricultores. Soluciones sostenibles. Cotiza: +51 961 996 645.",
  keywords: [
    // Keywords principales geográficas
    "control biológico Trujillo",
    "control biológico La Libertad",
    "control biológico Perú",
    "control de plagas biológico Trujillo",
    // Keywords de productos
    "Billaea claripalpis",
    "Billaea claripalpis Perú",
    "Billaea claripalpis Trujillo",
    "Billaea claripalpis caña de azúcar",
    "Trichogramma sp",
    "Trichogramma sp Perú",
    "Trichogramma Trujillo",
    "controladores biológicos Perú",
    "controladores biológicos Trujillo",
    // Keywords de plagas
    "control Diatraea saccharalis",
    "barrenador caña de azúcar control",
    "plagas caña de azúcar Perú",
    "control plagas caña La Libertad",
    // Keywords de servicio
    "asesoría agricultores Trujillo",
    "asesoría agrícola La Libertad",
    "manejo integrado de plagas Perú",
    "MIP agricultura Trujillo",
    "agricultura sostenible Trujillo",
    "agricultura sostenible Perú",
    // Keywords long-tail
    "venta controladores biológicos Trujillo",
    "productor Billaea claripalpis",
    "mosca parasitoide caña azúcar",
    "control biológico barrenador",
    "AS Laboratorios control biológico",
    "laboratorio control biológico Trujillo",
  ],
  alternates: {
    canonical: "https://aslaboratorios.com/control-biologico",
    languages: {
      "es-PE": "https://aslaboratorios.com/control-biologico",
    },
  },
  openGraph: {
    title: "Control Biológico - Billaea claripalpis y Trichogramma sp | AS Laboratorios Trujillo",
    description:
      "Controladores biológicos y asesoría para agricultores en Trujillo, La Libertad. Billaea claripalpis para control de Diatraea en caña de azúcar, Trichogramma sp y soluciones para agricultura sostenible.",
    url: "https://aslaboratorios.com/control-biologico",
    siteName: "AS Laboratorios",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://aslaboratorios.com/aslabs-logo.png",
        width: 1200,
        height: 630,
        alt: "Control Biológico AS Laboratorios Trujillo - Billaea claripalpis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Control Biológico en Trujillo | Billaea claripalpis | AS Laboratorios",
    description:
      "Controladores biológicos: Billaea claripalpis, Trichogramma sp. Asesoría a agricultores. Agricultura sostenible en La Libertad, Perú.",
    images: ["https://aslaboratorios.com/aslabs-logo.png"],
    creator: "@aslaboratorios",
    site: "@aslaboratorios",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Control Biológico y Agricultura Sostenible",
  authors: [{ name: "AS Laboratorios", url: "https://aslaboratorios.com" }],
  creator: "AS Laboratorios",
  publisher: "AS Laboratorios",
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Control Biológico AS Laboratorios Trujillo",
    "DC.creator": "AS Laboratorios",
    "DC.subject": "Control Biológico, Billaea claripalpis, Trichogramma, Agricultura Sostenible, Trujillo, Perú",
    "DC.description": "Control biológico de plagas y asesoría agrícola en Trujillo, Perú",
    "DC.publisher": "AS Laboratorios",
    "DC.language": "es-PE",
    "revisit-after": "7 days",
  },
}

export default function ControlBiologicoPage() {
  return (
    <>
      <LocalBusinessStructuredData />
      <ControlBiologicoStructuredData />
      <ServiceStructuredData
        serviceName="Control Biológico de Plagas - AS Laboratorios Trujillo"
        serviceDescription="Servicio de control biológico de plagas en Trujillo, La Libertad, Perú. Producción y venta de Billaea claripalpis para control de Diatraea saccharalis en caña de azúcar, Trichogramma sp para diversos cultivos. Asesoría técnica a agricultores para manejo integrado de plagas y agricultura sostenible."
        serviceUrl="https://aslaboratorios.com/control-biologico"
        serviceType="Control Biológico y Asesoría Agrícola"
        serviceArea={["La Libertad", "Lambayeque", "Piura", "Cajamarca", "Ancash", "Lima"]}
        offers={[
          {
            name: "Billaea claripalpis",
            description: "Controlador biológico de Diatraea saccharalis en caña de azúcar",
          },
          { name: "Trichogramma sp", description: "Avispa parasitoide para control de huevos de lepidópteros plaga" },
          {
            name: "Asesoría a Agricultores",
            description: "Diagnóstico fitosanitario y plan de manejo integrado de plagas",
          },
          { name: "Capacitación Técnica", description: "Formación en control biológico y buenas prácticas agrícolas" },
        ]}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Control Biológico", url: "https://aslaboratorios.com/control-biologico" },
        ]}
      />
      <ProfessionalServiceStructuredData
        serviceName="Control Biológico de Plagas"
        description="Laboratorio especializado en control biológico de plagas en Trujillo, Perú. Producción de Billaea claripalpis y Trichogramma sp. Asesoría técnica a agricultores de caña de azúcar y otros cultivos."
        url="https://aslaboratorios.com/control-biologico"
        priceRange="$$"
      />
      <AgricultureServiceStructuredData
        serviceName="Asesoría Agrícola y Control Biológico"
        description="Servicio de asesoría a agricultores y control biológico de plagas en Trujillo, La Libertad, Perú"
        url="https://aslaboratorios.com/control-biologico"
      />
      <ControlBiologicoClient />
    </>
  )
}
