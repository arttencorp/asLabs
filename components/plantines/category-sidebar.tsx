"use client"

import { CheckCircle, MessageCircle, Menu, X } from "lucide-react"
import { categories } from "./data"
import { handleWhatsAppContact } from "./utils"
import { useState } from "react"

interface CategorySidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategorySidebar({ selectedCategory, onCategoryChange }: CategorySidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Botón móvil para abrir menú */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <Menu className="w-5 h-5" />
          Filtrar Categorías
        </button>
      </div>

      {/* Overlay móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Explora Nuestro Catálogo</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-3 mb-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === category
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span>{category}</span>
                    {selectedCategory === category && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Información adicional en el sidebar móvil */}
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-2">¿Necesitas ayuda?</h4>
                <p className="text-sm text-emerald-700 mb-3">
                  Nuestros especialistas están listos para asesorarte
                </p>
                <button
                  onClick={() => {
                    handleWhatsAppContact("asesoría especializada para elegir los mejores plantines")
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Consulta Gratis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Explora Nuestro Catálogo</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span>{category}</span>
                {selectedCategory === category && (
                  <CheckCircle className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
          
          {/* Información adicional en el sidebar */}
          <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">¿Necesitas ayuda?</h4>
            <p className="text-sm text-emerald-700 mb-3">
              Nuestros especialistas están listos para asesorarte
            </p>
            <button
              onClick={() => handleWhatsAppContact("asesoría especializada para elegir los mejores plantines")}
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Consulta Gratis
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
