import type { Metadata } from "next"
import SobreNosotrosEcuadorClient from "./sobre-nosotros-client"

export const metadata: Metadata = {
  title: "Sobre AS Labs | Ciencia Aplicada desde 1997",
  description: "Conoce la trayectoria, el propósito y la nueva sede de AS Labs en Quito, Ecuador.",
  keywords: ["AS Labs Ecuador", "empresa biotecnología Quito", "laboratorio agroindustrial Ecuador", "ciencia aplicada AS Labs"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/sobre-nosotros" },
  openGraph: {
    title: "AS Labs | Ciencia que crece con la región",
    description: "Trayectoria, propósito y modelo de trabajo de AS Labs en Ecuador.",
    url: "https://aslaboratorios.com/ecuador/sobre-nosotros",
    locale: "es_EC",
    images: [{ url: "/new/SobreASLaboratorios.webp", width: 1200, height: 630, alt: "Instalaciones de AS Labs" }],
  },
}

export default function SobreNosotrosEcuadorPage() {
  return <SobreNosotrosEcuadorClient />
}
