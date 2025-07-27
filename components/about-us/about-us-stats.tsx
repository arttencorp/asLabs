import Image from "next/image"
import Link from "next/link"

export default function AboutUsStats() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-12 mb-8">
              <div>
                <h3 className="text-5xl font-bold text-[#2e7d32]">24+</h3>
                <p className="text-sm mt-1">años de experiencia</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-[#2e7d32]">6</h3>
                <p className="text-sm mt-1">variedades de banano</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-[#2e7d32]">12</h3>
                <p className="text-sm mt-1">microorganismos benéficos</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#01283c] mb-4">
              Impulsando la agricultura sostenible a través de la biotecnología
            </h3>
            <p className="text-base text-[#01283c] mb-6 leading-relaxed">
              Desde la clonación de plantas hasta el control biológico con microorganismos benéficos, nuestras
              soluciones biotecnológicas están transformando la agricultura peruana hacia prácticas más sostenibles y
              productivas.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/scientists-meeting.png"
                  alt="Equipo de científicos de AS Labs"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#01283c] mb-4">Estamos cambiando la agricultura</h3>
                <p className="text-base text-[#01283c] mb-6">
                  Combinamos ciencia de vanguardia con soluciones prácticas para los desafíos agrícolas de nuestro país.
                </p>
                <Link href="#" className="inline-flex items-center text-[#2e7d32] font-medium">
                  CONOCE NUESTRA TECNOLOGÍA
                  <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M12 8L16 12L12 16M8 12H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
