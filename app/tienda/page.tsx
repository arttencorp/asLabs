import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import TiendaClient from "./tienda-client"

export const metadata: Metadata = constructMetadata({
  title: "Tienda de Materiales y Productos de Laboratorio",
  description: "Encuentra materiales, insumos y productos de laboratorio para estudiantes, tesistas, profesionales e instituciones en Perú.",
  keywords: ["materiales de laboratorio Perú", "insumos de laboratorio", "reactivos laboratorio", "productos para estudiantes", "tienda laboratorio Trujillo"],
  path: "/tienda",
})

export default function TiendaPage() {
  return <TiendaClient />
}
