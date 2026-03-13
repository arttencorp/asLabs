"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function AboutUsFramework() {
  const [activeSection, setActiveSection] = useState("clientes")

  const sections = {
    clientes: {
      title: "Agricultores y clientes",
      content:
        "Trabajamos estrechamente con agricultores, empresas agrícolas y universidades para desarrollar soluciones adaptadas a sus necesidades específicas. Nuestro compromiso es ofrecer productos y servicios que generen valor real para nuestros clientes.",
    },
    empleados: {
      title: "Nuestro equipo",
      content:
        "Contamos con un equipo multidisciplinario de biólogos, agrónomos, microbiólogos y técnicos especializados comprometidos con la excelencia científica y la innovación. Fomentamos un ambiente de trabajo colaborativo y de constante aprendizaje.",
    },
    ambiente: {
      title: "Medio ambiente",
      content:
        "Nuestras soluciones están diseñadas para reducir el impacto ambiental de la agricultura. A través del control biológico y la biotecnología, ayudamos a disminuir el uso de agroquímicos y promovemos prácticas agrícolas sostenibles.",
    },
    comunidad: {
      title: "Comunidad",
      content:
        "Contribuimos al desarrollo de las comunidades agrícolas a través de programas de capacitación y transferencia tecnológica. Trabajamos con universidades para formar a la próxima generación de profesionales en biotecnología.",
    },
    etica: {
      title: "Ética y responsabilidad",
      content:
        "Operamos bajo estrictos principios éticos y de transparencia. Nos comprometemos con la calidad de nuestros productos y servicios, y con el cumplimiento de todas las normativas aplicables a nuestra actividad.",
    },
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#01283c] mb-4">Nuestro marco de trabajo</h2>
        <p className="text-center text-base text-[#01283c] mb-12 max-w-3xl mx-auto">
          Nuestro compromiso con la responsabilidad corporativa se basa en cinco pilares fundamentales que guían todas
          nuestras actividades.
        </p>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Menu */}
            <div className="lg:w-1/4 p-6 border-r">
              <button
                onClick={() => setActiveSection("clientes")}
                className={`w-full text-left py-3 pl-4 mb-2 ${
                  activeSection === "clientes"
                    ? "border-l-4 border-[#d1343e] font-medium"
                    : "border-l-4 border-gray-200"
                }`}
              >
                Agricultores y clientes
              </button>
              <button
                onClick={() => setActiveSection("empleados")}
                className={`w-full text-left py-3 pl-4 mb-2 ${
                  activeSection === "empleados"
                    ? "border-l-4 border-[#2e7d32] font-medium bg-gray-50"
                    : "border-l-4 border-gray-200"
                }`}
              >
                Nuestro equipo
              </button>
              <button
                onClick={() => setActiveSection("ambiente")}
                className={`w-full text-left py-3 pl-4 mb-2 ${
                  activeSection === "ambiente"
                    ? "border-l-4 border-[#d1343e] font-medium"
                    : "border-l-4 border-gray-200"
                }`}
              >
                Medio ambiente
              </button>
              <button
                onClick={() => setActiveSection("comunidad")}
                className={`w-full text-left py-3 pl-4 mb-2 ${
                  activeSection === "comunidad"
                    ? "border-l-4 border-[#d1343e] font-medium"
                    : "border-l-4 border-gray-200"
                }`}
              >
                Comunidad
              </button>
              <button
                onClick={() => setActiveSection("etica")}
                className={`w-full text-left py-3 pl-4 ${
                  activeSection === "etica" ? "border-l-4 border-[#d1343e] font-medium" : "border-l-4 border-gray-200"
                }`}
              >
                Ética y responsabilidad
              </button>
            </div>

            {/* Center - Image */}
            <div className="lg:w-1/3 relative min-h-96 h-full">
              <Image
                src="/woman-red-shirt.png"
                alt="Profesional de AS Labs en laboratorio"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Right - Content */}
            <div className="lg:w-5/12 p-8">
              <h3 className="text-2xl font-bold text-[#01283c] mb-4">{sections[activeSection].title}</h3>
              <p className="text-base text-[#01283c] mb-6">{sections[activeSection].content}</p>
              <Link href="#" className="inline-flex items-center text-[#2e7d32] font-medium">
                CONOCE MÁS
                <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 8L16 12L12 16M8 12H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
