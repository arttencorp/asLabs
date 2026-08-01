'use client'

export default function AboutHeader() {
  return (
    <section 
      className="w-full text-gray-900 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headernosotros-wl7NufwonCIqKItx5mWUFHFbDX5Snw.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="space-y-5 max-w-3xl">
          <div className="inline-block">
            <span className="text-xs font-semibold text-white uppercase tracking-[0.2em] bg-white/20 px-5 py-2 rounded-full border border-white/30 backdrop-blur-sm">
              Quiénes Somos
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight text-balance text-white">Sobre Nosotros</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-white to-white/50 rounded-full"></div>
          <p className="text-lg text-white/90 font-medium max-w-2xl leading-relaxed">Descubre la trayectoria, misión y el impacto de AS Laboratorios en la biotecnología agrícola, nutriendo la innovación y la sostenibilidad</p>
        </div>
      </div>
    </section>
  )
}
