import { Phone, Mail, MapPin, Clock, MessageCircle, Users, Award, Truck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudentContact() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#2e7d32] to-[#4caf50] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¡Comienza tu Aventura Científica Hoy!</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Únete a miles de estudiantes que ya confían en AS Laboratorios para su formación académica. Contáctanos y
            descubre nuestros descuentos especiales.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-400 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Teléfono</h3>
                      <p className="opacity-90">+51 961 996 645</p>
                      <p className="text-sm opacity-75">Lun - Vie: 8:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-400 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="opacity-90">ventas@aslaboratorios.com</p>
                      <p className="text-sm opacity-75">Respuesta en 24 horas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-400 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Ubicación</h3>
                      <p className="opacity-90">Av. Juan Pablo II 306</p>
                      <p className="text-sm opacity-75">Trujillo, La Libertad, Perú</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-400 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Horarios</h3>
                      <p className="opacity-90">Lun - Vie: 8:00 AM - 6:00 PM</p>
                      <p className="text-sm opacity-75">Sáb: 8:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/51961996645?text=Hola%2C%20soy%20estudiante%20universitario%20y%20me%20interesa%20conocer%20sus%20productos%20y%20descuentos%20especiales%20para%20estudiantes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full transition-colors duration-300 font-semibold text-lg"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Contactar por WhatsApp
                </a>
                <a
                  href="mailto:ventas@aslaboratorios.com?subject=Consulta%20Estudiante%20-%20Descuentos%20Especiales&body=Hola%2C%0A%0ASoy%20estudiante%20universitario%20de%20la%20carrera%20de%20_______%20y%20me%20interesa%20conocer%20más%20sobre%3A%0A%0A-%20Productos%20disponibles%20para%20estudiantes%0A-%20Descuentos%20especiales%0A-%20Kits%20educativos%0A-%20Formas%20de%20pago%0A%0AMi%20universidad%3A%20________%0AMi%20ciclo%20académico%3A%20_______%0A%0AGracias%20por%20su%20atención."
                  className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full transition-colors duration-300 font-semibold text-lg border border-white/30"
                >
                  <Mail className="w-6 h-6 mr-3" />
                  Enviar Email
                </a>
              </div>
            </div>
          </div>

          {/* Benefits Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
              <CardHeader>
                <CardTitle className="text-xl text-center">¿Por qué Elegirnos?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">24 Años de Experiencia</h4>
                    <p className="text-sm opacity-90">Líderes en biotecnología vegetal desde el año 2000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Descuentos Especiales</h4>
                    <p className="text-sm opacity-90">Precios preferenciales para estudiantes universitarios</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Truck className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Envío a Todo el Perú</h4>
                    <p className="text-sm opacity-90">Entrega segura y rápida en todo el territorio nacional</p>
                  </div>
                </div>

                <div className="bg-yellow-400/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-300 mb-2">¡Oferta Especial!</h4>
                  <p className="text-sm">Descuento del 15% en tu primera compra presentando tu carnet universitario</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg opacity-90 mb-4">Más de 500 estudiantes ya confían en nosotros</p>
          <p className="text-sm opacity-75">
            Síguenos en nuestras redes sociales para estar al día con nuestras promociones y novedades
          </p>
        </div>
      </div>
    </section>
  )
}
