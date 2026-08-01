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
        <div className="w-full">
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* TEXTO - Izquierda */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium mb-3">
                <FlaskConical className="w-3 h-3" />
                Biotecnología Vegetal de Vanguardia
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 text-gray-900 leading-tight">
                Plantines de <span className="text-emerald-600">Elite Genética</span>
                <br className="hidden sm:block" />
                <span className="block sm:inline"> para Agricultura Profesional</span>
              </h1>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Desarrollados con tecnología in vitro de vanguardia para maximizar tu productividad agrícola. 
                Libres de plagas, alta resistencia y rendimientos superiores garantizados.
              </p>

              <button
                onClick={() => handleWhatsAppContact("información completa sobre plantines premium")}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Asesoría Gratuita
              </button>
            </div>

            {/* CUADRADOS - Derecha, 2x2 grid (solo 3, el 3ro centrado abajo) */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center mb-1 mx-auto">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs">Mayor Productividad</h3>
                <p className="text-xs text-gray-600">+{Math.round(((20 - 14) / 14) * 100)}% rendimiento</p>
              </div>
              
              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center mb-1 mx-auto">
                  <Shield className="w-3 h-3 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs">Libres de Plagas</h3>
                <p className="text-xs text-gray-600">In vitro</p>
              </div>
              
              <div className="col-span-2 flex justify-center">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 text-center w-[calc(50%-0.25rem)]">
                  <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center mb-1 mx-auto">
                    <DollarSign className="w-3 h-3 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs">ROI Garantizado</h3>
                  <p className="text-xs text-gray-600">Rentable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
