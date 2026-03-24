'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, Linkedin } from 'lucide-react'
import { teamData } from '@/lib/team-data'

export default function AboutOrganigram() {
  return (
    <section id="organigrama" className="w-full py-40 px-4 sm:px-6 lg:px-8 bg-[#f8f6f1] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#2e7d32] opacity-4 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

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

        {/* Team Sections */}
        <div className="space-y-24">
          {teamData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-10">
              {/* Section Title */}
              <div className="border-b-2 border-gray-300 pb-6">
                <h3 className="text-3xl font-serif font-bold text-gray-900">{section.title}</h3>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

function TeamCard({ member }: TeamCardProps) {
  return (
    <Link href={`/team/${member.id}`}>
      <div className="group cursor-pointer h-full">
        <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-400 hover:shadow-xl transition-all duration-300 aspect-square flex flex-col shadow-md">
          {/* Image Container */}
          <div className="relative w-full h-2/3 bg-gray-100 overflow-hidden">
            <Image
              src={member.image}
              alt={`${member.name} ${member.lastName}`}
              fill
              className="object-cover group-hover:opacity-80 transition-opacity duration-300"
            />
          </div>

          {/* Info Container */}
          <div className="flex-1 p-4 bg-white flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{member.area}</p>
              <div>
                <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                <p className="text-sm font-semibold text-gray-900">{member.lastName}</p>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{member.role}</p>
            </div>

            {/* Contact Icons */}
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <a
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Email"
              >
                <Mail size={16} className="text-gray-600" />
              </a>
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center p-2 bg-gray-100 hover:bg-[#0A66C2] hover:text-white rounded-lg transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={16} className="text-gray-600 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
