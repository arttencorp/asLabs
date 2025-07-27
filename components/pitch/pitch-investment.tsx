export default function PitchInvestment() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#01283c] mb-4 font-serif">Oportunidad de Inversión</h2>
            <p className="text-lg text-[#01283c]">Buscamos socios estratégicos para acelerar nuestro crecimiento</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 mb-12">
            <h3 className="text-xl font-bold text-[#01283c] mb-6 font-serif">Ronda de inversión</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-[#01283c] mb-2">Monto buscado</h4>
                  <p className="text-3xl font-bold text-[#2e7d32]">$1,500,000</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#01283c] mb-2">Valoración pre-money</h4>
                  <p className="text-3xl font-bold text-[#2e7d32]">$6,000,000</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#01283c] mb-2">Tipo de inversión</h4>
                <ul className="space-y-2">
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
                    <span>Equity: 20% de participación</span>
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
                    <span>Inversión mínima: $100,000</span>
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
                    <span>Horizonte de inversión: 5 años</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#01283c] mb-4 font-serif">Uso de fondos</h3>
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
                    <p className="font-medium text-[#01283c]">Expansión de infraestructura</p>
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
                    <p className="font-medium text-[#01283c]">I+D de nuevos productos</p>
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
                    <p className="font-medium text-[#01283c]">Marketing y expansión comercial</p>
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
                    <p className="font-medium text-[#01283c]">Capital de trabajo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#01283c] mb-4 font-serif">Proyecciones financieras</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-[#01283c]">Ingresos proyectados (5 años)</p>
                  <div className="mt-2 h-12 bg-gray-100 rounded-md relative">
                    <div className="absolute inset-y-0 left-0 bg-[#2e7d32] w-1/5 rounded-l-md flex items-center justify-center text-white text-xs">
                      2024
                    </div>
                    <div className="absolute inset-y-0 left-1/5 bg-[#4caf50] w-1/5 flex items-center justify-center text-white text-xs">
                      2025
                    </div>
                    <div className="absolute inset-y-0 left-2/5 bg-[#66bb6a] w-1/5 flex items-center justify-center text-white text-xs">
                      2026
                    </div>
                    <div className="absolute inset-y-0 left-3/5 bg-[#81c784] w-1/5 flex items-center justify-center text-white text-xs">
                      2027
                    </div>
                    <div className="absolute inset-y-0 left-4/5 bg-[#a5d6a7] w-1/5 rounded-r-md flex items-center justify-center text-white text-xs">
                      2028
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>$500K</span>
                    <span>$5M</span>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-[#01283c]">ROI esperado</p>
                  <p className="text-2xl font-bold text-[#2e7d32] mt-1">3.5x en 5 años</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2e7d32] hover:bg-[#1b5e20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e7d32]"
            >
              Solicitar más información
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
