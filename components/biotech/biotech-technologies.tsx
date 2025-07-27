import Image from "next/image"

export default function BiotechTechnologies() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#01283c] mb-4">
          Tecnologías y Métodos en Biotecnología Vegetal
        </h2>
        <p className="text-center text-base text-[#01283c] mb-12 max-w-3xl mx-auto">
          Además de la micropropagación, la biotecnología vegetal emplea diversas técnicas avanzadas para el
          mejoramiento y estudio de las plantas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="relative h-48">
              <Image src="/biotech-tech1.png" alt="Cultivo de meristemos" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Cultivo de meristemos</h3>
              <p className="text-[#01283c] mb-4">
                Técnica que utiliza los tejidos meristemáticos (puntos de crecimiento) de las plantas para obtener
                material libre de virus, ya que estas zonas suelen estar menos afectadas por patógenos.
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
                <span>Aplicado en: Banano, papa, fresa</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="relative h-48">
              <Image src="/biotech-tech2.png" alt="Embriogénesis somática" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Embriogénesis somática</h3>
              <p className="text-[#01283c] mb-4">
                Proceso por el cual células somáticas (no reproductivas) se desarrollan formando embriones similares a
                los zigóticos, que luego se convierten en plantas completas.
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
                <span>Aplicado en: Café, palma aceitera</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="relative h-48">
              <Image src="/biotech-tech3.png" alt="Organogénesis" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Organogénesis</h3>
              <p className="text-[#01283c] mb-4">
                Formación de órganos vegetales (brotes, raíces) a partir de tejidos no diferenciados, mediante el uso de
                reguladores de crecimiento específicos en el medio de cultivo.
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
                <span>Aplicado en: Orquídeas, plantas ornamentales</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="relative h-48">
              <Image src="/biotech-tech4.png" alt="Cultivo de anteras" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Cultivo de anteras</h3>
              <p className="text-[#01283c] mb-4">
                Técnica que utiliza anteras (órganos masculinos de las flores) para producir plantas haploides, con un
                solo juego de cromosomas, útiles en programas de mejoramiento genético.
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
                <span>Aplicado en: Arroz, trigo, maíz</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="relative h-48">
              <Image src="/biotech-tech5.png" alt="Criopreservación" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Criopreservación</h3>
              <p className="text-[#01283c] mb-4">
                Conservación de material vegetal a temperaturas ultra bajas (nitrógeno líquido, -196°C) para mantener su
                viabilidad durante largos períodos sin alteraciones genéticas.
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
                <span>Aplicado en: Bancos de germoplasma</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="relative h-48">
              <Image src="/biotech-tech6.png" alt="Cultivo de protoplastos" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2e7d32] mb-2">Cultivo de protoplastos</h3>
              <p className="text-[#01283c] mb-4">
                Trabajo con células vegetales a las que se les ha eliminado la pared celular, permitiendo la fusión de
                células de diferentes especies para crear híbridos somáticos.
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
                <span>Aplicado en: Cítricos, solanáceas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
