import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"
import { btnAccent } from "@/components/ui/button-styles"

export { Footer }

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#30241b] via-[#211811] to-[#120d09] font-serif text-white">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d99b4e] to-transparent"></div>

      {/* CTA Banner */}
      <ScrollReveal>
        <div className="container mx-auto px-4 pt-12 sm:pt-16">
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1b5e20] to-[#2e7d32] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-bold font-serif mb-1">¿Listo para transformar tu producción agrícola?</h3>
              <p className="text-white/80 text-sm">Conversemos sobre tu proyecto y encontremos la mejor solución biotecnológica.</p>
            </div>
            <a
              href="https://wa.me/51961996645"
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnAccent} relative shrink-0`}
            >
              Contáctanos
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </ScrollReveal>

      <div className="container mx-auto px-4 py-12">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
          {/* Company Info */}
          <StaggerItem className="space-y-4">
            <div className="inline-flex rounded-xl border border-white/15 bg-white px-3 py-2 shadow-lg">
              <Image
                src="/Frame23.png"
                alt="AS Laboratorios"
                width={220}
                height={69}
                className="h-auto w-[190px] object-contain sm:w-[220px]"
              />
            </div>
            <p className="text-gray-300 text-sm">
              Biotecnología agrícola desde 1997. Especialistas en plantines in vitro, análisis de laboratorio, control
              biológico e investigación aplicada.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 pl-1 pr-3 py-1">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white overflow-hidden shrink-0">
                <Image src="/senasaLogo.png" alt="SENASA" width={20} height={20} className="object-contain" />
              </span>
              <span className="text-xs text-gray-300">Vivero con registro SENASA</span>
            </div>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/90">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nosotros" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/biotecnologia-vegetal"
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block"
                >
                  Biotecnología Vegetal
                </Link>
              </li>
              <li>
                <Link href="/plantines" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Nuestros Plantines
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Investigación
                </Link>
              </li>
              <li>
                <Link href="/solucion-estudiantes" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Para Estudiantes
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Tienda
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Services */}
          <StaggerItem>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/90">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/control-biologico" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Control Biológico
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Materiales de Laboratorio
                </Link>
              </li>
              <li>
                <Link href="/servicios/apoyo-investigacion" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Asesoría Técnica
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Capacitación
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Seguimiento de Pedidos
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block">
                  Términos Legales
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/libro-de-reclamaciones"
                  className="inline-block hover:scale-105 transition-transform duration-200"
                >
                  <img src="/libro-de-reclamaciones.png" alt="Libro de Reclamaciones" className="w-32 h-auto object-contain" />
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Contact Info */}
          <StaggerItem>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/90">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-[#4caf50] shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="text-sm text-gray-300 pt-1">
                  <p>Calle 30, Urb, San Isidro II</p>
                  <p>Trujillo, La Libertad, Perú</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-[#4caf50] shrink-0">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="text-sm text-gray-300">
                  <a href="tel:+51961996645" className="hover:text-white transition-colors">
                    +51 961 996 645
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-[#4caf50] shrink-0">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="text-sm text-gray-300">
                  <a href="mailto:ventas@aslaboratorios.com" className="hover:text-white transition-colors">
                    ventas@aslaboratorios.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-[#4caf50] shrink-0">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="text-sm text-gray-300 pt-1">
                  <p>Lun - Vie: 8:00 AM - 6:00 PM</p>
                  <p>Sáb: 8:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-5">
              <a
                href="https://wa.me/51961996645"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-[0_6px_16px_-4px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_24px_-4px_rgba(37,211,102,0.5)] text-sm"
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
          </StaggerItem>
        </StaggerGroup>

        {/* Bottom Bar */}
        <ScrollReveal className="border-t border-gray-800 mt-8 pt-8" delay={0.1}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="w-full md:w-auto">
              <div className="text-sm text-gray-400 mb-4">
                © {new Date().getFullYear()} AS Laboratorios. Todos los derechos reservados.
              </div>
              <div className="flex flex-wrap items-center gap-6 bg-white/5 border border-white/10 rounded-xl p-4 w-full md:w-auto">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Afiliado a</p>
                  <Image
                    src="/trustUs/camaracomercio.png"
                    alt="Cámara de Comercio de La Libertad"
                    width={180}
                    height={60}
                    className="h-auto w-auto max-h-12"
                  />
                </div>
                <div className="hidden sm:block h-10 w-px bg-white/10"></div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Inscrito en</p>
                  <a href="https://ntuvrqipgvhnuynjfzbx.supabase.co/storage/v1/object/public/general-web/landing/CONSTANCIA%20DEL%20RNP%20-%20ASLABS.pdf" target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-80">
                    <Image
                      src="/RNPv2.png"
                      alt="Constancia del RNP"
                      width={180}
                      height={60}
                      className="h-auto w-auto max-h-12"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm w-full md:w-auto justify-end">
              <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                Términos de Servicio
              </Link>
              <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
              <Link
                href="/libro-de-reclamaciones"
                className="inline-flex items-center gap-1.5 font-semibold text-red-400 hover:text-red-300 transition-colors"
              >
                <span aria-hidden="true">📕</span>
                Libro de Reclamaciones
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
