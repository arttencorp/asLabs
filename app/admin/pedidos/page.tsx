import type { Metadata } from "next"
import AdminPedidosClient from "./admin-pedidos-client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Administración de Pedidos | AS Laboratorios",
  description: "Panel de administración para gestionar pedidos y clientes de AS Laboratorios",
  robots: "noindex, nofollow",
}

export default function AdminPedidosPage() {
  return (
    <>
      <Navbar />
      <AdminPedidosClient />
      <Footer />
    </>
  )
}
