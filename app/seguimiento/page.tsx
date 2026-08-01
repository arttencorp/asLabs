import type { Metadata } from "next"
import SeguimientoClient from "./seguimiento-client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Seguimiento de Pedidos | AS Laboratorios",
  description: "Rastrea el estado de tu pedido en tiempo real con nuestro sistema de seguimiento",
  keywords: "seguimiento, pedidos, AS Laboratorios, rastreo, estado pedido",
}

export default function SeguimientoPage() {
  return (
    <>
      <Navbar />
      <SeguimientoClient />
      <Footer />
    </>
  )
}
