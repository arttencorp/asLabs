"use client"

export default function AboutImpact() {
  const impacts = [
    {
      number: "+20",
      label: "Años de Trayectoria",
      description: "Más de dos décadas en investigación y desarrollo biotecnológico",
    },
    {
      number: "+50",
      label: "Universidades",
      description: "Instituciones educativas que confían en nuestros materiales",
    },
    {
      number: "+1000",
      label: "Hectáreas",
      description: "Terrenos donde se han implementado nuestras soluciones",
    },
    {
      number: "100%",
      label: "Calidad",
      description: "Compromiso con estándares de calidad internacionales",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-[#01283c] to-[#2e7d32] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Nuestro Impacto</h2>
        <p className="text-lg text-gray-100 text-center mb-12 max-w-2xl mx-auto">
          Resultados concretos que demuestran nuestro compromiso con la innovación y la sostenibilidad
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold mb-2">{impact.number}</div>
              <p className="text-lg font-semibold mb-2">{impact.label}</p>
              <p className="text-gray-100 text-sm">{impact.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Compromiso Ambiental</h3>
          <p className="text-gray-100 leading-relaxed">
            A través de nuestras soluciones en biotecnología vegetal y control biológico, contribuimos a la reducción del uso de agroquímicos, promoviendo prácticas agrícolas sostenibles que protegen tanto la producción como el medio ambiente.
          </p>
        </div>
      </div>
    </section>
  )
}
