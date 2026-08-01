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
  title:
    "Apoyo a la Investigacion en Trujillo Peru | Tesis, 16S rRNA, Protocolos y Bioinformatica | AS Laboratorios",
  description:
    "Servicio de apoyo a la investigacion en Trujillo, La Libertad, Peru. Soporte para tesis y proyectos: suspensiones bacterianas, fermentacion, identificacion, 16S rRNA, aislamiento ambiental y analisis bioinformatico. Cotiza: +51 961 996 645.",
  keywords: [
    "apoyo a la investigacion Trujillo",
    "tesis microbiologia Trujillo",
    "asesoria laboratorio Trujillo",
    "analisis 16S rRNA Peru",
    "bioinformatica secuencias Trujillo",
    "fermentacion bacteriana investigacion",
    "aislamiento bacterias ambientales",
    "laboratorio investigacion La Libertad",
    "proyectos academicos microbiologia",
    "AS Laboratorios investigacion",
  ],
  alternates: {
    canonical: "https://aslaboratorios.com/servicios/apoyo-investigacion",
    languages: {
      "es-PE": "https://aslaboratorios.com/servicios/apoyo-investigacion",
    },
  },
  openGraph: {
    title: "Apoyo a la Investigacion en Trujillo, Peru | AS Laboratorios",
    description:
      "Soporte tecnico para tesis y proyectos de investigacion: 16S rRNA, identificacion bacteriana, aislamiento ambiental y analisis bioinformatico.",
    url: "https://aslaboratorios.com/servicios/apoyo-investigacion",
    siteName: "AS Laboratorios",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/servicios/micro.jpeg",
        width: 1200,
        height: 630,
        alt: "Apoyo a la Investigacion - AS Laboratorios Trujillo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apoyo a la Investigacion en Trujillo | AS Laboratorios",
    description: "Soporte cientifico para tesis y proyectos academicos en microbiologia y biologia molecular.",
    images: ["/servicios/micro.jpeg"],
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
  category: "Apoyo Cientifico y Tecnico para Investigacion",
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Apoyo a la Investigacion AS Laboratorios Trujillo",
    "DC.subject": "Investigacion, Tesis, Microbiologia, 16S, Bioinformatica, Trujillo, Peru",
    "revisit-after": "7 days",
  },
}

const apoyoInvestigacionServices = [
  {
    name: "Suspensiones Bacterianas",
    description:
      "Preparacion de suspensiones bacterianas de alta concentracion para investigacion, con estandares de pureza y viabilidad.",
    position: 1,
  },
  {
    name: "Produccion de Bacterias para Investigacion",
    description:
      "Produccion de biomasa bacteriana en cantidades requeridas para proyectos de investigacion con control de calidad.",
    position: 2,
  },
  {
    name: "Suspensiones de Bacterias para Biorremediacion de Concreto",
    description:
      "Preparacion de suspensiones bacterianas especializadas con capacidad de producir carbonato de calcio para reparacion biologica de grietas en concreto.",
    position: 3,
  },
  {
    name: "Cepas Bacterianas para Investigacion",
    description:
      "Suministro de cepas bacterianas caracterizadas y documentadas para proyectos de investigacion cientifica.",
    position: 4,
  },
  {
    name: "Identificacion Molecular de Bacterias en Cultivo Puro",
    description:
      "Identificacion de bacterias mediante tecnicas moleculares avanzadas como MALDI-TOF, PCR y secuenciacion para precision maxima.",
    position: 5,
  },
  {
    name: "Identificacion por 16S RNA de Microorganismos",
    description:
      "Identificacion molecular mediante secuenciacion del gen 16S RNA, estandar de oro para la taxonomia bacteriana y estudio de diversidad microbiana.",
    position: 6,
  },
  {
    name: "Formulacion de Protocolos y Estandarizacion",
    description:
      "Diseno y estandarizacion de protocolos experimentales bacteriologicos optimizados para reproducibilidad y eficiencia.",
    position: 7,
  },
  {
    name: "Aislamiento de Bacterias",
    description:
      "Aislamiento y purificacion de bacterias desde muestras ambientales complejas, obteniendo cepas puras para investigacion.",
    position: 8,
  },
  {
    name: "Servicio Analisis e Informes Bioinformatica",
    description:
      "Analisis bioinformatico de datos de secuenciacion, filogenia, anotacion genica y generacion de reportes cientificos detallados.",
    position: 9,
  },
]

export default function ApoyoInvestigacionPage() {
  return (
    <>
      <LocalBusinessStructuredData />
      <ServiceStructuredData
        serviceName="Apoyo a la Investigacion en Trujillo"
        serviceDescription="Servicio de apoyo cientifico y tecnico para tesis y proyectos de investigacion en Trujillo, La Libertad, Peru. Incluye suspensiones bacterianas, fermentacion, 16S rRNA, aislamiento ambiental y bioinformatica."
        serviceUrl="https://aslaboratorios.com/servicios/apoyo-investigacion"
        serviceType="Apoyo Cientifico para Investigacion"
        serviceArea={["La Libertad", "Lambayeque", "Piura", "Cajamarca", "Ancash", "Lima"]}
        offers={apoyoInvestigacionServices.map((s) => ({ name: s.name, description: s.description }))}
        image="/servicios/micro.jpeg"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Servicios", url: "https://aslaboratorios.com/servicios" },
          { name: "Apoyo a la Investigacion", url: "https://aslaboratorios.com/servicios/apoyo-investigacion" },
        ]}
      />
      <ItemListStructuredData
        listName="Servicios de Apoyo a la Investigacion AS Laboratorios Trujillo"
        listUrl="https://aslaboratorios.com/servicios/apoyo-investigacion"
        items={apoyoInvestigacionServices}
      />
      <ProfessionalServiceStructuredData
        serviceName="Apoyo a la Investigacion Trujillo"
        description="Soporte para tesis y proyectos academicos en microbiologia y biologia molecular en Trujillo, La Libertad, Peru."
        url="https://aslaboratorios.com/servicios/apoyo-investigacion"
        priceRange="$$"
        image="/servicios/micro.jpeg"
      />
      <ApoyoInvestigacionClient />
    </>
  )
}
