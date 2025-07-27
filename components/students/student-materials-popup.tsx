"use client"
import { useState } from "react"
import type React from "react"

import { X, Beaker, FlaskConical, Microscope, BookOpen, Package, TestTube } from "lucide-react"

interface Material {
  id: string
  title: string
  category: string
  icon: React.ReactNode
  shortDescription: string
  fullDescription: string
  specifications: string[]
  applications: string[]
  price: string
  availability: string
  deliveryTime: string
  image: string
}

export default function StudentMaterialsPopup() {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)

  const materials: Material[] = [
    {
      id: "kit-microbiologia",
      title: "Kit de Microbiología Básica",
      category: "Kits Educativos",
      icon: <Beaker className="w-8 h-8" />,
      shortDescription: "Kit completo para prácticas de microbiología general",
      fullDescription:
        "Kit diseñado específicamente para estudiantes de microbiología de la UNT. Incluye todos los materiales necesarios para realizar prácticas básicas de identificación y cultivo de microorganismos.",
      specifications: [
        "Placas Petri estériles (20 unidades)",
        "Asas de siembra desechables (50 unidades)",
        "Tubos de ensayo con tapa rosca (25 unidades)",
        "Pipetas Pasteur (100 unidades)",
        "Alcohol al 70% (250ml)",
        "Guantes de nitrilo (1 caja)",
      ],
      applications: [
        "Aislamiento de microorganismos",
        "Técnicas de siembra",
        "Observación microscópica",
        "Identificación bacteriana básica",
        "Prácticas de esterilización",
      ],
      price: "S/. 85",
      availability: "En stock",
      deliveryTime: "Entrega inmediata en campus UNT",
      image: "/kit-microbiologia.png",
    },
    {
      id: "medios-cultivo-selectivos",
      title: "Medios de Cultivo Selectivos",
      category: "Medios de Cultivo",
      icon: <FlaskConical className="w-8 h-8" />,
      shortDescription: "Medios especializados para aislamiento selectivo",
      fullDescription:
        "Conjunto de medios de cultivo preparados bajo estrictas condiciones de esterilidad, ideales para prácticas de microbiología clínica y ambiental.",
      specifications: [
        "Agar MacConkey (10 placas)",
        "Agar Sangre (10 placas)",
        "Agar Manitol Salado (10 placas)",
        "Caldo BHI (20 tubos)",
        "Agar Chocolate (5 placas)",
        "Control de calidad incluido",
      ],
      applications: [
        "Aislamiento de enterobacterias",
        "Diferenciación de Staphylococcus",
        "Cultivo de microorganismos exigentes",
        "Prácticas de microbiología clínica",
        "Identificación presuntiva",
      ],
      price: "S/. 120",
      availability: "Preparación bajo pedido",
      deliveryTime: "2-3 días hábiles",
      image: "/medios-cultivo.png",
    },
    {
      id: "reactivos-tincion",
      title: "Reactivos para Tinción",
      category: "Reactivos",
      icon: <TestTube className="w-8 h-8" />,
      shortDescription: "Set completo de reactivos para técnicas de tinción",
      fullDescription:
        "Reactivos de alta pureza para técnicas de tinción diferencial, fundamentales en la identificación microscópica de microorganismos.",
      specifications: [
        "Cristal Violeta (100ml)",
        "Lugol (100ml)",
        "Alcohol-acetona (100ml)",
        "Safranina (100ml)",
        "Azul de metileno (50ml)",
        "Frascos goteros incluidos",
      ],
      applications: [
        "Tinción de Gram",
        "Tinción simple",
        "Observación de morfología bacteriana",
        "Diferenciación celular",
        "Prácticas de microscopía",
      ],
      price: "S/. 65",
      availability: "En stock",
      deliveryTime: "Entrega inmediata",
      image: "/reactivos-tincion.png",
    },
    {
      id: "kit-biologia-molecular",
      title: "Kit de Biología Molecular",
      category: "Kits Avanzados",
      icon: <Microscope className="w-8 h-8" />,
      shortDescription: "Kit para técnicas básicas de biología molecular",
      fullDescription:
        "Kit especializado para estudiantes que cursan materias de biología molecular y biotecnología, incluye materiales para extracción de ADN y electroforesis.",
      specifications: [
        "Buffer de extracción de ADN (50ml)",
        "Gel de agarosa preparado (10 unidades)",
        "Buffer TAE 10X (100ml)",
        "Azul de bromofenol (10ml)",
        "Micropipetas desechables (200 unidades)",
        "Protocolo detallado incluido",
      ],
      applications: [
        "Extracción de ADN vegetal",
        "Electroforesis en gel",
        "Visualización de ácidos nucleicos",
        "Técnicas de PCR básica",
        "Análisis de fragmentos de ADN",
      ],
      price: "S/. 150",
      availability: "Stock limitado",
      deliveryTime: "1-2 días hábiles",
      image: "/kit-biologia-molecular.png",
    },
    {
      id: "material-histologia",
      title: "Material para Histología",
      category: "Materiales Especializados",
      icon: <Package className="w-8 h-8" />,
      shortDescription: "Materiales para técnicas histológicas básicas",
      fullDescription:
        "Set de materiales especializados para prácticas de histología vegetal y animal, ideal para estudiantes de biología y ciencias afines.",
      specifications: [
        "Portaobjetos (50 unidades)",
        "Cubreobjetos (100 unidades)",
        "Colorantes histológicos básicos",
        "Solución fijadora (250ml)",
        "Cuchillas de micrótomo (20 unidades)",
        "Manual de técnicas incluido",
      ],
      applications: [
        "Preparación de cortes histológicos",
        "Tinción de tejidos",
        "Observación microscópica",
        "Identificación de estructuras celulares",
        "Análisis morfológico",
      ],
      price: "S/. 95",
      availability: "En stock",
      deliveryTime: "Entrega inmediata",
      image: "/kit-histologia.png",
    },
    {
      id: "manual-practicas",
      title: "Manuales de Prácticas",
      category: "Material Didáctico",
      icon: <BookOpen className="w-8 h-8" />,
      shortDescription: "Guías detalladas para prácticas de laboratorio",
      fullDescription:
        "Manuales especializados desarrollados por nuestro equipo técnico, adaptados específicamente para el currículo de la UNT.",
      specifications: [
        "Manual de Microbiología (120 páginas)",
        "Guía de Biología Molecular (80 páginas)",
        "Atlas de Histología (100 páginas)",
        "Protocolos paso a paso",
        "Ilustraciones a color",
        "Formato digital incluido",
      ],
      applications: [
        "Guía para prácticas de laboratorio",
        "Consulta rápida de protocolos",
        "Preparación de exámenes",
        "Referencia técnica",
        "Estudio independiente",
      ],
      price: "S/. 45",
      availability: "En stock",
      deliveryTime: "Entrega inmediata",
      image: "/manual-microbiologia.png",
    },
  ]

  const handleSolicitar = (material: Material) => {
    const message = `Hola! Soy estudiante de la UNT y me interesa solicitar información sobre: ${material.title}. 

Detalles del material:
- Precio: ${material.price}
- Disponibilidad: ${material.availability}
- Tiempo de entrega: ${material.deliveryTime}

¿Podrían proporcionarme más información sobre cómo proceder con el pedido?`

    const whatsappUrl = `https://wa.me/51987654321?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#01283c] mb-4">Materiales para Estudiantes UNT</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Materiales especializados, kits educativos y reactivos de alta calidad para apoyar tu formación académica en
            ciencias biológicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material) => (
            <div
              key={material.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-[#2e7d32] bg-opacity-10 rounded-full mb-4 mx-auto">
                <div className="text-[#2e7d32]">{material.icon}</div>
              </div>
              <span className="inline-block bg-[#2e7d32] bg-opacity-10 text-[#2e7d32] text-xs px-2 py-1 rounded-full mb-2">
                {material.category}
              </span>
              <h3 className="text-xl font-bold text-[#01283c] mb-3">{material.title}</h3>
              <p className="text-gray-600 mb-4">{material.shortDescription}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-[#2e7d32]">{material.price}</span>
                <span className="text-sm text-gray-500">{material.availability}</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedMaterial(material)}
                  className="w-full bg-gray-100 text-[#01283c] px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Ver detalles
                </button>
                <button
                  onClick={() => handleSolicitar(material)}
                  className="w-full bg-[#2e7d32] text-white px-4 py-2 rounded-md hover:bg-[#1b5e20] transition-colors"
                >
                  Solicitar material
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        {selectedMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-[#2e7d32] bg-opacity-10 rounded-full mr-4">
                      <div className="text-[#2e7d32]">{selectedMaterial.icon}</div>
                    </div>
                    <div>
                      <span className="inline-block bg-[#2e7d32] bg-opacity-10 text-[#2e7d32] text-sm px-3 py-1 rounded-full mb-2">
                        {selectedMaterial.category}
                      </span>
                      <h3 className="text-2xl font-bold text-[#01283c]">{selectedMaterial.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">{selectedMaterial.fullDescription}</p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#01283c] mb-3">Especificaciones técnicas</h4>
                      <ul className="space-y-2">
                        {selectedMaterial.specifications.map((spec, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-[#2e7d32] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-[#01283c] mb-3">Aplicaciones</h4>
                      <ul className="space-y-2">
                        {selectedMaterial.applications.map((app, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-[#f57c00] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <span className="text-sm text-gray-500 block">Precio</span>
                        <span className="text-2xl font-bold text-[#2e7d32]">{selectedMaterial.price}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Disponibilidad</span>
                        <span className="text-lg font-semibold text-[#01283c]">{selectedMaterial.availability}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Entrega</span>
                        <span className="text-lg font-semibold text-[#01283c]">{selectedMaterial.deliveryTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <button
                        onClick={() => setSelectedMaterial(null)}
                        className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cerrar
                      </button>
                      <button
                        onClick={() => handleSolicitar(selectedMaterial)}
                        className="bg-[#2e7d32] text-white px-6 py-2 rounded-md hover:bg-[#1b5e20] transition-colors"
                      >
                        Solicitar por WhatsApp
                      </button>
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
