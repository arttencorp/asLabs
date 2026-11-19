import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Building2, MapPin } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const sites = [
  {
    country: "Perú",
    city: "Trujillo",
    title: "Laboratorios centrales",
    description: "Procesamiento especializado, biotecnología vegetal, microbiología y soporte científico.",
    address: "Ca. 30, Urb. San Isidro II, 13001 Trujillo",
    image: "/new/SobreASLaboratorios.webp",
    imageAlt: "Laboratorios centrales de AS Laboratorios en Trujillo",
    href: "/contacto",
  },
  {
    country: "Ecuador",
    city: "Quito",
    title: "Sede Ecuador",
    description: "Coordinación local para biología molecular, formulaciones bacterianas, cepas y proyectos especializados.",
    address: "Andrade Marín 24, Edificio Carolina Millenium, 170518 Quito",
    image: "/ecuador/carolina-millenium.jpg",
    imageAlt: "Sede Ecuador de AS Laboratorios en Quito",
    href: "/ecuador/sobre-nosotros",
  },
]

export default function AboutSites() {
  return (
    <section id="sedes" data-navbar-theme="light" className="scroll-mt-28 border-y border-[#d6ddd8] bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <ScrollReveal className="grid gap-6 border-b border-[#cfd8d2] pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold text-[#0b7a55]">Sedes y capacidad técnica</p>
            <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.7rem)] font-medium leading-[1.03] tracking-[-.045em] text-[#17211d]">Dos sedes conectadas por una misma operación.</h2>
          </div>
          <p className="max-w-[620px] text-sm leading-7 text-[#5d6c64] lg:justify-self-end">La atención comercial y técnica se coordina localmente; los procesos se asignan a la capacidad adecuada y conservan una trazabilidad común.</p>
        </ScrollReveal>

        <div className="mt-8 grid border-l border-t border-[#cfd8d2] lg:grid-cols-2">
          {sites.map((site) => (
            <Link key={site.country} href={site.href} className="group grid border-b border-r border-[#cfd8d2] bg-[#f7f9f7] sm:grid-cols-[.9fr_1.1fr]">
              <div className="relative min-h-[250px] overflow-hidden sm:min-h-[330px]">
                <Image src={site.image} alt={site.imageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes="(min-width:1024px) 24vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062b22]/55 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-[#062b22]/88 px-3 py-2 text-[10px] font-semibold text-white backdrop-blur"><MapPin className="h-3.5 w-3.5 text-[#d5a34f]" />{site.city}</span>
              </div>
              <div className="flex flex-col p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center border border-[#c8d4cc] text-[#0b7a55]"><Building2 className="h-4 w-4" /></span>
                  <span className="text-[10px] font-semibold text-[#9a6b2f]">{site.country}</span>
                </div>
                <h3 className="mt-8 text-2xl font-medium tracking-[-.03em] text-[#17251e]">{site.title}</h3>
                <p className="mt-3 text-xs leading-6 text-[#5d6c64]">{site.description}</p>
                <p className="mt-5 border-t border-[#d8e0da] pt-4 text-[11px] leading-5 text-[#334b3f]">{site.address}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[11px] font-semibold text-[#0b7a55]">Ver información de la sede <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
