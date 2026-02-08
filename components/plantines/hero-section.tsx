"use client"

import { 
  FlaskConical, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  MessageCircle 
} from "lucide-react"
import { handleWhatsAppContact } from "./utils"

export default function HeroSection() {
  return (
    <section className="relative bg-white py-6 sm:py-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Panel Principal - TEXTO */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
              <FlaskConical className="w-3 h-3 sm:w-4 sm:h-4" />
              Biotecnología Vegetal de Vanguardia
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-gray-900 leading-tight">
              Plantines de <span className="text-emerald-600">Elite Genética</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> para Agricultura Profesional</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Desarrollados con tecnología in vitro de vanguardia para maximizar tu productividad agrícola. 
              Libres de plagas, alta resistencia y rendimientos superiores garantizados.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 max-w-lg mx-auto">
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Mayor Productividad</h3>
                <p className="text-xs text-gray-600">+{Math.round(((20 - 14) / 14) * 100)}% rendimiento</p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Libres de Plagas</h3>
                <p className="text-xs text-gray-600">In vitro</p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">ROI Garantizado</h3>
                <p className="text-xs text-gray-600">Rentable</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => handleWhatsAppContact("información completa sobre plantines premium")}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Asesoría Gratuita
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
