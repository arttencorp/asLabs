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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="sticky top-20 z-40 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <Link href="/sobre-nosotros" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-medium">Volver al equipo</span>
            </Link>
          </div>
        </div>

        {/* Profile Header */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-80 h-80 rounded-xl overflow-hidden shadow-xl border border-gray-200">
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
            <div className="md:pl-8 space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-[0.15em]">{member.area}</p>
                <h1 className="text-5xl font-serif font-bold text-gray-900">
                  {member.name} <br /> {member.lastName}
                </h1>
                <p className="text-2xl font-semibold text-gray-700">{member.role}</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <Mail className="text-gray-400" size={24} />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
                    <a href={`mailto:${member.email}`} className="text-lg text-gray-900 hover:text-green-600 transition-colors">
                      {member.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Linkedin className="text-gray-400" size={24} />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">LinkedIn</p>
                    <a 
                      href={member.linkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg text-[#0A66C2] hover:text-[#084A94] transition-colors"
                    >
                      Ver perfil
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Biografía</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                {member.bio ? (
                  <p>{member.bio}</p>
                ) : (
                  <p className="text-gray-500 italic">Biografía por completar</p>
                )}
              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  )
}
