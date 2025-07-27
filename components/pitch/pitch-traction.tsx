export default function PitchTraction() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">Tracción y Métricas</h2>
            <p className="text-lg text-[#01283c]">Crecimiento sostenido y resultados comprobados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#2e7d32] mb-2">S/. 2.5M</div>
              <h3 className="text-lg font-medium text-[#01283c] mb-2">Ingresos anuales</h3>
              <p className="text-gray-600">
                Crecimiento del 18% respecto al año anterior, con proyección de S/. 3.2M para el próximo año.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#2e7d32] mb-2">350+</div>
              <h3 className="text-lg font-medium text-[#01283c] mb-2">Clientes activos</h3>
              <p className="text-gray-600">
                Incluyendo productores individuales, empresas agrícolas, universidades y organizaciones gubernamentales.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#2e7d32] mb-2">85%</div>
              <h3 className="text-lg font-medium text-[#01283c] mb-2">Tasa de retención</h3>
              <p className="text-gray-600">
                Alta fidelidad de clientes gracias a la calidad de nuestros productos y servicios de asesoría.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-[#01283c] mb-6">Crecimiento de ventas (últimos 5 años)</h3>
            <div className="relative h-64">
              <div className="absolute inset-0">
                <div className="h-full flex items-end">
                  <div className="w-1/5 h-1/3 bg-[#2e7d32] mx-1 rounded-t-md relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                      S/.1.2M
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">2019</div>
                  </div>
                  <div className="w-1/5 h-2/5 bg-[#2e7d32] mx-1 rounded-t-md relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                      S/.1.5M
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">2020</div>
                  </div>
                  <div className="w-1/5 h-1/2 bg-[#2e7d32] mx-1 rounded-t-md relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                      S/.1.8M
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">2021</div>
                  </div>
                  <div className="w-1/5 h-3/5 bg-[#2e7d32] mx-1 rounded-t-md relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                      S/.2.1M
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">2022</div>
                  </div>
                  <div className="w-1/5 h-4/5 bg-[#2e7d32] mx-1 rounded-t-md relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                      S/.2.5M
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#01283c] mb-4">Casos de éxito</h3>
              <ul className="space-y-4">
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
                  <div>
                    <p className="font-medium text-[#01283c]">Asociación de Productores de Banano Orgánico</p>
                    <p className="text-sm text-gray-600">
                      Incremento del 25% en productividad y reducción del 40% en uso de pesticidas.
                    </p>
                  </div>
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
                  <div>
                    <p className="font-medium text-[#01283c]">Universidad Nacional de Trujillo</p>
                    <p className="text-sm text-gray-600">
                      Implementación de laboratorio de biotecnología vegetal para formación de estudiantes.
                    </p>
                  </div>
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
                  <div>
                    <p className="font-medium text-[#01283c]">Proyecto de Desarrollo Rural</p>
                    <p className="text-sm text-gray-600">
                      Capacitación a 150 pequeños agricultores en técnicas de control biológico.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#01283c] mb-4">Alianzas estratégicas</h3>
              <ul className="space-y-4">
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
                  <div>
                    <p className="font-medium text-[#01283c]">Instituto Nacional de Innovación Agraria (INIA)</p>
                    <p className="text-sm text-gray-600">
                      Colaboración en proyectos de investigación para el desarrollo de nuevas variedades.
                    </p>
                  </div>
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
                  <div>
                    <p className="font-medium text-[#01283c]">Red de Distribuidores Agrícolas</p>
                    <p className="text-sm text-gray-600">
                      Alianza con 15 distribuidores para ampliar la cobertura nacional de nuestros productos.
                    </p>
                  </div>
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
                  <div>
                    <p className="font-medium text-[#01283c]">Universidades Nacionales</p>
                    <p className="text-sm text-gray-600">
                      Convenios con 5 universidades para investigación y formación de estudiantes.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
