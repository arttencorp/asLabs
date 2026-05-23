'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, Linkedin } from 'lucide-react'
import { teamData } from '@/lib/team-data'

export default function AboutOrganigram() {
  const allMembers = teamData.flatMap(section => section.members)
  
  // Directorio: Natasha and Antonio only
  const directorio = allMembers.filter(m => 
    m.id === 'natasha-escobar' || m.id === 'antonio-guevara'
  )
  
  // Rest of the team
  const restOfTeam = allMembers.filter(m => 
    m.id !== 'natasha-escobar' && m.id !== 'antonio-guevara'
  )

  return (
    <section id="organigrama" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#f8f6f1] relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#2e7d32] opacity-4 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-left mb-16 max-w-2xl">
          <div className="inline-block mb-6">
            <span className="text-xs font-semibold text-[#2e7d32] uppercase tracking-[0.2em] bg-[#e8f5e9] px-5 py-3 rounded-full border border-[#2e7d32]/20">
              Nuestro Equipo
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-8">Equipo AS Laboratorios</h2>
          <p className="text-xl text-gray-700 font-medium">
            Conoce a los profesionales que hacen posible nuestra mision de excelencia
          </p>
        </div>

        {/* ===== DIRECTORIO ===== */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-2xl font-serif font-bold text-gray-900">Directorio</h3>
            <div className="w-16 h-1 bg-[#2e7d32] rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {directorio.map((member) => (
              <DirectorioCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* ===== RESTO DEL EQUIPO ===== */}
        <div>
          <div className="mb-8">
            <h3 className="text-lg font-serif font-bold text-gray-900">Equipo Profesional</h3>
            <div className="w-12 h-0.5 bg-gray-400 rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {restOfTeam.map((member) => (
              <SmallTeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========== DIRECTORIO CARD (grande, destacado) ========== */
interface CardProps {
  member: (typeof teamData)[0]['members'][0]
}

function getAreaColor(area: string): string {
  const colors: Record<string, string> = {
    'Gerencia': '#01283c',
    'Contabilidad': '#f9a825',
    'Recursos Humanos': '#d32f2f',
    'Control Biológico': '#1976d2',
    'Microbiología': '#388e3c',
    'Técnica': '#7b1fa2',
    'Laboratorio': '#00897b',
    'Prácticas': '#5e35b1',
    'Innovación': '#f57c00',
    'Marketing': '#c2185b',
  }
  return colors[area] || '#666666'
}

function DirectorioCard({ member }: CardProps) {
  return (
    <Link href={`/team/${member.id}`}>
      <div className="group cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-row h-full">
        {/* Image */}
        <div className="relative w-2/5 min-h-[280px] bg-gray-100 overflow-hidden flex-shrink-0">
          {member.image ? (
            <Image
              src={member.image}
              alt={`${member.name} ${member.lastName}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-4xl font-serif font-bold text-gray-400">
                {member.name[0]}{member.lastName[0]}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: getAreaColor(member.area) }}>
              {member.area}
            </p>
            <h4 className="text-xl font-bold text-gray-900 leading-tight mb-1">{member.name}</h4>
            <h4 className="text-xl font-bold text-gray-900 leading-tight mb-3">{member.lastName}</h4>
            <p className="text-sm text-gray-600 mb-4">{member.role}</p>
            {member.bio && (
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">{member.bio}</p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-4">
            <a
              href={`mailto:${member.email}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-xs text-gray-700"
            >
              <Mail size={12} />
              Email
            </a>
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-[#0A66C2] hover:text-white rounded-lg transition-colors text-xs text-gray-700"
            >
              <Linkedin size={12} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ========== SMALL TEAM CARD (compacto, simple) ========== */
function SmallTeamCard({ member }: CardProps) {
  const areaColor = getAreaColor(member.area)
  
  if (!member.image) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="h-0.5" style={{ backgroundColor: areaColor }}></div>
        <div className="p-3 text-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
            <span className="text-sm font-bold text-gray-400">
              {member.name[0]}{member.lastName[0]}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-900 leading-tight truncate">{member.name}</p>
          <p className="text-xs font-semibold text-gray-900 leading-tight truncate">{member.lastName}</p>
          <p className="text-[10px] text-gray-500 mt-1 truncate">{member.role}</p>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/team/${member.id}`}>
      <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer">
        <div className="h-0.5" style={{ backgroundColor: areaColor }}></div>
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={member.image}
            alt={`${member.name} ${member.lastName}`}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity duration-300"
          />
        </div>
        <div className="p-2.5 text-center">
          <p className="text-xs font-semibold text-gray-900 leading-tight truncate">{member.name}</p>
          <p className="text-xs font-semibold text-gray-900 leading-tight truncate">{member.lastName}</p>
          <p className="text-[10px] text-gray-500 mt-0.5 truncate">{member.role}</p>
        </div>
      </div>
    </Link>
  )
}
