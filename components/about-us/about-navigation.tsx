'use client'

interface AboutNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function AboutNavigation({ activeSection, setActiveSection }: AboutNavigationProps) {
  const sections = [
    { id: 'mision', label: 'Nuestra Historia', icon: '📖' },
    { id: 'valores', label: 'Valores', icon: '⭐' },
    { id: 'organigrama', label: 'Organigrama', icon: '🏢' },
    { id: 'impacto', label: 'Impacto', icon: '📊' },
  ]

  return (
    <section className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto gap-2 sm:gap-4 py-4 scroll-smooth scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? 'bg-[#2e7d32] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
