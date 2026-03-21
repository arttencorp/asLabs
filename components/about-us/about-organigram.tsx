'use client'

import Image from 'next/image'
import { Linkedin } from 'lucide-react'

interface TeamMember {
  name: string
  lastName: string
  role: string
  area: string
  image: string
  linkedIn?: string
}

interface TeamSection {
  title: string
  members: TeamMember[]
}

export default function AboutOrganigram() {
  const teamSections: TeamSection[] = [
    {
      title: 'Dirección Ejecutiva',
      members: [
        {
          name: 'Marleni G.',
          lastName: 'Valverde',
          role: 'Lic. - Socio Fundador',
          area: 'Dirección',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
        {
          name: 'Natasha',
          lastName: 'Escobar A.',
          role: 'Blga. - Gerente General',
          area: 'Gerencia',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
      ],
    },
    {
      title: 'Gestión Administrativa',
      members: [
        {
          name: 'Antonio Victor',
          lastName: 'Guevara',
          role: 'Gerente de Gestión',
          area: 'Administración',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
        {
          name: 'Luis',
          lastName: 'Guevara',
          role: 'Cont. - Contador',
          area: 'Contabilidad',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
      ],
    },
    {
      title: 'Área Técnica - Supervisión de Técnicos',
      members: [
        {
          name: 'Ing. Javier',
          lastName: 'Verastegui Sancho',
          role: 'Jefe en Biotecnología',
          area: 'Área Técnica',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
        {
          name: 'Hellem',
          lastName: 'Guevara N.',
          role: 'Supervisora de Técnicos',
          area: 'Técnica',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
        {
          name: 'Jurith',
          lastName: 'Aguilar P.',
          role: 'Líder Técnica',
          area: 'Técnica',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
        {
          name: 'Tec. Quím.',
          lastName: 'Madeleine Isuiza F.',
          role: 'Técnica',
          area: 'Técnica',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
      ],
    },
    {
      title: 'Área Técnica - Supervisión de Practicantes',
      members: [
        {
          name: 'Melissa',
          lastName: 'Torres M.',
          role: 'Supervisora de Practicantes',
          area: 'Técnica',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
        {
          name: 'Estrella',
          lastName: 'Silva Núñez',
          role: 'Practicante',
          area: 'Prácticas',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
      ],
    },
    {
      title: 'Control Biológico',
      members: [
        {
          name: 'Blga.',
          lastName: 'Yvonne Lopez L.',
          role: 'Jefa de Control Biológico',
          area: 'Control Biológico',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
        {
          name: 'Hassan',
          lastName: 'Espinales',
          role: 'Jefe Microbiología Agroindustrial',
          area: 'Microbiología',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
        {
          name: 'Luis Alonso',
          lastName: 'Flores Ramírez',
          role: 'Técnico de Laboratorio',
          area: 'Laboratorio',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
      ],
    },
    {
      title: 'Innovación y Transferencia Tecnológica',
      members: [
        {
          name: 'Ing.',
          lastName: 'Jaime Palomino Cuenca',
          role: 'Jefe I+T',
          area: 'Innovación',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
        {
          name: 'Arq.',
          lastName: 'Sebastian Carranza A.',
          role: 'Responsable Marketing',
          area: 'Marketing',
          image: '/team/default-profile.jpg',
          linkedIn: '#',
        },
      ],
    },
  ]

  return (
    <section id="organigrama" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block mb-3">
            <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-[0.2em] bg-green-50 px-4 py-2 rounded-full">
              Nuestro Equipo
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">Equipo AS Laboratorios</h2>
          <p className="text-gray-700 font-medium text-sm max-w-2xl mx-auto">
            Conoce a los profesionales que hacen posible nuestra misión
          </p>
        </div>

        {/* Team Sections */}
        <div className="space-y-16">
          {teamSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-6">
              {/* Section Title */}
              <div className="flex items-center gap-4 pb-4 border-b-2 border-gray-200">
                <div 
                  className="w-1 h-6 rounded-full" 
                  style={{
                    backgroundColor: [
                      '#e65100',
                      '#01283c',
                      '#2e7d32',
                      '#2e7d32',
                      '#f9a825',
                      '#7b1fa2'
                    ][sectionIndex]
                  }}
                ></div>
                <h3 className="text-xl font-serif font-bold text-gray-900">{section.title}</h3>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {section.members.map((member, memberIndex) => (
                  <TeamCard key={memberIndex} member={member} />
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
  member: TeamMember
}

function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-square">
        {/* Image Container */}
        <div className="relative w-full h-3/4 bg-gray-100 overflow-hidden">
          <Image
            src={member.image}
            alt={`${member.name} ${member.lastName}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Info Container */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-gray-800 text-white p-3 min-h-1/4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-300">{member.area}</p>
            <p className="text-sm font-serif font-bold">{member.name}</p>
            <p className="text-sm font-serif font-bold">{member.lastName}</p>
            <p className="text-xs text-gray-300 line-clamp-2">{member.role}</p>
          </div>
        </div>

        {/* LinkedIn Button - Shows on Hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 bg-[#0A66C2] rounded-lg text-white hover:bg-[#084A94] transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}
