"use client"

import type { ResultRow, DocumentType } from "../types"

interface ResultsSectionProps {
  results: ResultRow[]
  onChange: (results: ResultRow[]) => void
  documentType: DocumentType
}

export default function ResultsSection({ results, onChange, documentType }: ResultsSectionProps) {
  const handleAddResult = () => {
    const newResult: ResultRow = {
      parametro: "",
      resultado: "",
      unidad: "",
      metodo: "",
      observacion: "",
    }
    onChange([...results, newResult])
  }

  const handleUpdateResult = (index: number, field: keyof ResultRow, value: string) => {
    const updated = [...results]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleRemoveResult = (index: number) => {
    onChange(results.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-serif font-semibold text-gray-900">
        {documentType === "informe" ? "Resultados" : "Resumen"}
      </h2>

      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left font-serif">Parámetro</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-serif">Resultado</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-serif">Unidad</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-serif">Método</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-serif">Acción</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      value={result.parametro}
                      onChange={(e) => handleUpdateResult(index, "parametro", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      value={result.resultado}
                      onChange={(e) => handleUpdateResult(index, "resultado", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      value={result.unidad}
                      onChange={(e) => handleUpdateResult(index, "unidad", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      value={result.metodo}
                      onChange={(e) => handleUpdateResult(index, "metodo", e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <button
                      onClick={() => handleRemoveResult(index)}
                      className="text-red-600 hover:text-red-700 text-xs font-serif"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={handleAddResult}
        className="w-full py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-serif font-semibold transition-colors"
      >
        + Agregar Resultado
      </button>
    </div>
  )
}
