import type { Metadata } from "next"
import PlantinesEcuadorClient from "./plantines-ecuador-client"

export const metadata: Metadata = {
  title: "Plantines In Vitro y Manejo Preventivo de Fusarium | AS Labs Ecuador",
  description: "Plantines in vitro de banano y plátano para Ecuador, con trazabilidad y orientación técnica para programas de prevención y manejo frente a Fusarium.",
  keywords: ["plantines in vitro Ecuador", "banano in vitro Ecuador", "plátano in vitro Quito", "Fusarium banano Ecuador", "material vegetal sano Ecuador", "AS Labs Ecuador"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/plantines-in-vitro" },
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
  return <PlantinesEcuadorClient />
}
