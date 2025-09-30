"use client"

import { FichaTecnicaCompletaDatabase } from '@/types/database'

interface FichaTecnicaDinamicaProps {
  ficha: FichaTecnicaCompletaDatabase
}

export function FichaTecnicaDinamica({ ficha }: FichaTecnicaDinamicaProps) {
  return (
    <div className="mx-auto max-w-[210mm] bg-white p-6 print:p-0 page-break-before">
      <div className="border border-green-300 rounded-lg overflow-hidden">
        {/* Encabezado de la ficha técnica */}
        <div className="bg-[#5D9848] text-white p-3 flex items-center">
          <div className="w-12 h-12 bg-[#C25B28] flex items-center justify-center mr-3 rounded-md">
            <div className="w-8 h-8 border-t-3 border-r-3 border-white transform rotate-45"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold">FICHA TÉCNICA</h2>
            <h3 className="text-base font-bold">
              {ficha.fit_tec_nom_planta_vac?.toUpperCase() || 'NOMBRE DE PLANTA'}
            </h3>
            <p className="text-sm">
              CÓDIGO: {ficha.fit_tec_cod_vac || 'SIN CÓDIGO'}
            </p>
          </div>
        </div>

        {/* Contenido de la ficha técnica */}
        <div className="p-4 bg-white text-xs">
          <p className="text-[9pt] mb-3">
            Distribución gratuita de la información del producto especificado en este documento. Queda prohibido
            su copia o mal uso de los datos para bien propio. La empresa emisora se reserva todos los derechos.
          </p>

          {/* 1. DATOS DEL PRODUCTOR - Contenido estático */}
          <div className="mb-4">
            <h4 className="font-bold text-sm mb-1">1. DATOS DEL PRODUCTOR</h4>
            <p>Producido por AS Laboratorios Control Biológico S.A.C.</p>

            <div className="mt-1">
              <p className="font-bold">Titular de Registro:</p>
              <p>AS Laboratorios Control Biológico S.A.C.</p>
              <p>Jr. Huancavelica 315, Urb. Palermo.</p>
              <p>PERÚ - LA LIBERTAD - TRUJILLO - TRUJILLO</p>
            </div>

            <div className="mt-1">
              <p className="font-bold">Contacto:</p>
              <p>Mail Corporativo: gerencia@aslaboratorios.com</p>
              <p>Mail Ventas: ventas@aslaboratorios.com</p>
              <p>WhatsApp: +51 961 996 645</p>
            </div>
          </div>

          {/* 2. DATOS DE DISTRIBUCIÓN - Contenido estático */}
          <div className="mb-4">
            <h4 className="font-bold text-sm mb-1">2. DATOS DE DISTRIBUCIÓN</h4>
            <p>Distribuido por AS Laboratorios Control Biológico S.A.C.</p>

            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="bg-green-100 p-2 rounded-md text-[9pt]">
                <p className="font-bold">Distribución Nacional</p>
                <p>■ Vía Terrestre</p>
                <p>A cargo de la empresa productora.</p>
              </div>
              <div className="bg-red-50 p-2 rounded-md text-[9pt]">
                <p className="font-bold">Distribución Internacional.</p>
                <p>■ Vía terrestre/aérea/marítima.</p>
                <p>A cargo del cliente/comprador</p>
              </div>
              <div className="bg-red-50 p-2 rounded-md text-[9pt]">
                <p className="font-bold">Otras vías de distribución.</p>
                <p>■ Entrega directa.</p>
                <p>Recojo del cliente/comprador.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* 3. TAXONOMÍA - Datos de BD */}
            <div>
              <h4 className="font-bold text-sm mb-1">3. TAXONOMÍA</h4>
              <table className="w-full border-collapse text-[9pt]">
                <tbody>
                  <tr className="border border-gray-300 bg-gray-100">
                    <td className="p-1 font-semibold">FAMILIA</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.taxonomia?.ta_familia_vac || 'No especificado'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold border border-gray-300">GÉNERO</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.taxonomia?.ta_genero_vac || 'No especificado'}
                    </td>
                  </tr>
                  <tr className="border border-gray-300 bg-gray-100">
                    <td className="p-1 font-semibold">NOMBRE CIENTÍFICO</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.taxonomia?.ta_nombre_cientifico_vac || 'No especificado'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold border border-gray-300">GRUPO</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.taxonomia?.ta_grupo_vac || 'No especificado'}
                    </td>
                  </tr>
                  <tr className="border border-gray-300 bg-gray-100">
                    <td className="p-1 font-semibold">NOMBRE COMÚN</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.taxonomia?.ta_nombre_comun_vac || 'No especificado'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4. DESCRIPCIÓN BOTÁNICA - Datos de BD */}
            <div>
              <h4 className="font-bold text-sm mb-1">4. DESCRIPCIÓN BOTÁNICA</h4>
              <p className="text-[9pt]">
                {ficha.detalle?.dft_desc_vac || 
                  'Es una planta perenne de gran tamaño, como las demás especies de musa, carece de verdadero tronco, posee vainas foliares que se desarrollan formando estructuras llamadas pseudotallos, similares a fustes verticales de hasta 30 cm de diámetro basal que no son leñosos y alcanzan hasta los 3 m de altura.'
                }
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* 5. ZONA DE COLECTA DE GERMOPLASMA - Datos de BD */}
            <div>
              <h4 className="font-bold text-sm mb-1">5. ZONA DE COLECTA DE GERMOPLASMA</h4>
              <table className="w-full border-collapse text-[9pt]">
                <tbody>
                  <tr className="border border-gray-300 bg-gray-100">
                    <td className="p-1 font-semibold">PAÍS</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.zona_colecta?.zcg_pais_vac || 'Perú'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold border border-gray-300">REGIÓN</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.zona_colecta?.zcg_region_vac || 'La Libertad'}
                    </td>
                  </tr>
                  <tr className="border border-gray-300 bg-gray-100">
                    <td className="p-1 font-semibold">PROVINCIA</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.zona_colecta?.zcg_provincia_vac || 'No especificado'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold border border-gray-300">DISTRITO</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.zona_colecta?.zcg_distrito_vac || 'No especificado'}
                    </td>
                  </tr>
                  <tr className="border border-gray-300 bg-gray-100">
                    <td className="p-1 font-semibold">ZONA</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.zona_colecta?.zcg_zona_vac || 'No especificado'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 font-semibold border border-gray-300">FECHA</td>
                    <td className="p-1 border border-gray-300">
                      {ficha.zona_colecta?.zcg_fecha_vac || 'No especificado'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              {/* 6. PARCELA DE COLECTA - Datos de BD */}
              <h4 className="font-bold text-sm mb-1">6. PARCELA DE COLECTA DE GERMOPLASMA</h4>
              <p className="text-[9pt]">
                {ficha.detalle?.dft_parcela_vac || 'No especificado'}
              </p>

              {/* 7. ZONA DE COLECTA PRODUCCIÓN IN VITRO - Datos de BD */}
              <h4 className="font-bold text-sm mt-2 mb-1">7. ZONA DE COLECTA PRODUCCIÓN IN VITRO</h4>
              <p className="text-[9pt]">
                {ficha.detalle?.dft_zona_colecta_vac || 'Parcela de banco de germoplasma AS Labs.'}
              </p>
            </div>
          </div>

          {/* 8. PRESENTACIÓN DEL PRODUCTO - Datos de BD */}
          <div className="mb-4">
            <h4 className="font-bold text-sm mb-1">8. PRESENTACIÓN DEL PRODUCTO</h4>
            <p className="text-[9pt]">
              {ficha.detalle?.dft_present_vac || 
                'Planta procedente de cultivo meristemático, libre de enfermedades y patógenos.'
              }
            </p>
          </div>

          {/* Pie de página - Contenido estático */}
          <div className="text-center text-[9pt] mt-4 text-gray-600">
            <p>Huancavelica 315, Palermo. Trujillo - Trujillo - La Libertad</p>
            <p>ventas@aslaboratorios.com</p>
            <p>www.aslaboratorios.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}