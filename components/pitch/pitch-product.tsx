import Image from "next/image"

export default function PitchProduct() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">Nuestros Productos y Servicios</h2>
            <p className="text-lg text-[#01283c]">
              Soluciones biotecnológicas integrales para la agricultura sostenible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="relative h-48">
                <Image src="/pitch-product1.png" alt="Plantines in vitro" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Plantines in vitro</h3>
                <p className="text-[#01283c] mb-4">
                  Plantas de banano, plátano y otras especies producidas mediante técnicas de cultivo de tejidos,
                  garantizando material vegetal de alta calidad genética y libre de enfermedades.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1 text-[#2e7d32]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    ></path>
                  </svg>
                  <span>Margen bruto: 65%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="relative h-48">
                <Image src="/pitch-product2.png" alt="Biocontroladores" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Biocontroladores</h3>
                <p className="text-[#01283c] mb-4">
                  Microorganismos benéficos (hongos antagonistas, bacterias promotoras del crecimiento) para el control
                  de plagas y enfermedades, reduciendo la dependencia de agroquímicos.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1 text-[#2e7d32]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    ></path>
                  </svg>
                  <span>Margen bruto: 70%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="relative h-48">
                <Image src="/pitch-product3.png" alt="Asesoría técnica" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Asesoría técnica</h3>
                <p className="text-[#01283c] mb-4">
                  Servicios de consultoría especializada en biotecnología vegetal, manejo integrado de plagas y
                  enfermedades, y sistemas de producción sostenible.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1 text-[#2e7d32]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    ></path>
                  </svg>
                  <span>Margen bruto: 80%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="relative h-48">
                <Image src="/pitch-product4.png" alt="Materiales educativos" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Materiales educativos</h3>
                <p className="text-[#01283c] mb-4">
                  Insumos, equipos y kits didácticos para laboratorios de investigación y enseñanza universitaria en el
                  campo de la biotecnología.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1 text-[#2e7d32]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    ></path>
                  </svg>
                  <span>Margen bruto: 55%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
