'use client'

export default function AboutValues() {
  const values = [
    {
      number: "01",
      title: "Excelencia Científica",
      description: "Investigación rigurosa, innovación continua y compromiso con la calidad en cada proyecto",
      badge: "#2f8a3f",
      corner: "#2f8a3f",
    },
    {
      number: "02",
      title: "Sostenibilidad",
      description: "Prácticas agrícolas responsables que respetan el medio ambiente y sus recursos naturales",
      badge: "#eb5a00",
      corner: "#eb5a00",
    },
    {
      number: "03",
      title: "Compromiso Social",
      description: "Transferencia de conocimiento y capacitación para el desarrollo de comunidades agrícolas",
      badge: "#01304f",
      corner: "#01304f",
    },
    {
      number: "04",
      title: "Integridad",
      description: "Operamos con principios éticos rigurosos y transparencia en todas nuestras relaciones",
      badge: "#7a24b3",
      corner: "#7a24b3",
    },
  ]

  return (
    <section id="valores" className="relative w-full overflow-hidden bg-[#f2f2f0] px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute right-[-15%] top-[34%] h-[34rem] w-[34rem] rounded-full bg-[#f0a36f]/35 blur-[92px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-[#efbd9b] bg-[#f8efe8] px-8 py-3 text-xs font-bold uppercase tracking-[0.28em] text-[#eb5a00]">
            Principios Fundamentales
          </span>
          <h2 className="mt-8 text-[clamp(2.25rem,5.4vw,4.2rem)] font-sans font-extrabold leading-[0.96] tracking-tight text-[#071a40]">
            Nuestros Valores
          </h2>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,1.45vw,1.3rem)] font-sans leading-relaxed text-[#1f3658]">
            Los principios fundamentales que guían cada decisión y acción en AS Laboratorios
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {values.map((value) => (
            <article
              key={value.number}
              className="relative overflow-hidden rounded-[1.7rem] border border-[#e8ecef] bg-white px-8 py-8 shadow-[0_20px_38px_-30px_rgba(16,26,45,0.6)]"
            >
              <div
                className="pointer-events-none absolute -right-2 -top-2 h-36 w-36 rounded-bl-[999px]"
                style={{ backgroundColor: value.corner }}
                aria-hidden="true"
              />
              <div className="relative flex items-start gap-6 pr-16">
                <div
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl text-[1.7rem] font-sans font-extrabold text-white"
                  style={{ backgroundColor: value.badge }}
                >
                  {value.number}
                </div>
                <div>
                  <h3 className="text-[1.65rem] font-sans font-extrabold leading-tight text-[#071a40]">{value.title}</h3>
                  <p className="mt-3 text-[1rem] font-sans leading-relaxed text-[#223f65]">{value.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
