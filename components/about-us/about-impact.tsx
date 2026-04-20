'use client'

export default function AboutImpact() {
  const impacts = [
    {
      number: "27",
      label: "Años",
      description: "Trayectoria en biotecnología agrícola",
    },
    {
      number: "1000+",
      label: "Hectáreas",
      description: "Donde se implementan nuestras soluciones",
    },
    {
      number: "30+",
      label: "Profesionales",
      description: "Equipo dedicado a la excelencia",
    },
    {
      number: "100%",
      label: "Sostenible",
      description: "Compromiso con el medio ambiente",
    },
  ]

  return (
    <section id="impacto" className="relative w-full overflow-hidden bg-[#1f7728] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#d5f2d7]">
            Resultados
          </p>
          <h2 className="mt-5 text-[clamp(2.25rem,5.6vw,4.1rem)] font-sans font-extrabold leading-[0.98] tracking-tight text-white">
            Nuestro Impacto
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.45vw,1.3rem)] font-sans leading-relaxed text-[#e4f7e5]">
            Contribuciones concretas a la agricultura sostenible y la educación científica en el Perú
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impacts.map((impact) => (
            <article
              key={impact.label}
              className="rounded-2xl bg-[#f2f2ef] p-8 text-center shadow-[0_22px_40px_-28px_rgba(0,0,0,0.6)]"
            >
              <p className="text-[2.9rem] font-sans font-extrabold leading-none text-[#2a8a34]">{impact.number}</p>
              <p className="mt-3 text-[1.02rem] font-bold uppercase tracking-[0.16em] text-[#112748]">{impact.label}</p>
              <p className="mt-2 text-[0.95rem] font-sans leading-relaxed text-[#2f4a6c]">{impact.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 border-t border-white/30 pt-14 text-center">
          <h3 className="text-[clamp(1.7rem,2.9vw,2.4rem)] font-sans font-extrabold leading-tight text-white">
            Compromiso con la Sostenibilidad
          </h3>
          <p className="mx-auto mt-6 max-w-4xl text-[clamp(1rem,1.35vw,1.22rem)] font-sans leading-relaxed text-[#e4f7e5]">
            Nuestras soluciones en biotecnología vegetal y control biológico reducen significativamente el uso de agroquímicos, 
            promoviendo una agricultura responsable que beneficia tanto a productores como al medio ambiente.
          </p>
        </div>
      </div>
    </section>
  )
}
