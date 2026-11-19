'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Linkedin,
  Mail,
  Microscope,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { teamData, type TeamMember } from '@/lib/team-data'
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

const directorio = teamData
  .flatMap((section) => section.members)
  .filter((member) => member.id === 'natasha-escobar' || member.id === 'antonio-guevara')
  .map((member) => member.id === 'antonio-guevara'
    ? {
        ...member,
        lastName: 'Guevara Escobar',
        role: 'Administrador',
        bio: 'Antonio Víctor Gabriel Guevara Escobar es Administrador de AS Laboratorios. Su trabajo se concentra en la planificación administrativa, el control presupuestal, la organización financiera, las compras, la cadena de suministro, la gestión del personal y el seguimiento de la operación. Coordina recursos y procesos para que las áreas de la empresa cuenten con insumos, información y capacidad de ejecución en los plazos previstos.',
        specialties: ['Administración y presupuestos', 'Compras y cadena de suministro', 'Planificación financiera'],
      }
    : { ...member, role: 'Bióloga · Gerente General · CBP 3102' })

const supportTeam = [
  { area: 'Gestión de sede', name: 'Ing. Luis Enrrique Cabrera', role: 'Gerente de Sucursal · Sede San Isidro', email: 'luisg@aslaboratorios.com' },
  { area: 'Soporte administrativo', name: 'Ing. Ana Sofia Jimenez', role: 'Asistente de Sucursal', email: 'ajimenez@aslaboratorios.com' },
  { area: 'Infraestructura digital', name: 'Ing. Gino Guevara Villalobos', role: 'Sistemas y Tecnologías', email: 'ginov@aslaboratorios.com' },
]

function getAreaColor(area: string): string {
  return area === 'Gerencia' ? '#2e7048' : '#315f80'
}

export default function AboutOrganigram() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    const openFromUrl = () => {
      const memberId = new URL(window.location.href).searchParams.get('perfil')
      setSelectedMember(directorio.find((member) => member.id === memberId) || null)
    }
    openFromUrl()
    window.addEventListener('popstate', openFromUrl)
    return () => window.removeEventListener('popstate', openFromUrl)
  }, [])

  useEffect(() => {
    if (!selectedMember) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeProfile()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedMember])

  function openProfile(member: TeamMember) {
    const url = new URL(window.location.href)
    url.searchParams.set('perfil', member.id)
    window.history.pushState({}, '', url)
    setSelectedMember(member)
  }

  function closeProfile() {
    const url = new URL(window.location.href)
    url.searchParams.delete('perfil')
    window.history.replaceState({}, '', url)
    setSelectedMember(null)
  }

  return (
    <section id="organigrama" data-navbar-theme="light" className="relative w-full scroll-mt-32 overflow-hidden bg-[#eef2ee] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="grid gap-7 lg:grid-cols-[1fr_.78fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#2e7048]">
              <ShieldCheck className="h-4 w-4" />
              Liderazgo y dirección
            </span>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.1rem,4vw,4rem)] font-medium leading-[1.02] tracking-[-.045em] text-[#203d30]">Liderazgo con responsabilidades definidas.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#68786f] sm:text-lg">
              La Gerencia General conduce la visión institucional y técnica; la Administración organiza recursos, presupuestos, abastecimiento y continuidad operativa.
            </p>
          </div>

          <div className="border-l-2 border-[#d5a34f] bg-white/65 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#cbd7cf] text-[#2e7048]"><Sparkles className="h-4 w-4" /></span>
              <div><p className="text-[11px] font-semibold text-[#8d6d3e]">Perfiles de dirección</p><p className="mt-2 text-sm leading-6 text-[#4f6258]">Cada ficha distingue trayectoria, formación, responsabilidades actuales y ámbito de decisión.</p></div>
            </div>
          </div>
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-2" staggerDelay={0.12}>
          {directorio.map((member) => (
            <StaggerItem key={member.id} className="h-full">
              <DirectorioCard member={member} onOpen={() => openProfile(member)} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollReveal className="mt-12 border-t border-[#cbd5ce] pt-7">
          <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-[11px] font-semibold text-[#2e7048]">Administración y soporte operativo</p><h3 className="mt-2 text-2xl font-medium tracking-[-.03em] text-[#203d30] sm:text-3xl">Responsables de sede y sistemas.</h3></div><p className="max-w-2xl text-sm leading-6 text-[#68786f] lg:justify-self-end">El equipo administrativo coordina la operación de sede, la atención interna y la continuidad de la infraestructura tecnológica.</p></div>
          <div className="mt-6 grid border-l border-t border-[#cbd5ce] md:grid-cols-3">{supportTeam.map((member) => <article key={member.email} className="flex min-h-[190px] flex-col border-b border-r border-[#cbd5ce] bg-white p-5 sm:p-6"><span className="text-[9px] font-semibold text-[#8d6d3e]">{member.area}</span><h4 className="mt-5 text-lg font-medium leading-tight tracking-[-.02em] text-[#203d30]">{member.name}</h4><p className="mt-2 text-xs font-semibold leading-5 text-[#557064]">{member.role}</p><a href={`mailto:${member.email}`} className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-semibold text-[#2e7048] transition-colors hover:text-[#173f2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7048] focus-visible:ring-offset-2"><Mail className="h-3.5 w-3.5" />{member.email}</a></article>)}</div>
        </ScrollReveal>

        <ScrollReveal className="mt-7" delay={0.08}>
          <div className="flex flex-col gap-3 border-y border-[#cbd5ce] px-1 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-[#68786f]">La dirección conecta estrategia, conocimiento técnico, personas y recursos con una operación documentada.</p>
            <span className="shrink-0 text-[10px] font-semibold text-[#2e7048]">Dirección AS Laboratorios</span>
          </div>
        </ScrollReveal>
      </div>

      {selectedMember && <ProfileModal member={selectedMember} onClose={closeProfile} />}
    </section>
  )
}

function DirectorioCard({ member, onOpen }: { member: TeamMember; onOpen: () => void }) {
  const accent = getAreaColor(member.area)
  const summary = member.bio?.split('\n\n')[0]

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[#cbd5ce] bg-white sm:grid sm:grid-cols-[.76fr_1.24fr]">
      <div className="relative min-h-[330px] overflow-hidden bg-[#e8ece8] sm:min-h-[430px]">
        {member.image ? (
          <Image src={member.image} alt={`${member.name} ${member.lastName}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, 40vw" />
        ) : (
          <div className="grid h-full place-items-center text-5xl font-black text-[#9dad9f]">{member.name[0]}{member.lastName[0]}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d21]/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/20 bg-[#103627]/90 px-4 py-3 text-white backdrop-blur-xl">
          <div><p className="text-[9px] text-white/55">Área de responsabilidad</p><p className="mt-1 text-xs font-semibold">{member.area}</p></div>
          <span className="grid h-8 w-8 place-items-center border border-white/15"><BriefcaseBusiness className="h-4 w-4" /></span>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-7">
        <span className="w-fit border-b border-[#d6ddd8] pb-2 text-[10px] font-semibold" style={{ color: accent }}>Dirección</span>
        <h3 className="mt-5 text-2xl font-medium leading-[1.08] tracking-[-.03em] text-[#203d30] sm:text-3xl">{member.name}<br />{member.lastName}</h3>
        <p className="mt-3 text-sm font-semibold" style={{ color: accent }}>{member.role}</p>
        {summary && <p className="mt-5 line-clamp-4 text-sm leading-6 text-[#697970]">{summary}</p>}

        <div className="mt-6 flex flex-wrap gap-2">
          {(member.specialties || []).slice(0, 3).map((specialty) => (
            <span key={specialty} className="border border-[#dce5de] bg-[#f7f9f7] px-3 py-1.5 text-[10px] font-semibold text-[#5a6d62]">{specialty}</span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#e6ebe7] pt-6">
          <a href={`mailto:${member.email}`} className="grid h-10 w-10 place-items-center border border-[#dce5de] text-[#607269] transition hover:border-[#9ebbA4] hover:bg-[#edf4ee] hover:text-[#2e7048]" aria-label={`Enviar correo a ${member.name}`}><Mail className="h-4 w-4" /></a>
          <button type="button" onClick={onOpen} className="flex h-11 flex-1 items-center justify-center gap-2 bg-[#173f2e] px-4 text-xs font-semibold text-white transition hover:bg-[#245c40]">
            Ver perfil completo
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}

function ProfileModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const accent = getAreaColor(member.area)
  const paragraphs = member.bio?.split('\n\n').filter(Boolean) || []

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#0b241a]/70 backdrop-blur-md">
      <div className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
        <div role="dialog" aria-modal="true" aria-labelledby={`profile-${member.id}`} className="relative max-h-[94dvh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-t-[30px] bg-white shadow-2xl sm:my-4 sm:rounded-[30px]">
          <header className="relative overflow-hidden bg-[#123b2a] px-5 pb-7 pt-16 text-white sm:px-8 sm:pb-8 sm:pt-10 lg:px-10">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute right-12 top-10 h-28 w-28 rounded-full bg-[#6ca87a]/20 blur-3xl" />
            <button type="button" onClick={onClose} className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:rotate-90 hover:bg-white/20" aria-label="Cerrar perfil"><X className="h-4 w-4" /></button>

            <div className="relative max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-white/55">Directorio AS Laboratorios</p>
                <span className="h-1 w-1 rounded-full bg-white/35" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#b9d5c0]">{member.area}</span>
              </div>
              <h2 id={`profile-${member.id}`} className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{member.name} {member.lastName}</h2>
              <p className="mt-3 text-sm font-semibold text-[#b9d5c0]">{member.role}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href={`mailto:${member.email}`} className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[#173f2e] transition hover:-translate-y-0.5"><Mail className="h-4 w-4" />Contactar</a>
                {member.linkedIn && member.linkedIn !== '#' && <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/25 bg-white/10 text-white transition hover:bg-white/20" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>}
              </div>
            </div>
          </header>

          <div className="px-5 pb-8 pt-6 sm:px-8 sm:pb-10 lg:px-10">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em]" style={{ color: accent, backgroundColor: `${accent}12` }}>{member.area}</span>
            {(member.specialties || []).map((specialty) => <span key={specialty} className="rounded-full border border-[#dfe7e1] bg-[#f7f9f7] px-3 py-1.5 text-[10px] font-bold text-[#5b6e63]">{specialty}</span>)}
          </div>

          <ProfileSection icon={Award} title="Perfil profesional">
            <div className="space-y-4">{paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)} className="text-sm leading-7 text-[#62746a]">{paragraph}</p>)}</div>
          </ProfileSection>

          <div className="grid gap-7 xl:grid-cols-2">
            <ProfileSection icon={BriefcaseBusiness} title="Experiencia">
              <ProfileList items={member.experience || []} accent={accent} />
            </ProfileSection>
            <ProfileSection icon={ShieldCheck} title="Responsabilidades actuales">
              <ProfileList items={member.responsibilities || []} accent={accent} />
            </ProfileSection>
          </div>

          {!!member.highlights?.length && (
            <div className="mt-8 rounded-[24px] border border-[#d8e5da] bg-[#edf4ee] p-5 sm:p-6">
              <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#2e7048]" /><h3 className="text-sm font-black uppercase tracking-[0.1em] text-[#244534]">Experiencia destacada</h3></div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">{member.highlights.map((highlight) => <div key={highlight} className="flex items-start gap-2 rounded-2xl bg-white/75 p-4 text-xs font-semibold leading-5 text-[#596d61]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2e7048]" />{highlight}</div>)}</div>
            </div>
          )}

          {!!member.education?.length && (
            <ProfileSection icon={GraduationCap} title="Formación y actualización">
              <div className="grid gap-2 sm:grid-cols-2">{member.education.map((item) => <div key={item} className="flex items-start gap-2.5 rounded-2xl border border-[#e1e8e3] bg-[#fafbfa] p-3.5 text-xs font-semibold leading-5 text-[#5e7066]"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />{item}</div>)}</div>
            </ProfileSection>
          )}

          <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-[#123b2a] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">Contacto profesional</p><p className="mt-2 text-sm font-semibold">{member.email}</p></div>
            <a href={`mailto:${member.email}`} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[#173f2e]"><Mail className="h-4 w-4" />Enviar correo</a>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileSection({ icon: Icon, title, children }: { icon: typeof Microscope; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e6f0e8] text-[#2e7048]"><Icon className="h-4 w-4" /></span><h3 className="text-sm font-black uppercase tracking-[0.1em] text-[#294b3a]">{title}</h3></div>
      {children}
    </section>
  )
}

function ProfileList({ items, accent }: { items: string[]; accent: string }) {
  return <div className="space-y-3">{items.map((item) => <div key={item} className="flex items-start gap-3 text-xs font-semibold leading-5 text-[#5f7167]"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: accent }} />{item}</div>)}</div>
}
