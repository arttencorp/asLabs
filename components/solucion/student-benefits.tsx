import { CheckCircle } from "lucide-react"
import Image from "next/image"

export default function StudentBenefits() {
  const benefits = [
    "Descuentos exclusivos del 20% para estudiantes UNT",
    "Entrega gratuita en el campus universitario",
    "Asesoría personalizada para tus proyectos",
    "Materiales adaptados a tus prácticas específicas",
    "Disponibilidad inmediata de productos esenciales",
    "Talleres gratuitos sobre técnicas de laboratorio",
    "Apoyo en la preparación de tesis y trabajos de investigación",
    "Acceso a biblioteca especializada de recursos digitales",
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full opacity-70"></div>
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border-2 border-green-100 transform rotate-1">
                <Image
                  src="/unt-benefits.png"
                  alt="Estudiantes UNT en laboratorio"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full shadow-md">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs font-bold text-[#2e7d32]">Exclusivo UNT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-[#01283c] mb-6">Beneficios exclusivos para estudiantes de la UNT</h2>
            <p className="text-gray-600 mb-8">
              En AS Laboratorios entendemos las necesidades específicas de los estudiantes de la Universidad Nacional de
              Trujillo. Por eso, hemos diseñado un programa de beneficios exclusivos para facilitar tu formación
              académica y desarrollo profesional.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2e7d32] mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-[#2e7d32] font-medium">
                Presenta tu carné universitario vigente para acceder a todos estos beneficios exclusivos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
