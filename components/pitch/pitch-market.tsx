export default function PitchMarket() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#01283c] mb-4">Mercado Objetivo</h2>
            <p className="text-lg text-[#01283c]">
              Un mercado en crecimiento con alta demanda de soluciones sostenibles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#2e7d32] mb-2">$8.5B</div>
              <h3 className="text-lg font-medium text-[#01283c] mb-2">Mercado agrícola peruano</h3>
              <p className="text-gray-600">
                El sector agrícola representa el 5.4% del PIB del Perú, con un crecimiento anual del 3.2%.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#2e7d32] mb-2">15%</div>
              <h3 className="text-lg font-medium text-[#01283c] mb-2">Crecimiento anual</h3>
              <p className="text-gray-600">
                El mercado de biotecnología agrícola y control biológico crece a un ritmo del 15% anual en Perú.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#2e7d32] mb-2">2.2M</div>
              <h3 className="text-lg font-medium text-[#01283c] mb-2">Productores agrícolas</h3>
              <p className="text-gray-600">
                Más de 2.2 millones de productores agrícolas en Perú buscan soluciones para mejorar su productividad.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-bold text-[#01283c] mb-4">Segmentos de mercado</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-1/4 pr-4">
                  <div className="h-4 bg-[#2e7d32] rounded-full relative">
                    <div className="absolute -right-2 -top-1 w-6 h-6 bg-white rounded-full border-2 border-[#2e7d32] flex items-center justify-center text-xs font-bold">
                      45%
                    </div>
                  </div>
                </div>
                <div className="w-3/4">
                  <p className="font-medium text-[#01283c]">Productores de banano y plátano</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/4 pr-4">
                  <div className="h-4 bg-[#2e7d32] rounded-full w-3/4 relative">
                    <div className="absolute -right-2 -top-1 w-6 h-6 bg-white rounded-full border-2 border-[#2e7d32] flex items-center justify-center text-xs font-bold">
                      30%
                    </div>
                  </div>
                </div>
                <div className="w-3/4">
                  <p className="font-medium text-[#01283c]">Empresas agroexportadoras</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/4 pr-4">
                  <div className="h-4 bg-[#2e7d32] rounded-full w-1/2 relative">
                    <div className="absolute -right-2 -top-1 w-6 h-6 bg-white rounded-full border-2 border-[#2e7d32] flex items-center justify-center text-xs font-bold">
                      15%
                    </div>
                  </div>
                </div>
                <div className="w-3/4">
                  <p className="font-medium text-[#01283c]">Instituciones educativas y de investigación</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/4 pr-4">
                  <div className="h-4 bg-[#2e7d32] rounded-full w-1/4 relative">
                    <div className="absolute -right-2 -top-1 w-6 h-6 bg-white rounded-full border-2 border-[#2e7d32] flex items-center justify-center text-xs font-bold">
                      10%
                    </div>
                  </div>
                </div>
                <div className="w-3/4">
                  <p className="font-medium text-[#01283c]">Otros cultivos y sectores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
