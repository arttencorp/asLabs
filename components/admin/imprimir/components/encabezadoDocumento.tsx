import Image from "next/image"
import { obtenerTituloDocumento } from "../utils"

interface EncabezadoDocumentoProps {
  tipoDocumento?: string
  numeroCotizacion?: string
}

export function EncabezadoDocumento({ tipoDocumento, numeroCotizacion }: EncabezadoDocumentoProps) {
  return (
    <>
      <div className="h-1.5 w-full bg-[#5D9848] print:h-1.5"></div>
      
      <div className="mt-3 flex justify-between">
        <div className="text-xs">
          <h1 className="text-base font-bold">
            {obtenerTituloDocumento(tipoDocumento)} {numeroCotizacion || ""}
          </h1>
          <p>Razón Social: AS LABORATORIOS CONTROL BIOLÓGICO S.A.C.</p>
          <p>RUC: 20440181792</p>
          <p>Jr. Huancavelica, 315 Palermo. 2do Piso</p>
          <p>PERÚ, LA LIBERTAD, TRUJILLO, 13011</p>
          <p>ventas@aslaboratorios.com</p>
          <p>Teléfono: +51 961 996 645</p>
        </div>
        <div className="flex items-start justify-end">
          <Image
            src="/images/new-logo.png"
            alt="AS Laboratorios"
            width={160}
            height={48}
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="my-3 h-[1px] w-full bg-gray-300"></div>
    </>
  )
}