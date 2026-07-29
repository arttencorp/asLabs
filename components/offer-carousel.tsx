"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { btnPrimary, arrowCircle } from "@/components/ui/button-styles"
import { Bug, Leaf, Users, FlaskConical, Play, Pause } from "lucide-react"

interface OfferItem {
  id: number
  title: string
  content: string
  image: string
  link: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export default function OfferCarousel() {
  const [activeItem, setActiveItem] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const offerItems: OfferItem[] = [
    {
      id: 0,
      title: "Control Biológico",
      content:
        "Desarrollamos microorganismos benéficos para el control de plagas y enfermedades en cultivos agrícolas. Nuestras soluciones incluyen hongos antagonistas, bacterias promotoras del crecimiento y bioestimulantes que reducen la dependencia de agroquímicos, protegiendo el medio ambiente y la salud de los agricultores.",
      image: "/control-biologico.png",
      link: "CONOCE NUESTROS BIOCONTROLADORES",
      href: "/control-biologico",
      icon: Bug,
    },
    {
      id: 1,
      title: "Biotecnología Vegetal",
      content:
        "Producimos plantas in vitro de alta calidad genética y fitosanitaria mediante técnicas de micropropagación. Ofrecemos plantines de banano, plátano, piña, arándanos y especies ornamentales, garantizando material vegetal libre de enfermedades y con características genéticas superiores.",
      image: "/new/BiotecnologiaVegetal.webp",
      link: "EXPLORA NUESTROS PLANTINES",
      href: "/plantines",
      icon: Leaf,
    },
    {
      id: 2,
      title: "Asesoría Técnica",
      content:
        "Brindamos consultoría especializada en biotecnología vegetal, manejo integrado de plagas y enfermedades, y sistemas de producción sostenible. Nuestro equipo de profesionales altamente capacitados ofrece soluciones personalizadas para optimizar la producción agrícola de nuestros clientes.",
      image: "/scientists-meeting.png",
      link: "SOLICITA UNA CONSULTA",
      href: "/servicios/apoyo-investigacion",
      icon: Users,
    },
    {
      id: 3,
      title: "Insumos de Laboratorio",
      content:
        "Suministramos materiales, equipos y reactivos para laboratorios de investigación y enseñanza universitaria. Desde medios de cultivo hasta instrumentos especializados, ofrecemos productos de alta calidad para estudiantes, docentes e investigadores en el campo de la biotecnología.",
      image: "/offer/insumosLab.jpeg",
      link: "VER CATÁLOGO DE INSUMOS",
      href: "/tienda",
      icon: FlaskConical,
    },
  ]

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev)
  }, [])

  const nextSlide = useCallback(() => {
    setActiveItem(prev => (prev === offerItems.length - 1 ? 0 : prev + 1))
  }, [offerItems.length])

  // Marcar como montado después de la hidratación
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Manejar el autoplay del carrusel
  useEffect(() => {
    // Solo ejecutar en el cliente después del montaje
    if (!isMounted) return
    
    // Limpiar intervalo anterior
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Si no está pausado, iniciar el intervalo
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5000)
    }

    // Cleanup al desmontar o cuando cambien las dependencias
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPaused, isMounted, nextSlide])

  return (
    <section data-navbar-theme="light" className="bg-[#f6f3eb] py-20 sm:py-28">
      <div className="container mx-auto max-w-[1320px] px-4 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Nuestros Servicios"
            title="¿Qué es lo que ofrecemos?"
            description={
              'AS Laboratorios ofrece una amplia gama de servicios y productos, desde la producción de plantas "in vitro" hasta materiales para estudiantes universitarios.'
            }
            align="center"
            className="mb-10"
          />
        </ScrollReveal>

        {/* Pill tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 rounded-2xl border border-[#dce5dc] bg-white/70 p-2 sm:gap-3">
          {offerItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id)
                  setIsPaused(true)
                }}
                className={`relative flex items-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:px-5 ${
                  isActive
                    ? "bg-gradient-to-r from-[#2e7d32] to-[#43a047] text-white shadow-[0_8px_20px_-8px_rgba(46,125,50,0.6)]"
                    : "bg-white border border-gray-200 text-[#01283c] hover:border-[#2e7d32]/40 hover:bg-[#2e7d32]/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.title}
                {isActive && !isPaused && isMounted && (
                  <motion.span
                    key={`progress-${item.id}`}
                    className="absolute left-0 bottom-0 h-0.5 bg-white/70"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </button>
            )
          })}
          <button
            onClick={togglePause}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:border-[#2e7d32]/40 hover:text-[#2e7d32]"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#dce5dc] bg-white shadow-[0_28px_80px_-42px_rgba(10,47,32,0.42)]">
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Left - Image */}
          <div className="w-full lg:w-3/5 relative min-h-[260px] sm:min-h-[360px] lg:min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={offerItems[activeItem].id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute inset-0"
              >
                <Image
                  src={offerItems[activeItem].image || "/placeholder.svg"}
                  alt={offerItems[activeItem].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/5" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-lg text-[#2e7d32]">
                  {(() => {
                    const Icon = offerItems[activeItem].icon
                    return <Icon className="h-6 w-6" />
                  })()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - Content */}
          <div className="w-full lg:w-2/5 p-6 sm:p-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={offerItems[activeItem].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#01283c] mb-4 font-serif">{offerItems[activeItem].title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">{offerItems[activeItem].content}</p>
                <Link href={offerItems[activeItem].href} className={btnPrimary}>
                  {offerItems[activeItem].link}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
