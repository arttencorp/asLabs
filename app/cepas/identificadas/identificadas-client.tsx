"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, Download, Lock, X, ShoppingCart, Trash2, MessageCircle } from "lucide-react"
import Link from "next/link"

const ENVIO_PERU = 4500.00

interface CartItem {
  cepa: (typeof cepasIdentificadas)[0]
  cantidad: number
}

// Datos de Cepas Identificadas
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
    precioSinEnvio: 450.00,
    cantidad: "500 mL",
    referencia: "AS-BS-001",
    disponibilidad: true,
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
    precioSinEnvio: 450.00,
    cantidad: "500 mL",
    referencia: "AS-PF-001",
    disponibilidad: true,
  },
  {
    id: "id-3",
    nombre: "Azospirillum brasilense",
    codigo: "AS-AB-001",
    cientifico: "Azospirillum brasilense",
    bsl: "BSL-1",
    categoria: "Fijación de Nitrógeno",
    productFormat: "Polvo seco",
    strainDesignation: "Cepa nativa de suelos peruanos",
    depositedAs: "Azospirillum brasilense",
    typeStrain: "No",
    precio: 520.00,
    precioSinEnvio: 520.00,
    cantidad: "100 g",
    referencia: "AS-AB-001",
    disponibilidad: true,
  },
  {
    id: "id-4",
    nombre: "Bacillus megaterium",
    codigo: "AS-BM-001",
    cientifico: "Bacillus megaterium",
    bsl: "BSL-1",
    categoria: "Biocontrol",
    productFormat: "Líquido concentrado",
    strainDesignation: "Aislada de compost",
    depositedAs: "Bacillus megaterium",
    typeStrain: "No",
    precio: 480.00,
    precioSinEnvio: 480.00,
    cantidad: "500 mL",
    referencia: "AS-BM-001",
    disponibilidad: true,
  },
  {
    id: "id-5",
    nombre: "Trichoderma reesei",
    codigo: "AS-TR-001",
    cientifico: "Trichoderma reesei",
    bsl: "BSL-1",
    categoria: "Biocontrol",
    productFormat: "Polvo seco",
    strainDesignation: "Cepa antagonista de hongos",
    depositedAs: "Trichoderma reesei",
    typeStrain: "No",
    precio: 550.00,
    precioSinEnvio: 550.00,
    cantidad: "50 g",
    referencia: "AS-TR-001",
    disponibilidad: true,
  },
  {
    id: "id-6",
    nombre: "Streptomyces sp.",
    codigo: "AS-ST-001",
    cientifico: "Streptomyces sp.",
    bsl: "BSL-1",
    categoria: "Investigación",
    productFormat: "Cultivo en agar",
    strainDesignation: "Productora de antibióticos",
    depositedAs: "Streptomyces sp.",
    typeStrain: "No",
    precio: 580.00,
    precioSinEnvio: 580.00,
    cantidad: "Placa petri",
    referencia: "AS-ST-001",
    disponibilidad: true,
  },
]

const categorias = [
  "Biofertilizantes",
  "Fijación de Nitrógeno",
  "Biocontrol",
  "Investigación",
]

export default function IdentificadasClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [lista, setLista] = useState<typeof cepasIdentificadas>([])
  const [showCartModal, setShowCartModal] = useState(false)
  const [selectedCepaForCart, setSelectedCepaForCart] = useState<typeof cepasIdentificadas[0] | null>(null)
  const [cantidadCarrito, setCantidadCarrito] = useState(1)
  const [showCarrito, setShowCarrito] = useState(false)

  const handleAgregarAlCarrito = (cepa: typeof cepasIdentificadas[0]) => {
    setSelectedCepaForCart(cepa)
    setCantidadCarrito(1)
    setShowCartModal(true)
  }

  const confirmAgregar = () => {
    if (selectedCepaForCart) {
      const existente = carrito.find((item) => item.cepa.id === selectedCepaForCart.id)
      if (existente) {
        setCarrito(
          carrito.map((item) =>
            item.cepa.id === selectedCepaForCart.id
              ? { ...item, cantidad: item.cantidad + cantidadCarrito }
              : item
          )
        )
      } else {
        setCarrito([...carrito, { cepa: selectedCepaForCart, cantidad: cantidadCarrito }])
      }
      setShowCartModal(false)
    }
  }

  const handleAgregarALista = (cepa: typeof cepasIdentificadas[0]) => {
    const existe = lista.find((item) => item.id === cepa.id)
    if (!existe) {
      setLista([...lista, cepa])
    }
  }

  const removerDelCarrito = (id: string) => {
    setCarrito(carrito.filter((item) => item.cepa.id !== id))
  }

  const removerDeLista = (id: string) => {
    setLista(lista.filter((item) => item.id !== id))
  }

  const generarMensajeWhatsApp = () => {
    const totalBase = carrito.reduce((sum, item) => sum + item.cepa.precio * item.cantidad, 0)
    const subtotalBase = carrito.reduce((sum, item) => sum + (item.cepa.precio - ENVIO_PERU) * item.cantidad, 0)

    const lineasProductos = carrito.map((item) => {
      const precioUnit = (item.cepa.precio - ENVIO_PERU).toFixed(2)
      const subtotal = ((item.cepa.precio - ENVIO_PERU) * item.cantidad).toFixed(2)
      return "• " + item.cepa.nombre + " (" + item.cepa.codigo + ")\n" +
        "   Cantidad: " + item.cantidad + "\n" +
        "   Precio unitario: S/ " + precioUnit + "\n" +
        "   Subtotal: S/ " + subtotal
    }).join("\n\n")

    const mensaje =
      "*PEDIDO CEPAS IDENTIFICADAS - AS LABORATORIOS*\n\n" +
      lineasProductos + "\n\n" +
      "---\n*RESUMEN DEL PEDIDO*\n" +
      "Subtotal: S/ " + subtotalBase.toFixed(2) + "\n" +
      "Envio a Trujillo: S/ " + ENVIO_PERU.toFixed(2) + "\n" +
      "*TOTAL: S/ " + totalBase.toFixed(2) + "*\n\n" +
      "Por favor confirmar disponibilidad y detalles de entrega."

    const numeroWhatsApp = "51987654321"
    const enlaceWhatsApp = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensaje)
    window.open(enlaceWhatsApp, "_blank")
  }

  const filteredCepas = cepasIdentificadas.filter((cepa) => {
    const matchesSearch =
      cepa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cepa.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || cepa.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedCepas = [...filteredCepas].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.precio - b.precio
      case "price-high":
        return b.precio - a.precio
      case "name":
        return a.nombre.localeCompare(b.nombre)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section con Carrito Flotante */}
      <section className="bg-white border-b pt-12 pb-8 relative">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-bold text-emerald-900 mb-2">Cepas Identificadas</h1>
            <p className="text-emerald-700 font-light max-w-2xl">
              Cepas bacterianas identificadas y caracterizadas en AS Laboratorios. Bacterias benéficas para agricultura, biocontrol e investigación.
            </p>
          </div>
          {carrito.length > 0 && (
            <button
              onClick={() => setShowCarrito(true)}
              className="fixed bottom-8 right-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-40"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {carrito.length}
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Top Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="text-sm text-emerald-700">
              <p className="font-semibold">Resultados <span className="font-bold text-emerald-900">{filteredCepas.length}-{Math.min(itemsPerPage, filteredCepas.length)}</span> de <span className="font-bold text-emerald-900">{filteredCepas.length}</span></p>
            </div>

            <div className="flex gap-6 items-center flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-emerald-800">Ordenar por</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:border-emerald-500 bg-white text-emerald-900 font-medium text-sm"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="name">Nombre (A-Z)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-emerald-800">Mostrar por página</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:border-emerald-500 bg-white text-emerald-900 font-medium text-sm"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-12">
            {/* Sidebar Filters */}
            <div className="w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-emerald-900">Refinar búsqueda</h3>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory(null)
                    }}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors"
                  >
                    Limpiar búsqueda
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input
                      type="text"
                      placeholder="Buscar por código, nombre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-emerald-200 rounded focus:outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-3">Categoría</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!selectedCategory}
                        onChange={() => setSelectedCategory(null)}
                        className="w-4 h-4 rounded border-emerald-300"
                      />
                      <span className="text-sm text-emerald-700">Todas</span>
                    </label>
                    {categorias.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                          className="w-4 h-4 rounded border-emerald-300"
                        />
                        <span className="text-sm text-emerald-700">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="flex-1 space-y-1">
              {sortedCepas.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-emerald-600 text-lg">Sin resultados</p>
                </div>
              ) : (
                sortedCepas.slice(0, itemsPerPage).map((cepa) => (
                  <div
                    key={cepa.id}
                    className="border-b border-emerald-100 py-6 hover:bg-emerald-50 px-4 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:gap-12 lg:justify-between">
                      {/* Left: Info */}
                      <div className="flex-1 mb-6 lg:mb-0">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-xl">🧪</span>
                          <div className="flex-1">
                            <Link
                              href={`/cepas/identificadas/${cepa.id}`}
                              className="text-lg font-semibold text-emerald-900 hover:text-emerald-700 hover:underline transition-colors"
                            >
                              {cepa.nombre}
                            </Link>
                            <p className="text-emerald-700 text-sm">{cepa.codigo}</p>
                            <p className="text-emerald-600 text-xs font-light italic mt-1">{cepa.cientifico}</p>
                          </div>
                        </div>

                        <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-semibold mb-4">
                          {cepa.categoria}
                        </div>

                        <div className="space-y-2 text-sm text-emerald-700">
                          <p>
                            <span className="font-semibold text-emerald-900">Formato:</span> {cepa.productFormat}
                          </p>
                          <p>
                            <span className="font-semibold text-emerald-900">Cantidad:</span> {cepa.cantidad}
                          </p>
                          {cepa.strainDesignation && (
                            <p>
                              <span className="font-semibold text-emerald-900">Nota:</span> {cepa.strainDesignation}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Price and Actions */}
                      <div className="lg:w-72 flex-shrink-0 lg:text-right">
                        <div className="bg-emerald-50 rounded p-6 lg:p-4">
                          <p className="text-sm font-semibold text-emerald-700 mb-1">Precio base:</p>
                          <p className="text-3xl font-bold text-emerald-900 mb-1">S/ {cepa.precioSinEnvio.toFixed(2)}</p>
                          <p className="text-xs text-emerald-500 mb-2">+ S/ 4,500 envío desde ATCC a Perú</p>
                          <p className="text-xs text-gray-500 italic mb-4">* Referencial. Varía por tipo de cambio</p>
                          <p className="text-xs text-emerald-500 mb-4">{cepa.cantidad}</p>

                          {cepa.disponibilidad ? (
                            <>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm text-emerald-700">Cantidad</span>
                                <input type="number" min="1" defaultValue="1" className="w-16 px-2 py-1 border border-emerald-300 rounded text-sm" />
                              </div>
                              <button
                                onClick={() => handleAgregarAlCarrito(cepa)}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded mb-2 transition-colors flex items-center justify-center gap-2"
                              >
                                🛒 Agregar al carrito
                              </button>
                              <button
                                onClick={() => handleAgregarALista(cepa)}
                                className="w-full bg-white border-2 border-emerald-300 text-emerald-700 font-semibold py-2 rounded hover:bg-emerald-50 transition-colors text-sm"
                              >
                                ♡ Agregar a lista
                              </button>
                            </>
                          ) : (
                            <button className="w-full bg-emerald-300 text-emerald-800 font-bold py-3 rounded flex items-center justify-center gap-2 cursor-not-allowed">
                              <Lock className="w-4 h-4" />
                              Verificar disponibilidad
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Carrito - Agregar Producto */}
      {showCartModal && selectedCepaForCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-emerald-200">
              <h2 className="text-2xl font-bold text-emerald-900">Agregar al carrito</h2>
              <button
                onClick={() => setShowCartModal(false)}
                className="text-emerald-600 hover:text-emerald-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Información del Producto */}
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-emerald-600 font-semibold mb-1">CEPA IDENTIFICADA</p>
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">{selectedCepaForCart.nombre}</h3>
                  <p className="text-sm text-emerald-700 mb-3">{selectedCepaForCart.codigo}</p>
                  <p className="text-xs text-emerald-600 italic">{selectedCepaForCart.cientifico}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Detalles:</p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li><strong>Formato:</strong> {selectedCepaForCart.productFormat || "—"}</li>
                    <li><strong>Designación:</strong> {selectedCepaForCart.strainDesignation || "—"}</li>
                    <li><strong>Cantidad:</strong> {selectedCepaForCart.cantidad}</li>
                  </ul>
                </div>
              </div>

              {/* Precios y Cantidad */}
              <div className="space-y-4">
                <div className="bg-emerald-600 text-white p-6 rounded-lg">
                  <p className="text-sm text-emerald-100 mb-1">Precio por unidad (sin envío)</p>
                  <p className="text-4xl font-bold mb-4">S/ {(selectedCepaForCart.precio - ENVIO_PERU).toFixed(2)}</p>

                  <div className="bg-emerald-700 rounded p-3 mb-4 text-sm">
                    <p className="text-emerald-50 mb-1">+ Envío a Trujillo:</p>
                    <p className="text-2xl font-bold text-white">S/ {ENVIO_PERU.toFixed(2)}</p>
                  </div>

                  <p className="text-sm text-emerald-100 mb-2">Total por unidad</p>
                  <p className="text-3xl font-bold text-emerald-50">S/ {selectedCepaForCart.precio.toFixed(2)}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">Cantidad:</label>
                    <input
                      type="number"
                      min="1"
                      value={cantidadCarrito}
                      onChange={(e) => setCantidadCarrito(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-600 font-semibold text-lg"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700">
                      <strong>Nota:</strong> El envío mostrado es una estimación. El costo final dependerá del peso total del pedido.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 bg-gray-50 border-t border-emerald-200 rounded-b-lg">
              <button
                onClick={() => setShowCartModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAgregar}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ver Carrito */}
      {showCarrito && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-emerald-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-emerald-900">Mi Carrito ({carrito.length})</h2>
              <button
                onClick={() => setShowCarrito(false)}
                className="text-emerald-600 hover:text-emerald-800 transition-colors"
              >
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
                    <div key={item.cepa.id} className="bg-emerald-50 rounded-lg p-4 flex items-center justify-between border border-emerald-200 hover:border-emerald-400 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-bold text-emerald-900">{item.cepa.nombre}</h3>
                        <p className="text-sm text-emerald-600">{item.cepa.codigo}</p>
                        <p className="text-sm text-emerald-700 mt-2">
                          Cantidad: <span className="font-bold">{item.cantidad}</span> × S/ {(item.cepa.precio - ENVIO_PERU).toFixed(2)} = <span className="font-bold">S/ {((item.cepa.precio - ENVIO_PERU) * item.cantidad).toFixed(2)}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removerDelCarrito(item.cepa.id)}
                        className="ml-4 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-50 border-t border-emerald-200 p-6">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-emerald-700">
                      <span>Subtotal:</span>
                      <span className="font-bold">S/ {carrito.reduce((sum, item) => sum + (item.cepa.precio - ENVIO_PERU) * item.cantidad, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Envío a Trujillo:</span>
                      <span className="font-bold">S/ {ENVIO_PERU.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-emerald-900 bg-white p-3 rounded-lg mt-4">
                      <span>TOTAL:</span>
                      <span>S/ {carrito.reduce((sum, item) => sum + item.cepa.precio * item.cantidad, 0).toFixed(2)}</span>
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
    </div>
  )
}
