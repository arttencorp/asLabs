import type React from "react"
import { Truck, Clock, MapPin, Calendar, CheckSquare, ShieldCheck } from "lucide-react"

interface DeliveryStepProps {
  icon: React.ReactNode
  title: string
  description: string
}

const DeliveryStep = ({ icon, title, description }: DeliveryStepProps) => (
  <div className="flex items-start">
    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 text-[#2e7d32] flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-[#01283c] mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
)

export default function StudentDelivery() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#01283c] mb-4">Entrega en campus UNT</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Facilitamos tu acceso a los materiales que necesitas con nuestro servicio de entrega directamente en el
            campus de la Universidad Nacional de Trujillo.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <DeliveryStep
                icon={<Calendar size={24} />}
                title="Programa tu entrega"
                description="Realiza tu pedido con al menos 24 horas de anticipación para garantizar la disponibilidad de tus materiales."
              />
              <DeliveryStep
                icon={<Clock size={24} />}
                title="Horarios flexibles"
                description="Entregas de lunes a viernes de 8:00 am a 6:00 pm, adaptándonos a tu horario de clases."
              />
              <DeliveryStep
                icon={<MapPin size={24} />}
                title="Puntos de entrega"
                description="Recoge tus materiales en puntos estratégicos del campus: Facultad de Ciencias Biológicas, Biblioteca Central o Cafetería Principal."
              />
            </div>
            <div className="space-y-8">
              <DeliveryStep
                icon={<Truck size={24} />}
                title="Entrega gratuita"
                description="Sin costo adicional para pedidos superiores a S/. 50.00 realizados por estudiantes de la UNT."
              />
              <DeliveryStep
                icon={<CheckSquare size={24} />}
                title="Verificación de calidad"
                description="Todos los materiales son verificados antes de la entrega para garantizar su óptimo estado."
              />
              <DeliveryStep
                icon={<ShieldCheck size={24} />}
                title="Garantía de satisfacción"
                description="Si algún material no cumple con tus expectativas, lo reemplazamos sin costo adicional."
              />
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <p className="text-yellow-700">
              <strong>Nota importante:</strong> Para pedidos urgentes o de gran volumen, contáctanos directamente para
              coordinar una entrega especial. Estamos comprometidos con apoyar tus necesidades académicas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
