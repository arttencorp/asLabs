import type { Metadata } from "next"
import SobreNosotrosEcuadorClient from "./sobre-nosotros-client"

export const metadata: Metadata = {
  title: "Sobre AS Labs | Empresa Peruana con Sede en Ecuador",
  description: "Conoce a AS Labs, empresa peruana de ciencia aplicada con trayectoria desde 1997 y una nueva sede en Quito, Ecuador.",
  keywords: ["AS Labs Ecuador", "laboratorio peruano Ecuador", "empresa biotecnología Quito", "laboratorio agroindustrial Ecuador"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/sobre-nosotros" },
  openGraph: {
    title: "AS Labs | Ciencia peruana con presencia en Ecuador",
    description: "Trayectoria, propósito y modelo de trabajo de AS Labs en Perú y Ecuador.",
    url: "https://aslaboratorios.com/ecuador/sobre-nosotros",
    locale: "es_EC",
    images: [{ url: "/new/SobreASLaboratorios.webp", width: 1200, height: 630, alt: "Instalaciones de AS Labs" }],
  },
}

export default function SobreNosotrosEcuadorPage() {
  return <SobreNosotrosEcuadorClient />
}
