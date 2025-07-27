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

export default function BiotechFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "¿Qué diferencia hay entre la clonación de plantas y la reproducción por semillas?",
      answer:
        "La principal diferencia es que la clonación produce plantas genéticamente idénticas a la planta madre (clones), mientras que la reproducción por semillas combina material genético de dos plantas progenitoras, generando individuos con características diferentes. La clonación permite mantener exactamente las características deseables de una planta, mientras que las semillas producen variabilidad genética.",
    },
    {
      question: "¿Las plantas producidas por biotecnología son transgénicas?",
      answer:
        "No necesariamente. La micropropagación o clonación in vitro simplemente multiplica plantas existentes sin modificar su ADN. Son copias exactas de la planta original. Las plantas transgénicas, en cambio, han sido modificadas genéticamente mediante la introducción de genes de otras especies. La biotecnología vegetal incluye muchas técnicas, y la ingeniería genética (que produce transgénicos) es solo una de ellas.",
    },
    {
      question: "¿Por qué las plantas producidas in vitro son más saludables?",
      answer:
        "Las plantas producidas in vitro crecen en ambientes estériles y controlados, libres de patógenos como virus, bacterias y hongos. Además, se seleccionan explantes de plantas madre sanas y se someten a procesos de desinfección. Esto resulta en plantas libres de enfermedades desde su origen, con mayor vigor y potencial productivo, reduciendo la necesidad de agroquímicos durante su cultivo.",
    },
    {
      question: "¿Cuánto tiempo toma producir plantas mediante cultivo in vitro?",
      answer:
        "El tiempo varía según la especie vegetal, pero generalmente el proceso completo desde la extracción del explante hasta obtener una planta lista para campo toma entre 4 y 8 meses. La fase de multiplicación puede durar varias semanas, el enraizamiento otras semanas, y la aclimatación entre 1 y 2 meses. Sin embargo, la ventaja es que se pueden producir miles de plantas simultáneamente a partir de un solo explante inicial.",
    },
    {
      question: "¿Qué especies de plantas se pueden propagar mediante estas técnicas?",
      answer:
        "Prácticamente todas las especies vegetales pueden propagarse mediante técnicas de cultivo in vitro, aunque los protocolos varían. Se utiliza comúnmente en cultivos como banano, piña, papa, fresa, caña de azúcar, café, cacao, plantas ornamentales (orquídeas, anturios), forestales y muchas más. Cada especie requiere condiciones específicas de medio de cultivo, hormonas y ambiente para su óptimo desarrollo.",
    },
    {
      question: "¿Las plantas clonadas tienen la misma vida útil que las plantas convencionales?",
      answer:
        "Sí, las plantas producidas por cultivo in vitro tienen el mismo ciclo de vida y longevidad que las plantas propagadas por métodos convencionales. La diferencia es que comienzan su vida libres de enfermedades y con mayor vigor, lo que puede resultar en mejor desarrollo y productividad. No existe evidencia científica de que la micropropagación acorte o altere la vida útil natural de las plantas.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#01283c] mb-4">Preguntas frecuentes</h2>
        <p className="text-center text-base text-[#01283c] mb-12 max-w-3xl mx-auto">
          Resolvemos tus dudas sobre la biotecnología vegetal y los procesos de clonación y multiplicación de plantas.
        </p>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border border-gray-100">
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
