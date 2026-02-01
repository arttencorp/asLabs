'use client'

import type { PhotographicRegistry } from '../types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface PhotographicRegistrySectionProps {
  registry: PhotographicRegistry
  onChange: (registry: PhotographicRegistry) => void
}

export default function PhotographicRegistrySection({
  registry,
  onChange,
}: PhotographicRegistrySectionProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold text-sm mb-4">8) REGISTRO FOTOGRÁFICO</h3>

      <div className="mb-4">
        <label className="text-xs font-bold block mb-1">Figura (descripción/etiqueta):</label>
        <Input
          type="text"
          placeholder="Ej: Cultivo en agar nutritivo, Tinción de Gram, Colonia aislada..."
          value={registry.figura || ''}
          onChange={(e) => onChange({ ...registry, figura: e.target.value })}
          className="h-7 text-xs"
        />
      </div>

      <div>
        <label className="text-xs font-bold block mb-1">Nota / Observación fotográfica:</label>
        <Textarea
          placeholder="Describa brevemente las características observadas en la fotografía..."
          value={registry.nota || ''}
          onChange={(e) => onChange({ ...registry, nota: e.target.value })}
          className="text-xs h-20"
        />
      </div>
    </div>
  )
}
