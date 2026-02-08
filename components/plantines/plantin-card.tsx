"use client"

import Image from "next/image"
import { MessageCircle, FileText, Shield } from "lucide-react"
import { Plantin } from "./types"
import { handleWhatsAppContact, getProfitabilityColor } from "./utils"

interface PlantinCardProps {
  plantin: Plantin
  onTechnicalSheet: (plantin: Plantin) => void
}

export default function PlantinCard({ plantin, onTechnicalSheet }: PlantinCardProps) {
  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1">
      {/* Imagen destacada */}
      <div className="aspect-video relative bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden">
        <Image
          src={plantin.image || "/biotecnologia-vegetal.png"}
          alt={plantin.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Badge de estado sobre la imagen */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          {plantin.isProduction && (
            <span className="bg-amber-500 text-white text-xs font-medium px-2 sm:px-3 py-1 rounded-full shadow-lg">
              En Producción
            </span>
          )}
          {plantin.isResearch && (
            <span className="bg-blue-500 text-white text-xs font-medium px-2 sm:px-3 py-1 rounded-full shadow-lg">
              En Investigación
            </span>
          )}
          {plantin.profitability && !plantin.isResearch && !plantin.isProduction && (
            <span className={`text-xs font-medium px-2 sm:px-3 py-1 rounded-full shadow-lg ${getProfitabilityColor(plantin.profitability)}`}>
              {plantin.profitability}
            </span>
          )}
        </div>
      </div>

      {/* Header con título y descripción */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-3 mb-3 sm:mb-4">
          {/* Icono */}
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
            plantin.isResearch
              ? "bg-blue-500 text-white"
              : plantin.id === "pitahaya"
              ? "bg-purple-500 text-white"
              : "bg-emerald-500 text-white"
          } shadow-md`}>
            <plantin.icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          
          {/* Título y categoría */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">
              {plantin.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {plantin.category}
            </p>
          </div>
        </div>
        
        {/* Descripción */}
        <p className="text-gray-600 text-sm leading-snug mb-4">
          {plantin.description}
        </p>

        {/* Métricas en grid responsivo */}
        <div className={`grid ${plantin.yield === "-" ? "grid-cols-3" : "grid-cols-2"} gap-3 sm:gap-6 mb-4`}>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1 font-medium">Precio</div>
            <div className="font-bold text-emerald-600 text-sm">{plantin.price}</div>
          </div>
          {plantin.yield !== "-" && (
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1 font-medium">Rendimiento</div>
              <div className="font-bold text-blue-600 text-sm">{plantin.yield}</div>
            </div>
          )}
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1 font-medium">
              {plantin.category === "Ornamentales" ? "Tolerancia" : "Cosecha"}
            </div>
            <div className="font-bold text-purple-600 text-sm">{plantin.harvestTime}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1 font-medium">
              {plantin.id === "banano-fusarium"
                ? "Resistencias"
                : "Tolerancia"
              }
            </div>
            <div className="font-bold text-orange-600 text-sm">{plantin.resistance?.length || 0}+</div>
          </div>
        </div>
      </div>
      
      {/* Características principales compactas */}
      <div className="px-4 sm:px-6 pb-3 sm:pb-4">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
          Características Principales
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {plantin.features.slice(0, 4).map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                plantin.isResearch 
                  ? "bg-blue-400" 
                  : plantin.id === "pitahaya"
                  ? "bg-purple-400"
                  : "bg-emerald-400"
              }`}></div>
              <span className="text-gray-700 text-xs font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resistencias destacadas (si existen) */}
      {plantin.resistance && (
        <div className="px-4 sm:px-6 pb-3 sm:pb-4">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 uppercase tracking-wide">
            <Shield className="w-3 h-3 text-emerald-500" />
            {plantin.id === "banano-fusarium"
                ? "RESISTENCIAS"
                : "TOLERANCIA"
              }
            
          </h4>
          <div className="flex flex-wrap gap-1">
            {plantin.resistance.slice(0, 3).map((resistance, idx) => (
              <span
                key={idx}
                className={`text-xs font-medium px-2 py-1 rounded-full border ${
                  plantin.id === "pitahaya"
                    ? "bg-purple-100 text-purple-700 border-purple-200"
                    : plantin.isResearch
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : "bg-emerald-100 text-emerald-700 border-emerald-200"
                }`}
              >
                {resistance}
              </span>
            ))}
            {plantin.resistance.length > 3 && (
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                +{plantin.resistance.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Botones responsivos */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Botón principal */}
          {plantin.available ? (
            <button
              onClick={() => handleWhatsAppContact(plantin.name)}
              className={`flex-1 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2 shadow-sm text-sm ${
                plantin.id === "pitahaya"
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Cotizar
            </button>
          ) : plantin.isResearch ? (
            <a
              href="/research/banano-baby"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-md font-medium transition-colors text-center block shadow-sm text-sm"
            >
              Ver Investigación
            </a>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-300 text-gray-500 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md font-medium cursor-not-allowed text-sm"
            >
              No Disponible
            </button>
          )}

          {/* Botón secundario */}
          <button
            onClick={() => onTechnicalSheet(plantin)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Ficha Técnica</span>
            <span className="sm:hidden">Ficha</span>
          </button>
        </div>
      </div>
    </div>
  )
}
