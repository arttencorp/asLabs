import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"

import BlackProfilePlaceholder from "@/components/about-us/black-profile-placeholder"
import { teamMembers } from "@/data/team-members"

export default function AboutOrganigram() {
  return (
    <section
      id="equipo"
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#f5f6f7] via-[#f5f5f4] to-[#bcd5bc] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-[-12%] w-[46%] bg-[radial-gradient(circle_at_center,rgba(76,145,93,0.4)_0%,rgba(76,145,93,0.18)_35%,rgba(76,145,93,0)_75%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <span className="inline-flex items-center rounded-full border border-[#bad4bd] bg-[#dfeadf]/95 px-8 py-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1e7b2f]">
          Nuestro Equipo
        </span>
        <h2 className="mt-8 text-[clamp(2.2rem,5.3vw,4.4rem)] font-sans font-extrabold leading-[0.95] tracking-tight text-[#071a40]">
          <span className="block">Equipo AS</span>
          <span className="block">Laboratorios</span>
        </h2>
        <p className="mt-7 max-w-3xl text-[clamp(1rem,1.4vw,1.32rem)] font-sans leading-relaxed text-[#1f3658]">
          Conoce a los profesionales que hacen posible nuestra misión de excelencia
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {teamMembers.map((member) => (
            <article
              key={member.slug}
              className="flex h-full flex-col overflow-hidden rounded-[1.05rem] border border-[#d8dde3] bg-[#f7f8fa] shadow-[0_6px_14px_-12px_rgba(24,39,59,0.35)] transition-[border-color,box-shadow] duration-200 hover:border-[#98aabd] hover:shadow-[0_10px_20px_-14px_rgba(24,39,59,0.45)]"
              style={{ borderTopColor: member.accent, borderTopWidth: "3px" }}
            >
              <Link href={`/sobre-nosotros/equipo/${member.slug}`} className="block flex-1">
                {member.imagePath ? (
                  <div className="relative h-[15rem] w-full overflow-hidden bg-white">
                    <Image
                      src={member.imagePath}
                      alt={member.name}
                      fill
                      sizes="(min-width: 768px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover object-center"
                    />
                  </div>
                ) : (
                  <BlackProfilePlaceholder className="h-[15rem] w-full" />
                )}

                <div className="space-y-0.5 border-t border-[#e4e8ed] px-3.5 pb-2 pt-2">
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#5c6e86]">{member.area}</p>
                  <h3 className="max-w-[11rem] break-words text-[0.95rem] font-sans font-bold leading-[1.15] text-[#071a40]">
                    {member.name}
                  </h3>
                  <p className="text-[0.86rem] font-sans leading-snug text-[#314c70]">{member.role}</p>
                  <p className="break-words text-[0.86rem] font-sans leading-snug text-[#1b7d2d]">{member.email}</p>
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-1.5 border-t border-[#e3e8ed] px-2.5 pb-2.5 pt-2">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center rounded-md bg-[#eceff3] py-0.5 text-[#66738b] transition-colors hover:bg-[#dfe5eb]"
                  aria-label={`Enviar correo a ${member.name}`}
                >
                  <Mail className="h-4 w-4" />
                </a>
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-[#eceff3] py-0.5 text-[#66738b] transition-colors hover:bg-[#dfe5eb]"
                    aria-label={`Ver LinkedIn de ${member.name}`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={`/sobre-nosotros/equipo/${member.slug}`}
                    className="inline-flex items-center justify-center rounded-md bg-[#eceff3] py-0.5 text-[#66738b] transition-colors hover:bg-[#dfe5eb]"
                    aria-label={`Ver biografía de ${member.name}`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
