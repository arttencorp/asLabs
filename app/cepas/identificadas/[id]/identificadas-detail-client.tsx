"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShoppingCart, Heart, ArrowLeft, MessageCircle, Trash2 } from "lucide-react"
import Link from "next/link"

const ENVIO_PERU = 155.00

interface CartItem {
  cepaId: string
  cepa: any
  cantidad: number
}

const cepasIdentificadas = [
  {
    id: "id-1",
    nombre: "Bacillus subtilis",
    codigo: "AS-BS-001",
    cientifico: "Bacillus subtilis (Ehrenberg) Cohn",
    bsl: "BSL-1",
    categoria: "Biofertilizantes",
    productFormat: "Líquido concentrado",
    strainDesignation: "Cepa identificada y caracterizada en AS Labs",
    depositedAs: "Bacillus subtilis",
    typeStrain: "No",
    precio: 450.00,
    cantidad: "500 mL",
    referencia: "AS-BS-001",
    disponibilidad: true,
    descripcion: "Bacteria altamente eficiente en la promoción del crecimiento vegetal y fijación de nitrógeno. Aislada de suelo rizosférico de cultivos de alto rendimiento.",
    beneficios: [
      "Promoción del crecimiento vegetal (PGPR)",
      "Fijación de nitrógeno atmosférico",
      "Solubilización de fosfato",
      "Producción de reguladores de crecimiento",
      "Resistencia a estrés abiótico",
    ],
    aplicaciones: [
      "Agricultura sostenible",
      "Cultivos de alto rendimiento",
      "Recuperación de suelos degradados",
      "Investigación agronómica",
    ],
  },
  {
    id: "id-2",
    nombre: "Pseudomonas fluorescens",
    codigo: "AS-PF-001",
    cientifico: "Pseudomonas fluorescens Migula",
    bsl: "BSL-1",
    categoria: "Biofertilizantes",
    productFormat: "Líquido concentrado",
    strainDesignation: "Aislada de suelo rizosférico",
    depositedAs: "Pseudomonas fluorescens",
    typeStrain: "No",
    precio: 450.00,
    cantidad: "500 mL",
    referencia: "AS-PF-001",
    disponibilidad: true,
    descripcion: "Bacteria solubilizadora de fosfato con alta capacidad de producción de fitohormonas. Cepa estratégica para mejorar disponibilidad de nutrientes.",
    beneficios: [
      "Solubiliza fosfato inorgánico",
      "Producción de auxinas y citoquininas",
      "Biocontrol de patógenos",
      "Mejora de la estructura del suelo",
      "Aumento de la biomasa radicular",
    ],
    aplicaciones: [
      "Biofertilización",
      "Suplemento nutricional",
      "Biocontrol",
      "Investigación rizosférica",
    ],
  },
  {
    id: "id-3",
    nombre: "Azospirillum sp.",
    codigo: "AS-AZ-001",
    cientifico: "Azospirillum brasilense",
    bsl: "BSL-1",
    categoria: "Fijación de Nitrógeno",
    productFormat: "Líquido concentrado",
    strainDesignation: "Fijadora de nitrógeno atmosférico",
    depositedAs: "Azospirillum brasilense",
    typeStrain: "No",
    precio: 500.00,
    cantidad: "500 mL",
    referencia: "AS-AZ-001",
    disponibilidad: true,
    descripcion: "Bacteria fijadora de nitrógeno de vida libre con excelente adaptabilidad. Capaz de colonizar la rizosfera de múltiples cultivos.",
    beneficios: [
      "Fijación de nitrógeno atmosférico",
      "Tolerancia a estrés osmótico",
      "Versatilidad en cultivos",
      "Colonización eficiente de raíces",
      "Reducción de fertilizantes nitrogenados",
    ],
    aplicaciones: [
      "Cereales",
      "Gramíneas forrajeras",
      "Hortalizas",
      "Sistemas sostenibles",
    ],
  },
  {
    id: "id-4",
    nombre: "Bacillus megaterium",
    codigo: "AS-BM-001",
    cientifico: "Bacillus megaterium de Bary",
    bsl: "BSL-1",
    categoria: "Biofertilizantes",
    productFormat: "Líquido concentrado",
    strainDesignation: "Solubilizadora de fosfato y potasio",
    depositedAs: "Bacillus megaterium",
    typeStrain: "No",
    precio: 450.00,
    cantidad: "500 mL",
    referencia: "AS-BM-001",
    disponibilidad: true,
    descripcion: "Bacteria versátil con capacidad de solubilizar tanto fosfato como potasio. Cepa robusta para aplicaciones agronómicas.",
    beneficios: [
      "Solubilización de fosfato y potasio",
      "Resistencia a condiciones adversas",
      "Alta viabilidad",
      "Versatilidad de aplicación",
      "Mejora de disponibilidad nutricional",
    ],
    aplicaciones: [
      "Agricultura convencional y orgánica",
      "Cultivos perennes",
      "Recuperación de suelos",
      "Investigación",
    ],
  },
  {
    id: "id-5",
    nombre: "Rhizobium sp.",
    codigo: "AS-RB-001",
    cientifico: "Rhizobium leguminosarum",
    bsl: "BSL-1",
    categoria: "Fijación de Nitrógeno",
    productFormat: "Líquido concentrado",
    strainDesignation: "Simbionte de leguminosas",
    depositedAs: "Rhizobium leguminosarum",
    typeStrain: "No",
    precio: 500.00,
    cantidad: "500 mL",
    referencia: "AS-RB-001",
    disponibilidad: true,
    descripcion: "Bacteria simbiótica especializada en leguminosas. Establece simbiosis eficiente para fijación de nitrógeno.",
    beneficios: [
      "Fijación simbiótica de nitrógeno",
      "Enriquecimiento de suelo",
      "Noduladión eficiente",
      "Compatibilidad con leguminosas",
      "Reducción de fertilizantes",
    ],
    aplicaciones: [
      "Leguminosas de grano",
      "Leguminosas forrajeras",
      "Rotación de cultivos",
      "Agricultura sostenible",
    ],
  },
  {
    id: "id-6",
    nombre: "Streptomyces sp.",
    codigo: "AS-ST-001",
    cientifico: "Streptomyces griseus",
    bsl: "BSL-1",
    categoria: "Biocontrol",
    productFormat: "Líquido concentrado",
    strainDesignation: "Productora de antibióticos",
    depositedAs: "Streptomyces griseus",
    typeStrain: "No",
    precio: 550.00,
    cantidad: "500 mL",
    referencia: "AS-ST-001",
    disponibilidad: true,
    descripcion: "Actinobacteria productora de compuestos bioactivos. Excelente para control biológico de fitopatógenos.",
    beneficios: [
      "Producción de metabolitos bioactivos",
      "Biocontrol de patógenos",
      "Resistencia a fitopatógenos",
      "Estimulación de defensas",
      "Sostenibilidad ambiental",
    ],
    aplicaciones: [
      "Control de enfermedades fúngicas",
      "Biocontrol de patógenos",
      "Investigación antimicrobiana",
      "Agricultura orgánica",
    ],
  },
]

export default function IdentificadasDetailClient({ cepaId }: { cepaId: string }) {
  const cepa = cepasIdentificadas.find((c) => c.id === cepaId)
  const [cantidad, setCantidad] = useState(1)
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [enLista, setEnLista] = useState(false)

  if (!cepa) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-emerald-900 mb-4">Cepa no encontrada</h1>
          <Link href="/cepas/identificadas" className="text-emerald-600 hover:text-emerald-700">
            Volver al catálogo
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const handleAgregarAlCarrito = () => {
    const nuevoItem: CartItem = { cepaId: cepa.id, cepa, cantidad }
    setCarrito([...carrito, nuevoItem])
    setCantidad(1)
  }

  const handleAgregarALista = () => {
    setEnLista(!enLista)
  }

  const totalCarrito = carrito.reduce((sum, item) => sum + item.cepa.precio * item.cantidad, 0)

  const generarMensajeWhatsApp = () => {
    if (carrito.length === 0) return

    const lineasProductos = carrito.map((item) => {
      const precioUnit = (item.cepa.precio - ENVIO_PERU).toFixed(2)
      const subtotal = ((item.cepa.precio - ENVIO_PERU) * item.cantidad).toFixed(2)
      return "• " + item.cepa.nombre + " (" + item.cepa.codigo + ")\n" +
        "   Cantidad: " + item.cantidad + "\n" +
        "   Precio unitario: S/ " + precioUnit + "\n" +
        "   Subtotal: S/ " + subtotal
    }).join("\n\n")

    const subtotalBase = carrito.reduce((sum, item) => sum + (item.cepa.precio - ENVIO_PERU) * item.cantidad, 0)
    const totalBase = totalCarrito

    const mensaje =
      "*PEDIDO CEPAS IDENTIFICADAS - AS LABORATORIOS*\n\n" +
      lineasProductos + "\n\n" +
      "---\n*RESUMEN DEL PEDIDO*\n" +
      "Subtotal: S/ " + subtotalBase.toFixed(2) + "\n" +
      "Envio a Trujillo: S/ " + ENVIO_PERU.toFixed(2) + "\n" +
      "*TOTAL: S/ " + totalBase.toFixed(2) + "*\n\n" +
      "Por favor confirmar disponibilidad y detalles de entrega."

    const numeroWhatsApp = "51961996645"
    const enlaceWhatsApp = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensaje)
    window.open(enlaceWhatsApp, "_blank")
  }

  return (
    <>
      <Navbar />

      <div className="bg-emerald-50 border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/cepas/identificadas" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </Link>
        </div>
      </div>

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información Principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-white rounded-lg border border-emerald-200 p-8">
                <div className="mb-4">
                  <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    {cepa.categoria}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-emerald-900 mb-2">{cepa.nombre}</h1>
                <p className="text-lg text-emerald-700 mb-4">{cepa.codigo}</p>
                <p className="text-base text-emerald-600 italic mb-6 font-light">{cepa.cientifico}</p>
                <p className="text-gray-700 leading-relaxed">{cepa.descripcion}</p>
              </div>

              {/* Beneficios */}
              <div className="bg-white rounded-lg border border-emerald-200 p-8">
                <h2 className="text-2xl font-bold text-emerald-900 mb-6">Beneficios</h2>
                <ul className="space-y-3">
                  {cepa.beneficios?.map((beneficio, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Aplicaciones */}
              <div className="bg-white rounded-lg border border-emerald-200 p-8">
                <h2 className="text-2xl font-bold text-emerald-900 mb-6">Aplicaciones</h2>
                <ul className="space-y-3">
                  {cepa.aplicaciones?.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold mt-1">→</span>
                      <span className="text-gray-700">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Especificaciones */}
              <div className="bg-white rounded-lg border border-emerald-200 p-8">
                <h2 className="text-2xl font-bold text-emerald-900 mb-6">Especificaciones Técnicas</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-emerald-600 font-semibold">Formato</p>
                    <p className="text-gray-700">{cepa.productFormat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-600 font-semibold">Cantidad</p>
                    <p className="text-gray-700">{cepa.cantidad}</p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-600 font-semibold">Nivel de Bioseguridad</p>
                    <p className="text-gray-700">{cepa.bsl}</p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-600 font-semibold">Referencia</p>
                    <p className="text-gray-700">{cepa.referencia}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Compra */}
            <div className="lg:col-span-1 h-fit sticky top-20">
              <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-8 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-emerald-700 mb-2">Precio por unidad</p>
                  <p className="text-4xl font-bold text-emerald-900">${(cepa.precio - ENVIO_PERU).toFixed(2)}</p>
                  <p className="text-xs text-emerald-600 mt-2">+ S/ {ENVIO_PERU.toFixed(2)} envío</p>
                </div>

                <div className="border-t border-emerald-200 pt-6">
                  <label className="block text-sm font-semibold text-emerald-900 mb-3">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  onClick={handleAgregarAlCarrito}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Agregar al carrito
                </button>

                <button
                  onClick={handleAgregarALista}
                  className={`w-full border-2 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    enLista
                      ? "bg-red-50 border-red-300 text-red-600"
                      : "bg-white border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={enLista ? "currentColor" : "none"} />
                  {enLista ? "En lista" : "Agregar a lista"}
                </button>

                {carrito.length > 0 && (
                  <>
                    <div className="border-t border-emerald-200 pt-6">
                      <h3 className="font-semibold text-emerald-900 mb-4">Carrito ({carrito.length})</h3>
                      <div className="space-y-3 max-h-40 overflow-y-auto mb-4">
                        {carrito.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start text-sm bg-white p-3 rounded">
                            <div>
                              <p className="font-semibold text-emerald-900">{item.cepa.nombre}</p>
                              <p className="text-emerald-600">x{item.cantidad}</p>
                            </div>
                            <button
                              onClick={() => setCarrito(carrito.filter((_, i) => i !== idx))}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-emerald-200 pt-3 mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-emerald-700">Subtotal:</span>
                          <span className="font-bold">S/ {(totalCarrito - ENVIO_PERU).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-700">Envío:</span>
                          <span className="font-bold">S/ {ENVIO_PERU.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-emerald-900 mt-3 bg-white p-2 rounded">
                          <span>Total:</span>
                          <span>S/ {totalCarrito.toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        onClick={generarMensajeWhatsApp}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Comprar por WhatsApp
                      </button>
                    </div>
                  </>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-700">
                  <p>
                    <strong>Nota:</strong> El envío mostrado es una estimación. El costo final dependerá del peso total del pedido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
