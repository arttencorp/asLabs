"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Download, Lock, X, ShoppingCart, ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"

const ENVIO_PERU = 0

// Datos de Biofertilizantes (mismo que en biofertilizantes-client.tsx)
const biofertilizantes = [
  {
    id: "bf-1",
    nombre: "Bacillus subtilis",
    codigo: "AS-BS-001",
    cientifico: "Bacillus subtilis",
    categoria: "Biofertilizantes",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 38.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Banano, arroz, maíz, hortalizas, papa, tomate, frutales",
  },
  {
    id: "bf-2",
    nombre: "Bacillus velezensis",
    codigo: "AS-BV-001",
    cientifico: "Bacillus velezensis",
    categoria: "Biofertilizantes",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 45.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Banano, cacao, palto, tomate, pimiento, papa, vid",
  },
  {
    id: "bf-3",
    nombre: "Bacillus amyloliquefaciens",
    codigo: "AS-BA-001",
    cientifico: "Bacillus amyloliquefaciens",
    categoria: "Biofertilizantes",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 48.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Hortalizas, frutales, banano, papa, tomate, arroz, maíz",
  },
  {
    id: "bf-4",
    nombre: "Bacillus megaterium",
    codigo: "AS-BM-001",
    cientifico: "Bacillus megaterium",
    categoria: "Biofertilizantes",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 40.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Maíz, arroz, papa, leguminosas, hortalizas, frutales",
  },
  {
    id: "bf-5",
    nombre: "Bacillus licheniformis",
    codigo: "AS-BL-001",
    cientifico: "Bacillus licheniformis",
    categoria: "Biofertilizantes",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 36.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Caña de azúcar, arroz, maíz, hortalizas, compost, frutales",
  },
  {
    id: "bf-6",
    nombre: "Bacillus pumilus",
    codigo: "AS-BP-001",
    cientifico: "Bacillus pumilus",
    categoria: "Biofertilizantes",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 42.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Vid, tomate, pimiento, cucurbitáceas, frutales, hortalizas",
  },
  {
    id: "bf-7",
    nombre: "Paenibacillus polymyxa",
    codigo: "AS-PP-001",
    cientifico: "Paenibacillus polymyxa",
    categoria: "Fijación de Nitrógeno",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 44.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Arroz, maíz, trigo, papa, hortalizas, leguminosas",
  },
  {
    id: "bf-8",
    nombre: "Azospirillum brasilense",
    codigo: "AS-AB-001",
    cientifico: "Azospirillum brasilense",
    categoria: "Fijación de Nitrógeno",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 35.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Maíz, arroz, trigo, caña de azúcar, pastos, hortalizas",
  },
  {
    id: "bf-9",
    nombre: "Azotobacter chroococcum",
    codigo: "AS-AC-001",
    cientifico: "Azotobacter chroococcum",
    categoria: "Fijación de Nitrógeno",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 35.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Hortalizas, maíz, arroz, frutales, papa, algodón",
  },
  {
    id: "bf-10",
    nombre: "Pseudomonas fluorescens",
    codigo: "AS-PF-001",
    cientifico: "Pseudomonas fluorescens",
    categoria: "Biocontrol",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 39.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Papa, tomate, hortalizas, arroz, banano, frutales",
  },
  {
    id: "bf-11",
    nombre: "Pseudomonas putida",
    codigo: "AS-PP-001",
    cientifico: "Pseudomonas putida",
    categoria: "Biocontrol",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 37.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Hortalizas, papa, tomate, maíz, arroz, frutales",
  },
  {
    id: "bf-12",
    nombre: "Rhizobium spp.",
    codigo: "AS-RH-001",
    cientifico: "Rhizobium spp.",
    categoria: "Fijación de Nitrógeno",
    productFormat: "Líquido Concentrado",
    cantidad: "1 L",
    precio: 33.00,
    imagen: "/placeholder.svg?height=300&width=300",
    disponibilidad: true,
    aplicaciones: "Frijol, arveja, alfalfa, trébol, lenteja, otras leguminosas",
  },
]

export default function BiofertilizantesDetailClient({ cepaId }: { cepaId: string }) {
  const cepa = biofertilizantes.find((c) => c.id === cepaId)
  const [cantidadCarrito, setCantidadCarrito] = useState(1)
  const [showCartModal, setShowCartModal] = useState(false)

  if (!cepa) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-emerald-900 mb-4">Biofertilizante no encontrado</h1>
          <Link
            href="/biofertilizantes"
            className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handleComprarWhatsApp = () => {
    const mensaje = `*CONSULTA BIOFERTILIZANTE - AS LABORATORIOS*\n\n` +
      `Interesado en: ${cepa.nombre}\n` +
      `Código: ${cepa.codigo}\n` +
      `Cantidad: ${cantidadCarrito}\n` +
      `Precio unitario: S/ ${cepa.precio.toFixed(2)}\n` +
      `Subtotal: S/ ${(cepa.precio * cantidadCarrito).toFixed(2)}\n` +
      `*TOTAL: S/ ${(cepa.precio * cantidadCarrito).toFixed(2)}*`

    const numeroWhatsApp = "51987654321"
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`
    window.open(enlaceWhatsApp, "_blank")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/biofertilizantes"
            className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </Link>
          <h1 className="text-4xl font-serif font-bold text-emerald-900 mb-2">{cepa.nombre}</h1>
          <p className="text-emerald-700 font-light max-w-2xl">{cepa.cientifico}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Information Section */}
              <div className="bg-emerald-50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">Información General</h2>
                <div className="space-y-3 text-emerald-700">
                  <p><span className="font-semibold text-emerald-900">Código:</span> {cepa.codigo}</p>
                  <p><span className="font-semibold text-emerald-900">Categoría:</span> {cepa.categoria}</p>
                  <p><span className="font-semibold text-emerald-900">Formato:</span> {cepa.productFormat}</p>
                  <p><span className="font-semibold text-emerald-900">Cantidad por unidad:</span> {cepa.cantidad}</p>
                  <p><span className="font-semibold text-emerald-900">BSL:</span> {cepa.bsl}</p>
                  <p><span className="font-semibold text-emerald-900">Designación:</span> {cepa.strainDesignation}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-emerald-900 mb-4">Descripción</h2>
                <p className="text-emerald-700 leading-relaxed">
                  {cepa.nombre} es un biofertilizante de alta calidad seleccionado para mejorar la fertilidad del suelo y el crecimiento de plantas. Esta cepa ha sido identificada y caracterizada en nuestros laboratorios bajo estrictos protocolos de calidad.
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-xl font-bold text-emerald-900 mb-4">Beneficios</h2>
                <ul className="space-y-2 text-emerald-700">
                  <li className="flex gap-3">
                    <span className="text-emerald-600">✓</span>
                    <span>Mejora la disponibilidad de nutrientes en el suelo</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600">✓</span>
                    <span>Aumenta la actividad microbiana benéfica</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600">✓</span>
                    <span>Favorece el crecimiento radicular</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600">✓</span>
                    <span>Reduce la incidencia de enfermedades del suelo</span>
                  </li>
                </ul>
              </div>

              {/* Applications */}
              <div>
                <h2 className="text-xl font-bold text-emerald-900 mb-4">Aplicaciones</h2>
                <p className="text-emerald-700 leading-relaxed mb-3">
                  Este biofertilizante es aplicable en diversos cultivos agrícolas y puede ser utilizado en:
                </p>
                <ul className="space-y-2 text-emerald-700">
                  <li className="flex gap-3">
                    <span className="text-emerald-600">•</span>
                    <span>Cultivos horticolas y hortalizas</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600">•</span>
                    <span>Cultivos permanentes (frutales, viñas)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600">•</span>
                    <span>Cultivos industriales y ornamentales</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Sidebar - Buy Section */}
            <div className="lg:col-span-1">
              <div className="bg-emerald-50 rounded-lg p-6 sticky top-24 space-y-4">
                <h3 className="text-lg font-bold text-emerald-900">Detalles de Compra</h3>

                <div className="bg-white p-4 rounded border border-emerald-200">
                  <p className="text-sm text-emerald-600 mb-1">Precio por unidad</p>
                  <p className="text-3xl font-bold text-emerald-900">S/ {cepa.precio.toFixed(2)}</p>
                  <p className="text-xs text-emerald-500 mt-2">Incluye envío a Trujillo, Perú</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={cantidadCarrito}
                    onChange={(e) => setCantidadCarrito(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 border border-emerald-300 rounded focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="bg-white p-4 rounded border border-emerald-200">
                  <p className="text-sm text-emerald-600 mb-1">Total estimado</p>
                  <p className="text-2xl font-bold text-emerald-900">S/ {(cepa.precio * cantidadCarrito).toFixed(2)}</p>
                </div>

                <button
                  onClick={handleComprarWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contactar por WhatsApp
                </button>

                {cepa.disponibilidad && (
                  <p className="text-xs text-emerald-600 text-center">Disponible en stock</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
