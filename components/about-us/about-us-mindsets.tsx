import Image from "next/image"
import Link from "next/link"

export default function AboutUsMindsets() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">Nuestra Filosofía</h2>
            <p className="text-base text-[#01283c] mb-6 leading-relaxed">
              Junto con nuestros valores, nuestra filosofía de trabajo nos permite superar desafíos y construir
              soluciones innovadoras. Trabajamos para construir un futuro agrícola más sostenible y productivo para el
              Perú y la región.
            </p>
            <Link href="#" className="inline-flex items-center text-[#2e7d32] font-medium">
              CONOCE NUESTRA FILOSOFÍA
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#01283c] mb-4">Nuestro Equipo</h3>
              <p className="text-base text-[#01283c] mb-6">
                Contamos con un equipo multidisciplinario de profesionales apasionados por la biotecnología y
                comprometidos con el desarrollo agrícola sostenible del Perú.
              </p>
              <Link href="#" className="inline-flex items-center text-[#2e7d32] font-medium">
                CONOCE A NUESTRO EQUIPO
                <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
            <Image
              src="/woman-blonde.png"
              alt="Miembro del equipo de AS Labs"
              width={500}
              height={300}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
