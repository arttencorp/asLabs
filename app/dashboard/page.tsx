import type { Metadata } from "next"
import DashboardClient from "./dashboard-client"

export const metadata: Metadata = {
  title: "Panel de Cliente | AS Laboratorios",
  description: "Accede a tus resultados de análisis y gestiona tus solicitudes",
}

export default function DashboardPage() {
  return <DashboardClient />
}
