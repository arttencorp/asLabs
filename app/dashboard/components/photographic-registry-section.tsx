'use client'

import React from "react"

import { useState } from 'react'
import type { PhotographicRegistry } from '../types'
import { Input } from '@/components/ui/input'
import { X, Upload, Plus } from 'lucide-react'

interface PhotographicRegistrySectionProps {
  registry: PhotographicRegistry
  onChange: (registry: PhotographicRegistry) => void
}

export default function PhotographicRegistrySection({
  registry,
  onChange,
}: PhotographicRegistrySectionProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const url = event.target?.result as string
      const newImage = {
        id: Date.now().toString(),
        url,
        titulo: '',
        descripcion: '',
      }
      const imagenes = [...(registry.imagenes || []), newImage]
      onChange({ ...registry, imagenes })
      e.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (imageId: string) => {
    const imagenes = registry.imagenes?.filter((img) => img.id !== imageId) || []
    onChange({ ...registry, imagenes })
  }

  const handleUpdateImage = (imageId: string, titulo: string, descripcion: string) => {
    const imagenes = registry.imagenes?.map((img) =>
      img.id === imageId ? { ...img, titulo, descripcion } : img,
    )
    onChange({ ...registry, imagenes })
  }

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-gradient-to-br from-white to-gray-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gray-800 rounded-full"></div>
        <h3 className="font-bold text-sm uppercase tracking-wide">8) Registro Fotográfico</h3>
      </div>

      {/* Galería de figuras */}
      {registry.imagenes && registry.imagenes.length > 0 && (
        <div className="mb-8 space-y-4">
          <h4 className="text-xs font-bold text-gray-800 bg-gray-100 px-3 py-2 rounded">Figuras registradas ({registry.imagenes.length})</h4>
          <div className="space-y-4">
            {registry.imagenes.map((imagen, index) => (
              <div key={imagen.id} className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-gray-400 transition">
                <div className="flex gap-4">
                  {/* Imagen */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                      <img src={imagen.url || "/placeholder.svg"} alt={`Figura ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Figura {index + 1}: Descripción/Etiqueta</label>
                      <Input
                        type="text"
                        placeholder="Ej: Cultivo en agar nutritivo, Tinción de Gram, etc."
                        value={imagen.titulo || ''}
                        onChange={(e) => handleUpdateImage(imagen.id, e.target.value, imagen.descripcion || '')}
                        className="h-7 text-xs border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Nota / Observación</label>
                      <textarea
                        placeholder="Describa brevemente las características observadas en esta fotografía..."
                        value={imagen.descripcion || ''}
                        onChange={(e) => handleUpdateImage(imagen.id, imagen.titulo || '', e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2 py-1 h-14 resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleRemoveImage(imagen.id)}
                    className="flex-shrink-0 text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                    title="Eliminar figura"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botón Añadir Figura */}
      <div className="flex gap-2 mb-6">
        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-400 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition font-semibold text-sm">
          <Plus className="w-5 h-5" />
          Añadir Figura
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Información general */}
      {(!registry.imagenes || registry.imagenes.length === 0) && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center mb-6">
          <p className="text-xs text-gray-700">
            <strong>Haz clic en "Añadir Figura"</strong> para subir fotos y agregarles descripción y notas
          </p>
        </div>
      )}
    </div>
  )
}
