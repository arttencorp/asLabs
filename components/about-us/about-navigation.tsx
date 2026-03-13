'use client'

export default function AboutNavigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sections = [
    { id: 'mision', label: 'Nuestra Historia' },
    { id: 'valores', label: 'Valores' },
    { id: 'organigrama', label: 'Organigrama' },
    { id: 'impacto', label: 'Impacto' },
  ]

  return (
    <section className="w-full bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto gap-2 sm:gap-4 py-4 scroll-smooth">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] text-white hover:shadow-lg hover:scale-105"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
