"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Cepa {
  id: string
  nombre: string
  cientifico: string
  categoria: string
  descripcion: string
  beneficios: string[]
}

const cepas: Cepa[] = [
  {
    id: "1",
    nombre: "Trichoderma harzianum",
    cientifico: "Trichoderma harzianum",
    categoria: "Control Biológico",
    descripcion: "Hongo antagonista para control de enfermedades fúngicas del suelo",
    beneficios: ["Control de pudriciones radiculares", "Mejora de absorción de nutrientes"],
  },
  {
    id: "2",
    nombre: "Beauveria bassiana",
    cientifico: "Beauveria bassiana",
    categoria: "Control de Plagas",
    descripcion: "Hongo entomopatógeno para control biológico de plagas",
    beneficios: ["Control de insectos plaga", "Compatible con otras cepas"],
  },
  {
    id: "3",
    nombre: "Bacillus subtilis",
    cientifico: "Bacillus subtilis",
    categoria: "Biofertilizante",
    descripcion: "Bacteria promotora del crecimiento vegetal y fijadora de nitrógeno",
    beneficios: ["Aumenta disponibilidad de nutrientes", "Mejora la salud del suelo"],
  },
  {
    id: "4",
    nombre: "Pseudomonas fluorescens",
    cientifico: "Pseudomonas fluorescens",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento",
    beneficios: ["Solubiliza fosfato inorgánico", "Produce fitohormonas"],
  },
  {
    id: "5",
    nombre: "Azospirillum brasilense",
    cientifico: "Azospirillum brasilense",
    categoria: "Biofertilizante",
    descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas",
    beneficios: ["Fija nitrógeno del aire", "Reduce uso de fertilizantes"],
  },
  {
    id: "6",
    nombre: "Metarhizium anisopliae",
    cientifico: "Metarhizium anisopliae",
    categoria: "Control de Plagas",
    descripcion: "Hongo entomopatógeno para control de insectos del suelo",
    beneficios: ["Control de plagas subterráneas", "Acción sistémica"],
  },
  {
    id: "7",
    nombre: "Streptomyces lydicus",
    cientifico: "Streptomyces lydicus",
    categoria: "Control Biológico",
    descripcion: "Actinobacteria productora de antibióticos naturales para control de patógenos",
    beneficios: ["Produce compuestos antimicrobianos", "Eficaz contra hongos y bacterias"],
  },
  {
    id: "8",
    nombre: "Bacillus megaterium",
    cientifico: "Bacillus megaterium",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal",
    beneficios: ["Solubiliza potasio y fosfato", "Mejora fertilidad del suelo"],
  },
]

const categoryColors: { [key: string]: string } = {
  "Control Biológico": "bg-emerald-100 text-emerald-700",
  "Control de Plagas": "bg-orange-100 text-orange-700",
  "Biofertilizante": "bg-blue-100 text-blue-700",
}

export default function CepasClient() {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section - Compacto */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Cepas Biológicas</h1>
          <p className="text-green-100 text-sm max-w-2xl">Soluciones biológicas certificadas para control de plagas y mejora de nutrición</p>
        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-3">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por nombre o nombre científico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Categoría</label>
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cepas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCepas.map((cepa) => (
            <div
              key={cepa.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{cepa.nombre}</h3>
                    <p className="text-xs text-gray-600 italic">{cepa.cientifico}</p>
                  </div>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColors[cepa.categoria]}`}>
                  {cepa.categoria}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{cepa.descripcion}</p>

                {/* Beneficios Preview */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-800 mb-2">Beneficios principales:</h4>
                  <ul className="space-y-1">
                    {cepa.beneficios.map((beneficio, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/cepas/${cepa.id}`}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm w-full justify-center group"
                >
                  Ver Producto
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCepas.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No se encontraron cepas que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
