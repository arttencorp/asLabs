import Image from "next/image"
import Link from "next/link"
import { Leaf, ArrowRight } from "lucide-react"

export default function BiotechHero() {
  return (
    <section className="relative min-h-[52vh] sm:min-h-[60vh] flex items-center overflow-hidden bg-[#01283c] clip-angle-bottom-sm">
      {/* Imagen a pantalla completa */}
      <div className="absolute inset-0">
        <Image
          src="/new/HEADER.webp"
          alt="Laboratorio de biotecnología vegetal"
          fill
          priority
          className="object-cover"
        />
      </div>
      {/* Difuminado verde de marca */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b2f18] via-[#1b5e20]/70 to-transparent"></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b2f18]/60 via-transparent to-transparent"></div>
      <div
        className="pointer-events-none absolute inset-0 backdrop-blur-[3px]"
        style={{ WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 55%)", maskImage: "linear-gradient(to right, black 0%, transparent 55%)" }}
      ></div>
      <div className="pointer-events-none absolute inset-0 bg-dot-grid-light opacity-15"></div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold uppercase tracking-wider px-4 py-1.5 mb-5">
            <Leaf className="h-3.5 w-3.5 text-[#8bd394]" />
            Ciencia aplicada al cultivo
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif leading-tight">Biotecnología Vegetal</h1>
          <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
            Descubre cómo la ciencia moderna permite multiplicar plantas idénticas, libres de enfermedades y con
            características mejoradas, revolucionando la agricultura y la conservación de especies.
          </p>
          <Link
            href="#proceso"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e65100] to-[#f57c00] text-white px-6 py-3 text-sm font-medium uppercase tracking-wide shadow-[0_8px_20px_-6px_rgba(230,81,0,0.5)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(230,81,0,0.6)] transition-all duration-300"
          >
            Explorar el proceso
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
