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
    <section id="organigrama" data-navbar-theme="light" className="relative w-full scroll-mt-32 overflow-hidden bg-[#f8f6f1] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-[#9fc8a5]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[430px] w-[430px] rounded-full bg-[#e2b67d]/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="grid gap-7 lg:grid-cols-[1fr_.78fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cadbce] bg-white/75 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#2e7048] shadow-sm backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" />
              Liderazgo y dirección
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-[#203d30] sm:text-5xl">Directorio</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#68786f] sm:text-lg">
              Dos perfiles que articulan la experiencia científica, la gestión empresarial y la visión de largo plazo de AS Laboratorios.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/90 bg-white/75 p-5 shadow-[0_22px_60px_-42px_rgba(55,57,42,.44)] backdrop-blur-lg sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e6f0e8] text-[#2e7048]"><Sparkles className="h-5 w-5" /></span>
              <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8d7f6e]">Conoce sus perfiles</p><p className="mt-2 text-sm font-semibold leading-6 text-[#4f6258]">Abre cada ficha para revisar trayectoria, responsabilidades, especialidades y formación.</p></div>
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

        <ScrollReveal className="mt-7" delay={0.08}>
          <div className="flex flex-col gap-3 rounded-2xl border border-[#ded5c8] bg-white/45 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs font-semibold leading-5 text-[#68786f]">El Directorio conecta la experiencia acumulada de la empresa con nuevas capacidades científicas, digitales y de gestión.</p>
            <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.16em] text-[#2e7048]">Dirección AS Laboratorios</span>
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
    <article className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/90 bg-white shadow-[0_24px_65px_-42px_rgba(57,51,38,.45)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_32px_75px_-42px_rgba(57,51,38,.54)] sm:grid sm:grid-cols-[.82fr_1.18fr]">
      <div className="relative min-h-[360px] overflow-hidden bg-[#e8ece8] sm:min-h-[470px]">
        {member.image ? (
          <Image src={member.image} alt={`${member.name} ${member.lastName}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, 40vw" />
        ) : (
          <div className="grid h-full place-items-center text-5xl font-black text-[#9dad9f]">{member.name[0]}{member.lastName[0]}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d21]/70 via-transparent to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/20 bg-[#103627]/85 px-4 py-3 text-white shadow-xl backdrop-blur-xl">
          <div><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/55">Área</p><p className="mt-1 text-xs font-bold">{member.area}</p></div>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"><BriefcaseBusiness className="h-4 w-4" /></span>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-7">
        <span className="w-fit rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em]" style={{ color: accent, backgroundColor: `${accent}12` }}>Directorio</span>
        <h3 className="mt-5 text-2xl font-black leading-[1.08] tracking-[-0.025em] text-[#203d30] sm:text-3xl">{member.name}<br />{member.lastName}</h3>
        <p className="mt-3 text-sm font-bold" style={{ color: accent }}>{member.role}</p>
        {summary && <p className="mt-5 line-clamp-4 text-sm leading-6 text-[#697970]">{summary}</p>}

        <div className="mt-6 flex flex-wrap gap-2">
          {(member.specialties || []).slice(0, 3).map((specialty) => (
            <span key={specialty} className="rounded-full border border-[#dce5de] bg-[#f7f9f7] px-3 py-1.5 text-[10px] font-bold text-[#5a6d62]">{specialty}</span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#e6ebe7] pt-6">
          <a href={`mailto:${member.email}`} className="grid h-10 w-10 place-items-center rounded-xl border border-[#dce5de] text-[#607269] transition hover:border-[#9ebbA4] hover:bg-[#edf4ee] hover:text-[#2e7048]" aria-label={`Enviar correo a ${member.name}`}><Mail className="h-4 w-4" /></a>
          <button type="button" onClick={onOpen} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#173f2e] px-4 text-xs font-bold text-white transition hover:bg-[#245c40]">
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
