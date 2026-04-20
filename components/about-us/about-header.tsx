'use client'

export default function AboutHeader() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#efe6df] via-[#f5f6f2] to-[#b8d2b7] px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#eb9f74]/35 blur-[78px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-[-10%] w-[48%] bg-[radial-gradient(circle_at_center,rgba(76,145,93,0.42)_0%,rgba(76,145,93,0.18)_35%,rgba(76,145,93,0)_75%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <span className="inline-flex items-center rounded-full border border-[#bad4bd] bg-[#dfeadf]/90 px-8 py-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1e7b2f]">
          Quienes Somos
        </span>
        <h1 className="mt-8 text-[clamp(2.2rem,5.4vw,4.2rem)] font-sans font-extrabold leading-[0.98] tracking-tight text-[#071a40]">
          Sobre Nosotros
        </h1>
        <div className="mt-6 h-1.5 w-24 rounded-full bg-[#e2621f]" />
        <p className="mt-8 max-w-3xl text-[clamp(1rem,1.35vw,1.35rem)] font-sans leading-relaxed text-[#253e62]">
          Descubre la trayectoria, misión y el impacto de AS Laboratorios en la biotecnología agrícola, nutriendo la
          innovación y la sostenibilidad
        </p>
      </div>
    </section>
  )
}
