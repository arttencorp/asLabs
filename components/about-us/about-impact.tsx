'use client'

export default function AboutImpact() {
  const impacts = [
    {
      number: "9+",
      label: "Años",
      description: "Innovando en biotecnología agrícola",
    },
    {
      number: "50+",
      label: "Universidades",
      description: "Confían en nuestros materiales educativos",
    },
    {
      number: "1000+",
      label: "Hectáreas",
      description: "Donde se implementan nuestras soluciones",
    },
    {
      number: "100%",
      label: "Sostenible",
      description: "Compromiso con el medio ambiente",
    },
  ]

  return (
    <section className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.15em] mb-4">
            Resultados
          </p>
          <h2 className="text-5xl font-light text-gray-900 mb-6">Nuestro Impacto</h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Contribuciones concretas a la agricultura sostenible y la educación científica en el Perú
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <div key={index} className="text-center space-y-3">
              <p className="text-5xl font-light text-gray-900">{impact.number}</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{impact.label}</p>
              <p className="text-gray-600 font-light">{impact.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-16 border-t border-gray-200">
          <h3 className="text-2xl font-light text-gray-900 mb-4 text-center">Compromiso con la Sostenibilidad</h3>
          <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto text-center leading-relaxed">
            Nuestras soluciones en biotecnología vegetal y control biológico reducen significativamente el uso de agroquímicos, 
            promoviendo una agricultura responsable que beneficia tanto a productores como al medio ambiente.
          </p>
        </div>
      </div>
    </section>
  )
}
