"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, Download, Lock } from "lucide-react"

// Datos de Cepas ATCC - Solo BSL1
const cepasATCC = [
  {
    id: "atcc-6",
    nombre: "Candida albicans",
    codigo: "ATCC 10231",
    cientifico: "Candida albicans",
    bsl: "BSL 1",
    categoria: "Hongos Patógenos",
    productFormat: "Liofilizado",
    strainDesignation: "SC5314",
    depositedAs: "Candida albicans",
    typeStrain: "Sí",
    precio: 275.25,
    envase: "x 2 u.",
    referencia: "S00006-MSC",
    documentos: ["Ver Genoma", "Manual de Cultivo", "Certificado ATCC"],
    disponibilidad: true,
  },
  {
    id: "atcc-7",
    nombre: "Bacillus subtilis",
    codigo: "ATCC 6633",
    cientifico: "Bacillus subtilis subsp. subtilis",
    bsl: "BSL 1",
    categoria: "Control Biológico",
    productFormat: "Liofilizado",
    strainDesignation: "str. 168",
    depositedAs: "Bacillus subtilis",
    typeStrain: "Sí",
    precio: 234.75,
    envase: "x 2 u.",
    referencia: "S00007-MSC",
    documentos: ["Ver Genoma", "Genoma Secuenciado", "Certificado ATCC"],
    disponibilidad: true,
  },
  {
    id: "atcc-8",
    nombre: "Saccharomyces cerevisiae",
    codigo: "ATCC 9763",
    cientifico: "Saccharomyces cerevisiae Meyen ex E.C. Hansen",
    bsl: "BSL 1",
    categoria: "Levaduras",
    productFormat: "Liofilizado",
    strainDesignation: "NRRL Y-567",
    depositedAs: "Saccharomyces cerevisiae Hansen",
    typeStrain: "No",
    precio: 256.50,
    envase: "x 2 u.",
    referencia: "S00008-MSC",
    documentos: ["Ver Genoma", "Datos Genómicos", "Certificado ATCC"],
    disponibilidad: true,
  },
  {
    id: "atcc-9",
    nombre: "Escherichia coli K-12",
    codigo: "ATCC 10798",
    cientifico: "Escherichia coli K-12",
    bsl: "BSL 1",
    categoria: "Control Biológico",
    productFormat: "Liofilizado",
    strainDesignation: "K-12 (MG1655)",
    depositedAs: "Escherichia coli",
    typeStrain: "Sí",
    precio: 245.00,
    envase: "x 2 u.",
    referencia: "S00009-MSC",
    documentos: ["Ver Genoma", "Perfil de Resistencia", "Certificado ATCC"],
    disponibilidad: true,
  },
  {
    id: "atcc-10",
    nombre: "Lactobacillus plantarum",
    codigo: "ATCC 14431",
    cientifico: "Lactobacillus plantarum",
    bsl: "BSL 1",
    categoria: "Probióticos",
    productFormat: "Liofilizado",
    strainDesignation: "NCIMB 8826",
    depositedAs: "Lactobacillus plantarum",
    typeStrain: "No",
    precio: 289.75,
    envase: "x 2 u.",
    referencia: "S00010-MSC",
    documentos: ["Ver Genoma", "Manual de Cultivo", "Certificado ATCC"],
    disponibilidad: true,
  },
  {
    id: "atcc-11",
    nombre: "Aspergillus brasiliensis",
    codigo: "ATCC 16404",
    cientifico: "Aspergillus brasiliensis",
    bsl: "BSL 1",
    categoria: "Hongos",
    productFormat: "Liofilizado",
    strainDesignation: "ATCC 16404™",
    depositedAs: "Aspergillus brasiliensis",
    typeStrain: "Sí",
    precio: 268.50,
    envase: "x 2 u.",
    referencia: "S00011-MSC",
    documentos: ["Ver Genoma", "Protocolos", "Certificado ATCC"],
    disponibilidad: true,
  },
]

const categorias = ["Hongos Patógenos", "Control Biológico", "Levaduras", "Probióticos", "Hongos"]

export default function ATCCClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [itemsPerPage, setItemsPerPage] = useState(24)

  const filteredCepas = cepasATCC.filter((cepa) => {
    const matchesSearch =
      cepa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cepa.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cepa.cientifico.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || cepa.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedCepas = [...filteredCepas].sort((a, b) => {
    if (sortBy === "price-low") return a.precio - b.precio
    if (sortBy === "price-high") return b.precio - a.precio
    if (sortBy === "name") return a.nombre.localeCompare(b.nombre)
    return 0
  })

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b pt-12 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-emerald-900 mb-2">Cepas ATCC</h1>
          <p className="text-emerald-700 font-light max-w-2xl">
            Cepas referencia internacional certificadas BSL-1. Importación desde USA con garantía de identidad, viabilidad y trazabilidad bajo normas ISO.
          </p>
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
                      placeholder="Buscar por código ATCC, nombre..."
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
                          <span className="text-xl">🧬</span>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-emerald-900">{cepa.nombre}</h3>
                            <p className="text-emerald-700 text-sm">{cepa.codigo}</p>
                            <p className="text-emerald-600 text-xs font-light italic mt-1">{cepa.cientifico}</p>
                          </div>
                        </div>

                        <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-semibold mb-4">
                          {cepa.bsl}
                        </div>

                        <div className="grid grid-cols-2 gap-6 text-sm mb-4">
                          <div>
                            <p className="font-bold text-emerald-900">Formato del producto:</p>
                            <p className="text-emerald-700">{cepa.productFormat}</p>
                          </div>
                          <div>
                            <p className="font-bold text-emerald-900">Designación de cepa:</p>
                            <p className="text-emerald-700 text-xs">{cepa.strainDesignation}</p>
                          </div>
                          <div>
                            <p className="font-bold text-emerald-900">Depositado como:</p>
                            <p className="text-emerald-700 italic">{cepa.depositedAs}</p>
                          </div>
                          <div>
                            <p className="font-bold text-emerald-900">Cepa tipo:</p>
                            <p className="text-emerald-700">{cepa.typeStrain}</p>
                          </div>
                        </div>

                        {/* Documents and Actions */}
                        <div className="flex gap-3 flex-wrap">
                          {cepa.documentos.includes("Ver Genoma") && (
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-semibold text-sm transition-colors flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Ver Genoma
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right: Price and Actions */}
                      <div className="lg:w-72 flex-shrink-0 lg:text-right">
                        <div className="bg-emerald-50 rounded p-6 lg:p-4">
                          <p className="text-sm font-semibold text-emerald-700 mb-2">Precio: <span className="text-2xl font-bold text-emerald-900">${cepa.precio.toFixed(2)}</span> <span className="text-sm font-normal">c/u</span></p>
                          <p className="text-sm text-emerald-600 mb-3">{cepa.referencia}</p>
                          <p className="text-sm text-emerald-600 mb-4">{cepa.envase}</p>

                          {cepa.disponibilidad ? (
                            <>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm text-emerald-700">Cantidad</span>
                                <input type="number" min="1" defaultValue="1" className="w-16 px-2 py-1 border border-emerald-300 rounded text-sm" />
                              </div>
                              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded mb-2 transition-colors flex items-center justify-center gap-2">
                                🛒 Agregar al carrito
                              </button>
                              <button className="w-full bg-white border-2 border-emerald-300 text-emerald-700 font-semibold py-2 rounded hover:bg-emerald-50 transition-colors text-sm">
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

      <Footer />
    </div>
  )
}
