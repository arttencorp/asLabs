"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Plus, Minus, X, MessageSquare, ArrowLeft, ShoppingCart } from "lucide-react"

interface Presentacion {
  id: string
  tipo: string
  medio?: string
  volumen?: string
  precio: number
}

interface Cepa {
  id: string
  nombre: string
  cientifico: string
  categoria: string
  descripcion: string
  beneficios: string[]
  presentaciones: Presentacion[]
  viabilidad: string
  concentracion: string
  almacenamiento: string
  aplicacion: string
  compatibilidad: string
}

interface CartItem {
  cepaId: string
  presentacionId: string
  cepaNombre: string
  presentacionInfo: string
  precio: number
  cantidad: number
}

const allCepas: Cepa[] = [
  {
    id: "1",
    nombre: "Trichoderma harzianum",
    cientifico: "Trichoderma harzianum",
    categoria: "Control Biológico",
    descripcion: "Hongo antagonista para control de enfermedades fúngicas del suelo",
    beneficios: ["Control de pudriciones radiculares", "Mejora de absorción de nutrientes", "Estimulación de crecimiento"],
    presentaciones: [
      { id: "1-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 15.00 },
      { id: "1-2", tipo: "Placa por Estriado", medio: "TSA", precio: 18.00 },
      { id: "1-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 22.00 },
      { id: "1-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 25.00 },
      { id: "1-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "1-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 23.00 },
      { id: "1-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 18.00 },
      { id: "1-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 16.00 },
      { id: "1-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 35.00 },
      { id: "1-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 32.00 },
      { id: "1-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 55.00 },
      { id: "1-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 50.00 },
      { id: "1-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 95.00 },
      { id: "1-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 85.00 },
      { id: "1-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 350.00 },
      { id: "1-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 320.00 },
    ],
    viabilidad: "> 95%",
    concentracion: "1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Aspersión foliar, riego, sustrato",
    compatibilidad: "Compatible con la mayoría de fungicidas",
  },
  {
    id: "2",
    nombre: "Beauveria bassiana",
    cientifico: "Beauveria bassiana",
    categoria: "Control de Plagas",
    descripcion: "Hongo entomopatógeno para control biológico de plagas",
    beneficios: ["Control de insectos plaga", "Compatible con otras cepas", "Largo período de vida útil"],
    presentaciones: [
      { id: "2-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 17.00 },
      { id: "2-2", tipo: "Placa por Estriado", medio: "TSA", precio: 20.00 },
      { id: "2-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 25.00 },
      { id: "2-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 28.00 },
      { id: "2-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 23.00 },
      { id: "2-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 26.00 },
      { id: "2-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 20.00 },
      { id: "2-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 18.00 },
      { id: "2-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 38.00 },
      { id: "2-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 35.00 },
      { id: "2-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 60.00 },
      { id: "2-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 55.00 },
      { id: "2-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 100.00 },
      { id: "2-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 90.00 },
      { id: "2-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 380.00 },
      { id: "2-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 350.00 },
    ],
    viabilidad: "> 94%",
    concentracion: "1 x 10^8 esporas/ml",
    almacenamiento: "4-10°C, 18 meses",
    aplicacion: "Aspersión en cultivo y suelo",
    compatibilidad: "Compatible con abonos y nutrientes",
  },
  {
    id: "3",
    nombre: "Bacillus subtilis",
    cientifico: "Bacillus subtilis",
    categoria: "Biofertilizante",
    descripcion: "Bacteria promotora del crecimiento vegetal y fijadora de nitrógeno",
    beneficios: ["Aumenta disponibilidad de nutrientes", "Mejora la salud del suelo", "Estimula el desarrollo radicular"],
    presentaciones: [
      { id: "3-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 14.00 },
      { id: "3-2", tipo: "Placa por Estriado", medio: "TSA", precio: 16.00 },
      { id: "3-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "3-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 23.00 },
      { id: "3-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 18.00 },
      { id: "3-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 21.00 },
      { id: "3-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 16.00 },
      { id: "3-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 14.00 },
      { id: "3-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 32.00 },
      { id: "3-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 30.00 },
      { id: "3-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 50.00 },
      { id: "3-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 48.00 },
      { id: "3-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 85.00 },
      { id: "3-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 80.00 },
      { id: "3-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 320.00 },
      { id: "3-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 300.00 },
    ],
    viabilidad: "> 96%",
    concentracion: "2 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Riego y aspersión foliar",
    compatibilidad: "Compatible con fungicidas y bactericidas",
  },
  {
    id: "4",
    nombre: "Pseudomonas fluorescens",
    cientifico: "Pseudomonas fluorescens",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento",
    beneficios: ["Solubiliza fosfato inorgánico", "Produce fitohormonas", "Reduce patógenos del suelo"],
    presentaciones: [
      { id: "4-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 15.00 },
      { id: "4-2", tipo: "Placa por Estriado", medio: "TSA", precio: 17.00 },
      { id: "4-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 21.00 },
      { id: "4-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 24.00 },
      { id: "4-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 19.00 },
      { id: "4-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 22.00 },
      { id: "4-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 17.00 },
      { id: "4-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 15.00 },
      { id: "4-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 34.00 },
      { id: "4-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 32.00 },
      { id: "4-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 52.00 },
      { id: "4-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 50.00 },
      { id: "4-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 88.00 },
      { id: "4-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 83.00 },
      { id: "4-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 330.00 },
      { id: "4-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 310.00 },
    ],
    viabilidad: "> 95%",
    concentracion: "1.5 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 10 meses",
    aplicacion: "Riego, aspersión, tratamiento de semilla",
    compatibilidad: "No compatible con antibióticos sistémicos",
  },
  {
    id: "5",
    nombre: "Azospirillum brasilense",
    cientifico: "Azospirillum brasilense",
    categoria: "Biofertilizante",
    descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas",
    beneficios: ["Fija nitrógeno del aire", "Reduce uso de fertilizantes", "Mejora estrés hídrico"],
    presentaciones: [
      { id: "5-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 14.00 },
      { id: "5-2", tipo: "Placa por Estriado", medio: "TSA", precio: 16.00 },
      { id: "5-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "5-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 23.00 },
      { id: "5-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 18.00 },
      { id: "5-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 21.00 },
      { id: "5-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 16.00 },
      { id: "5-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 14.00 },
      { id: "5-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 32.00 },
      { id: "5-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 30.00 },
      { id: "5-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 50.00 },
      { id: "5-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 48.00 },
      { id: "5-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 85.00 },
      { id: "5-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 80.00 },
      { id: "5-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 320.00 },
      { id: "5-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 300.00 },
    ],
    viabilidad: "> 93%",
    concentracion: "1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 14 meses",
    aplicacion: "Inoculación de semillas y riego",
    compatibilidad: "Compatible con la mayoría de productos",
  },
  {
    id: "6",
    nombre: "Metarhizium anisopliae",
    cientifico: "Metarhizium anisopliae",
    categoria: "Control de Plagas",
    descripcion: "Hongo entomopatógeno para control de insectos del suelo",
    beneficios: ["Control de plagas subterráneas", "Acción sistémica", "Seguro para fauna benéfica"],
    presentaciones: [
      { id: "6-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 16.00 },
      { id: "6-2", tipo: "Placa por Estriado", medio: "TSA", precio: 19.00 },
      { id: "6-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 24.00 },
      { id: "6-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 27.00 },
      { id: "6-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 22.00 },
      { id: "6-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 25.00 },
      { id: "6-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 19.00 },
      { id: "6-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 17.00 },
      { id: "6-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 37.00 },
      { id: "6-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 34.00 },
      { id: "6-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 58.00 },
      { id: "6-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 53.00 },
      { id: "6-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 98.00 },
      { id: "6-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 88.00 },
      { id: "6-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 370.00 },
      { id: "6-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 340.00 },
    ],
    viabilidad: "> 95%",
    concentracion: "1 x 10^8 esporas/ml",
    almacenamiento: "4-10°C, 20 meses",
    aplicacion: "Riego al suelo, aspersión foliar",
    compatibilidad: "Compatible con biofertilizantes",
  },
  {
    id: "7",
    nombre: "Streptomyces lydicus",
    cientifico: "Streptomyces lydicus",
    categoria: "Control Biológico",
    descripcion: "Actinobacteria productora de antibióticos naturales para control de patógenos",
    beneficios: ["Produce compuestos antimicrobianos", "Eficaz contra hongos y bacterias", "Estimula defensa vegetal"],
    presentaciones: [
      { id: "7-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 15.00 },
      { id: "7-2", tipo: "Placa por Estriado", medio: "TSA", precio: 17.00 },
      { id: "7-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 21.00 },
      { id: "7-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 24.00 },
      { id: "7-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 19.00 },
      { id: "7-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 22.00 },
      { id: "7-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 17.00 },
      { id: "7-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 15.00 },
      { id: "7-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 34.00 },
      { id: "7-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 32.00 },
      { id: "7-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 52.00 },
      { id: "7-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 50.00 },
      { id: "7-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 88.00 },
      { id: "7-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 83.00 },
      { id: "7-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 330.00 },
      { id: "7-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 310.00 },
    ],
    viabilidad: "> 94%",
    concentracion: "1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 16 meses",
    aplicacion: "Aspersión foliar, riego",
    compatibilidad: "Compatible con biofertilizantes",
  },
  {
    id: "8",
    nombre: "Bacillus megaterium",
    cientifico: "Bacillus megaterium",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal",
    beneficios: ["Solubiliza potasio y fosfato", "Mejora fertilidad del suelo", "Aumenta producción"],
    presentaciones: [
      { id: "8-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 14.00 },
      { id: "8-2", tipo: "Placa por Estriado", medio: "TSA", precio: 16.00 },
      { id: "8-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "8-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 23.00 },
      { id: "8-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 18.00 },
      { id: "8-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 21.00 },
      { id: "8-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 16.00 },
      { id: "8-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 14.00 },
      { id: "8-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 32.00 },
      { id: "8-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 30.00 },
      { id: "8-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 50.00 },
      { id: "8-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 48.00 },
      { id: "8-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 85.00 },
      { id: "8-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 80.00 },
      { id: "8-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 320.00 },
      { id: "8-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 300.00 },
    ],
    viabilidad: "> 96%",
    concentracion: "2 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 13 meses",
    aplicacion: "Riego, aspersión foliar",
    compatibilidad: "Compatible con fungicidas sistémicos",
  },
]

export default function CepaDetailClient({ cepaId }: { cepaId: string }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedPresentacion, setSelectedPresentacion] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [cepaId])

  const cepa = allCepas.find((c) => c.id === cepaId)

  if (!cepa) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cepa no encontrada</h1>
          <Link href="/cepas" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Volver al Catálogo
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const agregarAlCarrito = (presentacionId: string) => {
    const presentacion = cepa.presentaciones.find((p) => p.id === presentacionId)
    if (!presentacion) return

    const presentacionInfo = presentacion.volumen
      ? `${presentacion.tipo} - ${presentacion.medio} - ${presentacion.volumen}`
      : `${presentacion.tipo} - ${presentacion.medio}`

    const existingItem = cart.find((item) => item.presentacionId === presentacionId)

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.presentacionId === presentacionId ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      )
    } else {
      setCart([
        ...cart,
        {
          cepaId: cepa.id,
          presentacionId,
          cepaNombre: cepa.nombre,
          presentacionInfo,
          precio: presentacion.precio,
          cantidad: 1,
        },
      ])
    }
  }

  const removerDelCarrito = (presentacionId: string) => {
    setCart(cart.filter((item) => item.presentacionId !== presentacionId))
  }

  const actualizarCantidad = (presentacionId: string, nueva: number) => {
    if (nueva <= 0) {
      removerDelCarrito(presentacionId)
    } else {
      setCart(cart.map((item) => (item.presentacionId === presentacionId ? { ...item, cantidad: nueva } : item)))
    }
  }

  const totalCarrito = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const cantidadItems = cart.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/cepas" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Volver al Catálogo
          </Link>
        </div>
      </div>

      {/* Product Section - 2 Column Layout */}
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Izquierda - Imagen del Producto */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">🧬</div>
              <p className="text-gray-600 font-medium">{cepa.nombre}</p>
            </div>
          </div>

          {/* Derecha - Detalles y Opciones */}
          <div className="space-y-6">
            {/* Header Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{cepa.nombre}</h1>
              <p className="text-lg text-gray-600 italic mb-4">{cepa.cientifico}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm">
                  {cepa.categoria}
                </span>
              </div>
            </div>

            {/* Ficha Técnica Visible */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Especificaciones Técnicas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Viabilidad</p>
                  <p className="font-bold text-gray-900">{cepa.viabilidad}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Concentración</p>
                  <p className="font-bold text-gray-900">{cepa.concentracion}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Almacenamiento</p>
                  <p className="font-bold text-gray-900">{cepa.almacenamiento}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Aplicación</p>
                  <p className="font-bold text-gray-900">{cepa.aplicacion}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-600 font-medium mb-1">Compatibilidad</p>
                <p className="text-gray-900">{cepa.compatibilidad}</p>
              </div>
            </div>

            {/* Presentaciones Dropdown */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Selecciona una presentación:</label>
              <select
                value={selectedPresentacion || ""}
                onChange={(e) => setSelectedPresentacion(e.target.value || null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-medium text-gray-900"
              >
                <option value="">-- Elige una presentación --</option>
                {cepa.presentaciones.map((pres) => {
                  const presLabel = pres.volumen
                    ? `${pres.tipo} - ${pres.medio} - ${pres.volumen}`
                    : `${pres.tipo} - ${pres.medio}`
                  return (
                    <option key={pres.id} value={pres.id}>
                      {presLabel} - S/ {pres.precio.toFixed(2)}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Add to Cart Button */}
            {selectedPresentacion && (
              <button
                onClick={() => agregarAlCarrito(selectedPresentacion)}
                className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>
            )}
          </div>
        </div>

        {/* Description Section Below */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Producto</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{cepa.descripcion}</p>
          
          <h3 className="text-lg font-bold text-gray-900 mb-3">Beneficios Principales</h3>
          <ul className="space-y-2">
            {cepa.beneficios.map((beneficio, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700">
                <span className="text-green-600 font-bold text-xl">✓</span>
                {beneficio}
              </li>
            ))}
          </ul>
        </div>

        {/* All Presentations Grid */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Todas las Presentaciones</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cepa.presentaciones.map((pres) => {
              const presLabel = pres.volumen
                ? `${pres.tipo} ${pres.medio} ${pres.volumen}`
                : `${pres.tipo} ${pres.medio}`

              return (
                <div key={pres.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <p className="font-medium text-gray-900 text-sm mb-3">{presLabel}</p>
                  <p className="text-2xl font-bold text-green-600 mb-4">S/ {pres.precio.toFixed(2)}</p>
                  <button
                    onClick={() => {
                      setSelectedPresentacion(pres.id)
                      agregarAlCarrito(pres.id)
                    }}
                    className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                  >
                    Agregar
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Necesitas Asesoría?</h2>
          <p className="text-gray-700 mb-6">Nuestros especialistas están disponibles para ayudarte</p>
          <a
            href="https://wa.me/51961996645"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
          >
            <MessageSquare className="w-5 h-5" />
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      <Footer />

      {/* Floating Cart Button */}
      {cantidadItems > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <div className="bg-white rounded-full shadow-lg p-4 border border-gray-200">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900">Carrito</div>
              <div className="text-2xl font-bold text-green-600">{cantidadItems}</div>
              <div className="text-xs text-gray-600">S/ {totalCarrito.toFixed(2)}</div>
              <button
                onClick={() => {
                  const whatsappMessage = `Quisiera hacer un pedido de cepas.\nTotal: S/ ${totalCarrito.toFixed(2)}\n\n${cart
                    .map((item) => `${item.cepaNombre} - ${item.presentacionInfo} x${item.cantidad} = S/ ${(item.precio * item.cantidad).toFixed(2)}`)
                    .join("\n")}`
                  window.open(`https://wa.me/51961996645?text=${encodeURIComponent(whatsappMessage)}`, "_blank")
                }}
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700 whitespace-nowrap"
              >
                Pedir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
