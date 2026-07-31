import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { LocalBusinessStructuredData, OrganizationStructuredData, WebsiteStructuredData } from "@/components/structured-data"
import ClientPage from "./ClientPage"

export const metadata: Metadata = constructMetadata({
  title: "Biotecnología Agrícola y Laboratorio en Perú | AS Laboratorios",
  description:
    "Plantines in vitro, análisis de laboratorio, control biológico e investigación aplicada desde Trujillo para productores, empresas y universidades del Perú.",
  keywords: ["biotecnología agrícola Perú", "laboratorio Trujillo", "plantines in vitro", "análisis microbiológicos", "fitopatología", "control biológico", "cepas microbianas", "investigación agrícola"],
  path: "/",
  image: "/new/bannerasnuevo.webp",
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
