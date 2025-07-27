import Image from "next/image"
import Link from "next/link"

export default function TeamMemberSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left content - Company Summary */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-[#2e7d32] mb-4">Sobre AS Laboratorios</h2>
              <p className="text-base text-[#01283c] mb-6 leading-relaxed">
                Desde el año 2000, AS Laboratorios ha sido pionero en biotecnología vegetal en Perú, ofreciendo
                soluciones innovadoras para la agricultura sostenible. Nuestro equipo de científicos altamente
                calificados trabaja constantemente en el desarrollo de nuevas tecnologías para mejorar la productividad
                agrícola.
              </p>
              <p className="text-base text-[#01283c] mb-6 leading-relaxed">
                Nos especializamos en la clonación de plantas, control biológico y asesoría técnica para agricultores,
                universidades e instituciones de investigación. Nuestro compromiso con la excelencia científica y la
                sostenibilidad nos ha posicionado como líderes en el sector biotecnológico agrícola.
              </p>
              <Link href="/sobre-nosotros" className="inline-flex items-center text-[#2e7d32] font-medium">
                CONOCE MÁS SOBRE NOSOTROS
                <div className="ml-2 flex items-center justify-center w-6 h-6 rounded-full border border-[#2e7d32]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Right image - Laboratory */}
            <div className="w-full lg:w-1/2 relative">
              <div className="h-full bg-[#e7f3f8] relative">
                <Image
                  src="/lab-header-bg.jpg"
                  alt="Laboratorio de biotecnología de AS Labs"
                  width={600}
                  height={500}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2e7d32]/80 to-transparent flex flex-col justify-center p-8">
                  <p className="text-white text-2xl font-medium leading-tight max-w-xs">
                    Innovación en biotecnología para una agricultura más sostenible y productiva.
                  </p>
                  <p className="text-white mt-auto pt-24 text-sm">AS Laboratorios - Desde 2000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
