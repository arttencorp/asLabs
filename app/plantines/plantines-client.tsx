"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/plantines/hero-section"
import CategorySidebar from "@/components/plantines/category-sidebar"
import PlantinCard from "@/components/plantines/plantin-card"
import TechnicalSheetModal from "@/components/plantines/technical-sheet-modal"
import CallToActionSection from "@/components/plantines/call-to-action"
import { plantines, categories } from "@/components/plantines/data"
import { Plantin } from "@/components/plantines/types"
import { Leaf, Calculator, MessageCircle, Search, X } from "lucide-react"
import { handleWhatsAppContact } from "@/components/plantines/utils"

export default function PlantinesClient() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [showTechnicalSheet, setShowTechnicalSheet] = useState(false)
  const [selectedTechnicalData, setSelectedTechnicalData] = useState<Plantin | null>(null)
  const [hectareas, setHectareas] = useState(5)

  const normalizeText = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  const categoryFilteredPlantines =
    selectedCategory === "Todos" ? plantines : plantines.filter((plantin) => plantin.category === selectedCategory)

  const normalizedQuery = normalizeText(searchQuery.trim())

  const filteredPlantines = categoryFilteredPlantines.filter((plantin) => {
    if (!normalizedQuery) return true

    const searchableText = normalizeText(
      `${plantin.name} ${plantin.category} ${plantin.description} ${plantin.features.join(" ")}`
    )

    return searchableText.includes(normalizedQuery)
  })

  const handleTechnicalSheet = (plantin: Plantin) => {
    setSelectedTechnicalData(plantin)
    setShowTechnicalSheet(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />

      {/* Modal de Ficha Técnica */}
      {showTechnicalSheet && selectedTechnicalData && (
        <TechnicalSheetModal 
          plantin={selectedTechnicalData} 
          onClose={() => setShowTechnicalSheet(false)} 
        />
      )}

      {/* Hero Section */}
      <HeroSection />

      {/* Catálogo de Plantines */}
      <section className="py-8 sm:py-10 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Header de la sección */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Nuestros Plantines de Elite</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Cada plantín está desarrollado con tecnología in vitro de vanguardia, garantizando 
              la más alta calidad genética y resistencia para tu cultivo.
            </p>
          </div>

          {/* Buscador y filtros */}
          <div className="mb-6 sm:mb-8 rounded-2xl border border-emerald-100 bg-white/95 p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Busca por cultivo, variedad o categoría"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-gray-800 shadow-sm transition-colors outline-none focus:border-emerald-400"
                    aria-label="Buscar plantines"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      aria-label="Limpiar búsqueda"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 sm:min-w-[150px]">
                  {filteredPlantines.length} resultado{filteredPlantines.length === 1 ? "" : "s"}
                </div>
              </div>

              <CategorySidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                showDesktop={false}
                mobileWrapperClassName="mb-0"
              />

              <div className="hidden lg:flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-emerald-600 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid de plantines */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredPlantines.map((plantin) => (
                <PlantinCard
                  key={plantin.id}
                  plantin={plantin}
                  onTechnicalSheet={handleTechnicalSheet}
                />
              ))}
            </div>

            {/* Mensaje si no hay resultados */}
            {filteredPlantines.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-12 text-center">
                <div className="mb-4 text-gray-400">
                  <Leaf className="mx-auto h-14 w-14" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-700">No se encontraron plantines</h3>
                <p className="text-gray-500">Prueba con otra categoría o una búsqueda más general.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("Todos")
                    setSearchQuery("")
                  }}
                  className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  Limpiar filtros
                </button>
              </div>
            )}

            {/* Calculadora de Rentabilidad */}
            <div className="mt-6 bg-white rounded-lg shadow border border-gray-200 overflow-hidden max-w-md mx-auto">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 py-2">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Calculadora de Rentabilidad
                  </h3>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Hectáreas:</span>
                    <div className="flex gap-1">
                      {[1, 5, 10, 20, 50].map((value) => (
                        <button
                          key={value}
                          onClick={() => setHectareas(value)}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                            hectareas === value
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex-1 bg-red-50 px-2 py-1 rounded text-center">
                      <span className="text-red-700 font-bold">S/. {(hectareas * 14 * 2500).toLocaleString()}</span>
                      <span className="text-xs text-red-600 ml-1">Tradicional</span>
                    </div>
                    <div className="flex-1 bg-emerald-50 px-2 py-1 rounded text-center">
                      <span className="text-emerald-700 font-bold">S/. {(hectareas * 20 * 2500).toLocaleString()}</span>
                      <span className="text-xs text-emerald-600 ml-1">In Vitro</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-blue-50 px-2 py-1 rounded">
                    <span className="text-xs text-blue-800">Ganancia Extra:</span>
                    <span className="text-sm font-bold text-blue-700">+S/. {((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleWhatsAppContact(`Quiero cotizar ${hectareas} hectáreas. Ganancia estimada: S/. ${((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()}`)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1.5 rounded font-medium transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Cotizar {hectareas} hectáreas
                  </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToActionSection />

      <Footer />
    </div>
  )
}

