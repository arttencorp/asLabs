import Image from "next/image"
import Link from "next/link"

export default function StudentHero() {
  return (
    <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-blue-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-10 right-20 w-20 h-20 bg-yellow-100 rounded-full opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="inline-block bg-green-100 text-[#2e7d32] px-4 py-2 rounded-full text-sm font-medium mb-4 animate-pulse">
              Exclusivo para estudiantes UNT
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2e7d32] mb-4 leading-tight">
              Tu aliado académico en ciencias biológicas
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Materiales, asesoría y soluciones especializadas para estudiantes de Ciencias Biológicas, Microbiología y
              Tecnologías Médicas de la Universidad Nacional de Trujillo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#contacto"
                className="inline-block bg-[#2e7d32] text-white px-6 py-3 rounded-md hover:bg-[#1b5e20] transition-colors transform hover:scale-105 duration-200"
              >
                Solicitar información
              </Link>
              <Link
                href="#materiales"
                className="inline-block border-2 border-[#2e7d32] text-[#2e7d32] px-6 py-3 rounded-md hover:bg-green-50 transition-colors"
              >
                Ver materiales
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl transform hover:rotate-1 transition-transform duration-300">
              <Image
                src="/student-solution-hero.png"
                alt="Estudiantes de laboratorio UNT"
                width={600}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md">
                <Image src="/aslabs-logo.png" alt="AS Labs Logo" width={100} height={35} />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-lg shadow-lg transform rotate-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Entrega en campus UNT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration at bottom */}
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
