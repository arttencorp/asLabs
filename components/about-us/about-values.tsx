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
    <section className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.15em] mb-4">
            Principios
          </p>
          <h2 className="text-5xl font-light text-gray-900 mb-6">Nuestros Valores</h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Los principios fundamentales que guían cada decisión y acción en AS Laboratorios
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {values.map((value, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <p className="text-4xl font-light text-gray-300">{value.number}</p>
              </div>
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
