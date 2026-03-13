'use client'

export default function AboutValues() {
  const palette = [
    { border: "#2f7a57", badge: "#2f7a57", glow: "#dff3e8" },
    { border: "#b56a2e", badge: "#b56a2e", glow: "#fdebdc" },
    { border: "#2f5e7a", badge: "#2f5e7a", glow: "#e2edf5" },
    { border: "#6e7f31", badge: "#6e7f31", glow: "#edf3d7" },
  ]

  const values = [
    {
      number: "01",
      title: "Excelencia Científica",
      description: "Investigación rigurosa, innovación continua y compromiso con la calidad en cada proyecto",
    },
    {
      number: "02",
      title: "Sostenibilidad",
      description: "Prácticas agrícolas responsables que respetan el medio ambiente y sus recursos naturales",
    },
    {
      number: "03",
      title: "Compromiso Social",
      description: "Transferencia de conocimiento y capacitación para el desarrollo de comunidades agrícolas",
    },
    {
      number: "04",
      title: "Integridad",
      description: "Operamos con principios éticos rigurosos y transparencia en todas nuestras relaciones",
    },
  ]

  return (
    <section id="valores" className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f7f8f4] via-[#f3f8f5] to-[#eef5f8]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-[#b56a2e] uppercase tracking-[0.15em] mb-4">
            Principios
          </p>
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">Nuestros Valores</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Los principios fundamentales que guían cada decisión y acción en AS Laboratorios
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-white/95 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border"
              style={{ borderColor: palette[index].border }}
            >
              <div
                className="absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-60 blur-2xl"
                style={{ backgroundColor: palette[index].glow }}
                aria-hidden="true"
              />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div
                    className="flex items-center justify-center h-12 w-12 rounded-lg text-white font-bold text-xl shadow-sm"
                    style={{ backgroundColor: palette[index].badge }}
                  >
                    {value.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
