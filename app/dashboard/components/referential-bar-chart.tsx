"use client"

interface ReferentialBarChartProps {
  resultado: number
  min?: number
  max?: number
  unidad?: string
}

export default function ReferentialBarChart({ resultado, min, max, unidad }: ReferentialBarChartProps) {
  if (!min || !max) return null

  // Determinar los rangos según la tabla mostrada
  const rangos = [
    { label: "Muy Bajo", min: 0, max: min * 0.5, color: "rgb(220, 53, 69)" }, // Rojo
    { label: "Bajo", min: min * 0.5, max: min, color: "rgb(255, 193, 7)" }, // Amarillo
    { label: "Normal", min: min, max: max, color: "rgb(40, 167, 69)" }, // Verde
    { label: "Alto", min: max, max: max * 1.5, color: "rgb(255, 193, 7)" }, // Amarillo
    { label: "Muy Alto", min: max * 1.5, max: max * 2, color: "rgb(220, 53, 69)" }, // Rojo
  ]

  // Calcular la posición del resultado en la barra
  const escala = max * 2
  const posicionResultado = (resultado / escala) * 100

  return (
    <div className="space-y-2">
      <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
        {/* Barra de gradiente de colores */}
        <div className="absolute inset-0 flex">
          {rangos.map((rango, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                backgroundColor: rango.color,
                opacity: 0.7,
              }}
            />
          ))}
        </div>

        {/* Líneas de referencia */}
        {min && (
          <div
            className="absolute top-0 bottom-0 border-l-2 border-gray-400"
            style={{ left: `${(min / escala) * 100}%` }}
          />
        )}
        {max && (
          <div
            className="absolute top-0 bottom-0 border-l-2 border-gray-400"
            style={{ left: `${(max / escala) * 100}%` }}
          />
        )}

        {/* Marcador del resultado */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gray-900"
          style={{ left: `${posicionResultado}%`, transform: "translateX(-50%)" }}
        />
      </div>

      {/* Etiquetas */}
      <div className="flex justify-between text-xs font-serif text-gray-600">
        <span>0</span>
        {min && <span className="text-blue-600 font-semibold">{min}</span>}
        {max && <span className="text-green-600 font-semibold">{max}</span>}
        <span>{escala}</span>
      </div>

      {/* Valor actual */}
      <div className="text-center text-xs font-serif font-semibold text-gray-900">
        Valor: {resultado} {unidad}
      </div>
    </div>
  )
}
