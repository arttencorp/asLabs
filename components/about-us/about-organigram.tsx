'use client'

export default function AboutOrganigram() {
  return (
    <section className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.15em] mb-4">
            Estructura
          </p>
          <h2 className="text-5xl font-light text-gray-900 mb-6">Organigrama</h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Un equipo multidisciplinario de profesionales comprometidos con la excelencia
          </p>
        </div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {/* Level 1: Partners */}
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Socios / Alta Dirección</p>
            </div>
            <div className="space-y-2 pl-6 border-l-2 border-gray-200">
              <div className="pb-3">
                <p className="font-light text-gray-900">Marleni G. Valverde</p>
                <p className="text-sm text-gray-600 font-light">Socio, Ejecutivo</p>
              </div>
              <div>
                <p className="font-light text-gray-900">Natasha Escobar A.</p>
                <p className="text-sm text-gray-600 font-light">Gerente General, Ejecutivo</p>
              </div>
            </div>
          </div>

          {/* Level 2: Central Administrative */}
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Nivel Administrativo Central</p>
            </div>
            <div className="space-y-2 pl-6 border-l-2 border-gray-200">
              <div>
                <p className="font-light text-gray-900">Antonio Guevara E.</p>
                <p className="text-sm text-gray-600 font-light">Administrador, Ejecutivo</p>
              </div>
            </div>
          </div>

          {/* Level 3: Support Areas */}
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Áreas de Apoyo</p>
              <p className="text-xs text-gray-400 font-light">(Dependientes del Administrador)</p>
            </div>
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div>
                <p className="font-light text-gray-900">Sebastian Carranza A.</p>
                <p className="text-sm text-gray-600 font-light">Marketing y Publicidad</p>
              </div>
              <div>
                <p className="font-light text-gray-900">Luis Guevara</p>
                <p className="text-sm text-gray-600 font-light">Contador, Contabilidad</p>
              </div>
              <div>
                <p className="font-light text-gray-900">Yvonne Lopez L.</p>
                <p className="text-sm text-gray-600 font-light">Gerente, Financiero y Administrativo</p>
              </div>
            </div>
          </div>

          {/* Level 4: Technical Area */}
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Área Técnica Principal</p>
            </div>
            <div className="space-y-2 pl-6 border-l-2 border-gray-200">
              <div>
                <p className="font-light text-gray-900">Ing. Javier Verastegui Sancho</p>
                <p className="text-sm text-gray-600 font-light">Jefe en Biotecnología</p>
              </div>
            </div>
          </div>

          {/* Level 5: Technical Dependencies */}
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Dependencias del Jefe en Biotecnología</p>
            </div>
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div>
                <p className="font-light text-gray-900">Melissa Torres M.</p>
                <p className="text-sm text-gray-600 font-light">Supervisora, Practicantes</p>
              </div>
              <div>
                <p className="font-light text-gray-900">Hellem Guevara N.</p>
                <p className="text-sm text-gray-600 font-light">Supervisora, Comercial</p>
              </div>
            </div>
          </div>

          {/* Level 6: Melissa Torres Dependencies */}
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Dependencias de Melissa Torres M.</p>
            </div>
            <div className="space-y-2 pl-6 border-l-2 border-gray-100">
              <div>
                <p className="font-light text-gray-800">Estrella Silva Nuñez</p>
                <p className="text-sm text-gray-500 font-light">Practicante UNT, Analista de Calidad</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 italic">Equipo Técnico (Nombres Protegidos)</p>
              </div>
            </div>
          </div>

          {/* Level 6: Hellem Guevara Dependencies */}
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Dependencias de Hellem Guevara N.</p>
            </div>
            <div className="space-y-3 pl-6 border-l-2 border-gray-100">
              <div>
                <p className="font-light text-gray-800">Jurith Aguilar P.</p>
                <p className="text-sm text-gray-500 font-light">Líder Técnica</p>
              </div>
              <div>
                <p className="font-light text-gray-800">Madeleine Isuiza F.</p>
                <p className="text-sm text-gray-500 font-light">Analista Técnica</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
