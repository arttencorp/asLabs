"use client"

import { useState } from "react"
import { 
  FlaskConical, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Calculator, 
  MessageCircle 
} from "lucide-react"
import { handleWhatsAppContact } from "./utils"

export default function HeroSection() {
  const [hectareas, setHectareas] = useState(5)

  return (
    <section className="relative bg-white py-8 sm:py-12 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center max-w-7xl mx-auto">
          
          {/* Panel Izquierdo - TEXTO */}
          <div className="text-center lg:text-left order-1 lg:order-1">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 max-w-md sm:max-w-none mx-auto lg:mx-0">
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm">Mayor Productividad</h3>
                <p className="text-xs text-gray-600">Hasta {Math.round(((20 - 14) / 14) * 100)}% más rendimiento</p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm">100% Libres de Plagas</h3>
                <p className="text-xs text-gray-600">Tecnología in vitro</p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm">ROI Garantizado</h3>
                <p className="text-xs text-gray-600">Inversión rentable</p>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <button
                onClick={() => handleWhatsAppContact("información completa sobre plantines premium")}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Asesoría Gratuita
              </button>
            </div>
          </div>

          {/* Panel Derecho - CALCULADORA */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden order-2 lg:order-2">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-bold mb-1 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Calculadora de Rentabilidad
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm">Descubre cuánto más puedes ganar</p>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Input de Hectáreas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ¿Cuántas hectáreas planeas cultivar?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={hectareas}
                    onChange={(e) => setHectareas(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-lg sm:text-xl font-bold text-center border-2 border-emerald-300 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none transition-colors"
                    placeholder="5"
                  />
                  <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm">
                    hectáreas
                  </span>
                </div>
                
                {/* Botones rápidos */}
                <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-3">
                  {[1, 5, 10, 20, 50].map((value) => (
                    <button
                      key={value}
                      onClick={() => setHectareas(value)}
                      className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        hectareas === value
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {value} ha
                    </button>
                  ))}
                </div>
              </div>

              {/* Comparación de Rendimientos */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-sm">Comparación de Ingresos Anuales</h4>
                
                {/* Plantines Tradicionales */}
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-red-800">Plantines Tradicionales</span>
                    <span className="text-xs text-red-600">14 ton/ha</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-red-700">
                    S/. {(hectareas * 14 * 2500).toLocaleString()}
                  </div>
                </div>

                {/* Plantines In Vitro */}
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-emerald-800">Plantines In Vitro AS Labs</span>
                    <span className="text-xs text-emerald-600">20 ton/ha</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-emerald-700">
                    S/. {(hectareas * 20 * 2500).toLocaleString()}
                  </div>
                </div>

                {/* Ganancia Adicional */}
                <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-300 text-center">
                  <div className="text-xs text-blue-800 mb-1">Ganancia Adicional</div>
                  <div className="text-lg sm:text-xl font-bold text-blue-700">
                    +S/. {((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {Math.round(((20 - 14) / 14) * 100)}% más rentabilidad
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <button
                onClick={() => handleWhatsAppContact(`¡Hola! He calculado que con ${hectareas} hectáreas puedo ganar S/. ${((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()} adicionales con sus plantines in vitro. Quiero más información.`)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 sm:py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Solicitar Cotización para {hectareas} hectáreas</span>
                <span className="sm:hidden">Cotizar {hectareas} hectáreas</span>
              </button>

              {/* Disclaimer de estudios - Solo en desktop */}
              <div className="text-xs text-gray-500 text-center hidden lg:block">
                <p className="mb-2">Precio calculado estimado según estudios:</p>
                <div className="space-y-1">
                  <a 
                    href="https://www.fao.org/fileadmin/templates/ex_act/pdf/EXACT_VC/Case_study_Banana_organico_installacion_Peru.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-emerald-600 hover:text-emerald-700 underline"
                  >
                    FAO - Caso de estudio: Banano orgánico en Perú
                  </a>
                  <a 
                    href="https://www.musalit.org/viewPostPrint.php?file=IN130316_pp.pdf&id=14818" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-emerald-600 hover:text-emerald-700 underline"
                  >
                    Musalit.org - Estudio de rendimiento de banano
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
