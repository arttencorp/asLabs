"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/plantines/hero-section"
import CategorySidebar from "@/components/plantines/category-sidebar"
import PlantinCard from "@/components/plantines/plantin-card"
import TechnicalSheetModal from "@/components/plantines/technical-sheet-modal"
import CallToActionSection from "@/components/plantines/call-to-action"
import { plantines } from "@/components/plantines/data"
import { Plantin } from "@/components/plantines/types"
import { Leaf, Calculator, MessageCircle } from "lucide-react"
import { handleWhatsAppContact } from "@/components/plantines/utils"

export default function PlantinesClient() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showTechnicalSheet, setShowTechnicalSheet] = useState(false)
  const [selectedTechnicalData, setSelectedTechnicalData] = useState<Plantin | null>(null)
  const [hectareas, setHectareas] = useState(5)

  const filteredPlantines =
    selectedCategory === "Todos" ? plantines : plantines.filter((plantin) => plantin.category === selectedCategory)

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
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header de la sección */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Nuestros Plantines de Elite</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Cada plantín está desarrollado con tecnología in vitro de vanguardia, garantizando 
              la más alta calidad genética y resistencia para tu cultivo.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Sidebar de categorías */}
            <CategorySidebar 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Grid de plantines */}
            <div className="flex-1 w-full min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Leaf className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron plantines</h3>
                  <p className="text-gray-500">Intenta seleccionar otra categoría</p>
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
        </div>
      </section>

      {/* Call to Action */}
      <CallToActionSection />

      <Footer />
    </div>
  )
}

