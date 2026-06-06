"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Search, Filter, Download, Lock, TrendingUp, FileText } from "lucide-react"

// Datos de Cepas ATCC
const cepasATCC = [
  {
    id: "atcc-1",
    nombre: "Salmonella typhimurium",
    codigo: "ATCC 14028",
    cientifico: "Salmonella enterica subsp. enterica serovar Typhimurium",
    categoria: "Patógenos Humanos",
    descripcion: "Cepa referencia para investigación de patogénesis y control de patógenos en alimentos",
    precio: 245.00,
    envase: "x 2 u.",
    referencia: "S00001-MSC",
    documentos: ["Ficha Técnica PDF", "Certificado ATCC", "Protocolos"],
    disponibilidad: true,
  },
  {
    id: "atcc-2",
    nombre: "Listeria monocytogenes",
    codigo: "ATCC 19115",
    cientifico: "Listeria monocytogenes",
    categoria: "Patógenos Humanos",
    descripcion: "Inocuo de control para validación de sistemas de detección en alimentos",
    precio: 268.50,
    envase: "x 2 u.",
    referencia: "S00002-MSC",
    documentos: ["Ficha Técnica PDF", "Certificado ATCC", "Manual de Manejo"],
    disponibilidad: true,
  },
  {
    id: "atcc-3",
    nombre: "Escherichia coli O157:H7",
    codigo: "ATCC 43889",
    cientifico: "Escherichia coli O157:H7",
    categoria: "Patógenos Humanos",
    descripcion: "Serotipo enterohemorrágico para estudios de virulencia y epidemiología",
    precio: 289.75,
    envase: "x 2 u.",
    referencia: "S00003-MSC",
    documentos: ["Ficha Técnica PDF", "Certificado ATCC", "Datos Genómicos"],
    disponibilidad: true,
  },
  {
    id: "atcc-4",
    nombre: "Vibrio cholerae",
    codigo: "ATCC 14033",
    cientifico: "Vibrio cholerae",
    categoria: "Patógenos Humanos",
    descripcion: "Referencia para investigación de enfermedades infecciosas y desarrollo de vacunas",
    precio: 312.00,
    envase: "x 2 u.",
    referencia: "S00004-MSC",
    documentos: ["Ficha Técnica PDF", "Certificado ATCC", "Datos Genómicos"],
    disponibilidad: false,
  },
  {
    id: "atcc-5",
    nombre: "Staphylococcus aureus (MRSA)",
    codigo: "ATCC 43300",
    cientifico: "Staphylococcus aureus",
    categoria: "Resistencia Antibiótica",
    descripcion: "Cepa multirresistente ATCC para investigación de antibióticos y control microbiano",
    precio: 295.50,
    envase: "x 2 u.",
    referencia: "S00005-MSC",
    documentos: ["Ficha Técnica PDF", "Certificado ATCC", "Perfil de Resistencia"],
    disponibilidad: true,
  },
  {
    id: "atcc-6",
    nombre: "Candida albicans",
    codigo: "ATCC 10231",
    cientifico: "Candida albicans",
    categoria: "Hongos Patógenos",
    descripcion: "Levadura ATCC para estudios de patógenos oportunistas y desarrollo antifúngico",
    precio: 275.25,
    envase: "x 2 u.",
    referencia: "S00006-MSC",
    documentos: ["Ficha Técnica PDF", "Certificado ATCC", "Manual de Cultivo"],
    disponibilidad: true,
  },
  {
    id: "atcc-7",
    nombre: "Bacillus subtilis",
    codigo: "ATCC 6633",
    cientifico: "Bacillus subtilis",
    categoria: "Control Biológico",
    descripcion: "Cepa modelo para investigación en microbiología molecular y biotecnología",
    precio: 234.75,
    envase: "x 2 u.",
    referencia: "S00007-MSC",
    documentos: ["Ficha Técnica PDF", "Certificado ATCC", "Genoma Secuenciado"],
    disponibilidad: true,
  },
]

const categorias = ["Patógenos Humanos", "Resistencia Antibiótica", "Hongos Patógenos", "Control Biológico"]

export default function ATCCClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [itemsPerPage, setItemsPerPage] = useState(12)

  const filteredCepas = cepasATCC.filter((cepa) => {
    const matchesSearch =
      cepa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cepa.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cepa.cientifico.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || cepa.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sorting
  const sortedCepas = [...filteredCepas].sort((a, b) => {
    if (sortBy === "price-low") return a.precio - b.precio
    if (sortBy === "price-high") return b.precio - a.precio
    if (sortBy === "name") return a.nombre.localeCompare(b.nombre)
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white py-16 border-b-4 border-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-black mb-3">Cepas ATCC</h1>
          <p className="text-blue-50 text-lg font-light max-w-3xl">
            Cepas referencia internacional certificadas. Importación desde USA con garantía de identidad, viabilidad y trazabilidad completa bajo normas ISO.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-16">
          {/* Header with Sort and Results */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="text-slate-700 font-black text-lg">
                Resultados: <span className="text-blue-600">{sortedCepas.length}</span> de {cepasATCC.length} cepas
              </p>
              <p className="text-slate-600 text-sm mt-1">Mostrando hasta {itemsPerPage} por página</p>
            </div>

            <div className="flex gap-4 flex-col md:flex-row md:items-center">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-slate-700 font-bold text-sm">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-slate-900 font-medium transition-all"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="name">Nombre (A-Z)</option>
                </select>
              </div>

              {/* Items Per Page */}
              <div className="flex items-center gap-2">
                <span className="text-slate-700 font-bold text-sm">Mostrar:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-slate-900 font-medium transition-all"
                >
                  <option value="6">6</option>
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border-t-4 border-blue-500 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-slate-900 text-lg">Filtrar por</h3>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory(null)
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-bold transition-colors"
                  >
                    Limpiar
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-900 mb-2">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="ATCC, nombre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Categoría</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                        !selectedCategory
                          ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Todas
                    </button>
                    {categorias.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                          selectedCategory === cat
                            ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cepas List */}
            <div className="flex-1 space-y-4">
              {/* Info Banner */}
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl shadow-sm mb-8">
                <div className="flex gap-4 items-start">
                  <div className="text-3xl">🌍</div>
                  <div className="text-sm">
                    <p className="font-black text-blue-900 mb-1">Cepas Referencia Internacional ATCC</p>
                    <p className="text-blue-800 font-medium">Certificadas internacionalmente • Garantía de identidad y viabilidad • Envío desde USA • Documentación ATCC incluida • Cumplimiento ISO 17025</p>
                  </div>
                </div>
              </div>

              {sortedCepas.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-slate-300">
                  <p className="text-slate-600 text-lg font-medium">No se encontraron cepas</p>
                </div>
              ) : (
                sortedCepas.slice(0, itemsPerPage).map((cepa) => (
                  <div
                    key={cepa.id}
                    className="bg-white rounded-xl shadow-sm border-l-4 border-blue-500 p-6 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-start md:justify-between gap-6"
                  >
                    {/* Left: Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-2xl">🧬</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-black text-slate-900 leading-tight">{cepa.nombre}</h3>
                          <p className="text-sm text-slate-600 italic font-light mt-1">{cepa.cientifico}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <p className="text-xs font-bold text-slate-600 uppercase">Código ATCC</p>
                          <p className="text-sm font-black text-blue-600">{cepa.codigo}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-600 uppercase">Referencia</p>
                          <p className="text-sm font-black text-slate-900">{cepa.referencia}</p>
                        </div>
                      </div>

                      <p className="text-sm text-slate-700 font-medium mb-3">{cepa.descripcion}</p>

                      {/* Documents */}
                      <div className="flex flex-wrap gap-2">
                        {cepa.documentos.map((doc, idx) => (
                          <button
                            key={idx}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs font-bold"
                          >
                            <FileText className="w-3 h-3" />
                            {doc}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Price & Action */}
                    <div className="md:w-64 flex-shrink-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-100">
                      <p className="text-xs font-bold text-slate-600 uppercase mb-2">Precio</p>
                      <p className="text-4xl font-black text-blue-600 mb-4">${cepa.precio.toFixed(2)}</p>
                      <p className="text-sm font-bold text-slate-700 mb-4">{cepa.envase}</p>

                      {cepa.disponibilidad ? (
                        <>
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-lg transition-colors mb-2">
                            🛒 Solicitar
                          </button>
                          <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 rounded-lg transition-colors text-sm">
                            ♡ Guardar
                          </button>
                        </>
                      ) : (
                        <div className="w-full">
                          <button className="w-full bg-slate-300 text-slate-600 font-black py-3 rounded-lg cursor-not-allowed flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" />
                            Agotado
                          </button>
                          <p className="text-xs text-slate-600 mt-2 font-medium">Consultar disponibilidad próximas</p>
                        </div>
                      )}
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
