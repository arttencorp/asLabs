"use client"
import Image from "next/image"
import { Tab } from "@headlessui/react"

interface MaterialItem {
  name: string
  description: string
  price: string
  image: string
  available: boolean
}

interface CategoryData {
  name: string
  description: string
  items: MaterialItem[]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function StudentMaterials() {
  const categories: CategoryData[] = [
    {
      name: "Kits de laboratorio",
      description: "Kits completos para prácticas específicas",
      items: [
        {
          name: "Kit de Microbiología Básica",
          description: "Incluye medios de cultivo, asas, placas Petri y guía de prácticas",
          price: "S/. 85.00",
          image: "/kit-microbiologia.png",
          available: true,
        },
        {
          name: "Kit de Biología Molecular",
          description: "Con reactivos para extracción de ADN, PCR y electroforesis",
          price: "S/. 120.00",
          image: "/kit-biologia-molecular.png",
          available: true,
        },
        {
          name: "Kit de Histología",
          description: "Contiene portaobjetos, colorantes y muestras de tejidos",
          price: "S/. 95.00",
          image: "/kit-histologia.png",
          available: true,
        },
      ],
    },
    {
      name: "Reactivos",
      description: "Reactivos de alta calidad en presentaciones para estudiantes",
      items: [
        {
          name: "Colorantes para Tinción Gram",
          description: "Set completo de cristal violeta, lugol, alcohol-acetona y safranina",
          price: "S/. 45.00",
          image: "/reactivos-tincion.png",
          available: true,
        },
        {
          name: "Medios de Cultivo",
          description: "Agar nutritivo, MacConkey, Mueller-Hinton y otros",
          price: "Desde S/. 25.00",
          image: "/medios-cultivo.png",
          available: true,
        },
        {
          name: "Reactivos para Bioquímica",
          description: "Incluye reactivos para pruebas de identificación bacteriana",
          price: "S/. 60.00",
          image: "/reactivos-bioquimica.png",
          available: false,
        },
      ],
    },
    {
      name: "Material de laboratorio",
      description: "Instrumentos y materiales esenciales para tus prácticas",
      items: [
        {
          name: "Set de Micropipetas",
          description: "Micropipetas calibradas de diferentes volúmenes con puntas",
          price: "S/. 150.00",
          image: "/micropipetas.png",
          available: true,
        },
        {
          name: "Placas Petri Estériles",
          description: "Paquete de 20 placas Petri de plástico estériles",
          price: "S/. 30.00",
          image: "/placas-petri.png",
          available: true,
        },
        {
          name: "Asas de Siembra",
          description: "Set de asas de siembra de diferentes tamaños",
          price: "S/. 15.00",
          image: "/asas-siembra.png",
          available: true,
        },
      ],
    },
    {
      name: "Guías y manuales",
      description: "Material didáctico para complementar tu aprendizaje",
      items: [
        {
          name: "Manual de Prácticas de Microbiología",
          description: "Guía completa con protocolos detallados y fundamentos teóricos",
          price: "S/. 35.00",
          image: "/manual-microbiologia.png",
          available: true,
        },
        {
          name: "Atlas de Histología",
          description: "Colección de imágenes de alta resolución con descripciones detalladas",
          price: "S/. 45.00",
          image: "/atlas-histologia.png",
          available: true,
        },
        {
          name: "Guía de Técnicas Moleculares",
          description: "Protocolos paso a paso para técnicas de biología molecular",
          price: "S/. 40.00",
          image: "/guia-molecular.png",
          available: true,
        },
      ],
    },
  ]

  return (
    <section id="materiales" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#01283c] mb-4">Materiales para estudiantes UNT</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de materiales específicamente seleccionados para las necesidades de los
            estudiantes de la Universidad Nacional de Trujillo.
          </p>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 shadow-md mb-8">
            {categories.map((category) => (
              <Tab
                key={category.name}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-3 text-sm font-medium leading-5",
                    "ring-white ring-opacity-60 ring-offset-2 focus:outline-none",
                    selected
                      ? "bg-[#2e7d32] text-white shadow"
                      : "text-gray-700 hover:bg-green-50 hover:text-[#2e7d32]",
                  )
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {categories.map((category, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames("rounded-xl bg-white p-3", "ring-white ring-opacity-60 focus:outline-none")}
              >
                <div className="mb-4">
                  <p className="text-gray-600 italic">{category.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="relative h-48">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-300 hover:scale-105"
                        />
                        {!item.available && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <span className="text-white font-bold px-3 py-1 bg-red-500 rounded-full text-sm">
                              Agotado
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-[#01283c]">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-[#2e7d32]">{item.price}</span>
                          <button
                            disabled={!item.available}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              item.available
                                ? "bg-[#2e7d32] text-white hover:bg-[#1b5e20]"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {item.available ? "Solicitar" : "Agotado"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿No encuentras lo que necesitas? Podemos conseguir materiales específicos para tus proyectos.
          </p>
          <a
            href="#contacto"
            className="inline-block bg-[#2e7d32] text-white px-6 py-3 rounded-md hover:bg-[#1b5e20] transition-colors"
          >
            Solicitar material específico
          </a>
        </div>
      </div>
    </section>
  )
}
