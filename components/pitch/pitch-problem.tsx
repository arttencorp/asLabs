import Image from "next/image"

export default function PitchProblem() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">El Problema</h2>
            <p className="text-lg text-[#01283c]">
              La agricultura peruana enfrenta desafíos críticos que limitan su productividad y sostenibilidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/pitch-problem.png"
                alt="Problemas en la agricultura peruana"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#01283c] mb-1">Uso excesivo de agroquímicos</h3>
                    <p className="text-gray-600">
                      El uso intensivo de pesticidas y fertilizantes químicos contamina suelos y aguas, afecta la salud
                      de agricultores y consumidores, y genera resistencia en plagas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#01283c] mb-1">Material vegetal de baja calidad</h3>
                    <p className="text-gray-600">
                      La propagación tradicional de cultivos genera plantas con alta incidencia de enfermedades y baja
                      uniformidad genética, reduciendo rendimientos y calidad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#01283c] mb-1">Cambio climático</h3>
                    <p className="text-gray-600">
                      Las condiciones climáticas extremas y cambiantes afectan la productividad agrícola, requiriendo
                      cultivos más resistentes y prácticas más sostenibles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
