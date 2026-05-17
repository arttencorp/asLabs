"use client"

import { useState } from "react"
import { ShoppingCart, Filter, Search, Plus, Minus, X, MessageSquare } from "lucide-react"

interface Cepa {
  id: string
  nombre: string
  cientifico: string
  categoria: string
  precio: number
  imagen: string
  descripcion: string
  beneficios: string[]
  presentacion: string
  cantidad: number
}

const cepas: Cepa[] = [
  {
    id: "1",
    nombre: "Trichoderma harzianum",
    cientifico: "Trichoderma harzianum",
    categoria: "Control Biológico",
    precio: 45.00,
    imagen: "bg-green-100",
    descripcion: "Hongo antagonista para control de enfermedades fúngicas del suelo",
    beneficios: ["Control de pudriciones radiculares", "Mejora de absorción de nutrientes", "Estimulación de crecimiento"],
    presentacion: "250ml",
    cantidad: 0,
  },
  {
    id: "2",
    nombre: "Beauveria bassiana",
    cientifico: "Beauveria bassiana",
    categoria: "Control de Plagas",
    precio: 52.00,
    imagen: "bg-blue-100",
    descripcion: "Hongo entomopatógeno para control biológico de plagas",
    beneficios: ["Control de insectos plaga", "Compatible con otras cepas", "Largo período de vida útil"],
    presentacion: "250ml",
    cantidad: 0,
  },
  {
    id: "3",
    nombre: "Bacillus subtilis",
    cientifico: "Bacillus subtilis",
    categoria: "Biofertilizante",
    precio: 38.00,
    imagen: "bg-amber-100",
    descripcion: "Bacteria promotora del crecimiento vegetal y fijadora de nitrógeno",
    beneficios: ["Aumenta disponibilidad de nutrientes", "Mejora la salud del suelo", "Estimula el desarrollo radicular"],
    presentacion: "500ml",
    cantidad: 0,
  },
  {
    id: "4",
    nombre: "Pseudomonas fluorescens",
    cientifico: "Pseudomonas fluorescens",
    categoria: "Biofertilizante",
    precio: 40.00,
    imagen: "bg-teal-100",
    descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento",
    beneficios: ["Solubiliza fosfato inorgánico", "Produce fitohormonas", "Reduce patógenos del suelo"],
    presentacion: "500ml",
    cantidad: 0,
  },
  {
    id: "5",
    nombre: "Azospirillum brasilense",
    cientifico: "Azospirillum brasilense",
    categoria: "Biofertilizante",
    precio: 42.00,
    imagen: "bg-lime-100",
    descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas",
    beneficios: ["Fija nitrógeno del aire", "Reduce uso de fertilizantes", "Mejora estrés hídrico"],
    presentacion: "500ml",
    cantidad: 0,
  },
  {
    id: "6",
    nombre: "Metarhizium anisopliae",
    cientifico: "Metarhizium anisopliae",
    categoria: "Control de Plagas",
    precio: 55.00,
    imagen: "bg-rose-100",
    descripcion: "Hongo entomopatógeno para control de insectos del suelo",
    beneficios: ["Control de plagas subterráneas", "Acción sistémica", "Seguro para fauna benéfica"],
    presentacion: "250ml",
    cantidad: 0,
  },
  {
    id: "7",
    nombre: "Streptomyces lydicus",
    cientifico: "Streptomyces lydicus",
    categoria: "Control Biológico",
    precio: 48.00,
    imagen: "bg-indigo-100",
    descripcion: "Actinobacteria productora de antibióticos naturales para control de patógenos",
    beneficios: ["Produce compuestos antimicrobianos", "Eficaz contra hongos y bacterias", "Estimula defensa vegetal"],
    presentacion: "500ml",
    cantidad: 0,
  },
  {
    id: "8",
    nombre: "Bacillus megaterium",
    cientifico: "Bacillus megaterium",
    categoria: "Biofertilizante",
    precio: 39.00,
    imagen: "bg-cyan-100",
    descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal",
    beneficios: ["Solubiliza potasio y fosfato", "Mejora fertilidad del suelo", "Aumenta producción"],
    presentacion: "500ml",
    cantidad: 0,
  },
]

export default function CepasClient() {
  const [productos, setProductos] = useState<Cepa[]>(cepas)
  const [filtroCategoria, setFiltroCategoria] = useState<string>("Todos")
  const [cartCount, setCartCount] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const categorias = ["Todos", ...new Set(cepas.map((c) => c.categoria))]

  const productosFiltrados = productos.filter((cepa) => {
    const cumpleCategoria = filtroCategoria === "Todos" || cepa.categoria === filtroCategoria
    const cumpleBusqueda =
      cepa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cepa.cientifico.toLowerCase().includes(searchTerm.toLowerCase())
    return cumpleCategoria && cumpleBusqueda
  })

  const agregarAlCarrito = (id: string) => {
    setProductos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          setCartCount((prev) => prev + 1)
          return { ...p, cantidad: p.cantidad + 1 }
        }
        return p
      })
    )
  }

  const removerDelCarrito = (id: string) => {
    setProductos((prev) =>
      prev.map((p) => {
        if (p.id === id && p.cantidad > 0) {
          setCartCount((prev) => prev - 1)
          return { ...p, cantidad: p.cantidad - 1 }
        }
        return p
      })
    )
  }

  const itemsEnCarrito = productos.filter((p) => p.cantidad > 0)
  const total = itemsEnCarrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Header fijo */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">AS Cepas</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Cepas Biológicas de Calidad</h2>
          <p className="text-xl text-green-100 max-w-2xl">
            Soluciones biológicas certificadas para control de plagas, enfermedades y mejora de nutrición en tus cultivos
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </h3>

              {/* Búsqueda */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Buscar</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nombre o científico..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Categorías */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Categoría</h4>
                <div className="space-y-2">
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFiltroCategoria(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filtroCategoria === cat
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

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Search */}
            <div className="lg:hidden mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar cepas..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                />
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Category Filter Mobile */}
            <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    filtroCategoria === cat
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products */}
            <div className="grid md:grid-cols-2 gap-6">
              {productosFiltrados.map((cepa) => (
                <div
                  key={cepa.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Imagen placeholder */}
                  <div className={`${cepa.imagen} h-48 flex items-center justify-center text-4xl`}>
                    <div className="text-center">
                      <div className="text-6xl mb-2">🧬</div>
                      <p className="text-sm text-gray-600">{cepa.presentacion}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{cepa.nombre}</h3>
                    <p className="text-sm text-gray-600 italic mb-3">{cepa.cientifico}</p>

                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        {cepa.categoria}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-4">{cepa.descripcion}</p>

                    {/* Beneficios */}
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-gray-800 mb-2">Beneficios:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {cepa.beneficios.map((beneficio, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            {beneficio}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and Cart */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">S/ {cepa.precio.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{cepa.presentacion}</p>
                      </div>

                      {cepa.cantidad === 0 ? (
                        <button
                          onClick={() => agregarAlCarrito(cepa.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          <Plus className="w-5 h-5" />
                          Agregar
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                          <button
                            onClick={() => removerDelCarrito(cepa.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-gray-900 min-w-4 text-center">{cepa.cantidad}</span>
                          <button
                            onClick={() => agregarAlCarrito(cepa.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No se encontraron cepas que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 lg:z-40">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCart(false)}
          ></div>

          {/* Cart Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Tu Carrito</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-auto p-6 space-y-4">
              {itemsEnCarrito.length > 0 ? (
                itemsEnCarrito.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                    <div className={`${item.imagen} w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <div className="text-2xl">🧬</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm">{item.nombre}</h3>
                      <p className="text-xs text-gray-600 mb-2">S/ {item.precio.toFixed(2)} c/u</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removerDelCarrito(item.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-gray-900 min-w-4 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => agregarAlCarrito(item.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 py-8">Tu carrito está vacío</p>
              )}
            </div>

            {/* Footer */}
            {itemsEnCarrito.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">S/ {total.toFixed(2)}</span>
                </div>
                <a
                  href="https://wa.me/51961996645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
                >
                  <MessageSquare className="w-5 h-5" />
                  Completar Pedido por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Necesitas Asesoría?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Nuestros especialistas están disponibles para ayudarte a elegir la cepa más adecuada para tu cultivo
          </p>
          <a
            href="https://wa.me/51961996645"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
          >
            <MessageSquare className="w-5 h-5" />
            Contactar Ahora
          </a>
        </div>
      </section>
    </div>
  )
}
