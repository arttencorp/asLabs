import Image from "next/image"

export default function PitchSolution() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">Nuestra Solución</h2>
            <p className="text-lg text-[#01283c]">Biotecnología sostenible para transformar la agricultura peruana</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#2e7d32]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#01283c] mb-1">Biotecnología vegetal</h3>
                    <p className="text-gray-600">
                      Producción de plantas in vitro de alta calidad genética y fitosanitaria, libres de enfermedades y
                      con características superiores.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#2e7d32]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#01283c] mb-1">Control biológico</h3>
                    <p className="text-gray-600">
                      Desarrollo de microorganismos benéficos para el control de plagas y enfermedades, reduciendo la
                      dependencia de agroquímicos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#2e7d32]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#01283c] mb-1">Transferencia tecnológica</h3>
                    <p className="text-gray-600">
                      Capacitación y asesoría técnica para agricultores en prácticas sostenibles y uso de productos
                      biotecnológicos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/pitch-solution.png"
                alt="Soluciones biotecnológicas de AS Labs"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
