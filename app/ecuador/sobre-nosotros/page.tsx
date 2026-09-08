import type { Metadata } from "next"
import SobreNosotrosEcuadorClient from "./sobre-nosotros-client"

export const metadata: Metadata = {
  title: "Sobre AS Labs Ecuador | Laboratorio y Biotecnología en Quito",
  description: "Conoce la trayectoria, misión, visión, capacidad científica y sede de AS Labs en Quito para atender proyectos de biotecnología y laboratorio en Ecuador.",
  keywords: ["AS Labs Ecuador", "empresa biotecnología Quito", "laboratorio agroindustrial Ecuador", "ciencia aplicada AS Labs"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/sobre-nosotros", languages: { "es-EC": "https://aslaboratorios.com/ecuador/sobre-nosotros", "es-PE": "https://aslaboratorios.com/sobre-nosotros", "x-default": "https://aslaboratorios.com/sobre-nosotros" } },
  openGraph: {
    title: "AS Labs | Ciencia que crece con la región",
    description: "Trayectoria, propósito y modelo de trabajo de AS Labs en Ecuador.",
    url: "https://aslaboratorios.com/ecuador/sobre-nosotros",
    locale: "es_EC",
    images: [{ url: "/ecuador/carolina-millenium.jpg", width: 1200, height: 1200, alt: "Sede de AS Labs Ecuador en Quito" }],
  },
}

export default function SobreNosotrosEcuadorPage() {
  return <SobreNosotrosEcuadorClient />
}
