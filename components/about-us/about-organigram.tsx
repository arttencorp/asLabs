'use client'

export default function AboutOrganigram() {
  return (
    <section id="organigrama" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3">
            <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-[0.2em] bg-green-50 px-4 py-2 rounded-full">
              Estructura Organizacional
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">Organigrama</h2>
          <p className="text-gray-700 font-medium text-sm">Equipo de profesionales dedicados a la excelencia</p>
        </div>

        {/* Organigrama Container */}
        <div className="space-y-6">
          
          {/* NIVEL 1 - Dirección General */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
            {/* Socio */}
            <div className="w-40">
              <div className="bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all text-center">
                <p className="text-xs font-bold text-green-100 uppercase tracking-wider mb-1">Socio</p>
                <p className="text-sm font-serif font-bold mb-1">Marleni G. Valverde</p>
                <p className="text-xs text-green-100">Lic.</p>
              </div>
            </div>

            {/* Gerencia General */}
            <div className="w-44">
              <div className="bg-gradient-to-br from-[#e65100] to-[#bf360c] text-white rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all text-center">
                <p className="text-xs font-bold text-orange-100 uppercase tracking-wider mb-1">Gerencia General</p>
                <p className="text-sm font-semibold">Natasha Escobar A.</p>
                <p className="text-xs text-orange-100">Blga.</p>
              </div>
            </div>
          </div>

          {/* Línea conectora */}
          <div className="flex justify-center">
            <div className="w-px h-3 bg-gradient-to-b from-orange-500 to-blue-500"></div>
          </div>

          {/* NIVEL 2 - Gerente de Gestión */}
          <div className="flex justify-center">
            <div className="w-40">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all text-center">
                <p className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-1">Gestión</p>
                <p className="text-sm font-semibold">Antonio Victor</p>
                <p className="text-xs text-blue-100">Guevara</p>
              </div>
            </div>
          </div>

          {/* Línea conectora */}
          <div className="flex justify-center">
            <div className="w-px h-3 bg-gradient-to-b from-blue-500 to-gray-400"></div>
          </div>

          {/* NIVEL 3 - Tres Ramas Principales */}
          <div className="grid md:grid-cols-3 gap-4 px-4">
            
            {/* RAMA 1 - Área Técnica */}
            <div className="space-y-3">
              {/* Header Área Técnica */}
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-px h-3 bg-gradient-to-b from-gray-400 to-green-600"></div>
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all text-center">
                  <p className="text-xs font-bold text-green-100 uppercase tracking-wider mb-1">Área Técnica</p>
                  <p className="text-xs font-semibold">Ing. Javier Verastegui</p>
                </div>
              </div>

              {/* Subdivisión Técnica */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="w-px h-2 bg-green-600"></div>
                </div>

                {/* Supervisión de Técnicos */}
                <div className="space-y-2">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg p-2 shadow-sm hover:shadow-md transition-all text-center">
                    <p className="text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1">Sup. Técnicos</p>
                    <p className="text-xs font-semibold">Hellem Guevara N.</p>
                  </div>

                  {/* Equipo Técnicos */}
                  <div className="bg-white rounded-md p-2 shadow-sm border-l-2 border-emerald-500 space-y-1">
                    <div className="bg-emerald-50 rounded p-2">
                      <p className="text-xs font-semibold text-gray-900">Jurith Aguilar P.</p>
                    </div>
                    <div className="bg-emerald-50 rounded p-2">
                      <p className="text-xs font-semibold text-gray-900">Tec. Quím. Madeleine I.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-px h-2 bg-green-600"></div>
                </div>

                {/* Supervisión de Practicantes */}
                <div className="space-y-2">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-lg p-2 shadow-sm hover:shadow-md transition-all text-center">
                    <p className="text-xs font-bold text-teal-100 uppercase tracking-wider mb-1">Sup. Practicantes</p>
                    <p className="text-xs font-semibold">Melissa Torres M.</p>
                  </div>

                  {/* Equipo Practicantes */}
                  <div className="bg-white rounded-md p-2 shadow-sm border-l-2 border-teal-500 space-y-1">
                    <div className="bg-teal-50 rounded p-2">
                      <p className="text-xs font-semibold text-gray-900">Estrella Silva Núñez</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RAMA 2 - Control Biológico */}
            <div className="space-y-3">
              {/* Header Control Biológico */}
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-px h-3 bg-gradient-to-b from-gray-400 to-yellow-600"></div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all text-center">
                  <p className="text-xs font-bold text-yellow-100 uppercase tracking-wider mb-1">Control Biológico</p>
                  <p className="text-xs font-semibold">Yvonne Lopez L.</p>
                  <p className="text-xs text-yellow-100">Blga.</p>
                </div>
              </div>

              {/* Subdivisión Control Biológico */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="w-px h-2 bg-yellow-600"></div>
                </div>

                {/* Microbiología Agroindustrial */}
                <div className="space-y-2">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-lg p-2 shadow-sm hover:shadow-md transition-all text-center">
                    <p className="text-xs font-bold text-amber-100 uppercase tracking-wider mb-1">Microbiología</p>
                    <p className="text-xs font-semibold">Hassan Espinales</p>
                  </div>

                  {/* Equipo Microbiología */}
                  <div className="bg-white rounded-md p-2 shadow-sm border-l-2 border-amber-500 space-y-1">
                    <div className="bg-amber-50 rounded p-2">
                      <p className="text-xs font-semibold text-gray-900">Luis Alonso Flores R.</p>
                      <p className="text-xs text-gray-600">Técnico Lab.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RAMA 3 - Innovación y Transferencia */}
            <div className="space-y-3">
              {/* Header Innovación */}
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-px h-3 bg-gradient-to-b from-gray-400 to-purple-600"></div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all text-center">
                  <p className="text-xs font-bold text-purple-100 uppercase tracking-wider mb-1">Innovación</p>
                  <p className="text-xs font-semibold">Ing. Jaime Palomino</p>
                  <p className="text-xs text-purple-100">Jefe I+T</p>
                </div>
              </div>

              {/* Equipo Comercial */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="w-px h-2 bg-purple-600"></div>
                </div>

                <div className="space-y-2">
                  <div className="bg-white rounded-md p-2 shadow-sm border-l-2 border-purple-600 space-y-1">
                    <div className="bg-purple-50 rounded p-2">
                      <p className="text-xs font-semibold text-gray-900">Arq. Sebastian Carranza</p>
                      <p className="text-xs text-gray-600">Marketing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NIVEL 4 - Áreas de Apoyo */}
          <div className="flex justify-center px-4 pt-2">
            <div className="w-40">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-2 shadow-md border-l-2 border-blue-500 text-center">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Apoyo</p>
                <p className="text-xs font-semibold text-gray-900">Cont. Luis Guevara</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
