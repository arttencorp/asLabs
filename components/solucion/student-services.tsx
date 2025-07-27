import type React from "react"
import { BookOpen, Microscope, FlaskRoundIcon as Flask, Beaker, Brain, Users } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-[#2e7d32]">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#2e7d32] mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default function StudentServices() {
  const services = [
    {
      icon: <Microscope size={24} />,
      title: "Asesoría en prácticas de laboratorio",
      description:
        "Orientación especializada para tus prácticas de microbiología, biología celular, bioquímica y más. Te ayudamos a prepararte para obtener resultados óptimos.",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Apoyo en trabajos de investigación",
      description:
        "Asesoramiento metodológico y técnico para el desarrollo de tus proyectos de investigación, desde la formulación hasta la interpretación de resultados.",
    },
    {
      icon: <Flask size={24} />,
      title: "Preparación de medios de cultivo",
      description:
        "Elaboración de medios de cultivo específicos para tus prácticas y proyectos, garantizando la calidad y esterilidad necesarias para tus experimentos.",
    },
    {
      icon: <Beaker size={24} />,
      title: "Suministro de reactivos",
      description:
        "Proporcionamos reactivos de alta calidad en las cantidades exactas que necesitas para tus prácticas, evitando desperdicios y reduciendo costos.",
    },
    {
      icon: <Brain size={24} />,
      title: "Tutorías personalizadas",
      description:
        "Sesiones de tutoría individual o grupal con profesionales especializados en áreas específicas de las ciencias biológicas y médicas.",
    },
    {
      icon: <Users size={24} />,
      title: "Talleres prácticos",
      description:
        "Talleres hands-on para reforzar técnicas de laboratorio, manejo de equipos y procedimientos específicos de tu carrera.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#01283c] mb-4">Nuestros servicios para estudiantes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Diseñados específicamente para apoyarte en tu formación académica y desarrollo profesional en las áreas de
            ciencias biológicas, microbiología y tecnologías médicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
