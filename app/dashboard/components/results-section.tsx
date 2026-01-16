"use client"
import type { ResultRow, DocumentType } from "../types"
import ReferentialBarChart from "./referential-bar-chart"

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
      valorReferencial: { min: undefined, max: undefined, showChart: false },
    }
    onChange([...results, newResult])
  }

  const handleUpdateResult = (index: number, field: keyof ResultRow, value: any) => {
    const updated = [...results]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleUpdateReferential = (index: number, field: "min" | "max" | "showChart", value: any) => {
    const updated = [...results]
    if (!updated[index].valorReferencial) {
      updated[index].valorReferencial = {}
    }
    updated[index].valorReferencial![field] = value
    onChange(updated)
  }

  const handleRemoveResult = (index: number) => {
    onChange(results.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-serif font-semibold text-gray-900">
        {documentType === "informe" ? "Resultados" : "Resumen"}
      </h2>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-2 space-y-2 bg-white">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-serif font-semibold text-gray-700">Parámetro</label>
                  <input
                    type="text"
                    value={result.parametro}
                    onChange={(e) => handleUpdateResult(index, "parametro", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-serif font-semibold text-gray-700">Resultado</label>
                  <input
                    type="text"
                    value={result.resultado}
                    onChange={(e) => handleUpdateResult(index, "resultado", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-serif font-semibold text-gray-700">Unidad</label>
                  <input
                    type="text"
                    value={result.unidad}
                    onChange={(e) => handleUpdateResult(index, "unidad", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-serif font-semibold text-gray-700">Método</label>
                  <input
                    type="text"
                    value={result.metodo}
                    onChange={(e) => handleUpdateResult(index, "metodo", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </div>
              </div>

              <div className="border-t pt-2 space-y-2">
                <label className="text-xs font-serif font-semibold text-gray-700">
                  Valor Referencial (Rango Normal)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <input
                      type="number"
                      placeholder="Mín"
                      value={result.valorReferencial?.min || ""}
                      onChange={(e) =>
                        handleUpdateReferential(
                          index,
                          "min",
                          e.target.value ? Number.parseFloat(e.target.value) : undefined,
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Máx"
                      value={result.valorReferencial?.max || ""}
                      onChange={(e) =>
                        handleUpdateReferential(
                          index,
                          "max",
                          e.target.value ? Number.parseFloat(e.target.value) : undefined,
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-serif text-gray-700">
                      <input
                        type="checkbox"
                        checked={result.valorReferencial?.showChart || false}
                        onChange={(e) => handleUpdateReferential(index, "showChart", e.target.checked)}
                        className="w-3 h-3"
                      />
                      Mostrar gráfico
                    </label>
                  </div>
                </div>

                {result.valorReferencial?.showChart &&
                  result.valorReferencial?.min &&
                  result.valorReferencial?.max &&
                  result.resultado && (
                    <div className="mt-2">
                      <ReferentialBarChart
                        resultado={Number.parseFloat(result.resultado)}
                        min={result.valorReferencial.min}
                        max={result.valorReferencial.max}
                        unidad={result.unidad}
                      />
                    </div>
                  )}
              </div>

              <div>
                <label className="text-xs font-serif font-semibold text-gray-700">Observación</label>
                <textarea
                  value={result.observacion}
                  onChange={(e) => handleUpdateResult(index, "observacion", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  rows={2}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleRemoveResult(index)}
                  className="text-red-600 hover:text-red-700 text-xs font-serif font-semibold"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleAddResult}
        className="w-full py-2 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-50 font-serif font-semibold transition-colors text-sm"
      >
        + Agregar Resultado
      </button>
    </div>
  )
}
