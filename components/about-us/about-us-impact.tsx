import Image from "next/image"
import Link from "next/link"

export default function AboutUsImpact() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-[#01283c] mb-4">Explorando nuevas fronteras en biotecnología</h3>
              <p className="text-base text-[#01283c] mb-6 leading-relaxed">
                Con nuestro laboratorio de biotecnología vegetal y nuestro centro de investigación en microorganismos
                benéficos, estamos desarrollando soluciones innovadoras para los desafíos agrícolas más urgentes,
                incluyendo la resistencia a enfermedades y la adaptación al cambio climático.
              </p>
              <Link href="#" className="inline-flex items-center text-[#2e7d32] font-medium">
                CONOCE MÁS
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
            <div className="lg:w-1/2 relative">
              <Image src="/lab-scientists.png" alt="Laboratorio de AS Labs" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
