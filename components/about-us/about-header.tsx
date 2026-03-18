'use client'

export default function AboutHeader() {
  return (
    <section className="w-full bg-gradient-to-br from-[#2e7d32] via-[#1b5e20] to-[#0d3a1a] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400 opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400 opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="space-y-4">
          <div className="inline-block">
            <span className="text-xs font-bold text-green-200 uppercase tracking-[0.2em] bg-white bg-opacity-10 px-4 py-2 rounded-full">
              Bienvenido
            </span>
          </div>
          <h1 className="text-6xl sm:text-7xl font-serif font-bold leading-tight text-balance">Sobre Nosotros</h1>
          <p className="text-xl text-green-100 font-medium max-w-2xl">Descubre la historia, misión y el impacto de AS Laboratorios en la biotecnología agrícola</p>
        </div>
      </div>
    </section>
  )
}
