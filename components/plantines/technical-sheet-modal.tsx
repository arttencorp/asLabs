"use client"

import { 
  X, 
  Activity, 
  Sun, 
  Thermometer, 
  Droplets, 
  Leaf, 
  Award, 
  Calendar, 
  Shield, 
  Apple,
  MessageCircle 
} from "lucide-react"
import { Plantin } from "./types"
import { handleWhatsAppContact, getProfitabilityColor } from "./utils"

interface TechnicalSheetModalProps {
  plantin: Plantin
  onClose: () => void
}

export default function TechnicalSheetModal({ plantin, onClose }: TechnicalSheetModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 sm:p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <plantin.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">Ficha Técnica</h2>
                <p className="text-emerald-100 text-sm">{plantin.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Información General */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  Información General
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categoría:</span>
                    <span className="font-medium">{plantin.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rendimiento:</span>
                    <span className="font-medium text-emerald-600">{plantin.yield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo de cosecha:</span>
                    <span className="font-medium">{plantin.harvestTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rentabilidad:</span>
                    <span
                      className={`font-medium px-2 py-1 rounded text-xs ${getProfitabilityColor(plantin.profitability || "")}`}
                    >
                      {plantin.profitability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Condiciones de Cultivo */}
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                  Condiciones de Cultivo
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="w-3 h-3 text-red-500" />
                      <span className="font-medium text-gray-700">Clima:</span>
                    </div>
                    <p className="text-gray-600 text-xs">{plantin.technicalData?.climate}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Leaf className="w-3 h-3 text-green-500" />
                      <span className="font-medium text-gray-700">Suelo:</span>
                    </div>
                    <p className="text-gray-600 text-xs">{plantin.technicalData?.soil}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span className="font-medium text-gray-700">Riego:</span>
                    </div>
                    <p className="text-gray-600 text-xs">{plantin.technicalData?.irrigation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Manejo Agronómico */}
            <div className="space-y-4">
              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  Manejo Agronómico
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Fertilización:</span>
                    <p className="text-gray-600 text-xs mt-1">
                      {plantin.technicalData?.fertilization}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Distanciamiento:</span>
                    <p className="text-gray-600 text-xs mt-1">{plantin.technicalData?.spacing}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Mantenimiento:</span>
                    <p className="text-gray-600 text-xs mt-1">{plantin.technicalData?.maintenance}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Cosecha y Postcosecha
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Cosecha:</span>
                    <p className="text-gray-600 text-xs mt-1">{plantin.technicalData?.harvest}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Almacenamiento:</span>
                    <p className="text-gray-600 text-xs mt-1">{plantin.technicalData?.storage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resistencias y Beneficios */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                Enfermedades Principales
              </h3>
              <div className="space-y-2">
                {plantin.technicalData?.diseases.map((disease, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <span className="text-gray-700 text-xs">{disease}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Apple className="w-4 h-4 sm:w-5 sm:h-5" />
                Beneficios Nutricionales
              </h3>
              <div className="space-y-2">
                {plantin.technicalData?.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span className="text-gray-700 text-xs">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleWhatsAppContact(plantin.name)}
              className="flex-1 bg-emerald-600 text-white px-4 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4" />
              Solicitar Cotización
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              Cerrar
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white font-bold text-xs">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Importante - Verificación Técnica</h4>
                <p className="text-yellow-700 text-xs leading-relaxed">
                  Los datos deben ser verificados por nuestros especialistas antes de aplicarlos en campo.
                  Cada zona agrícola tiene condiciones específicas que pueden requerir ajustes en las
                  recomendaciones técnicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
