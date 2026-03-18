'use client'

export default function AboutOrganigram() {
  return (
    <section id="organigrama" className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-sm font-bold text-[#2e7d32] uppercase tracking-[0.2em] mb-4">
            Estructura Organizacional
          </p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Organigrama</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Un equipo multidisciplinario de profesionales comprometidos con la excelencia
          </p>
        </div>

        <div className="space-y-8">
          {/* Nivel 1 - Gerencia General con Socio */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
            {/* Socio - Chiquito al costado */}
            <div className="w-full sm:w-auto">
              <div className="bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white rounded-2xl p-5 shadow-xl text-center hover:shadow-2xl transition-shadow max-w-xs">
                <p className="text-sm font-bold text-green-100 uppercase tracking-widest mb-2">Socio</p>
                <p className="text-lg font-serif font-bold mb-1">Marleni G. Valverde</p>
                <p className="text-xs text-green-100">Socio Ejecutivo</p>
              </div>
            </div>

            {/* Gerencia General - Principal */}
            <div className="w-full sm:w-auto">
              <div className="bg-gradient-to-br from-[#e65100] via-orange-500 to-[#bf360c] text-white rounded-2xl p-7 shadow-2xl text-center hover:shadow-3xl transition-shadow max-w-sm">
                <p className="text-sm font-bold text-orange-100 uppercase tracking-widest mb-2">Dirección</p>
                <p className="text-2xl font-serif font-bold mb-2">Gerencia General</p>
                <p className="font-semibold text-base">Natasha Escobar A.</p>
                <p className="text-xs text-orange-100 mt-1">Gerente General</p>
              </div>
            </div>
          </div>

          {/* Nivel 2 - Gerente de Gestión */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-orange-500 to-blue-500"></div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow max-w-md w-full text-center">
                <p className="text-sm font-bold text-blue-100 uppercase tracking-widest mb-2">Gestión</p>
                <p className="text-xl font-serif font-bold mb-2">Gerente de Gestión</p>
                <p className="font-semibold">Antonio Victor Guevara</p>
                <p className="text-sm text-blue-100 mt-1">Administración y Gestión</p>
              </div>
            </div>
          </div>

          {/* Nivel 3 - Dos ramas principales */}
          <div className="grid md:grid-cols-2 gap-12 mb-10">
            {/* Rama Izquierda - Área Técnica */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-green-600"></div>
                  <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow max-w-sm">
                    <p className="text-sm font-bold text-green-100 uppercase tracking-widest mb-2">Área Técnica</p>
                    <p className="text-xl font-serif font-bold mb-2">Jefe en Biotecnología</p>
                    <p className="font-semibold">Ing. Javier Verastegui Sancho</p>
                  </div>
                </div>
              </div>

              {/* División Técnica - Supervisión de Técnicos vs Practicantes */}
              <div className="grid grid-cols-2 gap-4">
                {/* Supervisión de Técnicos */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="absolute left-0 right-0 top-0 flex justify-center mb-2">
                      <div className="w-1 h-6 bg-emerald-500"></div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                      <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mb-2">Supervisión</p>
                      <p className="font-semibold text-sm">Hellem Guevara N.</p>
                      <p className="text-xs text-emerald-100 mt-1">Supervisora de Técnicos</p>
                    </div>
                  </div>

                  {/* Equipo Técnico */}
                  <div className="bg-white rounded-lg p-3 shadow-md border-l-4 border-emerald-500 text-center">
                    <p className="text-xs font-bold text-gray-700 mb-2">Equipo Técnico</p>
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="font-semibold text-gray-900">Jurith Aguilar P.</p>
                        <p className="text-gray-600">Líder Técnica</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Madeleine Isuiza F.</p>
                        <p className="text-gray-600">Analista Técnica</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supervisión de Practicantes */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-1 h-6 bg-teal-500 mx-auto mb-2"></div>
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                      <p className="text-xs font-bold text-teal-100 uppercase tracking-widest mb-2">Supervisión</p>
                      <p className="font-semibold text-sm">Melissa Torres M.</p>
                      <p className="text-xs text-teal-100 mt-1">Supervisora de Practicantes</p>
                    </div>
                  </div>

                  {/* Equipo Practicantes */}
                  <div className="bg-white rounded-lg p-3 shadow-md border-l-4 border-teal-500 text-center">
                    <p className="text-xs font-bold text-gray-700 mb-2">Equipo Prácticas</p>
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="font-semibold text-gray-900">Estrella Silva Núñez</p>
                        <p className="text-gray-600">Practicante UNT - Calidad</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Practicantes Asignados</p>
                        <p className="text-gray-600">Equipo de Apoyo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rama Derecha - Innovación y Transferencia Tecnológica */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow max-w-sm">
                    <p className="text-sm font-bold text-purple-100 uppercase tracking-widest mb-2">Comercial & Innovación</p>
                    <p className="text-xl font-serif font-bold mb-2">Jefe de Innovación</p>
                    <p className="font-semibold">Jaime Palomino Cuenca</p>
                    <p className="text-sm text-purple-100 mt-1">Transferencia Tecnológica</p>
                  </div>
                </div>
              </div>

              {/* Equipo Comercial */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-1 h-6 bg-purple-600 mx-auto mb-2"></div>
                  <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-600">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3">Equipo Comercial</p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-gray-900">Sebastian Carranza A.</p>
                        <p className="text-xs text-gray-600">Marketing y Publicidad</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Equipo de Ventas</p>
                        <p className="text-xs text-gray-600">Representantes Comerciales</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nivel 4 - Áreas de Apoyo bajo Gestión */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-500"></div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-6 shadow-md border-l-4 border-blue-500">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 text-center">Áreas de Apoyo</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="font-semibold text-gray-900 text-sm">Luis Guevara</p>
                    <p className="text-xs text-gray-600">Contador</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="font-semibold text-gray-900 text-sm">Yvonne Lopez L.</p>
                    <p className="text-xs text-gray-600">Finanzas & Admin</p>
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
