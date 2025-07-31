"use client"

import { useCotizacionImpresion } from "@/components/admin/cotizaciones/imprimir/hooks/useCotizacionImpresion"
import { ControlesImpresion } from "@/components/admin/cotizaciones/imprimir/components/controlesImpresion"
import { EncabezadoDocumento } from "@/components/admin/cotizaciones/imprimir/components/encabezadoDocumento"
import { InformacionCliente } from "@/components/admin/cotizaciones/imprimir/components/informacionCliente"
import { TablaProductos } from "@/components/admin/cotizaciones/imprimir/components/tablaProductos"
import { CondicionesEntrega } from "@/components/admin/cotizaciones/imprimir/components/condicionesEntrega"
import { TerminosCondiciones } from "@/components/admin/cotizaciones/imprimir/components/terminosCondiciones"
import { CertificadosCalidad } from "@/components/admin/cotizaciones/imprimir/components/certificadosCalidad"
import { MetodosPago } from "@/components/admin/cotizaciones/imprimir/components/metodosPago"
import { FichaTecnicaASC5 } from "@/components/admin/cotizaciones/imprimir/components/fichaTecnicaASC5"
import { FichaTecnicaASWG } from "@/components/admin/cotizaciones/imprimir/components/fichaTecnicaASWG"
import { CertificadosSENASA } from "@/components/admin/cotizaciones/imprimir/components/certificadosSENASA"
import { Button } from "@/components/ui/button"

export default function ImprimirCotizacion() {
  const {
    cotizacion,
    cargando,
    error,
    imprimir,
    volverACrear,
    volverAlInicio,
    tieneASWG,
    tieneASC5,
    esLaboratorio
  } = useCotizacionImpresion()

  if (cargando) {
    return (
      <div className="container mx-auto flex h-[70vh] items-center justify-center py-8">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Cargando información de la cotización...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">{error}</p>
          <Button className="mt-4" onClick={volverAlInicio}>
            Volver al inicio
          </Button>
        </div>
      </div>
    )
  }

  if (!cotizacion) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-lg font-medium">No se encontró información de la cotización</p>
          <Button className="mt-4" onClick={volverAlInicio}>
            Volver al inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <ControlesImpresion
        onVolverInicio={volverAlInicio}
        onVolverACrear={volverACrear}
        onImprimir={imprimir}
        tipoDocumento={cotizacion.tipoDocumento}
      />
      <div className="print-page">
        <div className={`mx-auto max-w-[210mm] bg-white p-6 text-sm print:p-0 print:text-[11pt] ${esLaboratorio ? "font-sans" : ""}`}>
          <EncabezadoDocumento
            tipoDocumento={cotizacion.tipoDocumento}
            numeroCotizacion={cotizacion.numeroCotizacion}
          />

          <InformacionCliente
            razonSocial={cotizacion.razonSocial}
            dniRuc={cotizacion.dniRuc}
            direccion={cotizacion.direccion}
            telefono={cotizacion.telefono}
            fechaEmision={cotizacion.fechaEmision}
            fechaVencimiento={cotizacion.fechaVencimiento}
          />

          <TablaProductos
            items={cotizacion.items}
            subtotal={cotizacion.subtotal}
            impuesto={cotizacion.impuesto}
            total={cotizacion.total}
            esLaboratorio={esLaboratorio}
            preciosConIGV={cotizacion.preciosConIGV}
          />

          <CondicionesEntrega
            formaPago={cotizacion.formaPago}
            total={cotizacion.total}
            totalTexto={cotizacion.totalTexto}
            lugarRecojo={cotizacion.lugarRecojo}
            formaEntrega={cotizacion.formaEntrega}
            esLaboratorio={esLaboratorio}
          />

          <TerminosCondiciones
            terminosCondiciones={cotizacion.terminosCondiciones}
            esLaboratorio={esLaboratorio}
          />

          {!esLaboratorio && cotizacion.certificadosCalidad && (
            <CertificadosCalidad
              certificadosCalidad={cotizacion.certificadosCalidad}
              tieneASWG={tieneASWG}
              tieneASC5={tieneASC5}
            />
          )}

          <MetodosPago esLaboratorio={esLaboratorio} />
        </div>
      </div>
      {/* Fichas técnicas */}
      {!esLaboratorio && (
        <>
          {tieneASC5 && !tieneASWG && <FichaTecnicaASC5 />}
          {tieneASWG && !tieneASC5 && <FichaTecnicaASWG />}
          {tieneASWG && tieneASC5 && (
            <>
              <FichaTecnicaASC5 />
              <FichaTecnicaASWG />
            </>
          )}
        </>
      )}

      {/* Certificados SENASA */}
      {!esLaboratorio && <CertificadosSENASA tieneASC5={tieneASC5} tieneASWG={tieneASWG} />}
    </>
  )
}