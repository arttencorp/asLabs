"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OfferCarousel from "@/components/offer-carousel"
import TeamMemberSection from "@/components/team-member-section"
import JourneySection from "@/components/journey-section"

export default function ClientPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const slides = [
    {
      title: "Creamos soluciones biotecnológicas para la preservación del medio ambiente.",
      subtitle:
        "Brindamos soluciones a estudiantes universitarios, docentes y asesorías personalizadas enfocadas en la Biología y Genética.",
    },
    {
      title: "Innovación en microorganismos para la agricultura sostenible.",
      subtitle:
        "Brindamos soluciones a estudiantes universitarios, docentes y asesorías personalizadas enfocadas en la Biología y Genética.",
    },
    {
      title: "Soluciones biotecnológicas para el cambio climático.",
      subtitle:
        "Brindamos soluciones a estudiantes universitarios, docentes y asesorías personalizadas enfocadas en la Biología y Genética.",
    },
  ]

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
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
  }, [currentSlide, isTransitioning, isPaused])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section with Video Background */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh]">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tecnalia-home-2025-6nnpnOerfOTzGhqWYaAA99f7xUBt0i.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="w-full lg:w-1/2">
            <div className="transition-opacity duration-500 ease-in-out" style={{ opacity: isTransitioning ? 0.5 : 1 }}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 font-serif leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-sm sm:text-base text-white mb-6 leading-relaxed">{slides[currentSlide].subtitle}</p>
              <Link
                href="#"
                className="inline-block border border-[#e65100] bg-[#e65100] text-white px-4 sm:px-6 py-2 text-xs sm:text-sm uppercase rounded-md hover:bg-transparent hover:text-white transition-colors"
              >
                LEER MÁS
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <button
                className="bg-white bg-opacity-20 rounded-md p-1 sm:p-2 shadow-sm mr-2 sm:mr-4 hover:bg-opacity-30 transition-colors"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </button>

              <div className="flex items-center">
                <button
                  onClick={togglePause}
                  className="mr-2 sm:mr-4"
                  aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                >
                  <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-white">
                    {isPaused ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
                      </svg>
                    ) : (
                      <div className="flex space-x-1">
                        <div className="w-1 sm:w-1.5 h-4 sm:h-6 bg-white"></div>
                        <div className="w-1 sm:w-1.5 h-4 sm:h-6 bg-white"></div>
                      </div>
                    )}
                  </div>
                </button>

                <div className="flex gap-1 sm:gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`h-1 w-8 sm:w-16 ${
                        i === currentSlide
                          ? "bg-white"
                          : i === currentSlide + 1
                            ? "bg-white bg-opacity-50"
                            : "bg-white bg-opacity-30"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                className="bg-white bg-opacity-20 rounded-md p-1 sm:p-2 shadow-sm ml-2 sm:ml-4 hover:bg-opacity-30 transition-colors"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-lg sm:text-xl font-medium mb-6 font-serif">Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: "Plantines de Banano", variety: "Variedad Cavendish Williams" },
              { title: "Plantines de Banano", variety: "Variedad Cavendish Valery" },
              { title: "Plantines de Banano", variety: "Variedad Baby Banana" },
              { title: "Plantines de Plátano", variety: "Variedad Dominico Hartón" },
            ].map((product, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="p-4 border-l-4 border-[#2e7d32] h-full flex flex-col">
                  <h3 className="font-medium font-serif text-sm sm:text-base">{product.title}</h3>
                  <p className="text-xs sm:text-sm">{product.variety}</p>
                  <div className="mt-auto pt-4">
                    <p className="text-xs text-gray-500">En Producción</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
            <div className="flex gap-2">
              <button className="border rounded-full p-1">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="border rounded-full p-1">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <Link href="#" className="text-xs sm:text-sm flex items-center text-[#2e7d32]">
              VER TODOS LOS PRODUCTOS
              <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </section>

      {/* Stats and Join Us Sections */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stats and Conócenos */}
            <div className="flex flex-col">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-12 mb-8 sm:mb-10">
                <div>
                  <h3 className="text-3xl sm:text-5xl font-bold text-[#2e7d32] font-serif">13+</h3>
                  <p className="text-xs sm:text-sm mt-1">Years of progress</p>
                </div>
                <div>
                  <h3 className="text-3xl sm:text-5xl font-bold text-[#2e7d32] font-serif">45</h3>
                  <p className="text-xs sm:text-sm mt-1">Development programs</p>
                </div>
                <div>
                  <h3 className="text-3xl sm:text-5xl font-bold text-[#2e7d32] font-serif">36</h3>
                  <p className="text-xs sm:text-sm mt-1">Ongoing clinical trials</p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#2e7d32] mb-4 font-serif">Conócenos</h3>
              <p className="text-sm sm:text-base text-[#01283c] mb-6 leading-relaxed">
                Tenemos la misión de mejorar el germoplasma nacional y combatir el cambio climático reduciendo el uso de
                plaguicidas mediante el control biológico.
              </p>
              <Link href="/sobre-nosotros" className="inline-flex items-center text-[#2e7d32] font-medium">
                MÁS SOBRE NOSOTROS
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

            {/* Join Us */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48 sm:h-64 md:h-80">
                <Image
                  src="/u13Ap.png"
                  alt="Scientists in lab"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-2xl font-bold text-[#01283c] mb-4 font-serif">
                  Join us and change the world of medicine
                </h3>
                <Link href="#" className="inline-flex items-center text-[#e65100] font-medium">
                  LIFE AT MODERNA
                  <div className="ml-2 flex items-center justify-center w-6 h-6 rounded-full border border-[#e65100]">
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
        </div>
      </section>

      {/* What We Offer Section */}
      <OfferCarousel />

      {/* Team Member Section */}
      <TeamMemberSection />

      {/* Journey Section */}
      <JourneySection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
