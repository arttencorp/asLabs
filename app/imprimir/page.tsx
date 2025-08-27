"use client"

import { useCotizacionImpresion } from "@/components/admin/imprimir/hooks/useCotizacionImpresion"
import { useCertificadosFichas } from "@/components/admin/cotizaciones/hooks/useCertificadosFichas"
import { ControlesImpresion } from "@/components/admin/imprimir/components/controlesImpresion"
import { EncabezadoDocumento } from "@/components/admin/imprimir/components/encabezadoDocumento"
import { InformacionCliente } from "@/components/admin/imprimir/components/informacionCliente"
import { TablaProductos } from "@/components/admin/imprimir/components/tablaProductos"
import { CondicionesEntrega } from "@/components/admin/imprimir/components/condicionesEntrega"
import { TerminosCondiciones } from "@/components/admin/imprimir/components/terminosCondiciones"
import { CertificadosCalidad } from "@/components/admin/imprimir/components/certificadosCalidad"
import { MetodosPago } from "@/components/admin/imprimir/components/metodosPago"
import { FichaTecnicaASC5 } from "@/components/admin/imprimir/components/fichaTecnicaASC5"
import { FichaTecnicaASWG } from "@/components/admin/imprimir/components/fichaTecnicaASWG"
import { FichasTecnicas } from "@/components/admin/imprimir/components/fichasTecnicas"
import { CertificadosSENASA } from "@/components/admin/imprimir/components/certificadosSENASA"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

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

  const { cargarCertificadosParaProductos, cargarFichasParaProductos } = useCertificadosFichas()

  // Cargar certificados y fichas de BD si no están en localStorage
  useEffect(() => {
    if (cotizacion && cotizacion.items && cotizacion.items.length > 0) {
      const productosIds = cotizacion.items.map(item => item.codigo).filter(Boolean) as string[]
      
      if (productosIds.length > 0) {
        // Solo cargar si no hay datos ya cargados
        const needsCertificados = !cotizacion.certificadosEstructurados || cotizacion.certificadosEstructurados.length === 0
        const needsFichas = !cotizacion.fichasTecnicas || cotizacion.fichasTecnicas.length === 0
        
        if (needsCertificados || needsFichas) {
          if (needsCertificados) {
            cargarCertificadosParaProductos(productosIds)
          }
          if (needsFichas) {
            cargarFichasParaProductos(productosIds)
          }
        }
      }
    }
  }, [cotizacion, cargarCertificadosParaProductos, cargarFichasParaProductos])

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
            tipoCliente={cotizacion.tipoCliente}
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

          {/* Fichas técnicas como texto simple (comentado para usar imágenes) */}
          {/* 
          {!esLaboratorio && cotizacion.fichasTecnicas && cotizacion.fichasTecnicas.length > 0 && (
            <div>
              <h3 className="text-sm font-bold mb-1.5 text-[#5D9848]">Fichas Técnicas</h3>
              <div className="space-y-2">
                {cotizacion.fichasTecnicas.map((ficha, index) => (
                  <div key={index}>
                    <h4 className="text-xs font-semibold">{ficha.titulo}</h4>
                    <p className="text-xs text-gray-600">{ficha.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          */}

          {!esLaboratorio && cotizacion.certificadosCalidad && (
            <CertificadosCalidad
              certificadosCalidad={cotizacion.certificadosCalidad}
              certificados={cotizacion.certificadosEstructurados}
              tieneASWG={tieneASWG}
              tieneASC5={tieneASC5}
            />
          )}

          <MetodosPago esLaboratorio={esLaboratorio} />
        </div>
      </div>
      
      {/* Fichas técnicas - Páginas separadas con imágenes de BD */}
      {!esLaboratorio && (
        <>
          {/* Si hay fichas técnicas de BD, mostrar con imágenes */}
          {cotizacion.fichasTecnicas && cotizacion.fichasTecnicas.length > 0 ? (
            <FichasTecnicas fichasTecnicas={cotizacion.fichasTecnicas} />
          ) : (
            <>
              {/* Fallback a fichas hardcodeadas */}
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
        </>
      )}
      
      {/* Imágenes de certificados al final - cada una en su página */}
      {!esLaboratorio && cotizacion.certificadosEstructurados && 
        cotizacion.certificadosEstructurados.some(cert => cert.link) && (
        <>
          {cotizacion.certificadosEstructurados
            .filter(cert => cert.link) // Solo los que tienen imagen
            .map((cert, index) => (
              <div key={index} className="mt-6 page-break-before">
                <div className="mx-auto max-w-[210mm] bg-white print:p-0">
                  <div className="ficha-tecnica-print">
                    <img 
                      src={cert.link} 
                      alt={`Certificado ${cert.titulo || index + 1}`}
                    />
                  </div>
                </div>
              </div>
            ))
          }
        </>
      )}

      {/* Certificados SENASA */}
      {!esLaboratorio && <CertificadosSENASA tieneASC5={tieneASC5} tieneASWG={tieneASWG} />}
    </>
  )
}
