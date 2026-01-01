import type { Metadata } from "next"
import MicrobiologicosClient from "./microbiologicos-client"
import {
  ServiceStructuredData,
  BreadcrumbStructuredData,
  ItemListStructuredData,
  ProfessionalServiceStructuredData,
  LocalBusinessStructuredData,
} from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Análisis Microbiológicos en Trujillo Perú | Alimentos, Agua, Salmonella, Listeria | AS Laboratorios",
  description:
    "Laboratorio de análisis microbiológicos en Trujillo, La Libertad, Perú. 48+ servicios: análisis de alimentos, agua, leche, cosméticos. Detección Salmonella, Listeria, Staphylococcus, E. coli, coliformes. ISO certificado. Cotiza: +51 961 996 645.",
  keywords: [
    // Keywords geográficas principales
    "análisis microbiológicos Trujillo",
    "análisis microbiológicos La Libertad",
    "análisis microbiológicos Perú",
    "laboratorio microbiología Trujillo",
    // Keywords de alimentos
    "análisis alimentos Trujillo",
    "análisis alimentos microbiológico Perú",
    "análisis microbiológico alimentos Trujillo",
    "control calidad alimentos La Libertad",
    "HACCP laboratorio Trujillo",
    "BPM análisis Perú",
    // Keywords de patógenos
    "detección Salmonella Trujillo",
    "detección Salmonella Perú",
    "análisis Listeria monocytogenes Trujillo",
    "Staphylococcus aureus alimentos",
    "E. coli análisis Trujillo",
    "coliformes alimentos Perú",
    "mohos levaduras análisis",
    // Keywords de matrices
    "análisis leche Trujillo",
    "análisis leche microbiológico La Libertad",
    "análisis agua microbiológico Trujillo",
    "análisis cosméticos Trujillo",
    "análisis superficies Perú",
    "análisis bebidas microbiológico",
    // Keywords long-tail
    "recuento bacteriano Trujillo",
    "laboratorio certificado alimentos Perú",
    "Clostridium perfringens análisis",
    "Bacillus cereus detección",
    "Vibrio cholerae análisis",
    "AS Laboratorios microbiología",
    "mejor laboratorio microbiología Trujillo",
  ],
  alternates: {
    canonical: "https://aslaboratorios.com/servicios/microbiologicos",
    languages: {
      "es-PE": "https://aslaboratorios.com/servicios/microbiologicos",
    },
  },
  openGraph: {
    title: "Servicios Microbiológicos Especializados en Trujillo, Perú | AS Laboratorios",
    description:
      "48+ servicios de análisis microbiológicos en Trujillo, La Libertad: alimentos, agua, leche, cosméticos. Detección de patógenos certificada. Laboratorio líder en el norte del Perú.",
    url: "https://aslaboratorios.com/servicios/microbiologicos",
    siteName: "AS Laboratorios",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/image.png",
        width: 1200,
        height: 630,
        alt: "Servicios Microbiológicos - AS Laboratorios Trujillo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Análisis Microbiológicos en Trujillo | AS Laboratorios Perú",
    description:
      "Análisis microbiológicos certificados: alimentos, agua, leche, cosméticos. Detección de Salmonella, Listeria, E. coli y más.",
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
  category: "Análisis Microbiológicos de Alimentos",
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Análisis Microbiológicos AS Laboratorios Trujillo",
    "DC.subject": "Microbiología, Alimentos, Salmonella, Listeria, E. coli, Trujillo, Perú",
    "revisit-after": "7 days",
  },
}

const microbiologicosServices = [
  {
    name: "Recuento de Aerobios Mesófilos",
    description:
      "Cuantificación de microorganismos aerobios viables en muestras de alimentos, agua y superficies en Trujillo.",
    position: 1,
  },
  {
    name: "Recuento de Coliformes Totales",
    description: "Detección de bacterias coliformes como indicadores de calidad sanitaria en La Libertad.",
    position: 2,
  },
  {
    name: "Recuento de Escherichia coli",
    description: "Cuantificación específica de E. coli en alimentos y agua. Laboratorio certificado Trujillo.",
    position: 3,
  },
  {
    name: "Detección de Salmonella spp.",
    description: "Identificación de Salmonella en 25g de muestra alimentaria según normativa peruana.",
    position: 4,
  },
  {
    name: "Recuento de Staphylococcus aureus",
    description: "Cuantificación de S. aureus en alimentos y superficies en Perú.",
    position: 5,
  },
  {
    name: "Detección de Listeria monocytogenes",
    description: "Identificación del patógeno Listeria en productos alimenticios de La Libertad.",
    position: 6,
  },
  {
    name: "Recuento de Mohos y Levaduras",
    description: "Cuantificación de hongos filamentosos y levaduras en alimentos.",
    position: 7,
  },
  {
    name: "Análisis de Leche Cruda",
    description: "Evaluación microbiológica completa de leche sin procesar en Trujillo.",
    position: 8,
  },
  { name: "Recuento de Enterobacterias", description: "Cuantificación de familia Enterobacteriaceae.", position: 9 },
  {
    name: "Detección de Vibrio cholerae",
    description: "Identificación del agente causal del cólera en muestras de agua y alimentos.",
    position: 10,
  },
]

export default function MicrobiologicosPage() {
  return (
    <>
      <LocalBusinessStructuredData />
      <ServiceStructuredData
        serviceName="Servicios Microbiológicos en Trujillo"
        serviceDescription="Laboratorio especializado en análisis microbiológicos en Trujillo, La Libertad, Perú: alimentos, agua, leche, cosméticos, superficies. Más de 48 servicios con certificación. Detección de Salmonella, Listeria, E. coli, Staphylococcus."
        serviceUrl="https://aslaboratorios.com/servicios/microbiologicos"
        serviceType="Análisis Microbiológicos de Alimentos y Aguas"
        serviceArea={["La Libertad", "Lambayeque", "Piura", "Cajamarca", "Ancash", "Lima", "Ica", "Arequipa"]}
        offers={microbiologicosServices.map((s) => ({ name: s.name, description: s.description }))}
        image="/images/image.png"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Servicios", url: "https://aslaboratorios.com/servicios" },
          { name: "Microbiológicos Trujillo", url: "https://aslaboratorios.com/servicios/microbiologicos" },
        ]}
      />
      <ItemListStructuredData
        listName="Servicios Microbiológicos AS Laboratorios Trujillo"
        listUrl="https://aslaboratorios.com/servicios/microbiologicos"
        items={microbiologicosServices}
      />
      <ProfessionalServiceStructuredData
        serviceName="Análisis Microbiológicos Trujillo"
        description="Laboratorio de análisis microbiológicos certificado en Trujillo, La Libertad, Perú. Análisis de alimentos, agua, leche y cosméticos. Detección de patógenos."
        url="https://aslaboratorios.com/servicios/microbiologicos"
        priceRange="$$"
        image="/images/image.png"
      />
      <MicrobiologicosClient />
    </>
  )
}
