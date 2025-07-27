"use client"
import { useState } from "react"
import type React from "react"

import { X, Beaker, BookOpen, Microscope, FlaskConical, GraduationCap, Users } from "lucide-react"

interface Product {
  id: string
  title: string
  icon: React.ReactNode
  shortDescription: string
  fullDescription: string
  features: string[]
  price: string
  image: string
}

export default function StudentProductsPopup() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const products: Product[] = [
    {
      id: "asesoria-laboratorio",
      title: "Asesoría en prácticas de laboratorio",
      icon: <Beaker className="w-8 h-8" />,
      shortDescription: "Orientación especializada para tus prácticas de laboratorio",
      fullDescription:
        "Ofrecemos asesoramiento personalizado para estudiantes en el desarrollo de prácticas de laboratorio de microbiología, biología molecular y biotecnología. Nuestros expertos te guían paso a paso en cada procedimiento.",
      features: [
        "Supervisión de técnicas de laboratorio",
        "Interpretación de resultados",
        "Protocolos actualizados",
        "Resolución de dudas en tiempo real",
        "Certificación de prácticas completadas",
      ],
      price: "S/. 80 por sesión",
      image: "/students-laboratory.png",
    },
    {
      id: "apoyo-investigacion",
      title: "Apoyo en trabajos de investigación",
      icon: <BookOpen className="w-8 h-8" />,
      shortDescription: "Asesoramiento metodológico y técnico para el desarrollo de investigaciones",
      fullDescription:
        "Brindamos soporte integral para estudiantes que desarrollan tesis, proyectos de investigación o trabajos académicos en áreas de ciencias biológicas y biotecnología.",
      features: [
        "Diseño metodológico de investigación",
        "Análisis estadístico de datos",
        "Revisión bibliográfica especializada",
        "Redacción científica",
        "Preparación de presentaciones",
      ],
      price: "S/. 150 por proyecto",
      image: "/research-preview.png",
    },
    {
      id: "medios-cultivo",
      title: "Preparación de medios de cultivo",
      icon: <FlaskConical className="w-8 h-8" />,
      shortDescription: "Elaboración de medios de cultivo específicos para tus experimentos",
      fullDescription:
        "Preparamos medios de cultivo especializados para diferentes tipos de microorganismos y aplicaciones específicas, garantizando la calidad y esterilidad necesarias para tus experimentos.",
      features: [
        "Medios selectivos y diferenciales",
        "Control de calidad garantizado",
        "Preparación bajo condiciones estériles",
        "Diferentes volúmenes disponibles",
        "Entrega en campus UNT",
      ],
      price: "Desde S/. 25 por lote",
      image: "/culture-media.png",
    },
    {
      id: "kits-educativos",
      title: "Kits educativos especializados",
      icon: <GraduationCap className="w-8 h-8" />,
      shortDescription: "Kits completos para prácticas específicas de laboratorio",
      fullDescription:
        "Conjuntos de materiales y reactivos organizados para prácticas específicas de microbiología, biología molecular y biotecnología, diseñados especialmente para estudiantes universitarios.",
      features: [
        "Materiales de alta calidad",
        "Guías de práctica incluidas",
        "Reactivos pre-dosificados",
        "Controles positivos y negativos",
        "Soporte técnico incluido",
      ],
      price: "S/. 85 - S/. 120 por kit",
      image: "/educational-kits.png",
    },
    {
      id: "capacitacion-tecnicas",
      title: "Capacitación en técnicas avanzadas",
      icon: <Microscope className="w-8 h-8" />,
      shortDescription: "Entrenamiento en técnicas especializadas de laboratorio",
      fullDescription:
        "Cursos intensivos y talleres prácticos sobre técnicas avanzadas de laboratorio como PCR, electroforesis, cultivo de tejidos vegetales y técnicas de microscopía.",
      features: [
        "Instructores especializados",
        "Práctica con equipos profesionales",
        "Certificado de participación",
        "Material didáctico incluido",
        "Grupos reducidos (máx. 8 estudiantes)",
      ],
      price: "S/. 200 por taller",
      image: "/lab-equipment.png",
    },
    {
      id: "consultoria-tesis",
      title: "Consultoría para tesis",
      icon: <Users className="w-8 h-8" />,
      shortDescription: "Acompañamiento integral en el desarrollo de tu tesis",
      fullDescription:
        "Servicio especializado de consultoría para estudiantes que desarrollan tesis de pregrado y posgrado en áreas relacionadas con biotecnología, microbiología y ciencias biológicas.",
      features: [
        "Planificación de cronograma de trabajo",
        "Asesoría en metodología experimental",
        "Análisis e interpretación de resultados",
        "Revisión de manuscrito",
        "Preparación para sustentación",
      ],
      price: "S/. 300 por mes",
      image: "/unt-students.png",
    },
  ]

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#01283c] mb-4">Nuestros servicios para estudiantes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Diseñados específicamente para apoyarte en tu formación académica y desarrollo profesional en las áreas de
            ciencias biológicas, microbiología y tecnologías médicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-[#2e7d32] bg-opacity-10 rounded-full mb-4 mx-auto">
                <div className="text-[#2e7d32]">{product.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-[#01283c] mb-3 text-center">{product.title}</h3>
              <p className="text-gray-600 text-center mb-4">{product.shortDescription}</p>
              <div className="text-center">
                <button className="bg-[#2e7d32] text-white px-4 py-2 rounded-md hover:bg-[#1b5e20] transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#2e7d32] bg-opacity-10 rounded-full mr-4">
                      <div className="text-[#2e7d32]">{selectedProduct.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#01283c]">{selectedProduct.title}</h3>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">{selectedProduct.fullDescription}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-[#01283c] mb-3">¿Qué incluye?</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-[#2e7d32] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Precio:</span>
                        <p className="text-2xl font-bold text-[#2e7d32]">{selectedProduct.price}</p>
                      </div>
                      <div className="space-x-3">
                        <button
                          onClick={() => setSelectedProduct(null)}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Cerrar
                        </button>
                        <a
                          href="https://walink.co/0441cf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#2e7d32] text-white px-6 py-2 rounded-md hover:bg-[#1b5e20] transition-colors inline-block"
                        >
                          Solicitar información
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
