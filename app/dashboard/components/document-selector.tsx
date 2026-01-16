"use client"

import type { DocumentType } from "../types"

interface DocumentSelectorProps {
  selected: DocumentType | null
  onChange: (type: DocumentType) => void
}

export default function DocumentSelector({ selected, onChange }: DocumentSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => onChange("certificado")}
        className={`p-6 rounded-lg border-2 transition-all ${
          selected === "certificado" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
        }`}
      >
        <h3 className="text-lg font-serif font-bold text-gray-900">Certificado</h3>
        <p className="text-sm text-gray-600 mt-2">Documento de conformidad con estándares</p>
      </button>
      <button
        onClick={() => onChange("informe")}
        className={`p-6 rounded-lg border-2 transition-all ${
          selected === "informe" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
        }`}
      >
        <h3 className="text-lg font-serif font-bold text-gray-900">Informe de Análisis</h3>
        <p className="text-sm text-gray-600 mt-2">Reporte detallado de resultados</p>
      </button>
    </div>
  )
}
