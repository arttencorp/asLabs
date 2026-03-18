'use client'

export default function AboutValues() {
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
    <section id="valores" className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 opacity-30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 opacity-30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold text-[#e65100] uppercase tracking-[0.2em] bg-orange-50 px-4 py-2 rounded-full">
              Principios Fundamentales
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">Nuestros Valores</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Los principios fundamentales que guían cada decisión y acción en AS Laboratorios
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {values.map((value, index) => (
            <div key={index} className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border-b-4 overflow-hidden relative" style={{borderBottomColor: ['#2e7d32', '#e65100', '#01283c', '#7b1fa2'][index]}}>
              {/* Background accent */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{backgroundColor: ['#2e7d32', '#e65100', '#01283c', '#7b1fa2'][index]}}></div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-xl text-white font-bold text-2xl font-serif" style={{backgroundColor: ['#2e7d32', '#e65100', '#01283c', '#7b1fa2'][index]}}>
                    {value.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
