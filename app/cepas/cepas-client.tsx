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
  imagen: string
}

const cepas: Cepa[] = [
  {
    id: "1",
    nombre: "Bacillus subtilis",
    cientifico: "Bacillus subtilis",
    categoria: "Biofertilizante",
    descripcion: "Bacteria promotora del crecimiento vegetal y fijadora de nitrógeno",
    beneficios: ["Aumenta disponibilidad de nutrientes", "Mejora la salud del suelo"],
    imagen: "/bacteria/bacillus-subtilis.jpg",
  },
  {
    id: "2",
    nombre: "Pseudomonas fluorescens",
    cientifico: "Pseudomonas fluorescens",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento",
    beneficios: ["Solubiliza fosfato inorgánico", "Produce fitohormonas"],
    imagen: "/bacteria/pseudomonas-fluorescens.jpg",
  },
  {
    id: "3",
    nombre: "Azospirillum brasilense",
    cientifico: "Azospirillum brasilense",
    categoria: "Biofertilizante",
    descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas",
    beneficios: ["Fija nitrógeno del aire", "Reduce uso de fertilizantes"],
    imagen: "/bacteria/azospirillum-brasilense.jpg",
  },
  {
    id: "4",
    nombre: "Bacillus megaterium",
    cientifico: "Bacillus megaterium",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal",
    beneficios: ["Solubiliza potasio y fosfato", "Mejora fertilidad del suelo"],
    imagen: "/bacteria/bacillus-megaterium.jpg",
  },
  {
    id: "5",
    nombre: "Escherichia coli",
    cientifico: "Escherichia coli (K-12)",
    categoria: "Investigación",
    descripcion: "Bacteria modelo para investigación científica y producción de proteínas recombinantes",
    beneficios: ["Desarrollo de bioingeniería", "Investigación genética"],
    imagen: "/bacteria/escherichia-coli.jpg",
  },
  {
    id: "6",
    nombre: "Bacillus cereus",
    cientifico: "Bacillus cereus",
    categoria: "Investigación",
    descripcion: "Bacteria para estudios de control de plagas y patología",
    beneficios: ["Modelos de investigación", "Entomología aplicada"],
    imagen: "/bacteria/bacillus-cereus.jpg",
  },
  {
    id: "7",
    nombre: "Bacillus thuringiensis",
    cientifico: "Bacillus thuringiensis",
    categoria: "Control Biológico",
    descripcion: "Bacteria natural para control biológico de insectos plaga",
    beneficios: ["Control de lepidópteros", "Compatible con agricultura orgánica"],
    imagen: "/bacteria/bacillus-thuringiensis.jpg",
  },
  {
    id: "8",
    nombre: "Pseudomonas aeruginosa",
    cientifico: "Pseudomonas aeruginosa",
    categoria: "Investigación",
    descripcion: "Bacteria para investigación molecular y microbiología clínica",
    beneficios: ["Estudios de patogénesis", "Desarrollo de nuevos antibióticos"],
    imagen: "/bacteria/pseudomonas-aeruginosa.jpg",
  },
  {
    id: "9",
    nombre: "Streptomyces lydicus",
    cientifico: "Streptomyces lydicus",
    categoria: "Control Biológico",
    descripcion: "Actinobacteria productora de compuestos antimicrobianos naturales",
    beneficios: ["Control de patógenos del suelo", "Producción de antibióticos"],
    imagen: "/bacteria/streptomyces-lydicus.jpg",
  },
  {
    id: "10",
    nombre: "Bacillus firmus",
    cientifico: "Bacillus firmus GB-126",
    categoria: "Biofertilizante",
    descripcion: "Bacteria activadora de crecimiento radicular y tolerante a estrés hídrico",
    beneficios: ["Tolerancia a sequía", "Desarrollo radicular mejorado"],
    imagen: "/bacteria/bacillus-firmus.jpg",
  },
]

const categoryColors: { [key: string]: string } = {
  "Control Biológico": "bg-emerald-100 text-emerald-700",
  "Biofertilizante": "bg-blue-100 text-blue-700",
  "Investigación": "bg-purple-100 text-purple-700",
}

export default function CepasClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["Control Biológico", "Biofertilizante", "Investigación"]

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
              {/* Imagen */}
              <div className="h-40 bg-gray-200 overflow-hidden flex items-center justify-center">
                <img 
                  src={cepa.imagen} 
                  alt={cepa.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

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
