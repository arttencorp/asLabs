"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus, X, MessageSquare, Info } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

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

const cepas: Cepa[] = [
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

export default function CepasClient() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCepaId, setSelectedCepaId] = useState<string | null>(null)
  const [showTechSpecs, setShowTechSpecs] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["Control Biológico", "Control de Plagas", "Biofertilizante"]
  const filteredCepas = cepas.filter((cepa) => {
    const matchesSearch =
      cepa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cepa.cientifico.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || cepa.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const agregarAlCarrito = (cepaId: string, presentacionId: string) => {
    const cepa = cepas.find((c) => c.id === cepaId)
    const presentacion = cepa?.presentaciones.find((p) => p.id === presentacionId)

    if (!cepa || !presentacion) return

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
          cepaId,
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cepas Biológicas Certificadas</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Soluciones biológicas de alta calidad para control de plagas, enfermedades y mejora de nutrición. 
            Todas nuestras cepas son identificadas y validadas en laboratorio.
          </p>
        </div>
      </section>

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-6">Filtros</h2>

              {/* Búsqueda */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                <input
                  type="text"
                  placeholder="Nombre o científico"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>

              {/* Categorías */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Categoría</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      !selectedCategory
                        ? "bg-green-100 text-green-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Todas
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        selectedCategory === cat
                          ? "bg-green-100 text-green-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Cepas */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCepas.map((cepa) => (
                <div key={cepa.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 text-lg">{cepa.nombre}</h3>
                    <p className="text-xs text-gray-600 italic">{cepa.cientifico}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                        {cepa.categoria}
                      </span>
                      <button
                        onClick={() => setShowTechSpecs(showTechSpecs === cepa.id ? null : cepa.id)}
                        className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                        Ficha Técnica
                      </button>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm text-gray-700 mb-3">{cepa.descripcion}</p>
                    <div className="text-xs text-green-700 space-y-1">
                      {cepa.beneficios.map((beneficio, idx) => (
                        <p key={idx} className="flex gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          {beneficio}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Presentaciones */}
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3 text-sm">Presentaciones Disponibles:</h4>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {cepa.presentaciones.map((pres) => {
                        const presLabel = pres.volumen
                          ? `${pres.tipo} ${pres.medio} ${pres.volumen}`
                          : `${pres.tipo} ${pres.medio}`

                        return (
                          <div key={pres.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded border border-gray-200">
                            <div className="flex-1">
                              <p className="text-xs font-medium text-gray-900">{presLabel}</p>
                              <p className="text-sm font-bold text-green-600">S/ {pres.precio.toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => agregarAlCarrito(cepa.id, pres.id)}
                              className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Ficha Técnica */}
      {showTechSpecs && cepas.find((c) => c.id === showTechSpecs) && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {cepas.find((c) => c.id === showTechSpecs)?.nombre}
              </h2>
              <button
                onClick={() => setShowTechSpecs(null)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {(() => {
                const cepa = cepas.find((c) => c.id === showTechSpecs)
                if (!cepa) return null

                return (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 font-medium">Viabilidad</p>
                        <p className="text-sm font-bold text-gray-900 mt-1">{cepa.viabilidad}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 font-medium">Concentración</p>
                        <p className="text-sm font-bold text-gray-900 mt-1">{cepa.concentracion}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 font-medium">Almacenamiento</p>
                        <p className="text-sm font-bold text-gray-900 mt-1">{cepa.almacenamiento}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 font-medium">Aplicación</p>
                        <p className="text-sm font-bold text-gray-900 mt-1">{cepa.aplicacion}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-600 font-medium mb-2">Compatibilidad</p>
                      <p className="text-sm text-blue-900">{cepa.compatibilidad}</p>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">¿Necesitas Asesoría?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Nuestros especialistas están disponibles para recomendarte la cepa y presentación más adecuada para tu cultivo
          </p>
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
          <button
            onClick={() => setSelectedCepaId("cart")}
            className="relative flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 animate-bounce"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cantidadItems}
            </span>
          </button>
        </div>
      )}

      {/* Carrito Overlay */}
      {selectedCepaId === "cart" && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Mi Carrito</h2>
              <button
                onClick={() => setSelectedCepaId(null)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Tu carrito está vacío</p>
              ) : (
                cart.map((item) => (
                  <div key={item.presentacionId} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{item.cepaNombre}</h4>
                    <p className="text-xs text-gray-600 mb-3">{item.presentacionInfo}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => actualizarCantidad(item.presentacionId, item.cantidad - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-gray-900 min-w-6 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => actualizarCantidad(item.presentacionId, item.cantidad + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-bold text-green-600">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-green-600">S/ {totalCarrito.toFixed(2)}</span>
                </div>
                <a
                  href={`https://wa.me/51961996645?text=Quisiera%20hacer%20un%20pedido%20de%20cepas.%20Total%3A%20S/%20${totalCarrito.toFixed(2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
                >
                  <MessageSquare className="w-5 h-5" />
                  Completar Pedido
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
