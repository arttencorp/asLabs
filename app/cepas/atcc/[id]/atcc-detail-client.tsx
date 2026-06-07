"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Download, ShoppingCart, Heart, MessageCircle, X, Lock, Trash2 } from "lucide-react"

const ENVIO_PERU = 155.00

// Datos de Cepas ATCC desde catálogo
const cepasATCC = [
  {
    id: "atcc-1",
    nombre: "Bacillus licheniformis",
    codigo: "ATCC 14580",
    cientifico: "Bacillus licheniformis (Weigmann) Chester",
    bsl: "BSL-1",
    categoria: "Bacilos & Esporulados",
    productFormat: "Freeze-dried",
    strainDesignation: "[46, NCIB 9375, NCTC 10341, NRS 1264]",
    depositedAs: "Bacillus licheniformis",
    typeStrain: "Sí",
    precioSinEnvio: 616.47,
    precio: 771.47,
    cantidad: "1 unidad",
    referencia: "ATCC-14580",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20licheniformis%20ATCC%2014580",
    disponibilidad: true,
    descripcion: "Bacilo ambiental versátil utilizado en biotecnología y producción de enzimas. Cepa de referencia certificada con alta viabilidad y concentración garantizada.",
    beneficios: [
      "Enzimas industriales",
      "Biotecnología",
      "Investigación molecular",
      "Control biológico",
      "Alta viabilidad garantizada"
    ],
    aplicaciones: "Fermentación industrial, producción de enzimas, investigación microbiológica, control de plagas",
    especificaciones: {
      "Viabilidad": "> 99%",
      "Concentración": "10^9 UFC/ml",
      "Almacenamiento": "2-8°C, 24 meses",
      "Actividad": "Productor de proteasas y amylasas",
      "Forma de cultivo": "Liofilizado"
    }
  },
  {
    id: "atcc-2",
    nombre: "Bacillus subtilis",
    codigo: "ATCC 6051",
    cientifico: "Bacillus subtilis (Ehrenberg) Cohn",
    bsl: "BSL-1",
    categoria: "Bacilos & Esporulados",
    productFormat: "Freeze-dried",
    strainDesignation: "Marburg strain [ATCC 6051-U, DSM 10, NCIB 3610, NCTC 3610]",
    depositedAs: "Bacillus subtilis",
    typeStrain: "Sí",
    precioSinEnvio: 616.47,
    precio: 771.47,
    cantidad: "1 unidad",
    referencia: "ATCC-6051",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20subtilis%20ATCC%206051",
    disponibilidad: true,
    descripcion: "Modelo clásico de bacilo para investigación científica. Ampliamente utilizado en genética molecular, educación y biotecnología.",
    beneficios: [
      "Genética molecular",
      "Educación superior",
      "Investigación fundamental",
      "Producción de proteínas",
      "Excelente viabilidad"
    ],
    aplicaciones: "Investigación genética, educación, producción de proteínas recombinantes, biología molecular",
    especificaciones: {
      "Viabilidad": "> 99%",
      "Concentración": "10^9 UFC/ml",
      "Almacenamiento": "2-8°C, 24 meses",
      "Actividad": "Productor de amilasa",
      "Forma de cultivo": "Liofilizado"
    }
  },
  {
    id: "atcc-3",
    nombre: "Escherichia coli",
    codigo: "ATCC 25922-MINI-PACK",
    cientifico: "Escherichia coli",
    bsl: "BSL-1",
    categoria: "Control de Calidad & Esterilización",
    productFormat: "Frozen glycerol stock",
    strainDesignation: "FDA strain Seattle 1946",
    depositedAs: "Escherichia coli",
    typeStrain: "No",
    precioSinEnvio: 616.47,
    precio: 771.47,
    cantidad: "6 viales de 200 µL",
    referencia: "ATCC-25922",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Escherichia%20coli%20ATCC%2025922",
    disponibilidad: true,
    descripcion: "Control de calidad certificado para pruebas de susceptibilidad antimicrobiana. Ampliamente utilizado en laboratorios clínicos y de control de calidad.",
    beneficios: [
      "Control de calidad",
      "Pruebas antimicrobianas",
      "Referencia normalizada",
      "Formato MINI-PACK",
      "Certificado FDA"
    ],
    aplicaciones: "Control de calidad, pruebas de susceptibilidad antimicrobiana, validación de medios de cultivo, laboratorios clínicos",
    especificaciones: {
      "Viabilidad": "> 99%",
      "Concentración": "Preformulado en glicerol",
      "Almacenamiento": "-20°C a -70°C, 36 meses",
      "Actividad": "Control certificado",
      "Forma de cultivo": "Stock en glicerol"
    }
  },
  {
    id: "atcc-24",
    nombre: "Bacillus subtilis",
    codigo: "ATCC 49822",
    cientifico: "Bacillus subtilis",
    bsl: "BSL-1",
    categoria: "Control de Calidad & Esterilización",
    productFormat: "Freeze-dried",
    strainDesignation: "",
    depositedAs: "Bacillus subtilis subsp. subtilis",
    typeStrain: "No",
    precioSinEnvio: 3589.82,
    precio: 3744.82,
    cantidad: "1 unidad",
    referencia: "ATCC-49822",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20subtilis%20ATCC%2049822",
    disponibilidad: true,
    descripcion: "Cepa especializada de Bacillus subtilis para control de calidad en procesos de esterilización. Ampliamente validada en normas internacionales.",
    beneficios: [
      "Control de esterilización",
      "Validación de procesos",
      "Normas internacionales",
      "Alta confiabilidad",
      "Documentación completa"
    ],
    aplicaciones: "Validación de esterilización, control de calidad, asuntos regulatorios, investigación",
    especificaciones: {
      "Viabilidad": "> 98%",
      "Concentración": "10^9 UFC/ml",
      "Almacenamiento": "2-8°C, 24 meses",
      "Actividad": "Control de esterilización",
      "Forma de cultivo": "Liofilizado"
    }
  },
]

interface CartItem {
  cepaId: string
  cepaNombre: string
  codigo: string
  precio: number
  cantidad: number
}

export default function ATCCDetailClient({ cepaId }: { cepaId: string }) {
  const cepa = cepasATCC.find((c) => c.id === cepaId)
  const [cantidad, setCantidad] = useState(1)
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [showCarrito, setShowCarrito] = useState(false)
  const [showAgregarModal, setShowAgregarModal] = useState(false)
  const [enLista, setEnLista] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [cepaId])

  if (!cepa) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-emerald-600 text-lg font-semibold">Cepa no encontrada</p>
            <Link href="/cepas/atcc" className="text-emerald-600 hover:text-emerald-700 mt-4 inline-block">
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAgregarAlCarrito = () => {
    const existe = carrito.find((item) => item.cepaId === cepa.id)
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.cepaId === cepa.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        )
      )
    } else {
      setCarrito([
        ...carrito,
        {
          cepaId: cepa.id,
          cepaNombre: cepa.nombre,
          codigo: cepa.codigo,
          precio: cepa.precio,
          cantidad,
        },
      ])
    }
    setCantidad(1)
    setShowAgregarModal(false)
  }

  const removerDelCarrito = (id: string) => {
    setCarrito(carrito.filter((item) => item.cepaId !== id))
  }

  const generarMensajeWhatsApp = () => {
    const totalBase = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
    const mensaje =
      `*PEDIDO CEPAS ATCC - AS LABORATORIOS*\n\n` +
      `${carrito.map((item) => `• ${item.cepaNombre} (${item.codigo})\n   Cantidad: ${item.cantidad}\n   Precio unitario: S/ ${(item.precio - ENVIO_PERU).toFixed(2)}\n   Subtotal: S/ ${((item.precio - ENVIO_PERU) * item.cantidad).toFixed(2)}`).join("\n\n")}\n\n` +
      `---\n*RESUMEN DEL PEDIDO*\n` +
      `Subtotal: S/ ${carrito.reduce((sum, item) => sum + (item.precio - ENVIO_PERU) * item.cantidad, 0).toFixed(2)}\n` +
      `Envío a Trujillo: S/ ${ENVIO_PERU.toFixed(2)}\n` +
      `*TOTAL: S/ ${totalBase.toFixed(2)}*\n\n` +
      `Por favor confirmar disponibilidad y detalles de entrega.`

    const numeroWhatsApp = "51987654321"
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`
    window.open(enlaceWhatsApp, "_blank")
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-emerald-100">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/cepas/atcc"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al catálogo ATCC
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Información Principal - Columna 1-2 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-emerald-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-emerald-600 mb-2">{cepa.categoria}</p>
                    <h1 className="text-4xl font-bold text-emerald-900 mb-2">{cepa.nombre}</h1>
                    <p className="text-lg text-emerald-700 italic">{cepa.cientifico}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Código ATCC</p>
                    <p className="text-2xl font-bold text-emerald-900">{cepa.codigo}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {cepa.bsl}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {cepa.productFormat}
                  </span>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {cepa.referencia}
                  </span>
                </div>
              </div>

              {/* Descripción */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-emerald-100">
                <h2 className="text-2xl font-bold text-emerald-900 mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{cepa.descripcion}</p>

                <h3 className="text-lg font-bold text-emerald-900 mb-3">Beneficios principales</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cepa.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-gray-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Aplicaciones y Especificaciones */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-emerald-100">
                  <h3 className="text-lg font-bold text-emerald-900 mb-3">Aplicaciones</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{cepa.aplicaciones}</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-emerald-100">
                  <h3 className="text-lg font-bold text-emerald-900 mb-4">Especificaciones técnicas</h3>
                  <dl className="space-y-3 text-sm">
                    {Object.entries(cepa.especificaciones).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="text-emerald-700 font-semibold">{key}:</dt>
                        <dd className="text-gray-700">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Información técnica detallada */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <span className="text-lg">📋</span> Información Adicional
                </h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>
                    <strong>Depositado como:</strong> {cepa.depositedAs}
                  </p>
                  <p>
                    <strong>Designación de cepa:</strong> {cepa.strainDesignation || "—"}
                  </p>
                  <p>
                    <strong>Cepa tipo:</strong> {cepa.typeStrain}
                  </p>
                  <p>
                    <strong>Cantidad por pedido:</strong> {cepa.cantidad}
                  </p>
                  {cepa.link && (
                    <p>
                      <strong>Datos genómicos:</strong>{" "}
                      <a href={cepa.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                        Ver en NCBI
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Carrito - Columna 3 */}
            <div className="lg:col-span-1 space-y-4">
              {/* Card de Precio */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-lg p-6 shadow-lg sticky top-24">
                <p className="text-emerald-100 text-sm mb-2">Precio final (con envío a Trujillo)</p>
                <p className="text-5xl font-bold mb-2">S/ {cepa.precio.toFixed(2)}</p>
                <p className="text-emerald-100 text-xs mb-4">Incluye S/ {ENVIO_PERU.toFixed(2)} de envío</p>

                {cepa.disponibilidad ? (
                  <>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                      <label className="block text-sm font-semibold text-emerald-50 mb-2">Cantidad</label>
                      <input
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-3 py-2 rounded bg-white text-emerald-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </div>

                    <button
                      onClick={() => setShowAgregarModal(true)}
                      className="w-full bg-white text-emerald-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 mb-3"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Agregar al carrito
                    </button>

                    <button
                      onClick={() => setEnLista(!enLista)}
                      className={`w-full font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        enLista
                          ? "bg-red-200 text-red-700 hover:bg-red-300"
                          : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                      }`}
                    >
                      <Heart className="w-5 h-5" fill={enLista ? "currentColor" : "none"} />
                      {enLista ? "En lista" : "Agregar a lista"}
                    </button>
                  </>
                ) : (
                  <button className="w-full bg-gray-400 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed opacity-75">
                    <Lock className="w-5 h-5" />
                    No disponible
                  </button>
                )}
              </div>

              {/* Ver Genoma */}
              {cepa.link && (
                <a
                  href={cepa.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white border-2 border-emerald-300 text-emerald-700 font-bold py-3 rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Ver Genoma (NCBI)
                </a>
              )}

              {/* Carrito contador */}
              {carrito.length > 0 && (
                <button
                  onClick={() => setShowCarrito(true)}
                  className="w-full bg-emerald-100 border-2 border-emerald-300 text-emerald-700 font-bold py-3 rounded-lg hover:bg-emerald-200 transition-colors relative"
                >
                  <ShoppingCart className="w-5 h-5 mx-auto mb-1" />
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {carrito.length}
                  </span>
                  Ver carrito
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Agregar */}
      {showAgregarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-emerald-900">Confirmar pedido</h2>
              <button onClick={() => setShowAgregarModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg mb-4">
              <p className="font-bold text-emerald-900 mb-1">{cepa.nombre}</p>
              <p className="text-sm text-emerald-700 mb-3">{cepa.codigo}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-700">Cantidad:</span>
                  <span className="font-bold text-emerald-900">{cantidad}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700">Precio unitario:</span>
                  <span className="font-bold text-emerald-900">S/ {cepa.precio.toFixed(2)}</span>
                </div>
                <div className="border-t border-emerald-200 pt-2 flex justify-between">
                  <span className="text-emerald-900 font-bold">Subtotal:</span>
                  <span className="text-xl font-bold text-emerald-900">S/ {(cepa.precio * cantidad).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-4 text-center">El envío a Trujillo está incluido en el precio.</p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowAgregarModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAgregarAlCarrito}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Carrito */}
      {showCarrito && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-emerald-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-emerald-900">Mi carrito ({carrito.length})</h2>
              <button onClick={() => setShowCarrito(false)} className="text-emerald-600 hover:text-emerald-800">
                <X className="w-6 h-6" />
              </button>
            </div>

            {carrito.length === 0 ? (
              <div className="p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                <p className="text-lg text-emerald-700">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <div className="p-6 space-y-4">
                  {carrito.map((item) => (
                    <div key={item.cepaId} className="bg-emerald-50 rounded-lg p-4 flex items-center justify-between border border-emerald-200">
                      <div className="flex-1">
                        <h3 className="font-bold text-emerald-900">{item.cepaNombre}</h3>
                        <p className="text-sm text-emerald-600">{item.codigo}</p>
                        <p className="text-sm text-emerald-700 mt-2">
                          Cantidad: <span className="font-bold">{item.cantidad}</span> × S/ {(item.precio - ENVIO_PERU).toFixed(2)} = <span className="font-bold">S/ {((item.precio - ENVIO_PERU) * item.cantidad).toFixed(2)}</span>
                        </p>
                      </div>
                      <button onClick={() => removerDelCarrito(item.cepaId)} className="ml-4 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-50 border-t border-emerald-200 p-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-emerald-700">
                      <span>Subtotal:</span>
                      <span className="font-bold">S/ {carrito.reduce((sum, item) => sum + (item.precio - ENVIO_PERU) * item.cantidad, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Envío a Trujillo:</span>
                      <span className="font-bold">S/ {ENVIO_PERU.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-emerald-900 bg-white p-3 rounded-lg mt-4">
                      <span>TOTAL:</span>
                      <span>S/ {carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={generarMensajeWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-3 text-lg"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Comprar por WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
