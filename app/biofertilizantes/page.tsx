import type { Metadata } from "next"
import BiofertilizantesClient from "./biofertilizantes-client"

export const metadata: Metadata = {
  title: "Biofertilizantes | AS Laboratorios",
  description: "Catálogo de biofertilizantes y microorganismos benéficos para agricultura",
}

export default function BiofertilizantesPage() {
  return <BiofertilizantesClient />
}
