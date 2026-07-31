'use client'

import { useState, useEffect } from 'react'
import { Award, BarChart3, BookOpen, Sparkles, Users } from 'lucide-react'

export default function AboutNavigation() {
  const [activeSection, setActiveSection] = useState('mision')

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(id)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['mision', 'organigrama', 'estandares', 'valores', 'impacto']
      for (const id of sections) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight / 2) {
            setActiveSection(id)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = [
    { id: 'mision', label: 'Historia', icon: BookOpen },
    { id: 'organigrama', label: 'Directorio', icon: Users },
    { id: 'estandares', label: 'Estándares', icon: Award },
    { id: 'valores', label: 'Valores', icon: Sparkles },
    { id: 'impacto', label: 'Impacto', icon: BarChart3 },
  ]

  return (
    <div data-navbar-theme="light" className="sticky top-[74px] z-40 -mt-6 px-4 sm:top-[82px]">
      <div className="mx-auto flex max-w-4xl items-center gap-1 overflow-x-auto rounded-2xl border border-white/90 bg-white/90 p-2 shadow-[0_18px_48px_-28px_rgba(8,47,32,0.55)] backdrop-blur-md [scrollbar-width:none]">
          {sections.map((section) => {
            const Icon = section.icon
            return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-300 sm:px-4 ${
                activeSection === section.id
                  ? 'bg-[#245f3e] text-white shadow-md'
                  : 'text-[#4f665b] hover:bg-[#edf3ee] hover:text-[#245f3e]'
              }`}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </button>
            )
          })}
      </div>
    </div>
  )
}
