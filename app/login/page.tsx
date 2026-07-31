import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import LoginClient from "./login-client"

export const metadata: Metadata = constructMetadata({
  title: "Acceso de Clientes",
  description: "Accede de forma segura a tu cuenta y consulta la información asociada a tus servicios.",
  path: "/login",
  noIndex: true,
})

export default function LoginPage() {
  return <LoginClient />
}
