import Image from "next/image"
import Link from "next/link"

export default function StudentDiscount() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-block bg-green-100 text-[#2e7d32] px-4 py-2 rounded-full text-sm font-medium mb-4">
                Exclusivo para estudiantes UNT
              </div>
              <h2 className="text-3xl font-bold text-[#01283c] mb-4">
                Descuentos especiales para estudiantes de la Universidad Nacional de Trujillo
              </h2>
              <p className="text-[#01283c] mb-6">
                En AS Laboratorios valoramos el talento y dedicación de los estudiantes de la Universidad Nacional de
                Trujillo. Por eso, ofrecemos descuentos especiales de hasta el 25% en todos nuestros productos y
                servicios para estudiantes que presenten su carné universitario vigente.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>25% de descuento en kits educativos</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>20% de descuento en materiales de laboratorio</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>15% de descuento en reactivos químicos</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Asesoría gratuita para proyectos de investigación</span>
                </li>
              </ul>
              <Link href="#" className="inline-flex items-center text-[#2e7d32] font-medium">
                SOLICITAR DESCUENTO UNT
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
            <div className="lg:w-1/2 relative">
              <Image
                src="/unt-students.png"
                alt="Estudiantes de la Universidad Nacional de Trujillo"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
