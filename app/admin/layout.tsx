"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createBrowserClient } from "@supabase/ssr"
import { ChartColumn, Store, FileText, FileBadge, FileSpreadsheet, Package, Package2, Users, LogOut, Menu, X } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
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
    { name: "Pedidos", href: "/admin/pedidos", icon: <Package className="h-5 w-5" /> },
    { name: "Cotizaciones", href: "/admin/cotizaciones", icon: <FileText className="h-5 w-5" /> },
    { name: "Clientes", href: "/admin/clientes", icon: <Users className="h-5 w-5" /> },
    { name: "Productos", href: "/admin/productos", icon: <Package2 className="h-5 w-5" /> },
    { name: "Tienda", href: "/admin/tienda", icon: <Store className="h-5 w-5" /> },
    { name: "Fichas Técnicas", href: "/admin/fichaTecnica", icon: <FileSpreadsheet className="h-5 w-5" /> },
    { name: "Certificados de Calidad", href: "/admin/certificadoCalidad", icon: <FileBadge className="h-5 w-5" /> }, 
    { name: "Análisis", href: "/admin/analytics", icon: <ChartColumn className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-[#ffffff] text-gray-200 flex">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-[#1a1a2e] p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition duration-200 ease-in-out md:relative md:flex z-40`}
      >
        <div className="w-64 bg-[#1a1a2e] h-full flex flex-col shadow-lg">
          <div className="p-4 border-b border-gray-800">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icon.png"
                alt="Aslabs Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-game-white text-sm font-bold">
                AsLabs Admin 
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-[#9d8462]/20 text-white"
                    : "text-gray-400 hover:bg-[#1f1f3a] hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md text-gray-400 hover:bg-[#1f1f3a] hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}