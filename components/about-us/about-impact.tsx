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
    <section id="impacto" className="relative w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#143a2d] via-[#1d543f] to-[#2b6f4f] overflow-hidden">
      <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-[#f2a95a]/15 blur-3xl" aria-hidden="true" />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#9ad0b2]/15 blur-3xl" aria-hidden="true" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-green-100 uppercase tracking-[0.15em] mb-4">
            Resultados
          </p>
          <h2 className="text-5xl font-serif font-bold text-white mb-6">Nuestro Impacto</h2>
          <p className="text-lg text-green-50 max-w-2xl mx-auto">
            Contribuciones concretas a la agricultura sostenible y la educación científica en el Perú
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {impacts.map((impact, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60">
              <p className="text-5xl font-serif font-bold text-[#245f45] mb-2">{impact.number}</p>
              <p className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">{impact.label}</p>
              <p className="text-gray-600 text-sm">{impact.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white border-opacity-30">
          <h3 className="text-2xl font-serif font-bold text-white mb-4 text-center">Compromiso con la Sostenibilidad</h3>
          <p className="text-lg text-green-50 max-w-3xl mx-auto text-center leading-relaxed">
            Nuestras soluciones en biotecnología vegetal y control biológico reducen significativamente el uso de agroquímicos, 
            promoviendo una agricultura responsable que beneficia tanto a productores como al medio ambiente.
          </p>
        </div>
      </div>
    </section>
  )
}
