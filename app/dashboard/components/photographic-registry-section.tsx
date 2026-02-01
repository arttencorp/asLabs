'use client'

import React from "react"

import { useState } from 'react'
import type { PhotographicRegistry } from '../types'
import { Input } from '@/components/ui/input'
import { X, Upload } from 'lucide-react'

interface PhotographicRegistrySectionProps {
  registry: PhotographicRegistry
  onChange: (registry: PhotographicRegistry) => void
}

export default function PhotographicRegistrySection({
  registry,
  onChange,
}: PhotographicRegistrySectionProps) {
  const [previewUrl, setPreviewUrl] = useState<string>('')

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
      setPreviewUrl('')
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

      {/* Sección de carga de imágenes */}
      <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
        <label className="flex flex-col items-center justify-center cursor-pointer gap-2">
          <Upload className="w-6 h-6 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">Haz clic para subir foto</span>
          <span className="text-xs text-gray-500">(JPG, PNG, WebP - Máx 5MB)</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Galería de imágenes */}
      {registry.imagenes && registry.imagenes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-700 mb-3">Imágenes cargadas ({registry.imagenes.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {registry.imagenes.map((imagen) => (
              <div key={imagen.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img src={imagen.url || "/placeholder.svg"} alt="preview" className="w-full h-full object-cover" />
                </div>
                <div className="p-2 space-y-2">
                  <input
                    type="text"
                    placeholder="Título (ej: Cultivo en agar)"
                    value={imagen.titulo || ''}
                    onChange={(e) => handleUpdateImage(imagen.id, e.target.value, imagen.descripcion || '')}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1"
                  />
                  <textarea
                    placeholder="Descripción..."
                    value={imagen.descripcion || ''}
                    onChange={(e) => handleUpdateImage(imagen.id, imagen.titulo || '', e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1 h-12 resize-none"
                  />
                  <button
                    onClick={() => handleRemoveImage(imagen.id)}
                    className="w-full flex items-center justify-center gap-1 text-xs text-red-600 hover:bg-red-50 py-1 rounded"
                  >
                    <X className="w-3 h-3" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campos principales */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-2">Figura (descripción/etiqueta general):</label>
          <Input
            type="text"
            placeholder="Ej: Cultivo en agar nutritivo, Tinción de Gram, Colonia aislada..."
            value={registry.figura || ''}
            onChange={(e) => onChange({ ...registry, figura: e.target.value })}
            className="h-8 text-xs border-gray-300"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 block mb-2">Nota / Observación fotográfica general:</label>
          <textarea
            placeholder="Describa brevemente las características generales observadas en las fotografías..."
            value={registry.nota || ''}
            onChange={(e) => onChange({ ...registry, nota: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-xs h-16 font-serif resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>
    </div>
  )
}
