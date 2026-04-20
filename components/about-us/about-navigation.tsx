'use client'

import { useState, useEffect } from 'react'
import { BookOpen, ChartNoAxesColumn, Star, Users } from 'lucide-react'

const sections = [
  { id: 'mision', label: 'Nuestra Historia', icon: BookOpen, iconColor: 'text-[#4e76d5]' },
  { id: 'equipo', label: 'Equipo', icon: Users, iconColor: 'text-[#6f3caf]' },
  { id: 'valores', label: 'Valores', icon: Star, iconColor: 'text-[#d6a51f]' },
  { id: 'impacto', label: 'Impacto', icon: ChartNoAxesColumn, iconColor: 'text-[#4f79df]' },
]

export default function AboutNavigation() {
  const [activeSection, setActiveSection] = useState('mision')

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setActiveSection(id)
  }

  useEffect(() => {
    const handleScroll = () => {
      const checkpoint = window.scrollY + window.innerHeight * 0.35
      let currentSection = sections[0].id

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const top = element.offsetTop
          if (checkpoint >= top) {
            currentSection = section.id
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <div className="overflow-hidden rounded-l-2xl border border-r-0 border-[#d5dedd] bg-white/95 shadow-[0_18px_38px_-18px_rgba(17,34,51,0.45)] backdrop-blur-sm">
        <div className="flex flex-col">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              aria-label={section.label}
              className={`relative flex h-16 w-16 items-center justify-center transition-colors ${
                index < sections.length - 1 ? 'border-b border-[#e0e6ea]' : ''
              } ${
                activeSection === section.id
                  ? 'bg-[#1f7a31]'
                  : 'bg-white text-[#3a4b5f] hover:bg-[#f4f7f6]'
              }`}
              title={section.label}
            >
              <section.icon className={`h-6 w-6 ${activeSection === section.id ? 'text-white' : section.iconColor}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
