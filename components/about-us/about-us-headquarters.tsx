import Image from "next/image"
import Link from "next/link"

export default function AboutUsHeadquarters() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">Nuestra sede</h2>
            <p className="text-base text-[#01283c] mb-6 leading-relaxed">
              Nuestra sede principal está ubicada en Lima, Perú, donde contamos con laboratorios de biotecnología
              vegetal, instalaciones para la producción de microorganismos benéficos y áreas de investigación y
              desarrollo. También contamos con campos experimentales en diferentes regiones del país.
            </p>
            <Link href="#" className="inline-flex items-center text-[#2e7d32] font-medium">
              CONTÁCTANOS
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

          <div className="relative">
            <Image
              src="/employees-biking.png"
              alt="Instalaciones de AS Laboratorios"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
