'use client'

export default function AboutOrganigram() {
  return (
    <section id="organigrama" className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f8faf9] via-[#f4f7fb] to-[#eef4f2]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-[#2e7d32] uppercase tracking-[0.15em] mb-4">
            Estructura
          </p>
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">Organigrama</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Un equipo multidisciplinario de profesionales comprometidos con la excelencia
          </p>
        </div>

        {/* Nivel 1 - Gerencia General con Socio al costado */}
        <div className="flex justify-center items-start gap-8 mb-12 flex-col sm:flex-row">
          {/* Gerencia General - Principal */}
          <div className="flex-1 max-w-sm">
            <div className="bg-gradient-to-r from-[#c27737] to-[#9e5b25] text-white rounded-2xl p-6 shadow-lg text-center">
              <p className="text-2xl font-serif font-bold mb-2">Gerencia General</p>
              <p className="font-semibold">Natasha Escobar A.</p>
              <p className="text-sm text-orange-100">Gerente General</p>
            </div>
          </div>

          {/* Socio - Chiquito al costado */}
          <div className="flex-1 max-w-xs">
            <div className="bg-gradient-to-r from-[#2f7a57] to-[#245f45] text-white rounded-2xl p-4 shadow-lg text-center">
              <p className="text-lg font-serif font-bold mb-1">Socio</p>
              <p className="font-semibold text-sm">Marleni G. Valverde</p>
              <p className="text-xs text-green-100">Socio Ejecutivo</p>
            </div>
          </div>
        </div>

        {/* Connecting line */}
        <div className="flex justify-center mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-[#b56a2e] to-transparent"></div>
        </div>

        {/* Nivel 2 - Administrador */}
        <div className="flex justify-center mb-12">
          <div className="bg-gradient-to-r from-[#2f5e7a] to-[#254e66] text-white rounded-2xl p-5 shadow-lg max-w-md w-full text-center">
            <p className="text-xl font-serif font-bold mb-2">Administración</p>
            <p className="font-semibold">Antonio Guevara E.</p>
            <p className="text-sm text-blue-100">Administrador</p>
          </div>
        </div>

        {/* Connecting line */}
        <div className="flex justify-center mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-[#2f5e7a] to-transparent"></div>
        </div>

        {/* Nivel 3 - Área Técnica y Comercial */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Área Técnica */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-[#2f7a57] to-[#245f45] text-white rounded-2xl p-5 shadow-lg w-full text-center">
              <p className="text-lg font-serif font-bold mb-2">Área Técnica</p>
              <p className="font-semibold">Ing. Javier Verastegui Sancho</p>
              <p className="text-sm text-green-100">Jefe en Biotecnología</p>
            </div>

            {/* Connecting line down */}
            <div className="w-1 h-6 bg-[#2f7a57] my-2"></div>

            {/* Supervisoras Técnicas */}
            <div className="w-full space-y-3">
              <div className="bg-[#4f9a76] text-white rounded-xl p-4 shadow-md text-center">
                <p className="font-semibold">Melissa Torres M.</p>
                <p className="text-sm text-emerald-100">Supervisora - Practicantes</p>
              </div>
              <div className="bg-[#4f9a76] text-white rounded-xl p-4 shadow-md text-center">
                <p className="font-semibold">Hellem Guevara N.</p>
                <p className="text-sm text-emerald-100">Supervisora - Técnica</p>
              </div>
            </div>

            {/* Equipo Técnico */}
            <div className="w-1 h-6 bg-[#2f7a57] my-2"></div>
            <div className="w-full bg-white rounded-xl p-4 shadow-md border-l-4 border-[#2f7a57]">
              <h4 className="font-semibold text-gray-900 mb-3">Equipo Técnico</h4>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-sm text-gray-900">Estrella Silva Núñez</p>
                  <p className="text-xs text-gray-600">Analista de Calidad</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Jurith Aguilar P.</p>
                  <p className="text-xs text-gray-600">Líder Técnica</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Madeleine Isuiza F.</p>
                  <p className="text-xs text-gray-600">Analista Técnica</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comercial */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-[#4a6f8d] to-[#3d5d76] text-white rounded-2xl p-5 shadow-lg w-full text-center">
              <p className="text-lg font-serif font-bold mb-2">Comercial</p>
              <p className="font-semibold">Jaime Palomino Cuenca</p>
              <p className="text-sm text-slate-200">Jefe Comercial</p>
            </div>

            {/* Connecting line down */}
            <div className="w-1 h-6 bg-[#4a6f8d] my-2"></div>

            {/* Equipo Comercial */}
            <div className="w-full bg-white rounded-xl p-4 shadow-md border-l-4 border-[#4a6f8d]">
              <h4 className="font-semibold text-gray-900 mb-3">Equipo Comercial</h4>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-sm text-gray-900">Sebastian Carranza A.</p>
                  <p className="text-xs text-gray-600">Marketing y Publicidad</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Por asignar</p>
                  <p className="text-xs text-gray-600">Ventas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nivel 4 - Áreas de Apoyo bajo Administración */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* Connection from Admin */}
            <div className="flex justify-center mb-4">
              <div className="w-1 h-6 bg-[#2f5e7a]"></div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#2f5e7a]">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Áreas de Apoyo</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">Luis Guevara</p>
                  <p className="text-sm text-gray-600">Contador / Contabilidad</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Yvonne Lopez L.</p>
                  <p className="text-sm text-gray-600">Gerente Financiero y Administrativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
