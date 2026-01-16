"use client"

import type { Evidence } from "../types"

interface EvidenceSectionProps {
  evidences: Evidence[]
  onChange: (evidences: Evidence[]) => void
}

export default function EvidenceSection({ evidences, onChange }: EvidenceSectionProps) {
  const handleAddEvidence = () => {
    const newEvidence: Evidence = {
      id: Date.now().toString(),
      archivo: "",
      titulo: "",
      fecha: new Date().toISOString().split("T")[0],
      sampleId: "",
    }
    onChange([...evidences, newEvidence])
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-serif font-semibold text-gray-900">Evidencia Gráfica</h2>
      <p className="text-sm text-gray-600 font-serif">Máximo 10 imágenes por muestra</p>

      {evidences.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {evidences.map((evidence) => (
            <div key={evidence.id} className="border border-gray-300 rounded-lg p-2">
              <p className="text-xs text-gray-600 truncate font-serif">{evidence.titulo}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleAddEvidence}
        className="w-full py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-serif"
        disabled={evidences.length >= 10}
      >
        + Subir Foto
      </button>
    </div>
  )
}
