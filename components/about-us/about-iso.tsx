'use client'

import { CheckCircle2, Award, BarChart3, Microscope, Shield, Zap, Leaf, Users, TrendingUp, Lock, Infinity } from 'lucide-react'

export default function AboutISO() {
  const certifications = [
    {
      code: "ISO 17025",
      title: "Competencia de Laboratorios",
      description: "Cumplimos con el estándar internacional para la competencia técnica de laboratorios de ensayo y calibración",
      icon: Microscope,
      color: "from-blue-600 via-blue-500 to-cyan-600",
      badge: "Acreditación Técnica",
      features: ["Métodos validados", "Equipos calibrados", "Trazabilidad de resultados", "Incertidumbre de medición"]
    },
    {
      code: "ISO 9001",
      title: "Gestión de Calidad",
      description: "Cumplimos con el sistema de gestión de calidad que asegura excelencia operativa y satisfacción del cliente",
      icon: CheckCircle2,
      color: "from-green-600 via-emerald-500 to-teal-600",
      badge: "Sistema Integral",
      features: ["Procesos documentados", "Control de calidad", "Auditorías continuas", "Mejora permanente"]
    },
    {
      code: "B Corp",
      title: "Certificado B Corporativo",
      description: "Cumplimos con los estándares de desempeño social y ambiental para empresas comprometidas con el impacto positivo",
      icon: Leaf,
      color: "from-amber-600 via-orange-500 to-red-600",
      badge: "Impacto Social",
      features: ["Sostenibilidad ambiental", "Responsabilidad social", "Ética empresarial", "Transparencia corporativa"]
    },
  ]

  const complianceElements = [
    {
      icon: BarChart3,
      title: "Trazabilidad Total",
      description: "Cada muestra tiene código único y es rastreada desde toma hasta reporte final",
      color: "from-purple-50 to-purple-100",
      borderColor: "border-purple-300",
      textColor: "text-purple-700"
    },
    {
      icon: Users,
      title: "Responsabilidad",
      description: "Personal técnico capacitado identificado en cada fase con supervisión documentada",
      color: "from-blue-50 to-blue-100",
      borderColor: "border-blue-300",
      textColor: "text-blue-700"
    },
    {
      icon: Microscope,
      title: "Métodos Validados",
      description: "Protocolos analíticos ISO con validación estadística y estándares reconocidos",
      color: "from-green-50 to-green-100",
      borderColor: "border-green-300",
      textColor: "text-green-700"
    },
    {
      icon: Infinity,
      title: "Incertidumbre",
      description: "Todos los resultados incluyen rangos de incertidumbre según normas internacionales",
      color: "from-amber-50 to-amber-100",
      borderColor: "border-amber-300",
      textColor: "text-amber-700"
    },
    {
      icon: Lock,
      title: "Confidencialidad",
      description: "Protección de datos de cliente con acceso restringido a información sensible",
      color: "from-red-50 to-red-100",
      borderColor: "border-red-300",
      textColor: "text-red-700"
    },
    {
      icon: TrendingUp,
      title: "Mejora Continua",
      description: "Auditorías periódicas y retroalimentación cliente para optimizar procesos constantemente",
      color: "from-indigo-50 to-indigo-100",
      borderColor: "border-indigo-300",
      textColor: "text-indigo-700"
    },
  ]

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-3 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full border-2 border-blue-200 shadow-sm">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-black text-blue-700 uppercase tracking-widest">Estándares Internacionales</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-black text-gray-900 mb-6 text-balance">
            Cumplimiento de Normas Internacionales
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            AS Laboratorios cumple con los estándares internacionales más rigurosos, garantizando confiabilidad, trazabilidad científica y compromiso con el impacto social en cada análisis que realizamos
          </p>
        </div>

        {/* Certifications Grid - 3 Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {certifications.map((cert, idx) => {
            const IconComponent = cert.icon
            return (
              <div
                key={idx}
                className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Background On Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-500`}></div>

                {/* Badge */}
                <div className="inline-block mb-6">
                  <span className={`bg-gradient-to-r ${cert.color} text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider`}>
                    {cert.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Code */}
                <p className={`text-xs font-black uppercase tracking-widest mb-3 bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
                  {cert.code}
                </p>

                {/* Title */}
                <h3 className="text-2xl font-black text-gray-900 mb-3">{cert.title}</h3>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed font-medium text-sm">
                  {cert.description}
                </p>

                {/* Features */}
                <div className="space-y-3 pt-6 border-t-2 border-gray-200">
                  {cert.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center mt-0.5`}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-semibold text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent my-20 rounded-full"></div>

        {/* Compliance Elements */}
        <div className="mb-20">
          <div className="text-center mb-14">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Principios de Cumplimiento</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Elementos fundamentales que garantizan la integridad de cada análisis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceElements.map((element, idx) => {
              const IconComponent = element.icon
              return (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${element.color} border-2 ${element.borderColor} rounded-2xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-white rounded-xl flex-shrink-0 shadow-md group-hover:shadow-lg transition-all`}>
                      <IconComponent className={`w-6 h-6 ${element.textColor}`} />
                    </div>
                    <div>
                      <h4 className={`font-black text-lg mb-2 ${element.textColor}`}>{element.title}</h4>
                      <p className={`text-sm leading-relaxed font-medium opacity-80`}>{element.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Process Flow - Enhanced */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-3 border-blue-200 rounded-3xl p-10 shadow-lg">
          <h3 className="text-3xl font-black text-gray-900 mb-12 text-center">
            Flujo de Control en Cada Análisis
          </h3>

          <div className="relative">
            {/* Desktop Flow */}
            <div className="hidden md:grid md:grid-cols-5 gap-6">
              {[
                { step: "1", name: "Recepción", desc: "Código único", icon: "📥" },
                { step: "2", name: "Preparación", desc: "Responsable documentado", icon: "⚙️" },
                { step: "3", name: "Análisis", desc: "Método validado", icon: "🔬" },
                { step: "4", name: "Control QA", desc: "Verificación", icon: "✓" },
                { step: "5", name: "Reporte", desc: "Informe autorizado", icon: "📋" },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Step Circle */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center font-black text-lg mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className="text-center text-3xl mb-3">{item.icon}</div>

                  {/* Content */}
                  <div className="bg-white rounded-xl p-5 text-center border-2 border-blue-200 shadow-md">
                    <p className="font-black text-gray-900 mb-2">{item.name}</p>
                    <p className="text-xs text-gray-600 leading-tight font-semibold">{item.desc}</p>
                  </div>

                  {/* Arrow */}
                  {idx < 4 && (
                    <div className="absolute top-7 -right-4 w-8 h-1 bg-gradient-to-r from-blue-400 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Flow */}
            <div className="md:hidden space-y-4">
              {[
                { step: "1", name: "Recepción", desc: "Código único asignado" },
                { step: "2", name: "Preparación", desc: "Responsable documentado" },
                { step: "3", name: "Análisis", desc: "Método validado" },
                { step: "4", name: "Control QA", desc: "Verificación de calidad" },
                { step: "5", name: "Reporte", desc: "Informe autorizado" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-black flex-shrink-0 shadow-md">
                    {item.step}
                  </div>
                  <div className="bg-white rounded-lg p-4 flex-1 border-2 border-blue-200">
                    <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Commitment */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 text-white px-10 py-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
            <p className="font-black text-lg mb-3">Nuestro Compromiso Irrevocable</p>
            <p className="text-base leading-relaxed font-semibold max-w-2xl">
              Cada resultado que entregamos cumple íntegramente con ISO 17025, ISO 9001 y B Corp, garantizando precisión científica, responsabilidad social y transparencia total en nuestras operaciones
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
