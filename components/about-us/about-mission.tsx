"use client"

export default function AboutMission() {
  const stats = [
    {
      value: "27",
      label: "Años",
      description: "De trayectoria en biotecnología",
      color: "text-[#248037]",
    },
    {
      value: "4",
      label: "Áreas",
      description: "De especialización técnica",
      color: "text-[#eb5a00]",
    },
    {
      value: "30+",
      label: "Profesionales",
      description: "Equipo dedicado a la excelencia",
      color: "text-[#8335cf]",
    },
    {
      value: "100%",
      label: "Sostenible",
      description: "Compromiso con el ambiente",
      color: "text-[#2f66e9]",
    },
  ]

  const principles = [
    {
      title: "Misión",
      accent: "#2f8a3f",
      description:
        "Desarrollar y proveer soluciones biotecnológicas innovadoras y sostenibles para la agricultura peruana, contribuyendo a la seguridad alimentaria, conservación ambiental y formación de nuevos científicos.",
    },
    {
      title: "Visión",
      accent: "#eb7a1a",
      description:
        "Ser líderes en biotecnología agrícola en América Latina, reconocidos por nuestra investigación de calidad, innovación continua y compromiso con la sostenibilidad.",
    },
  ]

  return (
    <section id="mision" className="relative w-full overflow-hidden bg-[#f4f5f6] px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-y-0 right-[-14%] w-[48%] bg-[radial-gradient(circle_at_center,rgba(76,145,93,0.4)_0%,rgba(76,145,93,0.18)_35%,rgba(76,145,93,0)_74%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1.06fr_0.94fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#bad4bd] bg-[#dfeadf]/95 px-8 py-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1e7b2f]">
              Nuestra Trayectoria
            </span>

            <h2 className="mt-8 text-[clamp(2.2rem,5.4vw,4.3rem)] font-sans font-extrabold leading-[0.9] tracking-tight text-[#071a40]">
              <span className="block">Nuestra</span>
              <span className="block text-[#248037]">Historia</span>
            </h2>

            <div className="mt-8 space-y-8 text-[clamp(1rem,1.15vw,1.2rem)] font-sans leading-relaxed text-[#1f3658]">
              <p>
                Fundada en 1997, AS Laboratorios nació como una visión de aplicar biotecnología avanzada al servicio de
                la agricultura peruana. Comenzamos como un pequeño laboratorio especializado en cultivo in vitro de
                plantas de banano.
              </p>
              <p>
                Hoy somos una empresa integral con soluciones en biotecnología vegetal, control biológico sostenible,
                diagnóstico agrícola y educación científica de excelencia, transformando la agricultura en toda la región.
              </p>
            </div>

            <div className="mt-10 border-t border-[#d3d8dc] pt-10 space-y-10">
              {principles.map((item) => (
                <article key={item.title} className="flex items-start gap-5">
                  <div className="mt-1 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#dce9df]">
                    <span className="h-3.5 w-3.5 rotate-45 rounded-[2px]" style={{ backgroundColor: item.accent }} />
                  </div>
                  <div>
                    <h3 className="text-[2rem] font-sans font-extrabold leading-none tracking-tight text-[#071a40]">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-3xl text-[clamp(1rem,1.08vw,1.18rem)] font-sans leading-relaxed text-[#1f3658]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ece6df] bg-[#f3f1ee] p-10 shadow-[0_28px_45px_-30px_rgba(20,31,51,0.45)]">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-start gap-6 ${index < stats.length - 1 ? "mb-8 border-b border-[#d3d3d3] pb-8" : ""}`}
              >
                <p className={`text-[2.75rem] font-sans font-extrabold leading-none ${stat.color}`}>{stat.value}</p>
                <div className="pt-2">
                  <p className="text-[1.65rem] font-sans font-extrabold leading-tight text-[#081b41]">{stat.label}</p>
                  <p className="mt-2 text-[1.02rem] font-sans leading-snug text-[#334f70]">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
