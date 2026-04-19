import type { Metadata } from "next"
import ApoyoInvestigacionClient from "./apoyo-investigacion-client"
import {
  ServiceStructuredData,
  BreadcrumbStructuredData,
  ItemListStructuredData,
  ProfessionalServiceStructuredData,
  LocalBusinessStructuredData,
} from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Apoyo a la Investigación Bacteriológica en Trujillo | Identificación Molecular 16S RNA, Protocolos | AS Laboratorios",
  description:
    "Laboratorio de apoyo a investigación bacteriológica en Trujillo, La Libertad, Perú. Identificación molecular 16S RNA, aislamiento de cepas, formulación de protocolos, análisis bioinformático. Servicios especializados para proyectos científicos. Cotiza: +51 961 996 645.",
  keywords: [
    // Keywords geográficas principales
    "apoyo investigación bacteriología Trujillo",
    "investigación microbiología La Libertad",
    "investigación bacteriología Perú",
    "laboratorio investigación Trujillo",
    // Keywords de servicios principales
    "identificación molecular bacterias",
    "identificación 16S RNA Trujillo",
    "16S RNA secuenciación Perú",
    "identificación bacteriana molecular Trujillo",
    "secuenciación ADN 16S La Libertad",
    // Keywords de aislamiento
    "aislamiento bacterias Trujillo",
    "aislamiento cepas bacterianas Perú",
    "cultivo aislamiento microorganismos",
    "aislamiento bacterias investigación",
    // Keywords de formulación y protocolos
    "formulación protocolos bacteriología",
    "estandarización protocolos microbiología",
    "protocolo investigación bacteriológica",
    "validación protocolos Trujillo",
    // Keywords de bioinformática
    "análisis bioinformática microbiología",
    "análisis bioinformático Perú",
    "bioinformática secuencias ADN",
    "análisis filogenético bacterias",
    "análisis datos genómicos",
    // Keywords técnicas especializadas
    "suspensión bacteriana investigación",
    "producción cepas bacterianas Trujillo",
    "cepas bacterianas para investigación",
    "cultivo puro bacteria identificación",
    "bioremedación concreto bacterias",
    // Keywords long-tail
    "servicio apoyo investigación científica Trujillo",
    "laboratorio identificación microorganismos La Libertad",
    "análisis molecular microbiología Perú",
    "servicios biotecnología investigación",
    "identificación bacterias por PCR",
    "diagnóstico molecular microbiano",
    "AS Laboratorios investigación bacteriológica",
  ],
  alternates: {
    canonical: "https://aslaboratorios.com/servicios/apoyo-investigacion",
    languages: {
      "es-PE": "https://aslaboratorios.com/servicios/apoyo-investigacion",
    },
  },
  openGraph: {
    title: "Apoyo a la Investigación Bacteriológica | Identificación 16S RNA | AS Laboratorios Trujillo",
    description:
      "Servicios especializados de apoyo a investigación en Trujillo, La Libertad: identificación molecular, 16S RNA, aislamiento de cepas, formulación de protocolos y análisis bioinformático. Laboratorio certificado.",
    url: "https://aslaboratorios.com/servicios/apoyo-investigacion",
    siteName: "AS Laboratorios",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/image.png",
        width: 1200,
        height: 630,
        alt: "Apoyo a la Investigación Bacteriológica - AS Laboratorios Trujillo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investigación Bacteriológica en Trujillo | AS Laboratorios Perú",
    description:
      "Identificación molecular, 16S RNA, aislamiento de cepas, protocolos y análisis bioinformático. Servicios de investigación especializados.",
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
  category: "Investigación Bacteriológica y Bioinformática",
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Apoyo a la Investigación Bacteriológica AS Laboratorios",
    "DC.subject": "Investigación Bacteriológica, Identificación Molecular, 16S RNA, Bioinformática, Trujillo, Perú",
    "revisit-after": "7 days",
  },
}

const apoyoInvestigacionServices = [
  {
    name: "Suspensiones Bacterianas",
    description: "Preparación de suspensiones bacterianas estandarizadas para proyectos de investigación.",
    position: 1,
  },
  {
    name: "Producción de Bacterias para Investigación",
    description: "Cultivo y producción masiva de microorganismos específicos para investigación científica.",
    position: 2,
  },
  {
    name: "Suspensiones de Bacterias para Bioremedación de Concreto",
    description: "Suspensiones bacterianas especializadas para estudios de bioremedación y auto-curación de concreto.",
    position: 3,
  },
  {
    name: "Cepas Bacterianas para Investigación",
    description: "Suministro de cepas bacterianas puras y documentadas para proyectos de investigación.",
    position: 4,
  },
  {
    name: "Identificación Molecular de Bacterias en Cultivo Puro",
    description: "Caracterización molecular y identificación precisa de bacterias aisladas.",
    position: 5,
  },
  {
    name: "Identificación por 16S RNA de Microorganismos",
    description: "Secuenciación e identificación taxonómica mediante análisis de gen 16S RNA.",
    position: 6,
  },
  {
    name: "Formulación de Protocolos y Estandarización",
    description: "Diseño y validación de protocolos bacteriológicos estandarizados para investigación.",
    position: 7,
  },
  {
    name: "Aislamiento de Bacterias",
    description: "Técnicas especializadas de aislamiento y purificación de cepas bacterianas.",
    position: 8,
  },
  {
    name: "Servicio Análisis e Informes Bioinformática",
    description: "Análisis bioinformático completo con informes detallados de secuencias y datos genómicos.",
    position: 9,
  },
]

export default function ApoyoInvestigacionPage() {
  return (
    <>
      <LocalBusinessStructuredData />
      <ServiceStructuredData
        serviceName="Servicios de Apoyo a la Investigación Bacteriológica en Trujillo"
        serviceDescription="Laboratorio especializado en apoyo a investigación bacteriológica en Trujillo, La Libertad, Perú: identificación molecular 16S RNA, aislamiento de cepas, formulación de protocolos, producción de bacterias para investigación y análisis bioinformático."
        serviceUrl="https://aslaboratorios.com/servicios/apoyo-investigacion"
        serviceType="Investigación Bacteriológica y Bioinformática"
        serviceArea={["La Libertad", "Lambayeque", "Piura", "Cajamarca", "Ancash", "Lima"]}
        offers={apoyoInvestigacionServices.map((s) => ({ name: s.name, description: s.description }))}
        image="/images/image.png"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Servicios", url: "https://aslaboratorios.com/servicios" },
          { name: "Apoyo a la Investigación", url: "https://aslaboratorios.com/servicios/apoyo-investigacion" },
        ]}
      />
      <ItemListStructuredData
        listName="Servicios de Apoyo a la Investigación AS Laboratorios Trujillo"
        listUrl="https://aslaboratorios.com/servicios/apoyo-investigacion"
        items={apoyoInvestigacionServices}
      />
      <ProfessionalServiceStructuredData
        serviceName="Apoyo a la Investigación Bacteriológica Trujillo"
        description="Laboratorio de investigación bacteriológica certificado en Trujillo, La Libertad, Perú. Identificación molecular 16S RNA, aislamiento de cepas, formulación de protocolos y análisis bioinformático."
        url="https://aslaboratorios.com/servicios/apoyo-investigacion"
        priceRange="$$"
        image="/images/image.png"
      />
      <ApoyoInvestigacionClient />
    </>
  )
}
