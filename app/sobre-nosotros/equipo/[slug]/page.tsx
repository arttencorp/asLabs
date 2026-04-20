import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Linkedin, Mail } from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlackProfilePlaceholder from "@/components/about-us/black-profile-placeholder"
import { getTeamMemberBySlug, teamMembers } from "@/data/team-members"

type TeamMemberPageProps = {
  params: {
    slug: string
  }
}

function splitName(name: string) {
  const parts = name.trim().split(" ")
  if (parts.length <= 1) {
    return { primary: name, secondary: "" }
  }

  return {
    primary: parts[0],
    secondary: parts.slice(1).join(" "),
  }
}

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }))
}

export function generateMetadata({ params }: TeamMemberPageProps): Metadata {
  const member = getTeamMemberBySlug(params.slug)

  if (!member) {
    return {
      title: "Miembro del Equipo",
    }
  }

  return {
    title: `${member.name} | Equipo AS Laboratorios`,
    description: `${member.role} en AS Laboratorios.`,
  }
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const member = getTeamMemberBySlug(params.slug)

  if (!member) {
    notFound()
  }

  const { primary, secondary } = splitName(member.name)
  const biographyParagraphs = member.biography
    .replace(/\\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-r from-[#f6f7f7] via-[#f5f5f5] to-[#b7d1b6] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div
          className="pointer-events-none absolute inset-y-0 right-[-10%] w-[44%] bg-[radial-gradient(circle_at_center,rgba(76,145,93,0.42)_0%,rgba(76,145,93,0.18)_35%,rgba(76,145,93,0)_74%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[320px_1fr] md:items-start">
          <div className="md:col-span-2">
            <Link
              href="/sobre-nosotros#equipo"
              aria-label="Volver al equipo"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#cfd8dd] bg-white/80 text-[#4f6179] transition-colors hover:bg-white hover:text-[#0f2749]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div
            className="overflow-hidden rounded-2xl border border-[#d9dde2] bg-[#f7f8fa] shadow-[0_22px_38px_-32px_rgba(16,29,49,0.95)]"
            style={{ borderTopColor: member.accent, borderTopWidth: "3px" }}
          >
            {member.imagePath ? (
              <div className="relative h-[21.5rem] w-full overflow-hidden bg-white">
                <Image
                  src={member.imagePath}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <BlackProfilePlaceholder className="h-[21.5rem] w-full" />
            )}
          </div>

          <div>
            <span className="inline-flex items-center rounded-full border border-[#bad4bd] bg-[#dfeadf]/95 px-6 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#247f37]">
              {member.area}
            </span>

            <h1 className="mt-4 text-[clamp(1.6rem,3.2vw,2.9rem)] font-sans font-extrabold leading-[0.98] tracking-tight text-[#071a40]">
              {primary}
              {secondary && (
                <span className="block text-[#2f8a3f]">{secondary}</span>
              )}
            </h1>

            <p className="mt-3 text-[clamp(1rem,1.4vw,1.35rem)] font-semibold text-[#1d3659]">{member.role}</p>

            <div className="mt-6 border-t border-[#d5d9dd] pt-6">
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-5 w-5 text-[#2f8a3f]" />
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#6b7a8e]">Email</p>
                    <a href={`mailto:${member.email}`} className="text-[clamp(0.95rem,1.2vw,1.15rem)] text-[#1e3150] hover:text-[#2f8a3f]">
                      {member.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Linkedin className="mt-0.5 h-5 w-5 text-[#2f66e9]" />
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#6b7a8e]">LinkedIn</p>
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[clamp(0.72rem,1.2vw,1.15rem)] font-semibold text-[#2f66e9] hover:text-[#1f4fb9]"
                      >
                        Ver perfil
                      </a>
                    ) : (
                      <span className="text-[clamp(0.72rem,1.2vw,1.15rem)] text-[#2f66e9]">Ver perfil</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(1.45rem,2.4vw,2.15rem)] font-sans font-extrabold text-[#071a40]">Biografía</h2>
          <div className="mt-5 max-w-4xl text-[clamp(0.95rem,1.08vw,1.05rem)] leading-relaxed text-[#344e70]">
            {biographyParagraphs.length > 0 ? (
              biographyParagraphs.map((paragraph, index) => (
                <p key={index} className={`${index > 0 ? "mt-4" : ""} whitespace-pre-line`}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="whitespace-pre-line">{member.biography}</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}