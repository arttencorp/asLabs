import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { LocalBusinessStructuredData, OrganizationStructuredData, WebsiteStructuredData } from "@/components/structured-data"
import ClientPage from "./ClientPage"

export const metadata: Metadata = constructMetadata({
  title: "Laboratorio en Trujillo: Análisis, Genómica y Cepas | AS Laboratorios",
  description:
    "Laboratorio en Trujillo para análisis de agua, alimentos y microbiología; PCR, genómica, cepas bacterianas, bioquímica y biotecnología agrícola en Perú.",
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
