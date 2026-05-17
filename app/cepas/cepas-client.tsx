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
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20SUBTILIS-13GZHbrjZbKtCqXbOaRCgI4Qc5IWJJ.webp",
  },
  {
    id: "2",
    nombre: "Pseudomonas fluorescens",
    cientifico: "Pseudomonas fluorescens",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento",
    beneficios: ["Solubiliza fosfato inorgánico", "Produce fitohormonas"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PSEUDOMONAS%20FLURECENS-Dh3L006FYYg0R2hTQUytK5vzMWSlnU.webp",
  },
  {
    id: "3",
    nombre: "Azospirillum sp.",
    cientifico: "Azospirillum sp.",
    categoria: "Biofertilizante",
    descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas",
    beneficios: ["Fija nitrógeno del aire", "Reduce uso de fertilizantes"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AZOSPIRILLUM%20SP-Jonwk0fQXtggCkuluQMLt3K7BqhK9V.webp",
  },
  {
    id: "4",
    nombre: "Bacillus megaterium",
    cientifico: "Bacillus megaterium",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal",
    beneficios: ["Solubiliza potasio y fosfato", "Mejora fertilidad del suelo"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20MEGATERIUM-3gHTO1C5zG8IUwHFHd4sjqhGVq4vUV.webp",
  },
  {
    id: "5",
    nombre: "Rhizobium sp.",
    cientifico: "Rhizobium sp.",
    categoria: "Biofertilizante",
    descripcion: "Bacteria fijadora de nitrógeno en simbiosis con leguminosas",
    beneficios: ["Fija nitrógeno en simbiosis", "Enriquece suelo con nitrógeno"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RHIZOBIUM%20SP-M0E2O1jOZbtDhljJxzBdr7v6I9io66.webp",
  },
  {
    id: "6",
    nombre: "Escherichia coli",
    cientifico: "Escherichia coli (K-12)",
    categoria: "Investigación",
    descripcion: "Bacteria modelo para investigación científica y producción de proteínas recombinantes",
    beneficios: ["Desarrollo de bioingeniería", "Investigación genética"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ESCHERICHIA%20COLI%20-Jg2V6mCCTODCo7a07VMMetdrwyns3K.webp",
  },
  {
    id: "7",
    nombre: "Bacillus cereus",
    cientifico: "Bacillus cereus",
    categoria: "Investigación",
    descripcion: "Bacteria para estudios de control de plagas y patología",
    beneficios: ["Modelos de investigación", "Entomología aplicada"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20CEREUS-JWkhETxjt37ASZSNCuF0YESrUiBOSh.webp",
  },
  {
    id: "8",
    nombre: "Bacillus thuringiensis",
    cientifico: "Bacillus thuringiensis",
    categoria: "Control Biológico",
    descripcion: "Bacteria natural para control biológico de insectos plaga",
    beneficios: ["Control de lepidópteros", "Compatible con agricultura orgánica"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20THURIGENSIS-8HbhG7sSaEucoYAEwnR0T1m7hgDZOa.webp",
  },
  {
    id: "9",
    nombre: "Pseudomonas aeruginosa",
    cientifico: "Pseudomonas aeruginosa",
    categoria: "Investigación",
    descripcion: "Bacteria para investigación molecular y microbiología clínica",
    beneficios: ["Estudios de patogénesis", "Desarrollo de nuevos antibióticos"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PSEUDOMINAS%20AUROGINOSA-b24I6MT5Y2hxKIzqzp2yPCJkwFTfxP.webp",
  },
  {
    id: "10",
    nombre: "Streptomyces spp",
    cientifico: "Streptomyces spp.",
    categoria: "Control Biológico",
    descripcion: "Actinobacteria productora de compuestos antimicrobianos naturales",
    beneficios: ["Control de patógenos del suelo", "Producción de antibióticos"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STREPTOMYCES-xLsxGnKJJrhw6j4ZUtdnfkac6X3fpW.webp",
  },
  {
    id: "11",
    nombre: "Bacillus firmus",
    cientifico: "Bacillus firmus GB-126",
    categoria: "Biofertilizante",
    descripcion: "Bacteria activadora de crecimiento radicular y tolerante a estrés hídrico",
    beneficios: ["Tolerancia a sequía", "Desarrollo radicular mejorado"],
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20FIRMUS%20SP-QT6IjEuUvX7qiXr0U99mW5MeyNsqva.webp",
  },
  {
    id: "contact",
    nombre: "¿No encuentras tu cepa?",
    cientifico: "Solicita nuevas especies",
    categoria: "Contacto",
    descripcion: "¿Necesitas una bacteria específica que no está en nuestro catálogo? Contáctanos para solicitar nuevas especies personalizadas",
    beneficios: ["Asesoramiento personalizado", "Especies a medida"],
    imagen: "",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 flex flex-col">
      <Navbar />

      {/* Hero Section - Compacto */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-10 border-b-4 border-emerald-700">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-2">Catálogo de Cepas Bacterianas</h1>
          <p className="text-emerald-50 text-base font-light max-w-2xl">
            Cultivos certificados de alta viabilidad para agricultura e investigación
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-16">
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

            {/* Info Banner */}
            <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-lg">
              <div className="flex gap-4 items-start">
                <div className="text-2xl">✓</div>
                <div className="text-sm">
                  <p className="font-black text-emerald-900 mb-1">Cultivo a Pedido - Máxima Viabilidad</p>
                  <p className="text-emerald-800 text-xs">Almacenamiento ≤2 días • Perfecto para tesistas y investigadores • Máximo caldo: 30L • Disponemos de opciones personalizadas</p>
                </div>
              </div>
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
            {filteredCepas.map((cepa) => {
              // Contact Card especial
              if (cepa.id === "contact") {
                return (
                  <div key={cepa.id} className="group bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl border-3 border-dashed border-amber-400 overflow-hidden hover:shadow-2xl hover:border-amber-600 transition-all duration-300 flex flex-col h-full p-8 items-center justify-center text-center hover:-translate-y-2">
                    <div className="text-7xl mb-6 animate-bounce">📞</div>
                    <h3 className="font-black text-amber-900 text-2xl mb-2">{cepa.nombre}</h3>
                    <p className="text-amber-700 text-lg italic mb-5 font-semibold">{cepa.cientifico}</p>
                    <p className="text-amber-800 text-base mb-8 leading-relaxed font-medium">{cepa.descripcion}</p>
                    <div className="flex flex-col gap-3 w-full">
                      <a
                        href="mailto:info@aslabs.com?subject=Solicitud%20de%20Nueva%20Especie%20Bacteriana"
                        className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-black text-base transition-all shadow-lg hover:shadow-xl"
                      >
                        ✉️ Email
                        <span className="text-xl">→</span>
                      </a>
                      <a
                        href="https://wa.me/?text=Hola%20AS%20Labs%2C%20quisiera%20solicitar%20una%20especie%20bacteriana%20específica"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-black text-base transition-all shadow-lg hover:shadow-xl"
                      >
                        💬 WhatsApp
                        <span className="text-xl">→</span>
                      </a>
                    </div>
                  </div>
                )
              }

              // Tarjeta de cepa normal
              return (
                <Link
                  key={cepa.id}
                  href={`/cepas/${cepa.id}`}
                  className="group bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 flex flex-col h-full hover:-translate-y-2"
                >
                  {/* Imagen - Más grande */}
                  <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex items-center justify-center relative">
                    <img 
                      src={cepa.imagen} 
                      alt={cepa.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-block px-4 py-2 rounded-full text-xs font-black border-2 ${categoryColors[cepa.categoria]} shadow-md`}>
                        {cepa.categoria}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="font-black text-slate-900 text-lg mb-1 group-hover:text-emerald-600 transition-colors">
                        {cepa.nombre}
                      </h3>
                      <p className="text-xs text-slate-600 italic font-light">{cepa.cientifico}</p>
                    </div>

                    <p className="text-slate-700 text-sm mb-5 flex-1 leading-relaxed">{cepa.descripcion}</p>

                    {/* Beneficios */}
                    <div className="space-y-2 mb-5 pt-4 border-t-2 border-slate-100">
                      {cepa.beneficios.slice(0, 2).map((beneficio, idx) => (
                        <p key={idx} className="text-xs text-slate-700 flex gap-2 font-medium">
                          <span className="text-emerald-600 font-black flex-shrink-0">✓</span>
                          <span>{beneficio}</span>
                        </p>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-sm group-hover:gap-3 transition-all">
                      Ver Producto
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
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
