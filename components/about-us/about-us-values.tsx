export default function AboutUsValues() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Fondo ondulado */}
      <div className="absolute inset-0 bg-[#e7f3f8] z-0">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          height="150"
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 25C240 75 480 125 720 125C960 125 1200 75 1440 25V150H0V25Z" fill="white" />
        </svg>
        <svg
          className="absolute top-0 left-0 right-0 w-full"
          height="150"
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(180deg)" }}
        >
          <path d="M0 25C240 75 480 125 720 125C960 125 1200 75 1440 25V150H0V25Z" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-[#01283c] mb-6">Nuestros Valores</h2>
            <p className="text-base text-[#01283c] mb-6">
              En AS Laboratorios, nuestros valores son el fundamento de todo lo que hacemos. Guían nuestras decisiones,
              nuestras relaciones y nuestro compromiso con la excelencia científica y el desarrollo sostenible.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-x-16 gap-y-12">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mr-4">
                  <svg
                    className="w-8 h-8 text-[#2e7d32]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8l-2-2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#01283c]">Innovación</h3>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mr-4">
                  <svg
                    className="w-8 h-8 text-[#2e7d32]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#01283c]">Colaboración</h3>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mr-4">
                  <svg
                    className="w-8 h-8 text-[#2e7d32]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#01283c]">Excelencia</h3>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mr-4">
                  <svg
                    className="w-8 h-8 text-[#2e7d32]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#01283c]">Sostenibilidad</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
