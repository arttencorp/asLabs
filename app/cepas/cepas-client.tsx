"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Search, Filter } from "lucide-react"

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
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20SUBTILIS-lZIT8bmBiVCgmrPslx2UVDtUvih3Xm.png",
  },
  {
    id: "2",
    nombre: "Pseudomonas fluorescens",
    cientifico: "Pseudomonas fluorescens",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento",
    beneficios: ["Solubiliza fosfato inorgánico", "Produce fitohormonas"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PSEUDOMONAS%20FLURECENS-3T3ftD4NIWWlTMp1gyfXp5mQpDiFwV.png",
  },
  {
    id: "3",
    nombre: "Azospirillum sp.",
    cientifico: "Azospirillum sp.",
    categoria: "Biofertilizante",
    descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas",
    beneficios: ["Fija nitrógeno del aire", "Reduce uso de fertilizantes"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AZOSPIRILLUM%20SP-cfCWWbWFjaJjRmUmzlCzGVGC7IJQ0J.png",
  },
  {
    id: "4",
    nombre: "Bacillus megaterium",
    cientifico: "Bacillus megaterium",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal",
    beneficios: ["Solubiliza potasio y fosfato", "Mejora fertilidad del suelo"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20MEGATERIUM-ICuHwaE7UcN8DXXYZRqCkVG448FHFb.png",
  },
  {
    id: "5",
    nombre: "Rhizobium sp.",
    cientifico: "Rhizobium sp.",
    categoria: "Biofertilizante",
    descripcion: "Bacteria fijadora de nitrógeno en simbiosis con leguminosas",
    beneficios: ["Fija nitrógeno en simbiosis", "Enriquece suelo con nitrógeno"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RHIZOBIUM%20SP-9obUjUkrKY9hu85SUnccG0wmlNn2AS.png",
  },
  {
    id: "6",
    nombre: "Escherichia coli",
    cientifico: "Escherichia coli (K-12)",
    categoria: "Investigación",
    descripcion: "Bacteria modelo para investigación científica y producción de proteínas recombinantes",
    beneficios: ["Desarrollo de bioingeniería", "Investigación genética"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ESCHERICHIA%20COLI%20-lIupepy5OmLvg5QlzktwmP6HLi2Ua2.png",
  },
  {
    id: "7",
    nombre: "Bacillus cereus",
    cientifico: "Bacillus cereus",
    categoria: "Investigación",
    descripcion: "Bacteria para estudios de control de plagas y patología",
    beneficios: ["Modelos de investigación", "Entomología aplicada"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20CEREUS-mRkEvpBkbZTqRieLDfSFcqLNjwjGph.png",
  },
  {
    id: "8",
    nombre: "Bacillus thuringiensis",
    cientifico: "Bacillus thuringiensis",
    categoria: "Control Biológico",
    descripcion: "Bacteria natural para control biológico de insectos plaga",
    beneficios: ["Control de lepidópteros", "Compatible con agricultura orgánica"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20THURIGENSIS-WathDWWLzFWpDqIiLScgGmKElVphQj.png",
  },
  {
    id: "9",
    nombre: "Pseudomonas aeruginosa",
    cientifico: "Pseudomonas aeruginosa",
    categoria: "Investigación",
    descripcion: "Bacteria para investigación molecular y microbiología clínica",
    beneficios: ["Estudios de patogénesis", "Desarrollo de nuevos antibióticos"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PSEUDOMINAS%20AUROGINOSA-2ij7shHccL5vWlnNbV3Y3kgP2eQYak.png",
  },
  {
    id: "10",
    nombre: "Streptomyces spp",
    cientifico: "Streptomyces spp.",
    categoria: "Control Biológico",
    descripcion: "Actinobacteria productora de compuestos antimicrobianos naturales",
    beneficios: ["Control de patógenos del suelo", "Producción de antibióticos"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STREPTOMYCES-yfimx3fV6zPslQL6YRNeG2jpJ5AlPv.png",
  },
  {
    id: "11",
    nombre: "Bacillus firmus",
    cientifico: "Bacillus firmus GB-126",
    categoria: "Biofertilizante",
    descripcion: "Bacteria activadora de crecimiento radicular y tolerante a estrés hídrico",
    beneficios: ["Tolerancia a sequía", "Desarrollo radicular mejorado"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20FIRMUS%20SP-3e7s9AEf9PCpSzCxfnIMQd0rcr7UDY.png",
  },
]

const categoryColors: { [key: string]: string } = {
  "Control Biológico": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Biofertilizante": "bg-blue-100 text-blue-700 border-blue-300",
  "Investigación": "bg-purple-100 text-purple-700 border-purple-300",
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
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section - Compacto */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-3 tracking-tight">Cepas Bacterianas</h1>
            <p className="text-slate-300 text-base font-light">
              Cultivos microbiológicos certificados para agricultura, investigación y aplicaciones biológicas
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Search and Filter Bar */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar cepa por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 items-center md:justify-end">
                <Filter className="text-slate-400 w-5 h-5" />
                <select
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-900 font-medium"
                >
                  <option value="">Todas las cepas</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedCategory
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Ver todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? `${categoryColors[cat]} border-2`
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-slate-600 text-sm font-medium">
              Mostrando <span className="text-emerald-600 font-bold">{filteredCepas.length}</span> de {cepas.length} cepas
            </p>
          </div>

          {/* Cepas Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCepas.map((cepa) => (
              <Link
                key={cepa.id}
                href={`/cepas/${cepa.id}`}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col h-full"
              >
                {/* Imagen */}
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex items-center justify-center relative">
                  <img 
                    src={cepa.imagen} 
                    alt={cepa.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[cepa.categoria]}`}>
                      {cepa.categoria}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-3">
                    <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-emerald-600 transition-colors">
                      {cepa.nombre}
                    </h3>
                    <p className="text-xs text-slate-600 italic font-light">{cepa.cientifico}</p>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">{cepa.descripcion}</p>

                  {/* Beneficios */}
                  <div className="space-y-2 mb-4 pt-3 border-t border-slate-100">
                    {cepa.beneficios.slice(0, 2).map((beneficio, idx) => (
                      <p key={idx} className="text-xs text-slate-600 flex gap-2">
                        <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
                        <span>{beneficio}</span>
                      </p>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-emerald-600 font-medium text-sm group-hover:gap-3 transition-all">
                    Ver Producto
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredCepas.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg mb-2">No se encontraron cepas</p>
              <p className="text-slate-500 text-sm">Intenta con otros términos de búsqueda o categoría</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
