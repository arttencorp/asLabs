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

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-20 h-3 bg-gray-200 rounded border border-gray-400">
        <div
          className="absolute top-0 bottom-0 bg-gray-300"
          style={{
            left: `${(min / escala) * 100}%`,
            right: `${100 - (max / escala) * 100}%`,
          }}
        />

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-black"
          style={{
            left: `${posicionResultado}%`,
          }}
        />
      </div>
      <span className="text-xs font-serif text-gray-700 whitespace-nowrap">
        {resultado} {unidad}
      </span>
    </div>
  )
}
