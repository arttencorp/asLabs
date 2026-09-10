import type { Metadata } from "next"
import PlantinesEcuadorClient from "./plantines-ecuador-client"
import { BreadcrumbStructuredData, EcuadorServiceStructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Plantines In Vitro de Banano y Plátano en Ecuador | AS Labs",
  description: "Plantines in vitro de banano y plátano para Ecuador, con trazabilidad y orientación técnica para programas de prevención y manejo frente a Fusarium.",
  keywords: ["plantines in vitro Ecuador", "banano in vitro Ecuador", "plátano in vitro Ecuador", "plantines Quito", "Fusarium R4T Ecuador", "Fusarium banano Ecuador", "material vegetal sano Ecuador", "micropropagación Ecuador"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/plantines-in-vitro", languages: { "es-EC": "https://aslaboratorios.com/ecuador/plantines-in-vitro", "es-PE": "https://aslaboratorios.com/plantines", "x-default": "https://aslaboratorios.com/plantines" } },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://aslaboratorios.com/ecuador/plantines-in-vitro",
    siteName: "AS Labs Ecuador",
    title: "Plantines in vitro para Ecuador | AS Labs",
    description: "Material vegetal uniforme y trazable para programas preventivos frente a Fusarium.",
    images: [{ url: "/new/HEADER.webp", width: 1200, height: 630, alt: "Producción de plantines in vitro de AS Labs" }],
  },
}

export default function PlantinesEcuadorPage() {
  return (
    <>
      <EcuadorServiceStructuredData
        serviceName="Plantines in vitro de banano y plátano para Ecuador"
        serviceDescription="Material vegetal micropropagado, uniforme y trazable para programas de establecimiento y prevención frente a Fusarium R4T en Ecuador."
        serviceUrl="https://aslaboratorios.com/ecuador/plantines-in-vitro"
        image="/new/HEADER.webp"
        offers={[
          { name: "Banano in vitro", description: "Plantines micropropagados de banano con trazabilidad por lote." },
          { name: "Plátano in vitro", description: "Material vegetal uniforme para establecimiento productivo." },
          { name: "Piña in vitro", description: "Plantines de piña obtenidos mediante micropropagación." },
          { name: "Programa preventivo frente a Fusarium R4T", description: "Material y orientación técnica para reducir riesgos desde el establecimiento." },
        ]}
      />
      <BreadcrumbStructuredData items={[{ name: "AS Labs Ecuador", url: "https://aslaboratorios.com/ecuador" }, { name: "Plantines in vitro", url: "https://aslaboratorios.com/ecuador/plantines-in-vitro" }]} />
      <PlantinesEcuadorClient />
    </>
  )
}
