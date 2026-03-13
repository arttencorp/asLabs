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
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex">
      <div className="bg-white rounded-l-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col gap-0">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center justify-center w-16 h-16 transition-all duration-300 group relative ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-[#2e7d32] to-[#1b5e20]'
                  : 'bg-white hover:bg-gray-50'
              } ${index !== sections.length - 1 ? 'border-b border-gray-200' : ''}`}
              title={section.label}
            >
              <div className={`text-2xl transition-all ${activeSection === section.id ? 'scale-125' : 'scale-100'}`}>
                {section.icon}
              </div>

              {/* Tooltip */}
              <div className="absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {section.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
