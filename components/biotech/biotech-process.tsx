"use client"

import { useState } from "react"
import Image from "next/image"

interface StepProps {
  number: number
  title: string
  description: string
  image: string
  isActive: boolean
  onClick: () => void
}

const Step = ({ number, title, description, image, isActive, onClick }: StepProps) => (
  <div
    className={`border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
      isActive ? "border-[#2e7d32] shadow-md" : "border-gray-200"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center p-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${
          isActive ? "bg-[#2e7d32] text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        {number}
      </div>
      <h4 className={`font-medium ${isActive ? "text-[#2e7d32]" : "text-[#01283c]"}`}>{title}</h4>
    </div>
  </div>
)

export default function BiotechProcess() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Selección de la planta madre",
      description:
        "El proceso comienza con la selección de una planta madre con características deseables (alta productividad, resistencia a enfermedades, calidad de frutos, etc.). Esta planta será la fuente del material vegetal para la clonación.",
      image: "/biotech-step1.png",
    },
    {
      title: "Extracción de explantes",
      description:
        "Se extraen pequeñas porciones de tejido vegetal llamadas 'explantes'. Estos pueden ser yemas, hojas, tallos o meristemos (tejidos con células en división activa). Los explantes deben ser lo suficientemente pequeños para ser manejables pero contener células viables.",
      image: "/biotech-step2.png",
    },
    {
      title: "Desinfección",
      description:
        "Los explantes se desinfectan cuidadosamente con soluciones como hipoclorito de sodio, alcohol o fungicidas para eliminar microorganismos superficiales. Este paso es crucial para evitar contaminaciones en el cultivo in vitro.",
      image: "/biotech-step3.png",
    },
    {
      title: "Siembra en medio de cultivo",
      description:
        "Los explantes desinfectados se colocan en recipientes con medio de cultivo estéril. Este medio contiene nutrientes, vitaminas, minerales, azúcares y hormonas vegetales específicas que estimularán el desarrollo de nuevos tejidos.",
      image: "/biotech-step4.png",
    },
    {
      title: "Incubación",
      description:
        "Los recipientes con los explantes se mantienen en cámaras de crecimiento con condiciones controladas de luz, temperatura y humedad. Aquí permanecerán durante varias semanas mientras se desarrollan nuevos brotes.",
      image: "/biotech-step5.png",
    },
    {
      title: "Multiplicación",
      description:
        "Una vez que se han formado nuevos brotes, estos se separan y se transfieren a nuevo medio de cultivo para continuar su multiplicación. Este paso puede repetirse varias veces para obtener miles de plantas a partir de un solo explante inicial.",
      image: "/biotech-step6.png",
    },
    {
      title: "Enraizamiento",
      description:
        "Los brotes desarrollados se transfieren a un medio de cultivo con hormonas que estimulan la formación de raíces. En esta etapa, los brotes se convierten en plántulas completas con sistema radicular.",
      image: "/biotech-step7.png",
    },
    {
      title: "Aclimatación",
      description:
        "Las plántulas se trasladan gradualmente de las condiciones in vitro (ambiente estéril y controlado) a condiciones ex vitro (invernadero). Este proceso de adaptación es crucial para que las plantas sobrevivan en el ambiente natural.",
      image: "/biotech-step8.png",
    },
    {
      title: "Trasplante definitivo",
      description:
        "Finalmente, las plantas aclimatadas se trasplantan al campo o a su ubicación definitiva, donde continuarán su desarrollo normal. Estas plantas son genéticamente idénticas a la planta madre y conservan todas sus características deseables.",
      image: "/biotech-step9.png",
    },
  ]

  return (
    <section id="proceso" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#01283c] mb-4">
          El Proceso de Clonación y Multiplicación de Plantas
        </h2>
        <p className="text-center text-base text-[#01283c] mb-12 max-w-3xl mx-auto">
          Descubre paso a paso cómo se realiza la multiplicación in vitro de plantas, desde la selección del material
          vegetal hasta la obtención de miles de plantas idénticas.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 gap-4">
              {steps.map((step, index) => (
                <Step
                  key={index}
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                  image={step.image}
                  isActive={activeStep === index}
                  onClick={() => setActiveStep(index)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 h-full">
              <div className="relative h-80">
                <Image
                  src={steps[activeStep].image || "/placeholder.svg"}
                  alt={steps[activeStep].title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#2e7d32] mb-4">
                  Paso {activeStep + 1}: {steps[activeStep].title}
                </h3>
                <p className="text-[#01283c]">{steps[activeStep].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
