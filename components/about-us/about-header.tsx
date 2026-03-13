'use client'

export default function AboutHeader() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#143a2d] via-[#1d543f] to-[#2b6f4f] text-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-16 -left-20 h-52 w-52 rounded-full bg-[#f2a95a]/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-[#9ad0b2]/20 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Sobre Nosotros</h1>
        <p className="mt-3 text-lg text-[#dcf1e7] max-w-2xl">Conoce la historia y la misión de AS Laboratorios</p>
      </div>
    </section>
  )
}
