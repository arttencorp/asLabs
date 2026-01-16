"use client"

import { useState } from "react"
import type { Signature } from "../types"

interface SignaturesSectionProps {
  firmas: Signature[]
  onChange: (firmas: Signature[]) => void
}

export default function SignaturesSection({ firmas, onChange }: SignaturesSectionProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddSignature = () => {
    const newSignature: Signature = {
      id: `sig-${Date.now()}`,
      nombre: "",
      cargo: "",
      fecha: new Date().toISOString().split("T")[0],
      imagen: undefined,
    }
    onChange([...firmas, newSignature])
  }

  const handleUpdateSignature = (id: string, field: keyof Signature, value: any) => {
    onChange(firmas.map((sig) => (sig.id === id ? { ...sig, [field]: value } : sig)))
  }

  const handleRemoveSignature = (id: string) => {
    onChange(firmas.filter((sig) => sig.id !== id))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-serif font-semibold text-gray-900">Firmas Autorizadas</h2>

      {firmas.map((firma, idx) => (
        <div key={firma.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <p className="font-serif font-semibold text-gray-900">Firma {idx + 1}</p>
            {firmas.length > 1 && (
              <button
                onClick={() => handleRemoveSignature(firma.id)}
                className="text-red-600 hover:text-red-700 text-sm font-serif"
              >
                Eliminar
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Nombre completo"
              value={firma.nombre}
              onChange={(e) => handleUpdateSignature(firma.id, "nombre", e.target.value)}
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Cargo"
              value={firma.cargo}
              onChange={(e) => handleUpdateSignature(firma.id, "cargo", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <input
            type="date"
            value={firma.fecha}
            onChange={(e) => handleUpdateSignature(firma.id, "fecha", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      ))}

      <button
        onClick={handleAddSignature}
        className="w-full py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-serif font-semibold transition-colors"
      >
        + Agregar Firma
      </button>
    </div>
  )
}
