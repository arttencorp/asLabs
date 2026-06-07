import type { Metadata } from "next"
import ATCCDetailClient from "./atcc-detail-client"

export const metadata: Metadata = {
  title: "Cepa ATCC | AS Laboratorios",
  description: "Detalle de cepa ATCC certificada",
}

export default function ATCCDetailPage({ params }: { params: { id: string } }) {
  return <ATCCDetailClient cepaId={params.id} />
}
