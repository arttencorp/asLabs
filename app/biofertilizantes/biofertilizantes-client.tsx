"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, Download, Lock, X, ShoppingCart, Trash2, MessageCircle } from "lucide-react"
import Link from "next/link"

const ENVIO_PERU = 155.00

// Datos de Biofertilizantes
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
    referencia: "AS-ST-001",
    disponibilidad: true,
  },
]

interface CartItem {
  producto: (typeof biofertilizantes)[0]
  cantidad: number
}

const categorias = [
  "Biofertilizantes",
  "Fijación de Nitrógeno",
  "Biocontrol",
  "Investigación",
]

export default function BiofertilizantesClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [lista, setLista] = useState<typeof biofertilizantes>([])
  const [showCartModal, setShowCartModal] = useState(false)
  const [selectedProductoForCart, setSelectedProductoForCart] = useState<typeof biofertilizantes[0] | null>(null)
  const [cantidadCarrito, setCantidadCarrito] = useState(1)
  const [showCarrito, setShowCarrito] = useState(false)

  const handleAgregarAlCarrito = (producto: typeof biofertilizantes[0]) => {
    setSelectedProductoForCart(producto)
    setCantidadCarrito(1)
    setShowCartModal(true)
  }

  const confirmAgregar = () => {
    if (selectedProductoForCart) {
      const existente = carrito.find((item) => item.producto.id === selectedProductoForCart.id)
      if (existente) {
        setCarrito(
          carrito.map((item) =>
            item.producto.id === selectedProductoForCart.id
              ? { ...item, cantidad: item.cantidad + cantidadCarrito }
              : item
          )
        )
      } else {
        setCarrito([...carrito, { producto: selectedProductoForCart, cantidad: cantidadCarrito }])
      }
      setShowCartModal(false)
    }
  }

  const handleAgregarALista = (producto: typeof biofertilizantes[0]) => {
    const existe = lista.find((item) => item.id === producto.id)
    if (!existe) {
      setLista([...lista, producto])
    }
  }

  const removerDelCarrito = (id: string) => {
    setCarrito(carrito.filter((item) => item.producto.id !== id))
  }

  const removerDeLista = (id: string) => {
    setLista(lista.filter((item) => item.id !== id))
  }

  const generarMensajeWhatsApp = () => {
    const totalBase = carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0)
    const subtotalBase = carrito.reduce((sum, item) => sum + (item.producto.precio - ENVIO_PERU) * item.cantidad, 0)

    const lineasProductos = carrito.map((item) => {
      const precioUnit = (item.producto.precio - ENVIO_PERU).toFixed(2)
      const subtotal = ((item.producto.precio - ENVIO_PERU) * item.cantidad).toFixed(2)
      return "• " + item.producto.nombre + " (" + item.producto.codigo + ")\n" +
        "   Cantidad: " + item.cantidad + "\n" +
        "   Precio unitario: S/ " + precioUnit + "\n" +
        "   Subtotal: S/ " + subtotal
    }).join("\n\n")

    const mensaje =
      "*PEDIDO BIOFERTILIZANTES - AS LABORATORIOS*\n\n" +
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

  const filteredCepas = biofertilizantes.filter((producto) => {
    const matchesSearch =
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || producto.categoria === selectedCategory
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
            <h1 className="text-4xl font-serif font-bold text-emerald-900 mb-2">Biofertilizantes</h1>
            <p className="text-emerald-700 font-light max-w-2xl">
              Microorganismos benéficos seleccionados para mejorar la salud del suelo y aumentar la productividad agrícola de forma sostenible.
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
                sortedCepas.slice(0, itemsPerPage).map((producto) => (
                  <div
                    key={producto.id}
                    className="border-b border-emerald-100 py-6 hover:bg-emerald-50 px-4 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:gap-12 lg:justify-between">
                      {/* Left: Image and Info */}
                      <div className="flex-1 mb-6 lg:mb-0">
                        <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden h-64 lg:h-80 flex items-center justify-center">
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-xl">🌱</span>
                          <div className="flex-1">
                            <Link
                              href={`/biofertilizantes/${producto.id}`}
                              className="text-lg font-semibold text-emerald-900 hover:text-emerald-700 hover:underline transition-colors"
                            >
                              {producto.nombre}
                            </Link>
                            <p className="text-emerald-700 text-sm">{producto.codigo}</p>
                            <p className="text-emerald-600 text-xs font-light italic mt-1">{producto.cientifico}</p>
                          </div>
                        </div>

                        <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-semibold mb-4">
                          {producto.categoria}
                        </div>

                        <div className="space-y-2 text-sm text-emerald-700">
                          <p>
                            <span className="font-semibold text-emerald-900">Formato:</span> {producto.productFormat}
                          </p>
                          <p>
                            <span className="font-semibold text-emerald-900">Cantidad:</span> {producto.cantidad}
                          </p>
                          <p>
                            <span className="font-semibold text-emerald-900">Cultivos:</span> {producto.aplicaciones}
                          </p>
                        </div>
                      </div>

                      {/* Right: Price and Actions */}
                      <div className="lg:w-72 flex-shrink-0 lg:text-right">
                        <div className="bg-emerald-50 rounded p-6 lg:p-4">
                          <p className="text-sm font-semibold text-emerald-700 mb-1">Precio base:</p>
                          <p className="text-3xl font-bold text-emerald-900 mb-1">S/ {(producto.precio - ENVIO_PERU).toFixed(2)}</p>
                          <p className="text-xs text-emerald-500 mb-4">+ S/ 155 envío a Trujillo, Perú</p>
                          <p className="text-xs text-emerald-500 mb-4">{producto.cantidad}</p>

                          {producto.disponibilidad ? (
                            <>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm text-emerald-700">Cantidad</span>
                                <input type="number" min="1" defaultValue="1" className="w-16 px-2 py-1 border border-emerald-300 rounded text-sm" />
                              </div>
                              <button
                                onClick={() => handleAgregarAlCarrito(producto)}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded mb-2 transition-colors flex items-center justify-center gap-2"
                              >
                                🛒 Agregar al carrito
                              </button>
                              <button
                                onClick={() => handleAgregarALista(producto)}
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
      {showCartModal && selectedProductoForCart && (
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
              {/* Imagen del Producto */}
              <div className="flex justify-center">
                <img
                  src={selectedProductoForCart.imagen}
                  alt={selectedProductoForCart.nombre}
                  className="w-full max-w-xs h-auto rounded-lg shadow-md"
                />
              </div>

              {/* Información del Producto */}
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-emerald-600 font-semibold mb-1">BIOFERTILIZANTE</p>
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">{selectedProductoForCart.nombre}</h3>
                  <p className="text-sm text-emerald-700 mb-3">{selectedProductoForCart.codigo}</p>
                  <p className="text-xs text-emerald-600 italic">{selectedProductoForCart.cientifico}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Información:</p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li><strong>Formato:</strong> {selectedProductoForCart.productFormat}</li>
                    <li><strong>Cantidad:</strong> {selectedProductoForCart.cantidad}</li>
                    <li><strong>Cultivos:</strong> {selectedProductoForCart.aplicaciones}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Precios y Cantidad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="bg-emerald-600 text-white p-6 rounded-lg">
                <p className="text-sm text-emerald-100 mb-1">Precio por unidad (sin envío)</p>
                <p className="text-4xl font-bold mb-4">S/ {(selectedProductoForCart.precio - ENVIO_PERU).toFixed(2)}</p>

                <div className="bg-emerald-700 rounded p-3 mb-4 text-sm">
                  <p className="text-emerald-50 mb-1">+ Envío a Trujillo:</p>
                  <p className="text-2xl font-bold text-white">S/ {ENVIO_PERU.toFixed(2)}</p>
                </div>

                <p className="text-sm text-emerald-100 mb-2">Total por unidad</p>
                <p className="text-3xl font-bold text-emerald-50">S/ {selectedProductoForCart.precio.toFixed(2)}</p>
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
                    <div key={item.producto.id} className="bg-emerald-50 rounded-lg p-4 flex items-center justify-between border border-emerald-200 hover:border-emerald-400 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-bold text-emerald-900">{item.producto.nombre}</h3>
                        <p className="text-sm text-emerald-600">{item.producto.codigo}</p>
                        <p className="text-sm text-emerald-700 mt-2">
                          Cantidad: <span className="font-bold">{item.cantidad}</span> × S/ {(item.producto.precio - ENVIO_PERU).toFixed(2)} = <span className="font-bold">S/ {((item.producto.precio - ENVIO_PERU) * item.cantidad).toFixed(2)}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removerDelCarrito(item.producto.id)}
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
                      <span className="font-bold">S/ {carrito.reduce((sum, item) => sum + (item.producto.precio - ENVIO_PERU) * item.cantidad, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Envío a Trujillo:</span>
                      <span className="font-bold">S/ {ENVIO_PERU.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-emerald-900 bg-white p-3 rounded-lg mt-4">
                      <span>TOTAL:</span>
                      <span>S/ {carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0).toFixed(2)}</span>
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
