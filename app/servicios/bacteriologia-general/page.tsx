import type { Metadata } from "next"
import BacteriologiaClient from "./bacteriologia-client"
import {
  ServiceStructuredData,
  BreadcrumbStructuredData,
  ItemListStructuredData,
  ProfessionalServiceStructuredData,
  LocalBusinessStructuredData,
} from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Bacteriología en Trujillo Perú | Suspensiones McFarland, Biofertilizantes, Fermentación | AS Laboratorios",
  description:
    "Laboratorio de bacteriología en Trujillo, La Libertad, Perú. Suspensiones McFarland, fermentación sólida/líquida, curvas de crecimiento, biofertilizantes, bioestimulantes, antagonismo microbiano. Cotiza: +51 961 996 645.",
  keywords: [
    // Keywords geográficas principales
    "bacteriología Trujillo",
    "bacteriología La Libertad",
    "bacteriología Perú",
    "laboratorio bacteriología Trujillo",
    // Keywords de servicios
    "suspensión McFarland Trujillo",
    "suspensión McFarland Perú",
    "fermentación bacteriana Trujillo",
    "fermentación sólida La Libertad",
    "fermentación líquida Perú",
    "curvas crecimiento bacteriano",
    // Keywords de productos
    "biofertilizantes Trujillo",
    "biofertilizantes Perú",
    "bioestimulantes Trujillo",
    "bioestimulantes La Libertad",
    "producción biofertilizantes Perú",
    "producción bioestimulantes",
    // Keywords técnicas
    "antagonismo microbiano Trujillo",
    "control biológico bacterias",
    "PGPR bacterias Perú",
    "Bacillus fermentación",
    "Azotobacter producción",
    "Rhizobium biofertilizante",
    // Keywords long-tail
    "microbiología industrial Trujillo",
    "producción microorganismos La Libertad",
    "biotecnología microbiana Perú",
    "formulación bioinsumos",
    "cepas bacterianas Trujillo",
    "inoculantes agrícolas Perú",
    "AS Laboratorios bacteriología",
  ],
  alternates: {
    canonical: "https://aslaboratorios.com/servicios/bacteriologia-general",
    languages: {
      "es-PE": "https://aslaboratorios.com/servicios/bacteriologia-general",
    },
  },
  openGraph: {
    title: "Bacteriología General en Trujillo, Perú | AS Laboratorios",
    description:
      "Servicios de bacteriología en Trujillo, La Libertad: suspensiones McFarland, fermentación, curvas de crecimiento, biofertilizantes y bioestimulantes. Laboratorio certificado.",
    url: "https://aslaboratorios.com/servicios/bacteriologia-general",
    siteName: "AS Laboratorios",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/image.png",
        width: 1200,
        height: 630,
        alt: "Bacteriología General - AS Laboratorios Trujillo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bacteriología en Trujillo | AS Laboratorios Perú",
    description:
      "Fermentación, biofertilizantes, curvas de crecimiento y suspensiones McFarland. Laboratorio especializado en Trujillo, La Libertad.",
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
  category: "Bacteriología y Producción de Bioinsumos",
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Bacteriología AS Laboratorios Trujillo",
    "DC.subject": "Bacteriología, Biofertilizantes, Fermentación, McFarland, Trujillo, Perú",
    "revisit-after": "7 days",
  },
}

const bacteriologiaServices = [
  {
    name: "Suspensión de Bacterias (McFarland)",
    description: "Preparación de suspensiones bacterianas estandarizadas según escala McFarland en Trujillo.",
    position: 1,
  },
  {
    name: "Fermentación Sólida",
    description: "Cultivo de microorganismos en sustratos sólidos para producción de metabolitos en La Libertad.",
    position: 2,
  },
  {
    name: "Fermentación Líquida",
    description: "Cultivo en medio líquido para producción masiva de biomasa microbiana en Perú.",
    position: 3,
  },
  {
    name: "Curva de Crecimiento",
    description: "Determinación de fases de crecimiento bacteriano mediante cinética microbiana.",
    position: 4,
  },
  {
    name: "Producción de Biofertilizantes",
    description: "Elaboración de inoculantes microbianos para agricultura sostenible en Trujillo.",
    position: 5,
  },
  {
    name: "Antagonismo Microbiano",
    description: "Evaluación de capacidad inhibitoria entre microorganismos en laboratorio certificado.",
    position: 6,
  },
  {
    name: "Producción de Bioestimulantes",
    description: "Elaboración de productos bacterianos promotores del crecimiento vegetal en La Libertad.",
    position: 7,
  },
  {
    name: "Conservación de Cepas",
    description: "Preservación de cultivos bacterianos mediante diferentes técnicas.",
    position: 8,
  },
  {
    name: "Identificación Bacteriana",
    description: "Caracterización morfológica y bioquímica de bacterias en Trujillo.",
    position: 9,
  },
  {
    name: "Control de Calidad Microbiano",
    description: "Verificación de pureza y viabilidad de cultivos bacterianos.",
    position: 10,
  },
]

export default function BacteriologiaPage() {
  return (
    <>
      <LocalBusinessStructuredData />
      <ServiceStructuredData
        serviceName="Servicios de Bacteriología General en Trujillo"
        serviceDescription="Laboratorio especializado en bacteriología en Trujillo, La Libertad, Perú: suspensiones McFarland, fermentación sólida y líquida, curvas de crecimiento, producción de biofertilizantes y bioestimulantes para agricultura."
        serviceUrl="https://aslaboratorios.com/servicios/bacteriologia-general"
        serviceType="Bacteriología y Producción de Bioinsumos"
        serviceArea={["La Libertad", "Lambayeque", "Piura", "Cajamarca", "Ancash", "Lima"]}
        offers={bacteriologiaServices.map((s) => ({ name: s.name, description: s.description }))}
        image="/images/image.png"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Servicios", url: "https://aslaboratorios.com/servicios" },
          { name: "Bacteriología Trujillo", url: "https://aslaboratorios.com/servicios/bacteriologia-general" },
        ]}
      />
      <ItemListStructuredData
        listName="Servicios de Bacteriología General AS Laboratorios Trujillo"
        listUrl="https://aslaboratorios.com/servicios/bacteriologia-general"
        items={bacteriologiaServices}
      />
      <ProfessionalServiceStructuredData
        serviceName="Bacteriología Trujillo"
        description="Laboratorio de bacteriología certificado en Trujillo, La Libertad, Perú. Fermentación, biofertilizantes, curvas de crecimiento y suspensiones McFarland."
        url="https://aslaboratorios.com/servicios/bacteriologia-general"
        priceRange="$$"
        image="/images/image.png"
      />
      <BacteriologiaClient />
    </>
  )
}
