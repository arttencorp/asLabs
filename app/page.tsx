import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { LocalBusinessStructuredData, OrganizationStructuredData, WebsiteStructuredData } from "@/components/structured-data"
import ClientPage from "./ClientPage"

export const metadata: Metadata = constructMetadata({
  title: "Biotecnología Agrícola y Laboratorio en Perú | AS Laboratorios",
  description:
    "Laboratorio de análisis de agua, microbiología, fitopatología y biotecnología agrícola en Trujillo, Perú. Cepas bacterianas, plantines in vitro y control biológico.",
  keywords: ["laboratorio Trujillo", "análisis de agua Trujillo", "análisis microbiológico Trujillo", "cepas bacterianas Perú", "biotecnología agrícola Perú", "plantines in vitro Perú", "fitopatología Perú", "control biológico Perú", "laboratorio agrícola La Libertad"],
  path: "/",
  image: "/new/bannerasnuevo.webp",
  languages: {
    "es-PE": "https://aslaboratorios.com/",
    "es-EC": "https://aslaboratorios.com/ecuador",
    "x-default": "https://aslaboratorios.com/",
  },
})

export default function Home() {
  return (
    <>
      <OrganizationStructuredData />
      <LocalBusinessStructuredData />
      <WebsiteStructuredData />
      <ClientPage />
    </>
  )
}
