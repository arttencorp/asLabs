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
import { Leaf } from "lucide-react"

export default function PlantinesClient() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showTechnicalSheet, setShowTechnicalSheet] = useState(false)
  const [selectedTechnicalData, setSelectedTechnicalData] = useState<Plantin | null>(null)

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

          <div className="flex gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Sidebar de categorías */}
            <CategorySidebar 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Grid de plantines */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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

