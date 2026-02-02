"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createBrowserClient } from "@supabase/ssr"
import { ChartColumn, Store, FileText, FileBadge, FileSpreadsheet, Package, Package2, Users, LogOut, FileInput, Signature } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarRail
} from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Verify if environment variables are available
  const isMissingEnvVars =
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "undefined" ||
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "undefined"

  // Only create the client if environment variables are available
  const supabase = !isMissingEnvVars
    ? createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    : null

  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true)

      // If environment variables are missing, show error
      if (isMissingEnvVars) {
        setError(
          "Error en la configuración de la aplicación.",
        )
        setIsLoading(false)
        return
      }

      try {
        const {
          data: { session },
        } = await supabase!.auth.getSession()

        if (!session) {
          if (pathname !== "/admin/login") {
            router.push("/admin/login")
          }
          setIsAuthenticated(false)
        } else {
          setIsAuthenticated(true)
          if (pathname === "/admin/login") {
            router.push("/admin/pedidos")
          }
        }
      } catch {
        setError("Error de autenticación. Por favor, inténtalo de nuevo más tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    if (!isMissingEnvVars) {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [pathname, router, supabase, isMissingEnvVars])

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut()
      router.push("/admin/login")
    }
  }


  // If loading or on login page, just render children
  if (isLoading || pathname === "/admin/login") {
    return <>{children}</>
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  const navItems = [
    { name: "Pedidos", href: "/admin/pedidos", icon: Package },
    { name: "Cotizaciones", href: "/admin/cotizaciones", icon: FileText },
    { name: "Clientes", href: "/admin/clientes", icon: Users },
    { name: "Productos", href: "/admin/productos", icon: Package2 },
    { name: "Tienda", href: "/admin/tienda", icon: Store },
    { name: "Fichas Técnicas", href: "/admin/fichaTecnica", icon: FileSpreadsheet },
    { name: "Certificados de Calidad", href: "/admin/certificadoCalidad", icon: FileBadge },
    { name: "Análisis", href: "/admin/analytics", icon: ChartColumn },
    { name: "Documentos de Laboratorio", href: "/admin/documentoLab", icon: FileInput },
    { name: "Firmas", href: "/admin/firma", icon: Signature },
  ]

  return (
    <SidebarProvider
      defaultOpen={true}
      style={{
        "--sidebar-width": "18rem",
      } as React.CSSProperties}
    >
      <Sidebar collapsible="icon" className="border-r border-gray-800 overflow-hidden">
        <SidebarHeader className="border-b border-gray-800 bg-[#1a1a2e]">
          <Link href="/" className="flex items-center gap-2 px-2 py-3">
            <Image
              src="/icon.png"
              alt="Aslabs Logo"
              width={32}
              height={32}
              className="object-contain shrink-0"
            />
            <span className="text-white text-base font-bold group-data-[collapsible=icon]:hidden">
              AsLabs Admin
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="bg-[#1a1a2e]">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2 group-data-[collapsible=icon]:px-0">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.name}
                      size="lg"
                      className={`
                        text-base
                        ${pathname === item.href
                          ? "bg-[#9d8462]/20 text-white hover:bg-[#9d8462]/30"
                          : "text-gray-400 hover:bg-[#1f1f3a] hover:text-white"
                        }
                      `}
                    >
                      <Link href={item.href} className="flex items-center gap-2 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-800 bg-[#1a1a2e]">
          <SidebarMenu className="px-2 group-data-[collapsible=icon]:px-0">
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleSignOut}
                tooltip="Cerrar sesión"
                size="lg"
                className="text-base text-gray-400 hover:bg-[#1f1f3a] hover:text-white flex items-center gap-2 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">Cerrar sesión</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-px bg-gray-200" />
            <h1 className="text-lg font-semibold text-gray-900">Panel de Administración</h1>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}