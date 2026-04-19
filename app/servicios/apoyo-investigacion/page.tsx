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
  title: "Apoyo a la Investigación Bacteriológica | Identificación Molecular, 16S RNA | AS Laboratorios",
  description:
    "Servicios de apoyo a investigación bacteriológica en Trujillo, Perú. Identificación molecular, 16S RNA, aislamiento de bacterias, formulación de protocolos, bioinformática. Cotiza: +51 961 996 645.",
  keywords: [
    "apoyo investigación bacteriología Trujillo",
    "identificación molecular bacterias Perú",
    "16S RNA secuenciación",
    "aislamiento bacterias Trujillo",
    "identificación bacteriana molecular",
    "protocolo bacteriología",
    "bioinformática microbiología",
    "análisis bioinformática Perú",
    "cepas bacterianas investigación",
    "suspensiones bacterianas Trujillo",
    "AS Laboratorios investigación",
  ],
}

export default function ApoyoInvestigacionPage() {
  return (
    <>
      <ServiceStructuredData
        name="Apoyo a la Investigación"
        description="Servicios de apoyo a investigación bacteriológica incluyendo identificación molecular, aislamiento, formulación de protocolos y análisis bioinformático."
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/servicios/apoyo-investigacion`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: process.env.NEXT_PUBLIC_SITE_URL || "" },
          { name: "Servicios", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios` },
          { name: "Apoyo a la Investigación", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/apoyo-investigacion` },
        ]}
      />
      <ApoyoInvestigacionClient />
    </>
  )
}
