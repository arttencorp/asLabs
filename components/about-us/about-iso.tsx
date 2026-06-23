'use client'

import { CheckCircle2, Award, BarChart3, Microscope, Shield, Lock, Leaf, Users, TrendingUp } from 'lucide-react'

export default function AboutISO() {
  const standards = [
    {
      code: "ISO 17025",
      title: "Competencia de Laboratorios",
      description: "Cumplimos con los requisitos internacionales para laboratorios de ensayo y calibración",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YCba0MyktuTUp6gwsWXXaRnnNyODEt.png",
      features: ["Métodos validados", "Equipos calibrados", "Trazabilidad total", "Incertidumbre documentada"]
    },
    {
      code: "ISO 9001",
      title: "Gestión de Calidad",
      description: "Cumplimos con el sistema integral para garantizar excelencia operativa y satisfacción",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mma4x2E80gLnLGbvIOK7f35xiE08tJ.png",
      features: ["Procesos documentados", "Control continuo", "Auditorías sistemáticas", "Mejora permanente"]
    },
    {
      code: "B Corp",
      title: "Certificado B Corporativo",
      description: "Cumplimos con estándares de desempeño social y ambiental para impacto positivo",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ghcauR6JAQ8vD7Kq0sNVviX8xKRV42.png",
      features: ["Sostenibilidad comprobada", "Responsabilidad social", "Ética empresarial", "Transparencia operativa"]
    },
  ]

  const principles = [
    { icon: BarChart3, title: "Trazabilidad", description: "Código único para cada muestra desde recepción hasta reporte final" },
    { icon: Users, title: "Responsabilidad", description: "Personal capacitado identificado en cada fase del análisis" },
    { icon: Microscope, title: "Métodos Validados", description: "Protocolos ISO reconocidos con validación estadística rigurosa" },
    { icon: Shield, title: "Incertidumbre", description: "Todos los resultados con rangos de incertidumbre documentados" },
    { icon: Lock, title: "Confidencialidad", description: "Protección de datos cliente con acceso restringido garantizado" },
    { icon: TrendingUp, title: "Mejora Continua", description: "Auditorías periódicas para optimización constante de procesos" },
  ]

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-black text-gray-500 uppercase tracking-widest mb-3 bg-gray-100 px-4 py-2 rounded-full">
            Cumplimiento de Estándares Internacionales
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 text-balance">
            Rigor Científico y Responsabilidad
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            AS Laboratorios cumple integralmente con las normas ISO 17025, ISO 9001 y B Corp Certificate, garantizando precisión, confiabilidad y compromiso social en cada análisis
          </p>
        </div>

        {/* Standards Grid - 3 Cards with Logos */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {standards.map((std, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Logo */}
              <div className="mb-6 h-24 flex items-center justify-center">
                <img 
                  src={std.logo} 
                  alt={std.code}
                  className="h-full object-contain max-w-full"
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-black text-gray-900 mb-2">{std.title}</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {std.description}
              </p>

              {/* Features */}
              <div className="space-y-3 pt-6 border-t border-gray-300">
                {std.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-300 my-16"></div>

        {/* Principles Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-gray-900 mb-3">Pilares del Cumplimiento</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Seis elementos fundamentales que garantizan integridad en cada análisis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, idx) => {
              const IconComponent = principle.icon
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">{principle.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Process Flow */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-10 mb-12">
          <h3 className="text-2xl font-black text-gray-900 mb-10 text-center">
            Flujo de Control de Calidad
          </h3>

          <div className="grid md:grid-cols-5 gap-4 md:gap-2">
            {[
              { num: "1", name: "Recepción", desc: "Código único" },
              { num: "2", name: "Preparación", desc: "Responsable" },
              { num: "3", name: "Análisis", desc: "Método validado" },
              { num: "4", name: "Control QA", desc: "Verificación" },
              { num: "5", name: "Reporte", desc: "Autorizado" },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center">
                  {/* Circle */}
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-black text-sm mb-3 shadow-md">
                    {step.num}
                  </div>

                  {/* Box */}
                  <div className="bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-center w-full">
                    <p className="font-bold text-gray-900 text-xs uppercase tracking-wide">{step.name}</p>
                    <p className="text-gray-600 text-xs mt-1">{step.desc}</p>
                  </div>
                </div>

                {/* Arrow */}
                {idx < 4 && (
                  <div className="hidden md:flex absolute top-6 -right-2 w-4 h-0.5 bg-gray-400 z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final Statement */}
        <div className="text-center bg-gray-900 text-white rounded-xl p-10">
          <Award className="w-8 h-8 mx-auto mb-4" />
          <p className="font-black text-lg mb-3">Nuestro Compromiso</p>
          <p className="text-base leading-relaxed max-w-2xl mx-auto text-gray-100">
            Cada resultado entregado cumple íntegramente con ISO 17025, ISO 9001 y B Corp Certificate, asegurando máxima precisión científica, responsabilidad operativa y transparencia total
          </p>
        </div>
      </div>
    </section>
  )
}
