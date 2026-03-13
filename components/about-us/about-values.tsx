"use client"

export default function AboutValues() {
  const values = [
    {
      icon: "🔬",
      title: "Excelencia Científica",
      description: "Comprometidos con la investigación de calidad y la innovación continua en biotecnología",
    },
    {
      icon: "🌱",
      title: "Sostenibilidad",
      description: "Promovemos prácticas agrícolas amigables con el medio ambiente y el uso responsable de recursos",
    },
    {
      icon: "🤝",
      title: "Responsabilidad Social",
      description: "Contribuimos al desarrollo de las comunidades agrícolas a través de capacitación y transferencia tecnológica",
    },
    {
      icon: "✨",
      title: "Integridad",
      description: "Operamos bajo principios éticos rigurosos y transparencia en todas nuestras operaciones",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#01283c] text-center mb-4">Nuestros Valores</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Los principios que guían nuestras acciones y decisiones en cada proyecto
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-[#01283c] mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
