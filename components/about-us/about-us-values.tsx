"use client"

import { useState } from "react"

export default function AboutUsValues() {
  const [activeValue, setActiveValue] = useState(0)

  const values = [
    {
      id: 0,
      title: "Innovación",
      description: "Constantemente exploramos nuevas tecnologías y metodologías para revolucionar la biotecnología vegetal, manteniéndonos a la vanguardia de los avances científicos.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      gradient: "from-amber-500 to-yellow-600",
      bgGradient: "from-amber-50 to-yellow-50"
    },
    {
      id: 1,
      title: "Colaboración",
      description: "Trabajamos en estrecha alianza con agricultores, universidades e instituciones de investigación para crear soluciones que beneficien a toda la comunidad científica.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      id: 2,
      title: "Excelencia",
      description: "Nos comprometemos con los más altos estándares de calidad en cada proceso, desde la investigación hasta la entrega de nuestros productos y servicios.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      gradient: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      id: 3,
      title: "Sostenibilidad",
      description: "Desarrollamos soluciones eco-amigables que protegen el medio ambiente mientras maximizan la productividad agrícola para las futuras generaciones.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M21 5c0 1.66-4 3-9 3S3 6.66 3 5M21 5v7c0 1.66-4 3-9 3s-9-1.34-9-3V5M21 12v7c0 1.66-4 3-9 3s-9-1.34-9-3v-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-50 to-cyan-50"
    }
  ]

  return (
    <section className="py-8 bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#2e7d32] to-[#4caf50] rounded-full mb-4">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L10.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#01283c] mb-3">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2e7d32] to-[#4caf50]">Valores</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Los principios que definen nuestra identidad y guían cada decisión en nuestro camino hacia la excelencia científica
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Values Navigation */}
          <div className="lg:w-1/3 space-y-3">
            {values.map((value, index) => (
              <button
                key={value.id}
                onClick={() => setActiveValue(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                  activeValue === index
                    ? `bg-gradient-to-r ${value.bgGradient} border-2 border-transparent shadow-lg scale-105`
                    : 'bg-white hover:bg-gray-50 border-2 border-gray-100 hover:border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                      activeValue === index
                        ? `bg-gradient-to-r ${value.gradient} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }`}
                  >
                    {value.icon}
                  </div>
                  <div>
                    <h3
                      className={`font-semibold text-base transition-colors duration-300 ${
                        activeValue === index ? 'text-[#01283c]' : 'text-gray-700'
                      }`}
                    >
                      {value.title}
                    </h3>
                    <div
                      className={`w-0 h-0.5 bg-gradient-to-r ${value.gradient} transition-all duration-300 ${
                        activeValue === index ? 'w-full' : 'group-hover:w-1/3'
                      }`}
                    ></div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Value Display */}
          <div className="lg:w-2/3">
            <div className={`bg-gradient-to-br ${values[activeValue].bgGradient} rounded-2xl p-6 lg:p-8 border border-white/20 shadow-xl backdrop-blur-sm`}>
              <div className="flex items-start space-x-4 mb-6">
                <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${values[activeValue].gradient} text-white shadow-2xl`}>
                  {values[activeValue].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#01283c] mb-1">
                    {values[activeValue].title}
                  </h3>
                  <div className={`w-16 h-0.5 bg-gradient-to-r ${values[activeValue].gradient} rounded-full`}></div>
                </div>
              </div>
              
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {values[activeValue].description}
              </p>

              {/* Progress indicators */}
              <div className="flex space-x-2">
                {values.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeValue
                        ? `w-8 bg-gradient-to-r ${values[activeValue].gradient}`
                        : 'w-1.5 bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-[#2e7d32] font-medium text-sm">
            <span>Descubre cómo aplicamos estos valores</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
