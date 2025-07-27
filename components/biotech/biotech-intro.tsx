import Image from "next/image"

export default function BiotechIntro() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#01283c] mb-4">¿Qué es la Biotecnología Vegetal?</h2>
          <p className="text-center text-base text-[#01283c] mb-12">
            La biotecnología vegetal es la aplicación de técnicas científicas para modificar y mejorar plantas,
            utilizando sus células y tejidos para crear nuevos individuos idénticos genéticamente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-bold text-[#2e7d32] mb-4">Conceptos básicos</h3>
              <p className="text-[#01283c] mb-4">
                La biotecnología vegetal aprovecha una característica única de las plantas: la{" "}
                <strong>totipotencia celular</strong>. Esto significa que cada célula vegetal contiene toda la
                información genética necesaria para desarrollar una planta completa e idéntica a la original.
              </p>
              <p className="text-[#01283c] mb-4">
                A diferencia de la reproducción sexual (por semillas), donde se combinan genes de dos plantas
                progenitoras, la <strong>clonación vegetal</strong> permite obtener copias exactas de una planta con
                características deseables, manteniendo sus propiedades intactas.
              </p>
              <p className="text-[#01283c]">
                Este proceso, también conocido como <strong>propagación in vitro</strong> o{" "}
                <strong>micropropagación</strong>, se realiza en condiciones de laboratorio controladas, asegurando
                plantas libres de enfermedades y con características uniformes.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/biotech-concept.png"
                alt="Concepto de biotecnología vegetal"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-[#2e7d32] mb-4">¿Por qué es importante?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-[#2e7d32]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-[#01283c] mb-2">Calidad superior</h4>
                <p className="text-gray-600">
                  Permite producir plantas libres de enfermedades, con características uniformes y de alta calidad
                  genética.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-[#2e7d32]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-[#01283c] mb-2">Rapidez y eficiencia</h4>
                <p className="text-gray-600">
                  Acelera enormemente el proceso de multiplicación, produciendo miles de plantas en poco espacio y
                  tiempo.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-[#2e7d32]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-[#01283c] mb-2">Conservación</h4>
                <p className="text-gray-600">
                  Ayuda a preservar especies en peligro de extinción y mantener la biodiversidad vegetal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
