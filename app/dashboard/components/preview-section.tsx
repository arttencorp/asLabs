"use client"
import type { Document } from "../types"

interface PreviewSectionProps {
  document: Document
  onBack: () => void
}

export default function PreviewSection({ document, onBack }: PreviewSectionProps) {
  const handleOpenInNewTab = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(getDocumentHTML())
      printWindow.document.close()
    }
  }

  const getDocumentHTML = () => {
    const renderChart = (resultado: number, min: number, max: number, unidad: string) => {
      const escala = max * 2
      const posicionResultado = (resultado / escala) * 100
      const barColor = resultado >= min && resultado <= max ? "#333" : "#333"

      return `
        <div style="display: flex; align-items: center; gap: 8px; margin-left: 12px;">
          <div style="position: relative; width: 80px; height: 12px; background: #e0e0e0; border: 1px solid #999; border-radius: 2px;">
            <div style="position: absolute; top: 0; bottom: 0; background: #ccc; left: ${(min / escala) * 100}%; right: ${100 - (max / escala) * 100}%;"></div>
            <div style="position: absolute; top: 0; bottom: 0; width: 2px; background: ${barColor}; left: ${posicionResultado}%;"></div>
          </div>
          <span style="font-size: 10px; white-space: nowrap;">${resultado} ${unidad}</span>
        </div>
      `
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Documento AS Laboratorios</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { height: 100%; }
          body { 
            font-family: 'Georgia', serif; 
            margin: 0;
            padding: 10mm;
            background: white;
          }
          .page { 
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            padding: 10mm;
            background: white;
            display: flex;
            flex-direction: column;
            font-size: 10px;
          }
          .header { 
            display: flex; 
            align-items: center; 
            gap: 12px; 
            border-bottom: 3px solid #00A651; 
            padding-bottom: 8px; 
            margin-bottom: 8px;
          }
          .logo { width: 50px; height: 50px; }
          .title { font-size: 12px; font-weight: bold; }
          .subtitle { font-size: 9px; color: #666; }
          .code-date { text-align: right; font-size: 9px; }
          .address-section { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 12px; 
            margin-bottom: 8px; 
            font-size: 9px;
          }
          .address-title { font-weight: bold; font-size: 9px; }
          .section-title { 
            font-size: 10px; 
            font-weight: bold; 
            background: #00A651; 
            color: white; 
            padding: 4px; 
            margin: 6px 0 4px 0;
          }
          .info-box { 
            border: 1px solid #ccc; 
            padding: 6px; 
            margin-bottom: 6px; 
            font-size: 9px;
          }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
          .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
          .label { font-weight: bold; font-size: 8px; color: #333; }
          .value { font-size: 9px; margin-top: 2px; }
          .results-table { 
            width: 100%; 
            border-collapse: collapse; 
            font-size: 9px; 
            margin-bottom: 8px;
          }
          .results-table th { 
            background: #f5f5f5; 
            border: 1px solid #ddd; 
            padding: 4px; 
            text-align: left; 
            font-weight: bold;
            font-size: 8px;
          }
          .results-table td { 
            border: 1px solid #ddd; 
            padding: 4px;
            font-size: 9px;
          }
          .chart-cell {
            display: flex;
            align-items: center;
          }
          .signatures { 
            display: grid; 
            grid-template-columns: 1fr 1fr 1fr; 
            gap: 16px; 
            margin-top: 20px; 
            text-align: center;
            font-size: 9px;
          }
          .sig-line { border-top: 1px solid #000; height: 30px; }
          .sig-name { font-size: 9px; font-weight: bold; margin-top: 4px; }
          .sig-cargo { font-size: 8px; color: #666; }
          .disclaimer { 
            background: #fff9e6; 
            border: 1px solid #ffc107; 
            padding: 6px; 
            margin-top: 8px; 
            font-size: 8px;
          }
          .footer { 
            text-align: center; 
            font-size: 8px; 
            color: #666; 
            margin-top: 8px; 
            border-top: 1px solid #ccc; 
            padding-top: 6px;
          }
          .back-button {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 8px 16px;
            background: #000;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
          }
          @media print { 
            body { margin: 0; padding: 0; }
            .page { margin: 0; padding: 10mm; }
            .back-button { display: none; }
          }
        </style>
      </head>
      <body>
        <button class="back-button" onclick="window.close()">Cerrar</button>
        <div class="page">
          <!-- Header -->
          <div class="header">
            <div style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border: 2px solid #00A651; border-radius: 4px; background: #f9f9f9; font-weight: bold; color: #00A651; font-size: 14px;">AS</div>
            <div>
              <div class="title">AS LABORATORIOS</div>
              <div class="subtitle">${document.tipo === "certificado" ? "CERTIFICADO DE ANÁLISIS" : "INFORME DE ANÁLISIS"}</div>
            </div>
            <div class="code-date">
              <div class="label">Código: ${document.codigoDocumento}</div>
              <div class="label">Fecha: ${document.fechaEmision}</div>
            </div>
          </div>

          <!-- Direcciones -->
          <div class="address-section">
            <div>
              <div class="address-title">Of. Central:</div>
              <div style="font-size: 9px;">Jr. Huancavelica 315, II Piso<br>Urb. Palermo</div>
            </div>
            <div>
              <div class="address-title">Lab. Biotecnología:</div>
              <div style="font-size: 9px;">Mz J1 II Piso<br>Urb. San Isidro 2da Etapa</div>
            </div>
          </div>

          <!-- Cliente -->
          <div class="section-title">INFORMACIÓN DEL CLIENTE</div>
          <div class="info-box">
            <div class="grid-2">
              <div>
                <div class="label">Razón Social:</div>
                <div class="value">${document.cliente.razonSocial}</div>
              </div>
              <div>
                <div class="label">RUC/DNI:</div>
                <div class="value">${document.cliente.ruc}</div>
              </div>
            </div>
          </div>

          <!-- Servicio -->
          <div class="section-title">ANÁLISIS REALIZADO</div>
          <div class="info-box">
            <div>
              <div class="label">Servicio:</div>
              <div class="value">${document.servicio.servicio}</div>
            </div>
          </div>

          <!-- Muestras -->
          <div class="section-title">MUESTRAS ANALIZADAS</div>
          ${document.muestras
            .map(
              (muestra) => `
            <div class="info-box">
              <div class="grid-3">
                <div>
                  <div class="label">Código:</div>
                  <div class="value">${muestra.codigoMuestra}</div>
                </div>
                <div>
                  <div class="label">Matriz:</div>
                  <div class="value">${muestra.tipoMatriz}</div>
                </div>
              <div>
                <div class="label">Lugar Registro:</div>
                <div class="value">${muestra.lugarRegistro}</div>
              </div>
            </div>
            <div class="grid-3" style="margin-top: 4px;">
              <div>
                <div class="label">Centro Registro:</div>
                <div class="value">${muestra.centroRegistro}</div>
              </div>
              <div>
                <div class="label">Recepción:</div>
                <div class="value">${muestra.fechaRecepcion}</div>
              </div>
              <div>
                <div class="label">Análisis:</div>
                <div class="value">${muestra.fechaAnalisis}</div>
              </div>
            </div>
            ${
              muestra.observaciones
                ? `<div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid #ddd;">
                <div class="label">Observaciones Muestra:</div>
                <div class="value">${muestra.observaciones}</div>
              </div>`
                : ""
            }
          </div>
          `,
            )
            .join("")}

          <!-- Resultados -->
          ${
            document.resultados.length > 0
              ? `
            <div class="section-title">RESULTADOS</div>
            <table class="results-table">
              <thead>
                <tr>
                  <th>Parámetro</th>
                  <th>Resultado</th>
                  <th>Unidad</th>
                  <th>Valor Referencial</th>
                  <th>Método</th>
                </tr>
              </thead>
              <tbody>
                ${document.resultados
                  .map(
                    (result) => `
                  <tr>
                    <td>${result.parametro}</td>
                    <td><strong>${result.resultado}</strong></td>
                    <td>${result.unidad}</td>
                    <td>${
                      result.valorReferencial?.min && result.valorReferencial?.max && result.valorReferencial?.showChart
                        ? renderChart(
                            Number.parseFloat(result.resultado) || 0,
                            result.valorReferencial.min,
                            result.valorReferencial.max,
                            result.unidad,
                          )
                        : result.valorReferencial?.min
                          ? `${result.valorReferencial.min}-${result.valorReferencial.max}`
                          : "-"
                    }</td>
                    <td>${result.metodo}${result.observaciones ? `<br><em style="font-size: 8px; color: #666;">Obs: ${result.observaciones}</em>` : ""}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          `
              : ""
          }

          <!-- Firmas -->
          <div class="signatures">
            ${
              document.firmas.length > 0
                ? document.firmas
                    .map(
                      (firma) => `
              <div>
                <div class="sig-line"></div>
                <div class="sig-name">${firma.nombre}</div>
                <div class="sig-cargo">${firma.cargo}</div>
              </div>
            `,
                    )
                    .join("")
                : `
              <div><div class="sig-line"></div><div style="font-size: 9px;">Firma Autorizada</div></div>
              <div><div class="sig-line"></div><div style="font-size: 9px;">Firma Autorizada</div></div>
              <div><div class="sig-line"></div><div style="font-size: 9px;">Firma Autorizada</div></div>
            `
            }
          </div>

          <!-- DECLARACION (Bacteriología) -->
          ${
            document.area === "bacteriologia"
              ? `
            <div class="section-title">DECLARACIÓN</div>
            <div class="info-box">
              <p>Este documento registra la información declarada por el remitente y la evaluación preanalítica realizada al momento de la recepción, además de resultados de tamizaje y pruebas bioquímicas según el alcance solicitado. La identificación puede ser presuntiva o confirmatoria dependiendo del panel aplicado, controles y consistencia del patrón bioquímico.</p>
            </div>
          `
              : ""
          }

          <!-- AISLAMIENTO Y CARACTERIZACION INICIAL (Bacteriología) -->
          ${
            document.bacterialAnalysis
              ? `
            <div class="section-title">4) AISLAMIENTO Y CARACTERIZACIÓN INICIAL</div>
            <div class="info-box">
              <table class="results-table">
                <tr>
                  <td colspan="2"><strong>Medios de cultivo utilizados:</strong> ${document.bacterialAnalysis.mediostilizados?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Condiciones de incubación:</strong> T° ${document.bacterialAnalysis.temperatura || "___"}°C | Atmósfera: ${document.bacterialAnalysis.atmosfera?.join(", ") || "__"} | Tiempo: ${document.bacterialAnalysis.tiempoIncubacion || "___"}h</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Morfología de colonia:</strong> Tamaño: ${document.bacterialAnalysis.tamanoColonia?.join(", ") || "__"} | Forma: ${document.bacterialAnalysis.forma?.join(", ") || "__"} | Borde: ${document.bacterialAnalysis.borde?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Características adicionales:</strong> Elevación: ${document.bacterialAnalysis.elevacion?.join(", ") || "__"} | Superficie: ${document.bacterialAnalysis.superficie?.join(", ") || "__"} | Pigmento: ${document.bacterialAnalysis.pigmento || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Tinción de Gram:</strong> Gram+ ${document.bacterialAnalysis.gramPositivo ? "☑" : "☐"} | Gram- ${document.bacterialAnalysis.gramNegativo ? "☑" : "☐"} | Morfología: ${document.bacterialAnalysis.morfologia?.join(", ") || "__"} | Arreglo: ${document.bacterialAnalysis.arreglo?.join(", ") || "__"}</td>
                </tr>
              </table>
              ${document.bacterialAnalysis.notas ? `<p style="margin-top: 4px; font-size: 9px;"><strong>Notas:</strong> ${document.bacterialAnalysis.notas}</p>` : ""}
            </div>
          `
              : ""
          }

          <!-- CONTROL DE CALIDAD (Bacteriología) -->
          ${
            document.qcControl
              ? `
            <div class="section-title">CONTROL DE CALIDAD (OBLIGATORIO)</div>
            <div class="info-box">
              <table class="results-table">
                <tr>
                  <td><strong>Lote de medios:</strong> ${document.qcControl.loteMedios || "__"}</td>
                  <td><strong>Vence:</strong> ${document.qcControl.venceMedios || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Control positivo:</strong> ${document.qcControl.controlPositivoAplicado ? "Aplicado ☑" : "No aplicado ☐"} | Cepa: ${document.qcControl.controlPositivoCepa || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Control negativo:</strong> ${document.qcControl.controlNegativoAplicado ? "Aplicado ☑" : "No aplicado ☐"} | Cepa: ${document.qcControl.controlNegativoCepa || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Incubadora verificada:</strong> ${document.qcControl.incubadoraVerificada ? "Si ☑" : "No ☐"} | T° registrada: ${document.qcControl.temperaturaRegistrada || "___"}°C</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Desviaciones / acciones:</strong> ${document.qcControl.desviaciones || "__"}</td>
                </tr>
              </table>
            </div>
          `
              : ""
          }

          <!-- INTERPRETACION TAXONOMICA (Bacteriología) -->
          ${
            document.taxonomicInterpretation
              ? `
            <div class="section-title">7) INTERPRETACIÓN TAXONÓMICA</div>
            <div class="info-box">
              <table class="results-table">
                <tr>
                  <td><strong>Grupo probable:</strong> ${document.taxonomicInterpretation.grupoProbable?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Identificación propuesta - Género:</strong> ${document.taxonomicInterpretation.generoIdentificado || "__"} | Especie: ${document.taxonomicInterpretation.especieIdentificada || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Nivel de confianza:</strong> ${document.taxonomicInterpretation.nivelConfianza?.toUpperCase() || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Base de asignación:</strong> ${document.taxonomicInterpretation.baseAsignacion?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Limitaciones técnicas:</strong> ${document.taxonomicInterpretation.limitacionesTecnicas?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Recomendación de confirmación:</strong> ${document.taxonomicInterpretation.recomendacionConfirmacion?.join(", ") || "__"}</td>
                </tr>
              </table>
              ${document.taxonomicInterpretation.notas ? `<p style="margin-top: 4px; font-size: 9px;"><strong>Notas:</strong> ${document.taxonomicInterpretation.notas}</p>` : ""}
            </div>
          `
              : ""
          }

          <!-- REGISTRO FOTOGRAFICO (Bacteriología) -->
          ${
            document.photographicRegistry
              ? `
            <div class="section-title">8) REGISTRO FOTOGRÁFICO</div>
            <div class="info-box">
              <div style="border: 1px dashed #999; padding: 20px; text-align: center; margin-bottom: 6px; min-height: 60px;">
                <div style="font-size: 10px; font-weight: bold;">Figura: ${document.photographicRegistry.figura || "_______________"}</div>
              </div>
              <div style="font-size: 9px;"><strong>Nota:</strong> ${document.photographicRegistry.nota || "_____________________________________________________________________________"}</div>
            </div>
          `
              : ""
          }

          <!-- Disclaimer -->
          <div class="disclaimer">
            <strong>ACLARACIÓN:</strong> Los resultados no incluyen factores de corrección. Datos almacenados indefinidamente en base de datos para trazabilidad y monitoreo.
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>AS Laboratorios | Teléfono: +51 961 996 645 | Email: ventas@aslaboratorios.com</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  return (
    <div className="text-center py-6">
      <button
        onClick={handleOpenInNewTab}
        className="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-serif text-sm font-semibold"
      >
        Abrir Documento en Nueva Pestaña
      </button>
    </div>
  )
}
