import Image from "next/image"
import Link from "next/link"

export default function StudentHero() {
  return (
    <section className="bg-gray-50 py-8 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl font-bold text-[#2e7d32] mb-4">
              Materiales y reactivos para tu formación científica
            </h1>
            <p className="text-base text-[#01283c] mb-6">
              En AS Laboratorios entendemos las necesidades de los estudiantes universitarios. Por eso, ofrecemos una
              amplia gama de materiales, reactivos y equipos de laboratorio a precios accesibles para apoyar tu
              formación académica y proyectos de investigación.
            </p>
            <Link
              href="#categorias"
              className="inline-block border border-[#e65100] text-[#d1343e] px-6 py-2 text-sm uppercase rounded-md hover:bg-[#e65100] hover:text-white transition-colors"
            >
              VER CATÁLOGO
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/students-laboratory.png"
                alt="Estudiantes en laboratorio"
                width={600}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <Image src="/aslabs-logo.png" alt="AS Labs Logo" width={120} height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
