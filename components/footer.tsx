import Link from "next/link"
import Image from "next/image"
import { Microscope, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white font-serif">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/as-labs-logo.png"
              alt="AS Laboratorios"
              width={150}
              height={60}
              className="h-auto w-auto max-h-12 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm">
              Líder en biotecnología vegetal desde el año 2000. Especialistas en plantines in vitro, control biológico y
              materiales de laboratorio para agricultura sostenible.
            </p>{/* 
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>*/}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nosotros" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/biotecnologia-vegetal"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Biotecnología Vegetal
                </Link>
              </li>
              <li>
                <Link href="/plantines" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Nuestros Plantines
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Investigación
                </Link>
              </li>
              <li>
                <Link href="/solucion-estudiantes" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Para Estudiantes
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Tienda
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {/*<li>  
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Control Biológico
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Materiales de Laboratorio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Asesoría Técnica
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Capacitación
                </Link>
              </li>*/}
              <li>
                <Link href="/seguimiento" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Seguimiento de Pedidos
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Términos Legales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#4caf50] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Av. Juan Pablo II 306</p>
                  <p>Trujillo, La Libertad, Perú</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#4caf50] flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <a href="tel:+51961996645" className="hover:text-white transition-colors">
                    +51 961 996 645
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#4caf50] flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <a href="mailto:ventas@aslaboratorios.com" className="hover:text-white transition-colors">
                    ventas@aslaboratorios.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-[#4caf50] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Lun - Vie: 8:00 AM - 6:00 PM</p>
                  <p>Sáb: 8:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-4">
              <a
                href="https://wa.me/51961996645"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-full transition-colors duration-300 text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contactar por WhatsApp
              </a> 
            </div>
            <div className="mt-4"> 
              <a
                href="https://forms.cloud.microsoft/r/wQWhqq0wR6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#148b7d] hover:bg-[#62a9a0] text-white px-4 py-2 rounded-full transition-colors duration-300 font-serif"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Microscope className="h-4 w-4" />
                </svg>

                Investiga con nosotros
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 AS Laboratorios. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                Términos de Servicio
              </Link>
              <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
