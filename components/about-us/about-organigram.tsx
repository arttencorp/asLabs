'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, Linkedin } from 'lucide-react'
import { teamData } from '@/lib/team-data'

export default function AboutOrganigram() {
  return (
    <section id="organigrama" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-[0.15em]">
              Nuestro Equipo
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Equipo AS Laboratorios</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conoce a los profesionales que hacen posible nuestra misión
          </p>
        </div>

        {/* Team Sections */}
        <div className="space-y-20">
          {teamData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-8">
              {/* Section Title */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-2xl font-serif font-bold text-gray-900">{section.title}</h3>
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
        <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all duration-300 aspect-square flex flex-col">
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
