"use client"

import type React from "react"

import { useState } from "react"
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface OrderStatus {
  id: string
  status: "pendiente" | "procesando" | "enviado" | "entregado"
  customer: string
  email: string
  phone: string
  address: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  orderDate: string
  estimatedDelivery: string
  trackingEvents: Array<{
    date: string
    status: string
    location: string
    description: string
  }>
}

// Datos de ejemplo para demostración
const mockOrders: OrderStatus[] = [
  {
    id: "ASL-2024-001",
    status: "enviado",
    customer: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+51 987 654 321",
    address: "Av. Larco 123, Trujillo, La Libertad",
    items: [
      { name: "Kit de Microbiología Básica", quantity: 1, price: 150 },
      { name: "Placas Petri (Pack 50)", quantity: 2, price: 80 },
    ],
    total: 310,
    orderDate: "2024-01-15",
    estimatedDelivery: "2024-01-22",
    trackingEvents: [
      {
        date: "2024-01-15 09:00",
        status: "Pedido confirmado",
        location: "AS Laboratorios - Trujillo",
        description: "Tu pedido ha sido confirmado y está siendo preparado",
      },
      {
        date: "2024-01-16 14:30",
        status: "En preparación",
        location: "AS Laboratorios - Trujillo",
        description: "Los productos están siendo empaquetados",
      },
      {
        date: "2024-01-17 10:15",
        status: "Enviado",
        location: "Centro de distribución - Trujillo",
        description: "Tu pedido ha sido enviado y está en camino",
      },
    ],
  },
  {
    id: "ASL-2024-002",
    status: "entregado",
    customer: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "+51 976 543 210",
    address: "Jr. Bolívar 456, Lima, Lima",
    items: [
      { name: "Plantines de Banano Baby", quantity: 10, price: 25 },
      { name: "Medio de Cultivo MS", quantity: 5, price: 45 },
    ],
    total: 475,
    orderDate: "2024-01-10",
    estimatedDelivery: "2024-01-18",
    trackingEvents: [
      {
        date: "2024-01-10 11:00",
        status: "Pedido confirmado",
        location: "AS Laboratorios - Trujillo",
        description: "Tu pedido ha sido confirmado",
      },
      {
        date: "2024-01-11 15:20",
        status: "En preparación",
        location: "AS Laboratorios - Trujillo",
        description: "Preparando plantines con cuidado especial",
      },
      {
        date: "2024-01-12 08:45",
        status: "Enviado",
        location: "Centro de distribución - Trujillo",
        description: "Enviado con transporte especializado para plantas",
      },
      {
        date: "2024-01-18 16:30",
        status: "Entregado",
        location: "Jr. Bolívar 456, Lima",
        description: "Pedido entregado exitosamente",
      },
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pendiente":
      return "bg-yellow-100 text-yellow-800"
    case "procesando":
      return "bg-blue-100 text-blue-800"
    case "enviado":
      return "bg-purple-100 text-purple-800"
    case "entregado":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pendiente":
      return <Clock className="h-4 w-4" />
    case "procesando":
      return <Package className="h-4 w-4" />
    case "enviado":
      return <Truck className="h-4 w-4" />
    case "entregado":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function SeguimientoClient() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [searchResult, setSearchResult] = useState<OrderStatus | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      setError("Por favor ingresa un número de seguimiento")
      return
    }

    setIsSearching(true)
    setError("")

    // Simular búsqueda
    setTimeout(() => {
      const order = mockOrders.find((o) => o.id.toLowerCase() === trackingNumber.toLowerCase())
      if (order) {
        setSearchResult(order)
        setError("")
      } else {
        setSearchResult(null)
        setError("No se encontró ningún pedido con ese número de seguimiento")
      }
      setIsSearching(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-serif">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#2e7d32] to-[#4caf50] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Seguimiento de Pedidos</h1>
          <p className="text-xl mb-2">Rastrea tu pedido en tiempo real</p>
          <p className="text-lg opacity-90">Contacto: ventas@aslaboratorios.com | +51 961 996 645</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Buscar Pedido</CardTitle>
              <CardDescription className="text-center">
                Ingresa tu número de seguimiento para ver el estado de tu pedido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Ej: ASL-2024-001"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={isSearching} className="bg-[#2e7d32] hover:bg-[#1b5e20]">
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </CardContent>
          </Card>

          {/* Demo Numbers */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Números de prueba:</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => setTrackingNumber("ASL-2024-001")}
              >
                ASL-2024-001
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => setTrackingNumber("ASL-2024-002")}
              >
                ASL-2024-002
              </Badge>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="max-w-4xl mx-auto mt-12">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Pedido {searchResult.id}</CardTitle>
                    <CardDescription>
                      Realizado el {new Date(searchResult.orderDate).toLocaleDateString("es-PE")}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(searchResult.status)}>
                    {getStatusIcon(searchResult.status)}
                    <span className="ml-1 capitalize">{searchResult.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Customer Info */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Información del Cliente</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{searchResult.customer}</div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        {searchResult.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        {searchResult.phone}
                      </div>
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 mt-1" />
                        <div>{searchResult.address}</div>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Detalles del Pedido</h3>
                    <div className="space-y-3">
                      {searchResult.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-600">Cantidad: {item.quantity}</div>
                          </div>
                          <div className="font-medium">S/ {item.price}</div>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>S/ {searchResult.total}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Entrega estimada: {new Date(searchResult.estimatedDelivery).toLocaleDateString("es-PE")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-6">Historial de Seguimiento</h3>
                  <div className="space-y-4">
                    {searchResult.trackingEvents.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-[#2e7d32] rounded-full"></div>
                          {index < searchResult.trackingEvents.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium">{event.status}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleString("es-PE")}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-1">{event.description}</p>
                          <p className="text-gray-500 text-xs">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">¿Necesitas Ayuda?</CardTitle>
              <CardDescription className="text-center">
                Nuestro equipo está aquí para ayudarte con cualquier consulta sobre tu pedido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Phone className="h-8 w-8 mx-auto text-[#2e7d32]" />
                  <h3 className="font-semibold">Teléfono</h3>
                  <p className="text-gray-600">+51 961 996 645</p>
                  <p className="text-sm text-gray-500">Lun - Vie: 8:00 AM - 6:00 PM</p>
                </div>
                <div className="space-y-2">
                  <Mail className="h-8 w-8 mx-auto text-[#2e7d32]" />
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">ventas@aslaboratorios.com</p>
                  <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                </div>
                <div className="space-y-2">
                  <div className="h-8 w-8 mx-auto bg-[#25D366] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a
                    href="https://wa.me/51961996645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline"
                  >
                    Chatear ahora
                  </a>
                  <p className="text-sm text-gray-500">Respuesta inmediata</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
