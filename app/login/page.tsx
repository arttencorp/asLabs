import type { Metadata } from "next"
import LoginClient from "./login-client"

export const metadata: Metadata = {
  title: "Ingresa a tu cuenta | AS Laboratorios",
  description: "Accede a tu panel de resultados y análisis en AS Laboratorios",
}

export default function LoginPage() {
  return <LoginClient />
}
