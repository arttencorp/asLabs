import Image from "next/image"

export default function PitchTeam() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">Nuestro Equipo</h2>
            <p className="text-lg text-[#01283c]">
              Un equipo multidisciplinario con amplia experiencia en biotecnología y agricultura
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="relative h-64">
                <Image src="/pitch-team1.png" alt="Dr. Carlos Rodríguez" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-1">Dr. Carlos Rodríguez</h3>
                <p className="text-gray-600 mb-3">CEO y Director Científico</p>
                <p className="text-[#01283c] text-sm">
                  Ph.D. en Biotecnología Vegetal. 25 años de experiencia en investigación y desarrollo de soluciones
                  biotecnológicas para la agricultura.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="relative h-64">
                <Image src="/pitch-team2.png" alt="Ing. María Fernández" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-1">Ing. María Fernández</h3>
                <p className="text-gray-600 mb-3">Directora de Operaciones</p>
                <p className="text-[#01283c] text-sm">
                  Ingeniera Agrónoma con MBA. 15 años de experiencia en gestión de operaciones agrícolas y desarrollo de
                  negocios sostenibles.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="relative h-64">
                <Image src="/pitch-team3.png" alt="Dr. Luis Gómez" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-1">Dr. Luis Gómez</h3>
                <p className="text-gray-600 mb-3">Director de Investigación</p>
                <p className="text-[#01283c] text-sm">
                  Ph.D. en Microbiología. 18 años de experiencia en desarrollo de biocontroladores y microorganismos
                  benéficos para la agricultura.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-bold text-[#01283c] mb-4">Equipo completo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span>5 Biólogos especializados</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span>3 Ingenieros agrónomos</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span>2 Microbiólogos</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span>4 Técnicos de laboratorio</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span>3 Especialistas en ventas y marketing</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#2e7d32] mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span>2 Profesionales administrativos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
