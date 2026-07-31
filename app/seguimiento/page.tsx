import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import SeguimientoExperience from "./seguimiento-experience"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = constructMetadata({
  title: "Seguimiento de Pedidos",
  description: "Consulta de forma privada el estado de preparación, despacho y entrega de tu pedido de AS Laboratorios.",
  path: "/seguimiento",
  noIndex: true,
})

export default function SeguimientoPage() {
  return (
    <>
      <Navbar overlay />
      <SeguimientoExperience />
      <Footer />
    </>
  )
}
