import { Phone, Mail, MapPin, Calendar, Users, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PitchContact() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Únete a Nuestra Revolución Biotecnológica</h2>
          <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            Estamos buscando inversores visionarios que compartan nuestra pasión por transformar la agricultura peruana
            a través de la biotecnología vegetal. Juntos podemos crear un futuro más sostenible y próspero.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#4caf50]">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#4caf50] p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Teléfono Directo</p>
                    <p className="text-gray-300">+51 961 996 645</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-[#4caf50] p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Email Corporativo</p>
                    <p className="text-gray-300">ventas@aslaboratorios.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-[#4caf50] p-3 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Oficinas Principales</p>
                    <p className="text-gray-300">Av. Juan Pablo II 306, Trujillo, La Libertad, Perú</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h4 className="text-lg font-semibold mb-3 text-[#4caf50]">Próximos Pasos</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-[#4caf50]" />
                  <span>Reunión inicial de presentación</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-[#4caf50]" />
                  <span>Due diligence y evaluación técnica</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-[#4caf50]" />
                  <span>Estructuración de la inversión</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center lg:text-left">
            <Card className="bg-gradient-to-br from-[#2e7d32] to-[#4caf50] border-none text-white">
              <CardHeader>
                <CardTitle className="text-2xl">¿Listo para Invertir en el Futuro?</CardTitle>
                <CardDescription className="text-white/90">
                  Solicita una reunión personalizada para conocer más detalles sobre nuestra oportunidad de inversión y
                  el potencial de crecimiento en biotecnología vegetal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold">24 años</div>
                    <div className="text-sm opacity-90">de experiencia</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm opacity-90">clientes satisfechos</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href="https://wa.me/51961996645?text=Hola%2C%20soy%20un%20potencial%20inversor%20interesado%20en%20conocer%20más%20sobre%20AS%20Laboratorios%20y%20las%20oportunidades%20de%20inversión."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center bg-white text-[#2e7d32] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Solicitar Reunión
                  </a>

                  <a
                    href="mailto:ventas@aslaboratorios.com?subject=Oportunidad%20de%20Inversión%20-%20AS%20Laboratorios&body=Estimado%20equipo%20de%20AS%20Laboratorios%2C%0A%0ASoy%20un%20potencial%20inversor%20interesado%20en%20conocer%20más%20detalles%20sobre%20las%20oportunidades%20de%20inversión%20en%20su%20empresa.%0A%0APor%20favor%2C%20me%20gustaría%20programar%20una%20reunión%20para%20discutir%3A%0A-%20Modelo%20de%20negocio%20y%20proyecciones%20financieras%0A-%20Oportunidades%20de%20crecimiento%0A-%20Estructura%20de%20inversión%0A%0AQuedo%20atento%20a%20su%20respuesta.%0A%0ASaludos%20cordiales."
                    className="w-full inline-flex items-center justify-center bg-white/10 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Enviar Propuesta
                  </a>
                </div>

                <p className="text-sm text-white/80 text-center">Respuesta garantizada en menos de 24 horas</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-[#4caf50]">Información Confidencial</h3>
            <p className="text-gray-300 leading-relaxed">
              Toda la información compartida durante el proceso de evaluación será tratada con estricta
              confidencialidad. Contamos con acuerdos de no divulgación (NDA) para proteger los intereses de todas las
              partes involucradas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
