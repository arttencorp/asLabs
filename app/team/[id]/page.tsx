import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Linkedin, ArrowLeft } from 'lucide-react'
import { getTeamMemberById, teamData } from '@/lib/team-data'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { notFound } from 'next/navigation'

interface TeamMemberPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const params = []
  for (const section of teamData) {
    for (const member of section.members) {
      params.push({ id: member.id })
    }
  }
  return params
}

export function generateMetadata({ params }: TeamMemberPageProps) {
  const member = getTeamMemberById(params.id)
  if (!member) return { title: 'Miembro no encontrado' }
  return {
    title: `${member.name} ${member.lastName} | AS Laboratorios`,
    description: `${member.role} en ${member.area}`,
  }
}

'use client'

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const member = getTeamMemberById(params.id)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.id])

  if (!member) {
    notFound()
  }

  const bioparagraphs = member.bio ? member.bio.split('\n\n') : []

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="sticky top-20 z-40 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-6xl mx-auto">
            <Link href="/sobre-nosotros" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm">Volver al equipo</span>
            </Link>
          </div>
        </div>

        {/* Profile Header */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-[#f8f6f1] to-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Photo */}
              <div className="lg:col-span-1 flex justify-center lg:justify-start">
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <Image
                    src={member.image}
                    alt={`${member.name} ${member.lastName}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Info */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <span className="inline-block text-xs font-semibold text-[#2e7d32] uppercase tracking-[0.15em] bg-[#e8f5e9] px-4 py-2 rounded-full border border-[#2e7d32]/20">
                    {member.area}
                  </span>
                  <div>
                    <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                      {member.name}
                    </h1>
                    <h2 className="text-5xl lg:text-6xl font-serif font-bold text-[#2e7d32] leading-tight">
                      {member.lastName}
                    </h2>
                  </div>
                  <p className="text-2xl font-semibold text-gray-700">{member.role}</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 pt-8 border-t-2 border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Mail className="text-[#2e7d32]" size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                      <a href={`mailto:${member.email}`} className="text-lg text-gray-900 hover:text-[#2e7d32] transition-colors font-medium">
                        {member.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Linkedin className="text-[#0A66C2]" size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">LinkedIn</p>
                      <a 
                        href={member.linkedIn} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg text-[#0A66C2] hover:text-[#084A94] transition-colors font-medium"
                      >
                        Ver perfil
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl space-y-8">
              {member.bio ? (
                <>
                  <div>
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8">Biografía</h2>
                    <div className="space-y-6">
                      {bioparagraphs.map((paragraph, index) => (
                        <p key={index} className="text-lg text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <p className="text-gray-500 italic">Biografía por completar</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Education Section */}
        {member.education && member.education.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#f8f6f1]">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-4xl">
                <h2 className="text-4xl font-serif font-bold text-gray-900 mb-12">Formación Académica</h2>
                <div className="grid gap-4">
                  {member.education.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-[#2e7d32] transition-colors shadow-sm hover:shadow-md">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e8f5e9] text-[#2e7d32] font-bold text-sm">
                          •
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 pt-0.5">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
