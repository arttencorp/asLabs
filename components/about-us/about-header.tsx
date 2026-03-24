'use client'

export default function AboutHeader() {
  return (
    <section className="w-full bg-gradient-to-br from-[#f8f6f1] to-[#f0ebe5] text-gray-900 py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#2e7d32] opacity-8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#e65100] opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block">
            <span className="text-xs font-semibold text-[#2e7d32] uppercase tracking-[0.2em] bg-[#e8f5e9] px-5 py-3 rounded-full border border-[#2e7d32]/20">
              Quiénes Somos
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl font-serif font-bold leading-tight text-balance">Sobre Nosotros</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2e7d32] to-[#e65100]"></div>
          <p className="text-xl text-gray-700 font-medium max-w-2xl leading-relaxed">Descubre la trayectoria, misión y el impacto de AS Laboratorios en la biotecnología agrícola, nutriendo la innovación y la sostenibilidad</p>
        </div>
      </div>
    </section>
  )
}
