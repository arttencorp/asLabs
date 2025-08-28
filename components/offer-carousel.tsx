"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

interface OfferItem {
  id: number
  title: string
  content: string
  image: string
  link: string
}

export default function OfferCarousel() {
  const [activeItem, setActiveItem] = useState(0) // Start with "Control Biológico"
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const offerItems: OfferItem[] = [
    {
      id: 0,
      title: "Control Biológico",
      content:
        "Desarrollamos microorganismos benéficos para el control de plagas y enfermedades en cultivos agrícolas. Nuestras soluciones incluyen hongos antagonistas, bacterias promotoras del crecimiento y bioestimulantes que reducen la dependencia de agroquímicos, protegiendo el medio ambiente y la salud de los agricultores.",
      image: "/control-biologico.png",
      link: "CONOCE NUESTROS BIOCONTROLADORES",
    },
    {
      id: 1,
      title: "Biotecnología Vegetal",
      content:
        "Producimos plantas in vitro de alta calidad genética y fitosanitaria mediante técnicas de micropropagación. Ofrecemos plantines de banano, plátano, piña, arándanos y especies ornamentales, garantizando material vegetal libre de enfermedades y con características genéticas superiores.",
      image: "/new/BiotecnologiaVegetal.webp",
      link: "EXPLORA NUESTROS PLANTINES",
    },
    {
      id: 2,
      title: "Asesoría Técnica",
      content:
        "Brindamos consultoría especializada en biotecnología vegetal, manejo integrado de plagas y enfermedades, y sistemas de producción sostenible. Nuestro equipo de profesionales altamente capacitados ofrece soluciones personalizadas para optimizar la producción agrícola de nuestros clientes.",
      image: "/asesoria-tecnica.png",
      link: "SOLICITA UNA CONSULTA",
    },
    {
      id: 3,
      title: "Insumos de Laboratorio",
      content:
        "Suministramos materiales, equipos y reactivos para laboratorios de investigación y enseñanza universitaria. Desde medios de cultivo hasta instrumentos especializados, ofrecemos productos de alta calidad para estudiantes, docentes e investigadores en el campo de la biotecnología.",
      image: "/insumos-laboratorio.png",
      link: "VER CATÁLOGO DE INSUMOS",
    },
  ]

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const nextSlide = () => {
    setActiveItem((prev) => (prev === offerItems.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPaused])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#2e7d32] mb-4">¿Qué es lo que ofrecemos?</h2>
        <p className="text-center text-base text-[#01283c] mb-12 max-w-3xl mx-auto">
          AS Laboratorios ofrece una amplia gama de servicios y productos, desde la producción de plantas "in vitro"
          hasta materiales para estudiantes universitarios.
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-start">
          {/* Left side - Carousel navigation */}
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-6">
            <div className="space-y-6">
              {offerItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id)
                    setIsPaused(true)
                  }}
                  className={`text-left py-3 pl-4 pr-6 rounded-md transition-all duration-300 relative w-full ${activeItem === item.id ? "text-[#2e7d32] font-medium" : "text-[#01283c] hover:text-[#2e7d32]"
                    }`}
                >
                  {activeItem === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d1343e] rounded-l-md"></div>
                  )}
                  {item.title}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={togglePause}
                className="flex items-center justify-center"
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              >
                <div className="flex items-center justify-center w-8 h-8 text-[#01283c]">
                  {isPaused ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
                    </svg>
                  ) : (
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-6 bg-[#01283c]"></div>
                      <div className="w-1.5 h-6 bg-[#01283c]"></div>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Center - Image */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <div className="rounded-lg overflow-hidden">
              <Image
                key={offerItems[activeItem].id}
                src={offerItems[activeItem].image || "/placeholder.svg"}
                alt={offerItems[activeItem].title}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-1/3 lg:pl-6">
            <h3 className="text-2xl font-bold text-[#2e7d32] mb-4">{offerItems[activeItem].title}</h3>
            <p className="text-base text-[#01283c] mb-6 leading-relaxed">{offerItems[activeItem].content}</p>
            <Link href="#" className="inline-flex items-center text-[#2e7d32] font-medium">
              {offerItems[activeItem].link}
              <div className="ml-2 flex items-center justify-center w-6 h-6 rounded-full border border-[#2e7d32]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
