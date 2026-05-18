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
    <section id="valores" className="w-full py-40 px-4 sm:px-6 lg:px-8 bg-[#f8f6f1] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#2e7d32] opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#e65100] opacity-4 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-left mb-24 max-w-2xl">
          <div className="inline-block mb-6">
            <span className="text-xs font-semibold text-[#e65100] uppercase tracking-[0.2em] bg-orange-50 px-5 py-3 rounded-full border border-[#e65100]/20">
              Principios Fundamentales
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight">Nuestros Valores</h2>
          <p className="text-xl text-gray-700 font-medium">
            Los principios fundamentales que guían cada decisión y acción en AS Laboratorios
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 hover:border-gray-300 overflow-hidden relative" style={{}}>
              {/* Background accent */}
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-3 group-hover:opacity-5 transition-opacity" style={{backgroundColor: ['#2e7d32', '#e65100', '#01283c', '#7b1fa2'][index]}}></div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-20 w-20 rounded-2xl text-white font-bold text-3xl font-serif flex-shrink-0" style={{backgroundColor: ['#2e7d32', '#e65100', '#01283c', '#7b1fa2'][index]}}>
                    {value.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
