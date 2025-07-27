import type { Metadata } from "next"
import AnalyticsClient from "./analytics-client"

export const metadata: Metadata = {
  title: "Analytics Dashboard - AS Laboratorios",
  description: "Dashboard de métricas y análisis avanzado para AS Laboratorios",
}

export default function AnalyticsPage() {
  return <AnalyticsClient />
}
