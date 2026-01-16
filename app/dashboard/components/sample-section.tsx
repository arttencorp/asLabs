"use client"

import type { Sample, MatrixType } from "../types"

interface SampleSectionProps {
  samples: Sample[]
  onChange: (samples: Sample[]) => void
}

const matrixTypes: MatrixType[] = ["suelo", "agua", "tejido", "alimento", "superficie", "plantin", "cultivo", "otro"]

export default function SampleSection({ samples, onChange }: SampleSectionProps) {
  const handleAddSample = () => {
    const newSample: Sample = {
      codigoMuestra: `MUESTRA-${Date.now()}`,
      tipoMatriz: "suelo",
      fechaToma: new Date().toISOString().split("T")[0],
      lugarMuestreo: "",
      observaciones: "",
    }
    onChange([...samples, newSample])
  }

  const handleUpdateSample = (index: number, field: keyof Sample, value: string) => {
    const updated = [...samples]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleRemoveSample = (index: number) => {
    onChange(samples.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-serif font-semibold text-gray-900">Datos de Muestra(s)</h2>

      {samples.map((sample, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center mb-3">
            <p className="font-serif font-semibold text-gray-900">Muestra {index + 1}</p>
            {samples.length > 1 && (
              <button
                onClick={() => handleRemoveSample(index)}
                className="text-red-600 hover:text-red-700 text-sm font-serif"
              >
                Eliminar
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Código de muestra"
            value={sample.codigoMuestra}
            onChange={(e) => handleUpdateSample(index, "codigoMuestra", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <select
            value={sample.tipoMatriz}
            onChange={(e) => handleUpdateSample(index, "tipoMatriz", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {matrixTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={sample.fechaToma}
            onChange={(e) => handleUpdateSample(index, "fechaToma", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Lugar de muestreo"
            value={sample.lugarMuestreo}
            onChange={(e) => handleUpdateSample(index, "lugarMuestreo", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <textarea
            placeholder="Observaciones"
            value={sample.observaciones}
            onChange={(e) => handleUpdateSample(index, "observaciones", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            rows={2}
          />
        </div>
      ))}

      <button
        onClick={handleAddSample}
        className="w-full py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-serif font-semibold transition-colors"
      >
        + Agregar Muestra
      </button>
    </div>
  )
}
