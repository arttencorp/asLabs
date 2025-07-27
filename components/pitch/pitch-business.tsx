export default function PitchBusiness() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">Modelo de Negocio</h2>
            <p className="text-lg text-[#01283c]">Generamos ingresos a través de múltiples canales complementarios</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#2e7d32] mb-4">Fuentes de ingresos</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-1/3 pr-4">
                    <div className="h-4 bg-[#2e7d32] rounded-full relative">
                      <div className="absolute -right-2 -top-1 w-6 h-6 bg-white rounded-full border-2 border-[#2e7d32] flex items-center justify-center text-xs font-bold">
                        40%
                      </div>
                    </div>
                  </div>
                  <div className="w-2/3">
                    <p className="font-medium text-[#01283c]">Venta de plantines in vitro</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-1/3 pr-4">
                    <div className="h-4 bg-[#2e7d32] rounded-full w-3/4 relative">
                      <div className="absolute -right-2 -top-1 w-6 h-6 bg-white rounded-full border-2 border-[#2e7d32] flex items-center justify-center text-xs font-bold">
                        30%
                      </div>
                    </div>
                  </div>
                  <div className="w-2/3">
                    <p className="font-medium text-[#01283c]">Venta de biocontroladores</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-1/3 pr-4">
                    <div className="h-4 bg-[#2e7d32] rounded-full w-1/2 relative">
                      <div className="absolute -right-2 -top-1 w-6 h-6 bg-white rounded-full border-2 border-[#2e7d32] flex items-center justify-center text-xs font-bold">
                        20%
                      </div>
                    </div>
                  </div>
                  <div className="w-2/3">
                    <p className="font-medium text-[#01283c]">Servicios de asesoría técnica</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-1/3 pr-4">
                    <div className="h-4 bg-[#2e7d32] rounded-full w-1/4 relative">
                      <div className="absolute -right-2 -top-1 w-6 h-6 bg-white rounded-full border-2 border-[#2e7d32] flex items-center justify-center text-xs font-bold">
                        10%
                      </div>
                    </div>
                  </div>
                  <div className="w-2/3">
                    <p className="font-medium text-[#01283c]">Venta de materiales educativos</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#2e7d32] mb-4">Canales de distribución</h3>
              <ul className="space-y-3">
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
                  <span>Venta directa a productores y empresas agrícolas</span>
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
                  <span>Distribuidores de insumos agrícolas</span>
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
                  <span>Tienda en línea (e-commerce)</span>
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
                  <span>Alianzas con universidades e instituciones educativas</span>
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
                  <span>Proyectos con gobiernos locales y ONGs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#01283c] mb-4">Ventajas competitivas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#2e7d32]"
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
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[#01283c]">24 años de experiencia en el sector</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#2e7d32]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[#01283c]">Laboratorio propio de investigación</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#2e7d32]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[#01283c]">Equipo multidisciplinario especializado</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#2e7d32]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[#01283c]">Soluciones integrales (productos + asesoría)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
