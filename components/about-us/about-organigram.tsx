'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, Linkedin } from 'lucide-react'
import { teamData } from '@/lib/team-data'

export default function AboutOrganigram() {
  return (
    <section id="organigrama" className="w-full py-40 px-4 sm:px-6 lg:px-8 bg-[#f8f6f1] relative">
      {/* Decorative background - allow overflow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#2e7d32] opacity-4 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-left mb-24 max-w-2xl">
          <div className="inline-block mb-6">
            <span className="text-xs font-semibold text-[#2e7d32] uppercase tracking-[0.2em] bg-[#e8f5e9] px-5 py-3 rounded-full border border-[#2e7d32]/20">
              Nuestro Equipo
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-8">Equipo AS Laboratorios</h2>
          <p className="text-xl text-gray-700 font-medium">
            Conoce a los profesionales que hacen posible nuestra misión de excelencia
          </p>
        </div>

        {/* Team Organigram - Responsive Grid */}
        <div className="space-y-8">
          {teamData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              {/* Section Label */}
              <div className="px-2">
                <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{section.title}</p>
              </div>
              
              {/* Section Members - Responsive Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {section.members.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface TeamCardProps {
  member: (typeof teamData)[0]['members'][0]
}

function getAreaColor(area: string): string {
  const colors: Record<string, string> = {
    'Dirección': '#2e7d32',
    'Administración': '#e65100',
    'Gerencia': '#01283c',
    'Técnica': '#7b1fa2',
    'Contabilidad': '#f9a825',
    'Recursos Humanos': '#d32f2f',
    'Control Biológico': '#1976d2',
    'Microbiología': '#388e3c',
    'Laboratorio': '#00897b',
    'Prácticas': '#5e35b1',
    'Innovación': '#f57c00',
    'Marketing': '#c2185b',
  }
  return colors[area] || '#666666'
}

function TeamCard({ member }: TeamCardProps) {
  const areaColor = getAreaColor(member.area)
  
  return (
    <Link href={`/team/${member.id}`}>
      <div className="group cursor-pointer">
        <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all duration-300 flex flex-col shadow-sm hover:shadow-lg w-full">
          {/* Area Color Bar */}
          <div className="h-1" style={{ backgroundColor: areaColor }}></div>
          {/* Image Container - Vertical Format */}
          <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
            <Image
              src={member.image}
              alt={`${member.name} ${member.lastName}`}
              fill
              className="object-cover group-hover:opacity-85 transition-opacity duration-300"
            />
          </div>

          {/* Info Container */}
          <div className="p-2.5 bg-white flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{member.area}</p>
              <div>
                <p className="text-xs font-semibold text-gray-900 leading-tight line-clamp-1">{member.name}</p>
                <p className="text-xs font-semibold text-gray-900 leading-tight line-clamp-1">{member.lastName}</p>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{member.role}</p>
            </div>

            {/* Contact Icons */}
            <div className="flex gap-1.5 pt-2 border-t border-gray-100 mt-2">
              <a
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center p-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                title="Email"
              >
                <Mail size={12} className="text-gray-600" />
              </a>
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center p-1 bg-gray-100 hover:bg-[#0A66C2] hover:text-white rounded transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={12} className="text-gray-600 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
