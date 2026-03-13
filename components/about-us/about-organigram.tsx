"use client"

export default function AboutOrganigram() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#01283c] text-center mb-4">Estructura Organizacional</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Un equipo multidisciplinario comprometido con la excelencia
        </p>

        <div className="flex flex-col items-center">
          {/* CEO */}
          <div className="mb-8">
            <div className="bg-[#01283c] text-white rounded-lg px-8 py-4 font-bold text-center min-w-64">
              Dirección General
            </div>
          </div>

          {/* Vertical line */}
          <div className="w-1 h-8 bg-gray-300"></div>

          {/* Second level */}
          <div className="grid md:grid-cols-3 gap-8 w-full mb-8">
            {/* Vertical line down */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-300"></div>

            <div className="flex flex-col items-center">
              <div className="bg-[#2e7d32] text-white rounded-lg px-6 py-3 font-bold text-center min-w-56">
                Dirección de Investigación
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-[#2e7d32] text-white rounded-lg px-6 py-3 font-bold text-center min-w-56">
                Dirección de Operaciones
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-[#2e7d32] text-white rounded-lg px-6 py-3 font-bold text-center min-w-56">
                Dirección Comercial
              </div>
            </div>
          </div>

          {/* Vertical line */}
          <div className="w-1 h-8 bg-gray-300 mb-8"></div>

          {/* Third level */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-center text-sm min-w-48">
                Lab. Biotecnología Vegetal
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-center text-sm min-w-48">
                Lab. Control Biológico
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-center text-sm min-w-48">
                Servicios de Diagnóstico
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-center text-sm min-w-48">
                Ventas y Marketing
              </div>
            </div>
          </div>
        </div>

        {/* Key areas */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-block bg-[#01283c] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-[#01283c] mb-2">Investigación & Desarrollo</h3>
            <p className="text-gray-600">
              Equipos especializados en biotecnología vegetal, microbiología e innovación continua
            </p>
          </div>

          <div className="text-center">
            <div className="inline-block bg-[#01283c] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 font-bold">
              2
            </div>
            <h3 className="text-lg font-bold text-[#01283c] mb-2">Operaciones</h3>
            <p className="text-gray-600">
              Gestión de laboratorios, control de calidad y producción de soluciones biotecnológicas
            </p>
          </div>

          <div className="text-center">
            <div className="inline-block bg-[#01283c] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 font-bold">
              3
            </div>
            <h3 className="text-lg font-bold text-[#01283c] mb-2">Comercial</h3>
            <p className="text-gray-600">
              Relaciones con clientes, distribución de productos y expansión de mercado
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
