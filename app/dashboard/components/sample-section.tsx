"use client"

import type { Sample, MatrixType } from "../types"

interface SampleSectionProps {
  samples: Sample[]
  onChange: (samples: Sample[]) => void
}

const matrixTypes: MatrixType[] = ["suelo", "agua", "tejido", "alimento", "superficie", "plantin", "cultivo", "otro"]

const fieldDescriptions = {
  codigoMuestra: "Identificador único de la muestra para trazabilidad",
  tipoMatriz: "Tipo de matriz analizada (origen de la muestra)",
  fechaToma: "Fecha en que se recolectó la muestra en campo",
  lugarMuestreo: "Ubicación geográfica donde se tomó la muestra",
  lugarRegistro: "Sitio donde se registró y documentó la muestra",
  centroRegistro: "Centro o laboratorio donde se procesó inicialmente",
  fechaRecepcion: "Fecha en que la muestra llegó al laboratorio",
  fechaAnalisis: "Fecha en que se realizó el análisis técnico",
}

export default function SampleSection({ samples, onChange }: SampleSectionProps) {
  const handleAddSample = () => {
    const newSample: Sample = {
      codigoMuestra: `ASLAB-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      tipoMatriz: "suelo",
      fechaToma: new Date().toISOString().split("T")[0],
      lugarMuestreo: "",
      lugarRegistro: "",
      centroRegistro: "AS Laboratorios - Trujillo",
      fechaRecepcion: new Date().toISOString().split("T")[0],
      fechaAnalisis: new Date().toISOString().split("T")[0],
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

          {/* Código de muestra */}
          <div>
            <label className="block text-xs font-serif font-semibold text-gray-700 mb-1">
              Código de Muestra
              <span className="text-gray-500 ml-2 font-normal">{fieldDescriptions.codigoMuestra}</span>
            </label>
            <input
              type="text"
              placeholder="ASLAB-2026-XXXXXX"
              value={sample.codigoMuestra}
              onChange={(e) => handleUpdateSample(index, "codigoMuestra", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Tipo de matriz */}
          <div>
            <label className="block text-xs font-serif font-semibold text-gray-700 mb-1">
              Tipo de Matriz
              <span className="text-gray-500 ml-2 font-normal">{fieldDescriptions.tipoMatriz}</span>
            </label>
            <select
              value={sample.tipoMatriz}
              onChange={(e) => handleUpdateSample(index, "tipoMatriz", e.target.value as MatrixType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {matrixTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Grid de fechas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-serif font-semibold text-gray-700 mb-1">
                Fecha de Toma
                <span className="text-gray-500 ml-2 font-normal">{fieldDescriptions.fechaToma}</span>
              </label>
              <input
                type="date"
                value={sample.fechaToma}
                onChange={(e) => handleUpdateSample(index, "fechaToma", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-serif font-semibold text-gray-700 mb-1">
                Fecha de Recepción
                <span className="text-gray-500 ml-2 font-normal">{fieldDescriptions.fechaRecepcion}</span>
              </label>
              <input
                type="date"
                value={sample.fechaRecepcion}
                onChange={(e) => handleUpdateSample(index, "fechaRecepcion", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-serif font-semibold text-gray-700 mb-1">
                Fecha de Análisis
                <span className="text-gray-500 ml-2 font-normal">{fieldDescriptions.fechaAnalisis}</span>
              </label>
              <input
                type="date"
                value={sample.fechaAnalisis}
                onChange={(e) => handleUpdateSample(index, "fechaAnalisis", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Lugar y centro de registro */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-serif font-semibold text-gray-700 mb-1">
                Lugar de Registro
                <span className="text-gray-500 ml-2 font-normal">{fieldDescriptions.lugarRegistro}</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Campo agrícola, zona norte"
                value={sample.lugarRegistro}
                onChange={(e) => handleUpdateSample(index, "lugarRegistro", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-serif font-semibold text-gray-700 mb-1">
                Centro de Registro
                <span className="text-gray-500 ml-2 font-normal">{fieldDescriptions.centroRegistro}</span>
              </label>
              <input
                type="text"
                value={sample.centroRegistro}
                onChange={(e) => handleUpdateSample(index, "centroRegistro", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Lugar de muestreo */}
          <div>
            <label className="block text-xs font-serif font-semibold text-gray-700 mb-1">
              Lugar de Muestreo
              <span className="text-gray-500 ml-2 font-normal">{fieldDescriptions.lugarMuestreo}</span>
            </label>
            <input
              type="text"
              placeholder="Coordenadas o descripción de ubicación"
              value={sample.lugarMuestreo}
              onChange={(e) => handleUpdateSample(index, "lugarMuestreo", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Observaciones */}
          <textarea
            placeholder="Observaciones adicionales sobre la muestra"
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
