import Image from "next/image"

export default function PitchVision() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">Visión y Roadmap</h2>
            <p className="text-lg text-[#01283c]">Nuestro camino hacia el futuro de la agricultura sostenible</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#2e7d32] mb-4">Nuestra visión</h3>
              <p className="text-[#01283c] mb-6">
                Ser la empresa líder en soluciones biotecnológicas para la agricultura sostenible en Perú y América
                Latina, contribuyendo a la seguridad alimentaria, la conservación del medio ambiente y el desarrollo
                económico de las comunidades agrícolas.
              </p>
              <p className="text-[#01283c]">
                Buscamos transformar la agricultura tradicional hacia prácticas más sostenibles y productivas,
                reduciendo el uso de agroquímicos y promoviendo la adopción de tecnologías limpias que mejoren la
                calidad de vida de los agricultores y consumidores.
              </p>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/pitch-vision.png"
                alt="Visión de AS Laboratorios"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#01283c] mb-6">Roadmap 2024-2026</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#2e7d32]"></div>

              <div className="relative pl-12 pb-8">
                <div className="absolute left-0 w-8 h-8 bg-[#2e7d32] rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h4 className="text-lg font-bold text-[#01283c] mb-2">2024: Expansión de capacidad productiva</h4>
                <ul className="space-y-2 text-[#01283c]">
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
                    <span>Ampliación del laboratorio de biotecnología vegetal</span>
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
                    <span>Desarrollo de 3 nuevos biocontroladores para cultivos estratégicos</span>
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
                    <span>Implementación de plataforma e-commerce para venta directa</span>
                  </li>
                </ul>
              </div>

              <div className="relative pl-12 pb-8">
                <div className="absolute left-0 w-8 h-8 bg-[#2e7d32] rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h4 className="text-lg font-bold text-[#01283c] mb-2">2025: Diversificación de productos</h4>
                <ul className="space-y-2 text-[#01283c]">
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
                    <span>Lanzamiento de línea de biofertilizantes y bioestimulantes</span>
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
                    <span>Expansión a nuevos cultivos: café, cacao y berries</span>
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
                    <span>Certificación orgánica internacional para todos los productos</span>
                  </li>
                </ul>
              </div>

              <div className="relative pl-12">
                <div className="absolute left-0 w-8 h-8 bg-[#2e7d32] rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h4 className="text-lg font-bold text-[#01283c] mb-2">2026: Expansión internacional</h4>
                <ul className="space-y-2 text-[#01283c]">
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
                    <span>Apertura de oficinas comerciales en Ecuador y Colombia</span>
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
                    <span>Desarrollo de soluciones biotecnológicas para cultivos tropicales</span>
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
                    <span>Alianzas estratégicas con distribuidores internacionales</span>
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
