import type { Metadata } from "next"
import TiendaClient from "./tienda-client"

export const metadata: Metadata = {
  title: "Tienda | AS Laboratorios",
  description: "Explora y compra nuestros productos de laboratorio para estudiantes y profesionales.",
}

export default function TiendaPage() {
  return <TiendaClient />
}
