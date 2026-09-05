import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, Mail, MapPin } from "lucide-react"
import { WhatsAppContact } from "@/components/whatsapp-contact"

export default function EcuadorFooter() {
  return (
    <footer data-navbar-theme="dark" className="relative overflow-hidden bg-[#10251f] font-[var(--font-poppins)] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e5bd45] to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.7fr_.8fr]">
          <div>
            <Link href="/ecuador" className="inline-flex h-12 w-[145px] items-center overflow-hidden rounded-xl bg-white px-3">
              <Image src="/images/new-logo.png" alt="AS Labs Ecuador" width={180} height={62} className="h-auto w-full" />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">Biología molecular y formulaciones bacterianas para empresas, productores, universidades y proyectos de investigación en Ecuador.</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e5bd45]/25 bg-[#e5bd45]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#f2d77e]">🇪🇨 Sede Quito, Ecuador</div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8bd8bd]">Servicios habilitados</p>
            <div className="mt-5 space-y-3 text-sm">
              <Link href="/ecuador/biologia-molecular" className="block text-white/70 transition hover:translate-x-1 hover:text-white">Biología molecular</Link>
              <Link href="/ecuador/formulaciones-bacterianas" className="block text-white/70 transition hover:translate-x-1 hover:text-white">Formulaciones bacterianas</Link>
              <Link href="/" className="block text-white/45 transition hover:text-white">Cambiar a Perú</Link>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8bd8bd]">Sede Ecuador</p>
            <div className="mt-5 space-y-4 text-sm text-white/65">
              <div className="flex gap-3"><Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#e5bd45]" /><span>Edificio <strong className="font-semibold text-white">Carolina Millenium</strong></span></div>
              <div className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e5bd45]" /><span>Andrade Marin 24<br />170518 Quito, Ecuador</span></div>
              <div className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#e5bd45]" /><a href="mailto:ventas@aslaboratorios.com" className="hover:text-white">ventas@aslaboratorios.com</a></div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} AS Laboratorios · Ecuador</p>
          <WhatsAppContact mode="modal" message="Hola, quisiera información sobre AS Labs Ecuador." className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#e5bd45] px-5 text-xs font-bold text-[#163328] transition hover:-translate-y-0.5 hover:bg-[#f2d77e]">Contactar sede Ecuador<ArrowRight className="h-4 w-4" /></WhatsAppContact>
        </div>
      </div>
    </footer>
  )
}
