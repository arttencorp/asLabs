"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  toggleOpen: () => void
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => (
  <div className="border-b border-gray-200 py-4">
    <button
      className="flex justify-between items-center w-full text-left font-medium text-[#01283c]"
      onClick={toggleOpen}
    >
      <span>{question}</span>
      {isOpen ? <ChevronUp className="h-5 w-5 text-[#2e7d32]" /> : <ChevronDown className="h-5 w-5 text-[#2e7d32]" />}
    </button>
    <div
      className={`mt-2 text-[#01283c] transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="pb-4">{answer}</p>
    </div>
  </div>
)

export default function StudentFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "¿Cómo puedo acceder al descuento para estudiantes de la UNT?",
      answer:
        "Para acceder al descuento especial para estudiantes de la Universidad Nacional de Trujillo, solo necesitas presentar tu carné universitario vigente al momento de realizar tu compra o adjuntar una copia digital si realizas tu pedido en línea. El descuento se aplicará automáticamente a tu compra.",
    },
    {
      question: "¿Realizan envíos a otras ciudades del Perú?",
      answer:
        "Sí, realizamos envíos a todas las ciudades del Perú. Los costos de envío varían según la ubicación y el volumen del pedido. Para pedidos superiores a S/. 300, el envío es gratuito a las principales ciudades del país.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos diversos métodos de pago, incluyendo transferencias bancarias, depósitos, Yape, Plin, tarjetas de crédito/débito y pago contra entrega en algunas zonas. También ofrecemos facilidades de pago para compras institucionales.",
    },
    {
      question: "¿Ofrecen asesoría para proyectos de investigación?",
      answer:
        "Sí, contamos con un equipo de profesionales que pueden brindarte asesoría técnica para tus proyectos de investigación. Para estudiantes de la UNT, ofrecemos asesoría gratuita en temas relacionados con biotecnología vegetal y microbiología.",
    },
    {
      question: "¿Puedo solicitar productos que no están en el catálogo?",
      answer:
        "Absolutamente. Si necesitas un producto específico que no encuentras en nuestro catálogo, contáctanos y haremos lo posible por conseguirlo para ti. Trabajamos con diversos proveedores nacionales e internacionales para satisfacer tus necesidades.",
    },
    {
      question: "¿Tienen algún programa de pasantías para estudiantes?",
      answer:
        "Sí, contamos con un programa de pasantías para estudiantes universitarios de últimos ciclos. Las convocatorias se realizan dos veces al año (febrero y agosto). Puedes enviarnos tu CV y carta de interés a través de nuestro formulario de contacto.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#01283c] mb-4">Preguntas frecuentes</h2>
        <p className="text-center text-base text-[#01283c] mb-12 max-w-3xl mx-auto">
          Resolvemos tus dudas sobre nuestros productos y servicios para estudiantes universitarios.
        </p>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
