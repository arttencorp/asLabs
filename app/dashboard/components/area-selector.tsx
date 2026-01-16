"use client"

import type { ServiceArea } from "../types"
import { areaLabels } from "../data/catalog"

const areas: ServiceArea[] = ["suelo", "fitopatologia", "ambiente", "microbiologicos", "biotecnologia", "bacteriologia"]

interface AreaSelectorProps {
  selected: ServiceArea | null
  onChange: (area: ServiceArea) => void
}

export default function AreaSelector({ selected, onChange }: AreaSelectorProps) {
  return (
    <select
      value={selected || ""}
      onChange={(e) => onChange(e.target.value as ServiceArea)}
      className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-serif"
    >
      <option value="">Selecciona un área</option>
      {areas.map((area) => (
        <option key={area} value={area}>
          {areaLabels[area]}
        </option>
      ))}
    </select>
  )
}
