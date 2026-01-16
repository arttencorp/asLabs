"use client"

import type { Service, DocumentType } from "../types"

interface ServiceCardProps {
  service: Service
  documentType: DocumentType
  onStart: () => void
}

export default function ServiceCard({ service, documentType, onStart }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{service.servicio}</h3>

      <div className="space-y-3 mb-6">
        <div>
          <p className="text-sm text-gray-600 font-serif">Alcance</p>
          <p className="text-base text-gray-900 font-serif">{service.alcance}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 font-serif">Costo</p>
          <p className="text-2xl font-bold text-green-600 font-serif">S/ {service.costo.toFixed(2)}</p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-serif font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Iniciar {documentType === "certificado" ? "Certificado" : "Informe"}
      </button>
    </div>
  )
}
