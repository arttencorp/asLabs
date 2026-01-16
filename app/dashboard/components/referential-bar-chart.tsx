"use client"

interface ReferentialBarChartProps {
  resultado: number
  min?: number
  max?: number
  unidad?: string
}

export default function ReferentialBarChart({ resultado, min, max, unidad }: ReferentialBarChartProps) {
  if (!min || !max) return null

  const escala = max * 2
  const posicionResultado = (resultado / escala) * 100

  // Determinar color según rangos
  let barColor = "rgb(100, 100, 100)" // gris por defecto
  if (resultado >= min && resultado <= max) {
    barColor = "rgb(40, 167, 69)" // verde para normal
  } else {
    barColor = "rgb(220, 53, 69)" // rojo para fuera de rango
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-24 h-4 bg-gray-200 rounded border border-gray-300">
        {/* Rango normal en gris claro */}
        <div
          className="absolute top-0 bottom-0 bg-gray-300"
          style={{
            left: `${(min / escala) * 100}%`,
            right: `${100 - (max / escala) * 100}%`,
          }}
        />

        {/* Marcador del resultado */}
        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{
            left: `${posicionResultado}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
      <span className="text-xs font-serif text-gray-700 whitespace-nowrap">
        {resultado} {unidad}
      </span>
    </div>
  )
}
