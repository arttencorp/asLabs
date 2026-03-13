'use client'

import { useState, useEffect } from 'react'

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
      const sections = ['mision', 'valores', 'organigrama', 'impacto']
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
    { id: 'mision', label: 'Nuestra Historia', icon: '📖' },
    { id: 'valores', label: 'Valores', icon: '⭐' },
    { id: 'organigrama', label: 'Organigrama', icon: '👥' },
    { id: 'impacto', label: 'Impacto', icon: '📈' },
  ]

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex">
      <div className="relative rounded-3xl bg-gradient-to-b from-white/95 to-[#f3f8f5]/95 backdrop-blur-md p-2 shadow-[0_18px_45px_-18px_rgba(24,75,52,0.45)] border border-[#d8e7de]">
        <div className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" aria-hidden="true" />
        <div className="flex flex-col gap-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              aria-label={section.label}
              className={`relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 group ${
                activeSection === section.id
                  ? 'bg-gradient-to-br from-[#2f7a57] to-[#245f45] text-white shadow-[0_10px_24px_-12px_rgba(36,95,69,0.85)] scale-[1.02]'
                  : 'bg-white/80 text-[#2b5040] hover:bg-white hover:shadow-md'
              }`}
              title={section.label}
            >
              {activeSection === section.id && (
                <span className="absolute -left-3 h-8 w-1.5 rounded-full bg-[#c27737]" aria-hidden="true" />
              )}

              <div className={`text-xl transition-all ${activeSection === section.id ? 'scale-110' : 'scale-100'}`}>
                {section.icon}
              </div>

              {/* Tooltip */}
              <div className="absolute right-full mr-3 bg-[#16392c] text-[#e6f4ed] px-3 py-1.5 rounded-lg text-xs tracking-wide whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none shadow-lg">
                {section.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
