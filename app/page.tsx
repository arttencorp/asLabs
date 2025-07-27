import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import ClientPage from "./ClientPage"

export const metadata: Metadata = constructMetadata({
  title: "Inicio",
  description:
    "AS Laboratorios - Creamos soluciones biotecnológicas para la preservación del medio ambiente. Brindamos soluciones a estudiantes universitarios, docentes y asesorías personalizadas.",
  path: "/",
  image: "/proteinmole.png",
})

export default function Home() {
  return <ClientPage />
}
