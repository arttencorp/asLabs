'use client'

export default function AboutOrganigram() {
  return (
    <section className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#2e7d32] uppercase tracking-[0.15em] mb-4 font-bold">
            Estructura
          </p>
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">Organigrama</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Un equipo multidisciplinario de profesionales comprometidos con la excelencia
          </p>
        </div>

        {/* Level 1 - CEO */}
        <div className="flex justify-center mb-12">
          <div className="bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] text-white rounded-lg p-6 shadow-lg max-w-xs w-full text-center">
            <p className="text-2xl font-serif font-bold">Socios Fundadores</p>
            <div className="mt-4 space-y-1">
              <p className="font-semibold">Marleni G. Valverde</p>
              <p className="text-sm text-green-100">Socio Ejecutivo</p>
            </div>
          </div>
        </div>

        {/* Connecting line */}
        <div className="flex justify-center mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-[#2e7d32] to-transparent"></div>
        </div>

        {/* Level 2 */}
        <div className="flex justify-center mb-12">
          <div className="bg-gradient-to-r from-[#e65100] to-[#bf360c] text-white rounded-lg p-6 shadow-lg max-w-xs w-full text-center">
            <p className="text-2xl font-serif font-bold">Gerencia General</p>
            <div className="mt-4 space-y-1">
              <p className="font-semibold">Natasha Escobar A.</p>
              <p className="text-sm text-orange-100">Gerente General</p>
            </div>
          </div>
        </div>

        {/* Connecting line */}
        <div className="flex justify-center mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-[#e65100] to-transparent"></div>
        </div>

        {/* Level 3 - Three departments */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Admin */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white rounded-lg p-4 shadow-md w-full text-center mb-4">
              <p className="text-lg font-serif font-bold">Administración</p>
              <p className="text-sm mt-2 font-semibold">Antonio Guevara E.</p>
              <p className="text-xs text-blue-100">Administrador</p>
            </div>
          </div>

          {/* Technical */}
          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white rounded-lg p-4 shadow-md w-full text-center mb-4">
              <p className="text-lg font-serif font-bold">Área Técnica</p>
              <p className="text-sm mt-2 font-semibold">Ing. Javier Verastegui</p>
              <p className="text-xs text-green-100">Jefe en Biotecnología</p>
            </div>
          </div>

          {/* Commercial */}
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 text-white rounded-lg p-4 shadow-md w-full text-center mb-4">
              <p className="text-lg font-serif font-bold">Comercial</p>
              <p className="text-sm mt-2 font-semibold">Por definir</p>
              <p className="text-xs text-purple-100">Jefe Comercial</p>
            </div>
          </div>
        </div>

        {/* Level 4 - Sub departments */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-8 text-center">Equipo Especializado</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Marketing */}
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Sebastian Carranza A.</p>
              <p className="text-sm text-gray-600">Marketing y Publicidad</p>
            </div>

            {/* Contabilidad */}
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Luis Guevara</p>
              <p className="text-sm text-gray-600">Contador</p>
            </div>

            {/* Finanzas */}
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Yvonne Lopez L.</p>
              <p className="text-sm text-gray-600">Finanzas y Admin</p>
            </div>

            {/* Supervisora Técnica 1 */}
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Melissa Torres M.</p>
              <p className="text-sm text-gray-600">Supervisora - Practicantes</p>
            </div>

            {/* Supervisora Técnica 2 */}
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Hellem Guevara N.</p>
              <p className="text-sm text-gray-600">Supervisora - Comercial</p>
            </div>

            {/* Analista de Calidad */}
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Estrella Silva Núñez</p>
              <p className="text-sm text-gray-600">Analista de Calidad</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Líderes de Proyecto</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-teal-500 pl-4 py-2">
                <p className="font-semibold text-gray-900">Jurith Aguilar P.</p>
                <p className="text-sm text-gray-600">Líder Técnica</p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4 py-2">
                <p className="font-semibold text-gray-900">Madeleine Isuiza F.</p>
                <p className="text-sm text-gray-600">Analista Técnica</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
