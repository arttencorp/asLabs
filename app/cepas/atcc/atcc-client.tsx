"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, Download, Lock } from "lucide-react"

// Datos de Cepas ATCC
const cepasATCC = [
  {
    id: "atcc-1",
    nombre: "Salmonella typhimurium",
    codigo: "ATCC 14028",
    cientifico: "Salmonella enterica subsp. enterica serovar Typhimurium",
    bsl: "BSL 2",
    categoria: "Patógenos Humanos",
    productFormat: "Freeze-dried",
    strainDesignation: "NRRL Y-567 [CBS 2978, CBS 5900, CCY 21-4-48, CCY 21-4-54, NCTC 10716, NCTC 7239, NCYC 87, Pattee 6, PCI M-50]",
    depositedAs: "Salmonella enterica Hansen",
    typeStrain: "No",
    precio: 245.00,
    envase: "x 2 u.",
    referencia: "S00001-MSC",
    documentos: ["Download genome", "Ficha Técnica PDF", "Certificado ATCC"],
    disponibilidad: true,
  },
  {
    id: "atcc-2",
    nombre: "Listeria monocytogenes",
    codigo: "ATCC 19115",
    cientifico: "Listeria monocytogenes",
    bsl: "BSL 2",
    categoria: "Patógenos Humanos",
    productFormat: "Frozen",
    strainDesignation: "Sb48",
    depositedAs: "Listeria monocytogenes, Seguela, nomen",
    typeStrain: "No",
    precio: 268.50,
    envase: "x 2 u.",
    referencia: "S00002-MSC",
    documentos: ["Download genome", "Ficha Técnica PDF", "Manual de Manejo"],
    disponibilidad: true,
  },
  {
    id: "atcc-3",
    nombre: "Escherichia coli O157:H7",
    codigo: "ATCC 43889",
    cientifico: "Escherichia coli O157:H7",
    bsl: "BSL 2",
    categoria: "Patógenos Humanos",
    productFormat: "Freeze-dried",
    strainDesignation: "O157:H7 (EHEC)",
    depositedAs: "Escherichia coli Hansen",
    typeStrain: "No",
    precio: 289.75,
    envase: "x 2 u.",
    referencia: "S00003-MSC",
    documentos: ["Download genome", "Ficha Técnica PDF", "Datos Genómicos"],
    disponibilidad: true,
  },
  {
    id: "atcc-4",
    nombre: "Vibrio cholerae",
    codigo: "ATCC 14033",
    cientifico: "Vibrio cholerae",
    bsl: "BSL 3",
    categoria: "Patógenos Humanos",
    productFormat: "Frozen",
    strainDesignation: "Classical",
    depositedAs: "Vibrio cholerae Inaba",
    typeStrain: "No",
    precio: 312.00,
    envase: "x 2 u.",
    referencia: "S00004-MSC",
    documentos: ["Download genome", "Ficha Técnica PDF", "Protocolos"],
    disponibilidad: false,
  },
  {
    id: "atcc-5",
    nombre: "Staphylococcus aureus (MRSA)",
    codigo: "ATCC 43300",
    cientifico: "Staphylococcus aureus subsp. aureus",
    bsl: "BSL 2",
    categoria: "Resistencia Antibiótica",
    productFormat: "Freeze-dried",
    strainDesignation: "MRSA (mecA positive)",
    depositedAs: "Staphylococcus aureus",
    typeStrain: "No",
    precio: 295.50,
    envase: "x 2 u.",
    referencia: "S00005-MSC",
    documentos: ["Download genome", "Perfil de Resistencia", "Certificado ATCC"],
    disponibilidad: true,
  },
  {
    id: "atcc-6",
    nombre: "Candida albicans",
    codigo: "ATCC 10231",
    cientifico: "Candida albicans",
    bsl: "BSL 1",
    categoria: "Hongos Patógenos",
    productFormat: "Freeze-dried",
    strainDesignation: "SC5314",
    depositedAs: "Candida albicans",
    typeStrain: "Yes",
    precio: 275.25,
    envase: "x 2 u.",
    referencia: "S00006-MSC",
    documentos: ["Download genome", "Manual de Cultivo", "Certificado ATCC"],
    disponibilidad: true,
  },
  {
    id: "atcc-7",
    nombre: "Bacillus subtilis",
    codigo: "ATCC 6633",
    cientifico: "Bacillus subtilis subsp. subtilis",
    bsl: "BSL 1",
    categoria: "Control Biológico",
    productFormat: "Freeze-dried",
    strainDesignation: "str. 168",
    depositedAs: "Bacillus subtilis",
    typeStrain: "Yes",
    precio: 234.75,
    envase: "x 2 u.",
    referencia: "S00007-MSC",
    documentos: ["Download genome", "Genoma Secuenciado", "Certificado ATCC"],
    disponibilidad: true,
  },
]

const categorias = ["Patógenos Humanos", "Resistencia Antibiótica", "Hongos Patógenos", "Control Biológico"]

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
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Cepas ATCC</h1>
          <p className="text-gray-600 font-light max-w-2xl">
            Cepas referencia internacional certificadas. Importación desde USA con garantía de identidad, viabilidad y trazabilidad bajo normas ISO.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Top Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="text-sm text-gray-600">
              <p className="font-semibold">Results <span className="font-bold text-gray-900">{filteredCepas.length}-{Math.min(itemsPerPage, filteredCepas.length)}</span> of <span className="font-bold text-gray-900">{filteredCepas.length}</span></p>
            </div>

            <div className="flex gap-6 items-center flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500 bg-white text-gray-900 font-medium text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Show per page</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500 bg-white text-gray-900 font-medium text-sm"
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
                  <h3 className="font-semibold text-gray-900">Refine by</h3>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory(null)
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
                  >
                    Clear your search
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search ATCC, name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Content type</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!selectedCategory}
                        onChange={() => setSelectedCategory(null)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">All</span>
                    </label>
                    {categorias.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{cat}</span>
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
                  <p className="text-gray-600 text-lg">No results found</p>
                </div>
              ) : (
                sortedCepas.slice(0, itemsPerPage).map((cepa) => (
                  <div
                    key={cepa.id}
                    className="border-b border-gray-200 py-6 hover:bg-gray-50 px-4 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:gap-12 lg:justify-between">
                      {/* Left: Info */}
                      <div className="flex-1 mb-6 lg:mb-0">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-xl">🧬</span>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{cepa.nombre}</h3>
                            <p className="text-gray-600 text-sm">{cepa.codigo}</p>
                            <p className="text-gray-500 text-xs font-light italic mt-1">{cepa.cientifico}</p>
                          </div>
                        </div>

                        <div className="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded text-xs font-semibold mb-4">
                          {cepa.bsl}
                        </div>

                        <div className="grid grid-cols-2 gap-6 text-sm mb-4">
                          <div>
                            <p className="font-bold text-gray-900">Product format:</p>
                            <p className="text-gray-600">{cepa.productFormat}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Strain designation:</p>
                            <p className="text-gray-600 text-xs">{cepa.strainDesignation}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Deposited as:</p>
                            <p className="text-gray-600 italic">{cepa.depositedAs}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Type strain:</p>
                            <p className="text-gray-600">{cepa.typeStrain}</p>
                          </div>
                        </div>

                        {/* Documents and Actions */}
                        <div className="flex gap-3 flex-wrap">
                          {cepa.documentos.includes("Download genome") && (
                            <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded font-semibold text-sm transition-colors flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Download genome
                            </button>
                          )}
                          <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-sm font-semibold text-gray-700">Compare</span>
                          </label>
                        </div>
                      </div>

                      {/* Right: Price and Actions */}
                      <div className="lg:w-72 flex-shrink-0 lg:text-right">
                        <div className="bg-gray-50 rounded p-6 lg:p-4">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Price: <span className="text-2xl font-bold text-gray-900">${cepa.precio.toFixed(2)}</span> <span className="text-sm font-normal">ea</span></p>
                          <p className="text-sm text-gray-600 mb-3">{cepa.referencia}</p>
                          <p className="text-sm text-gray-600 mb-4">{cepa.envase}</p>

                          {cepa.disponibilidad ? (
                            <>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm text-gray-600">Quantity</span>
                                <input type="number" min="1" defaultValue="1" className="w-16 px-2 py-1 border border-gray-300 rounded text-sm" />
                              </div>
                              <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded mb-2 transition-colors flex items-center justify-center gap-2">
                                🛒 Add to Cart
                              </button>
                              <button className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded hover:bg-gray-50 transition-colors text-sm">
                                ♡ Add to List
                              </button>
                            </>
                          ) : (
                            <button className="w-full bg-gray-300 text-gray-600 font-bold py-3 rounded flex items-center justify-center gap-2 cursor-not-allowed">
                              <Lock className="w-4 h-4" />
                              Check availability
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
