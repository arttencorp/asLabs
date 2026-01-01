import type { Metadata } from "next"
import BiotecnologiaVegetalClient from "./biotecnologia-vegetal-client"
import {
  ServiceStructuredData,
  BreadcrumbStructuredData,
  ItemListStructuredData,
  ProfessionalServiceStructuredData,
  LocalBusinessStructuredData,
} from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Biotecnología Vegetal en Trujillo Perú | Cultivo Tejidos, Micropropagación In Vitro | AS Laboratorios",
  description:
    "Laboratorio de biotecnología vegetal en Trujillo, La Libertad, Perú. Micropropagación in vitro, cultivo de tejidos, microinjerto, termoterapia, criopreservación. Plantas libres de virus para frutales y ornamentales. Cotiza: +51 961 996 645.",
  keywords: [
    // Keywords geográficas principales
    "biotecnología vegetal Trujillo",
    "biotecnología vegetal La Libertad",
    "biotecnología vegetal Perú",
    "laboratorio biotecnología Trujillo",
    // Keywords de servicios
    "cultivo tejidos vegetales Trujillo",
    "cultivo tejidos Perú",
    "micropropagación in vitro Trujillo",
    "micropropagación in vitro Perú",
    "microinjerto plantas Trujillo",
    "termoterapia vegetal La Libertad",
    "criopreservación plantas Perú",
    // Keywords técnicas
    "enraizamiento in vitro",
    "aclimatación plantas Trujillo",
    "multiplicación clonal Perú",
    "inducción callos",
    "embriogénesis somática",
    "organogénesis vegetal",
    "cultivo meristemos",
    // Keywords de productos
    "plantas libres virus Trujillo",
    "vitroplantas Perú",
    "frutales in vitro La Libertad",
    "ornamentales in vitro Trujillo",
    "propagación masiva plantas",
    // Keywords long-tail
    "laboratorio cultivo tejidos certificado",
    "propagación vegetativa Trujillo",
    "mejoramiento genético vegetal Perú",
    "AS Laboratorios biotecnología",
    "mejor laboratorio biotecnología Trujillo",
  ],
  alternates: {
    canonical: "https://aslaboratorios.com/servicios/biotecnologia-vegetal",
    languages: {
      "es-PE": "https://aslaboratorios.com/servicios/biotecnologia-vegetal",
    },
  },
  openGraph: {
    title: "Biotecnología Vegetal - Cultivo de Tejidos In Vitro en Trujillo | AS Laboratorios Perú",
    description:
      "Laboratorio líder en biotecnología vegetal en Trujillo, La Libertad. Micropropagación, cultivo de tejidos, microinjerto y termoterapia. Plantas libres de virus certificadas.",
    url: "https://aslaboratorios.com/servicios/biotecnologia-vegetal",
    siteName: "AS Laboratorios",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/image.png",
        width: 1200,
        height: 630,
        alt: "Biotecnología Vegetal - AS Laboratorios Trujillo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biotecnología Vegetal en Trujillo | AS Laboratorios Perú",
    description:
      "Micropropagación in vitro, cultivo de tejidos y plantas libres de virus. Laboratorio especializado en Trujillo, La Libertad.",
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
  category: "Biotecnología Vegetal y Cultivo de Tejidos",
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Biotecnología Vegetal AS Laboratorios Trujillo",
    "DC.subject": "Biotecnología, Cultivo Tejidos, Micropropagación, Trujillo, Perú",
    "revisit-after": "7 days",
  },
}

const biotecnologiaServices = [
  {
    name: "Introducción In Vitro",
    description: "Establecimiento de cultivos vegetales en condiciones asépticas en laboratorio de Trujillo.",
    position: 1,
  },
  {
    name: "Multiplicación In Vitro",
    description: "Propagación clonal masiva de plantas en medio de cultivo. Servicio certificado La Libertad.",
    position: 2,
  },
  {
    name: "Enraizamiento In Vitro",
    description: "Inducción de raíces adventicias en brotes micropropagados en Perú.",
    position: 3,
  },
  {
    name: "Aclimatación",
    description: "Adaptación gradual de vitroplantas a condiciones ex vitro en Trujillo.",
    position: 4,
  },
  {
    name: "Microinjerto",
    description: "Injerto de meristemos sobre portainjertos in vitro para plantas libres de virus.",
    position: 5,
  },
  {
    name: "Termoterapia",
    description: "Tratamiento térmico para eliminación de patógenos sistémicos en La Libertad.",
    position: 6,
  },
  {
    name: "Criopreservación",
    description: "Conservación de germoplasma a temperaturas ultrabajas en laboratorio certificado.",
    position: 7,
  },
  { name: "Inducción de Callos", description: "Formación de tejido calloso para regeneración vegetal.", position: 8 },
  { name: "Embriogénesis Somática", description: "Formación de embriones a partir de células somáticas.", position: 9 },
  {
    name: "Organogénesis",
    description: "Regeneración de órganos (brotes/raíces) desde explantes en Trujillo.",
    position: 10,
  },
]

export default function BiotecnologiaVegetalPage() {
  return (
    <>
      <LocalBusinessStructuredData />
      <ServiceStructuredData
        serviceName="Servicios de Biotecnología Vegetal en Trujillo"
        serviceDescription="Laboratorio especializado en biotecnología vegetal en Trujillo, La Libertad, Perú: micropropagación in vitro, cultivo de tejidos, microinjerto, termoterapia, criopreservación. Producción de plantas libres de virus."
        serviceUrl="https://aslaboratorios.com/servicios/biotecnologia-vegetal"
        serviceType="Biotecnología Vegetal y Cultivo de Tejidos"
        serviceArea={["La Libertad", "Lambayeque", "Piura", "Cajamarca", "Ancash", "Lima", "Ica"]}
        offers={biotecnologiaServices.map((s) => ({ name: s.name, description: s.description }))}
        image="/images/image.png"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Servicios", url: "https://aslaboratorios.com/servicios" },
          { name: "Biotecnología Vegetal Trujillo", url: "https://aslaboratorios.com/servicios/biotecnologia-vegetal" },
        ]}
      />
      <ItemListStructuredData
        listName="Servicios de Biotecnología Vegetal AS Laboratorios Trujillo"
        listUrl="https://aslaboratorios.com/servicios/biotecnologia-vegetal"
        items={biotecnologiaServices}
      />
      <ProfessionalServiceStructuredData
        serviceName="Biotecnología Vegetal Trujillo"
        description="Laboratorio de biotecnología vegetal certificado en Trujillo, La Libertad, Perú. Micropropagación in vitro, cultivo de tejidos y plantas libres de virus."
        url="https://aslaboratorios.com/servicios/biotecnologia-vegetal"
        priceRange="$$"
        image="/images/image.png"
      />
      <BiotecnologiaVegetalClient />
    </>
  )
}
