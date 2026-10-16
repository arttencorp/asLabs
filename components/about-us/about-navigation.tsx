'use client'

import { useState, useEffect } from 'react'
import { Award, BookOpen, Sparkles, Users } from 'lucide-react'

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
      const sections = ['mision', 'organigrama', 'estandares', 'valores']
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
  ]

  return (
    <div data-navbar-theme="light" className="sticky top-[56px] z-40 border-b border-[#d7dfd9] bg-white/95 backdrop-blur-xl sm:top-[60px]">
      <div className="mx-auto flex max-w-[1360px] items-center overflow-x-auto px-5 sm:px-8 [scrollbar-width:none]">
          {sections.map((section) => {
            const Icon = section.icon
            return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative flex h-12 shrink-0 items-center gap-2 px-3.5 text-[11px] font-semibold transition-colors sm:px-5 ${
                activeSection === section.id
                  ? 'text-[#0b7a55] after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-[#0b7a55]'
                  : 'text-[#5d6c64] hover:bg-[#f2f5f2] hover:text-[#245f3e]'
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
