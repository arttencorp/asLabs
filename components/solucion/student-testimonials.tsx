"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  career: string
  year: string
  quote: string
  image: string
  rating: number
}

export default function StudentTestimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Mendoza",
      career: "Microbiología y Parasitología",
      year: "4to año",
      quote:
        "Los kits de laboratorio de AS Labs me han facilitado enormemente mis prácticas. La calidad de los materiales y la entrega puntual en el campus han sido fundamentales para mi desempeño académico.",
      image: "/testimonial-1.png",
      rating: 5,
    },
    {
      id: 2,
      name: "María Fernández",
      career: "Ciencias Biológicas",
      year: "5to año",
      quote:
        "La asesoría que recibí para mi tesis fue excepcional. Los especialistas de AS Labs me guiaron en cada etapa del proceso y me proporcionaron los materiales exactos que necesitaba.",
      image: "/testimonial-2.png",
      rating: 5,
    },
    {
      id: 3,
      name: "Jorge Ramírez",
      career: "Tecnología Médica",
      year: "3er año",
      quote:
        "Los reactivos que compré para mis prácticas de histología eran de excelente calidad y a un precio accesible. El descuento para estudiantes UNT hace una gran diferencia en mi presupuesto.",
      image: "/testimonial-3.png",
      rating: 4,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 8000)
    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#01283c] mb-4">Lo que dicen nuestros estudiantes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce las experiencias de estudiantes de la UNT que han utilizado nuestros servicios y materiales.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="flex flex-col md:flex-row p-6 md:p-8">
                    <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-100">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded-full"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-[#01283c] mt-4 text-center">{testimonial.name}</h3>
                      <p className="text-gray-600 text-center">{testimonial.career}</p>
                      <p className="text-gray-500 text-sm text-center">{testimonial.year}</p>
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="md:w-2/3 md:pl-8 flex items-center">
                      <blockquote className="italic text-gray-700 relative">
                        <div className="text-6xl text-green-100 absolute -top-6 -left-2">"</div>
                        <p className="relative z-10 text-lg">{testimonial.quote}</p>
                        <div className="text-6xl text-green-100 absolute -bottom-10 right-0">"</div>
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-[#2e7d32]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-[#2e7d32]" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? "bg-[#2e7d32]" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
