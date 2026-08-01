import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function StudentContact() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#2e7d32] to-[#4caf50] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Comenzar tu Experiencia Científica?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Contáctanos hoy mismo y descubre cómo podemos apoyar tu formación académica con los mejores materiales de
            laboratorio del Perú
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <p className="text-sm opacity-90">+51 961 996 645</p>
              <p className="text-xs opacity-75 mt-1">Lun - Vie: 8:00 AM - 6:00 PM</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm opacity-90">ventas@aslaboratorios.com</p>
              <p className="text-xs opacity-75 mt-1">Respuesta en 24 horas</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-2">Ubicación</h3>
              <p className="text-sm opacity-90">Av. Juan Pablo II 306</p>
              <p className="text-xs opacity-75 mt-1">Trujillo, La Libertad</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-semibold mb-2">Horarios</h3>
              <p className="text-sm opacity-90">Lun - Vie: 8:00 AM - 6:00 PM</p>
              <p className="text-xs opacity-75 mt-1">Sáb: 8:00 AM - 1:00 PM</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/51961996645?text=Hola%2C%20soy%20estudiante%20y%20me%20interesa%20conocer%20más%20sobre%20sus%20productos%20para%20laboratorio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-full transition-colors duration-300 font-medium"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar por WhatsApp
            </a>
            <a
              href="mailto:ventas@aslaboratorios.com?subject=Consulta%20de%20Estudiante&body=Hola%2C%20soy%20estudiante%20y%20me%20interesa%20conocer%20más%20sobre%20sus%20productos%20para%20laboratorio."
              className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full transition-colors duration-300 font-medium border border-white/30"
            >
              <Mail className="w-5 h-5 mr-2" />
              Enviar Email
            </a>
          </div>
          <p className="text-sm opacity-75 mt-4">¡Descuentos especiales disponibles para estudiantes universitarios!</p>
        </div>
      </div>
    </section>
  )
}
