'use client'

export default function AboutOrganigram() {
  return (
    <section id="organigrama" className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-[0.2em] bg-green-50 px-4 py-2 rounded-full">
              Estructura Organizacional
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Organigrama</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Un equipo multidisciplinario de profesionales comprometidos con la excelencia
          </p>
        </div>

        {/* Organigrama Container */}
        <div className="space-y-16">
          
          {/* NIVEL 1 - Dirección General */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-8 px-4">
            {/* Socio */}
            <div className="flex-1 max-w-xs">
              <div className="bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all h-full flex flex-col justify-center">
                <p className="text-xs font-bold text-green-100 uppercase tracking-widest mb-3">Socio Fundador</p>
                <p className="text-2xl font-serif font-bold mb-2">Marleni G. Valverde</p>
                <p className="text-sm text-green-100 font-medium">Lic. - Socio Ejecutivo</p>
              </div>
            </div>

            {/* Gerencia General */}
            <div className="flex-1 max-w-sm">
              <div className="bg-gradient-to-br from-[#e65100] via-orange-500 to-[#bf360c] text-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all h-full flex flex-col justify-center">
                <p className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-3">Dirección Ejecutiva</p>
                <p className="text-2xl font-serif font-bold mb-2">Gerencia General</p>
                <p className="text-lg font-semibold">Natasha Escobar A.</p>
                <p className="text-sm text-orange-100 font-medium mt-1">Blga. - Gerente General</p>
              </div>
            </div>
          </div>

          {/* Línea conectora */}
          <div className="flex justify-center">
            <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-blue-500"></div>
          </div>

          {/* NIVEL 2 - Gerente de Gestión */}
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all">
                <p className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-3">Gestión y Administración</p>
                <p className="text-2xl font-serif font-bold mb-2">Gerente de Gestión</p>
                <p className="text-lg font-semibold">Antonio Victor Guevara</p>
              </div>
            </div>
          </div>

          {/* Línea conectora */}
          <div className="flex justify-center">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-gray-400"></div>
          </div>

          {/* NIVEL 3 - Tres Ramas Principales */}
          <div className="grid md:grid-cols-3 gap-8 px-4">
            
            {/* RAMA 1 - Área Técnica */}
            <div className="space-y-8">
              {/* Header Área Técnica */}
              <div className="relative">
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-1 h-14 bg-gradient-to-b from-gray-400 to-green-600"></div>
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <p className="text-xs font-bold text-green-100 uppercase tracking-widest mb-2">Área Técnica</p>
                  <p className="text-xl font-serif font-bold mb-2">Jefe en Biotecnología</p>
                  <p className="font-semibold">Ing. Javier Verastegui Sancho</p>
                </div>
              </div>

              {/* Subdivisión Técnica */}
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-green-600"></div>
                </div>

                {/* Supervisión de Técnicos */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
                    <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mb-2">Supervisión</p>
                    <p className="font-semibold">Hellem Guevara N.</p>
                    <p className="text-sm text-emerald-100">Sup. de Técnicos</p>
                  </div>

                  {/* Equipo Técnicos */}
                  <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-emerald-500 space-y-3">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Equipo Técnico</p>
                    <div className="space-y-2">
                      <div className="bg-emerald-50 rounded p-3">
                        <p className="font-semibold text-sm text-gray-900">Jurith Aguilar P.</p>
                        <p className="text-xs text-gray-600">Líder Técnica</p>
                      </div>
                      <div className="bg-emerald-50 rounded p-3">
                        <p className="font-semibold text-sm text-gray-900">Madeleine Isuiza F.</p>
                        <p className="text-xs text-gray-600">Tec. Quím.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-green-600"></div>
                </div>

                {/* Supervisión de Practicantes */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
                    <p className="text-xs font-bold text-teal-100 uppercase tracking-widest mb-2">Supervisión</p>
                    <p className="font-semibold">Melissa Torres M.</p>
                    <p className="text-sm text-teal-100">Sup. de Practicantes</p>
                  </div>

                  {/* Equipo Practicantes */}
                  <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-teal-500 space-y-3">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Equipo Prácticas</p>
                    <div className="space-y-2">
                      <div className="bg-teal-50 rounded p-3">
                        <p className="font-semibold text-sm text-gray-900">Estrella Silva Núñez</p>
                        <p className="text-xs text-gray-600">Practicante - Calidad</p>
                      </div>
                      <div className="bg-teal-50 rounded p-3">
                        <p className="font-semibold text-sm text-gray-900">Practicantes Asignados</p>
                        <p className="text-xs text-gray-600">Equipo de Apoyo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RAMA 2 - Control Biológico */}
            <div className="space-y-8">
              {/* Header Control Biológico */}
              <div className="relative">
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-1 h-14 bg-gradient-to-b from-gray-400 to-yellow-600"></div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <p className="text-xs font-bold text-yellow-100 uppercase tracking-widest mb-2">Control Biológico</p>
                  <p className="text-xl font-serif font-bold mb-2">Jefa de Área</p>
                  <p className="font-semibold">Yvonne Lopez L.</p>
                  <p className="text-sm text-yellow-100">Blga.</p>
                </div>
              </div>

              {/* Subdivisión Control Biológico */}
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-yellow-600"></div>
                </div>

                {/* Microbiología Agroindustrial */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
                    <p className="text-xs font-bold text-amber-100 uppercase tracking-widest mb-2">Especialidad</p>
                    <p className="font-semibold">Hassan Espinales</p>
                    <p className="text-sm text-amber-100">Jefe Microbiología Agroindustrial</p>
                  </div>

                  {/* Equipo Microbiología */}
                  <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-amber-500 space-y-3">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Equipo Microbiología</p>
                    <div className="space-y-2">
                      <div className="bg-amber-50 rounded p-3">
                        <p className="font-semibold text-sm text-gray-900">Luis Alonso Flores Ramírez</p>
                        <p className="text-xs text-gray-600">Técnico de Laboratorio</p>
                      </div>
                      <div className="bg-amber-50 rounded p-3">
                        <p className="font-semibold text-sm text-gray-900">Equipo Técnico</p>
                        <p className="text-xs text-gray-600">Apoyo de Laboratorio</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-yellow-600"></div>
                </div>

                {/* Otras Especialidades */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-500 space-y-3">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Otras Especialidades</p>
                    <div className="space-y-2">
                      <div className="bg-yellow-50 rounded p-3">
                        <p className="font-semibold text-sm text-gray-900">Especialistas</p>
                        <p className="text-xs text-gray-600">Equipos de Investigación</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RAMA 3 - Innovación y Transferencia */}
            <div className="space-y-8">
              {/* Header Innovación */}
              <div className="relative">
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-1 h-14 bg-gradient-to-b from-gray-400 to-purple-600"></div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <p className="text-xs font-bold text-purple-100 uppercase tracking-widest mb-2">Innovación</p>
                  <p className="text-xl font-serif font-bold mb-2">Jefe de Innovación</p>
                  <p className="font-semibold">Jaime Palomino Cuenca</p>
                  <p className="text-sm text-purple-100">Ing. - Transferencia Tecnológica</p>
                </div>
              </div>

              {/* Equipo Comercial */}
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-purple-600"></div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-600 space-y-3">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Equipo Comercial</p>
                    <div className="space-y-2">
                      <div className="bg-purple-50 rounded p-3">
                        <p className="font-semibold text-sm text-gray-900">Sebastian Carranza A.</p>
                        <p className="text-xs text-gray-600">Arq. - Marketing y Publicidad</p>
                      </div>
                      <div className="bg-purple-50 rounded p-3">
                        <p className="font-semibold text-sm text-gray-900">Equipo de Ventas</p>
                        <p className="text-xs text-gray-600">Representantes Comerciales</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Línea divisora */}
          <div className="flex justify-center px-4">
            <div className="w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* NIVEL 4 - Áreas de Apoyo */}
          <div className="flex justify-center px-4">
            <div className="w-full max-w-2xl">
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-8 shadow-md border-l-4 border-blue-500">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6 text-center">Áreas de Apoyo Administrativo</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-semibold text-gray-900 text-sm">Luis Guevara</p>
                    <p className="text-xs text-gray-600">Cont. - Contador</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
