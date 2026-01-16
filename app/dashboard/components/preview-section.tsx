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
            border-bottom: 2px solid #000; 
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
            background: #000; 
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
            <img src="/aslabs-logo.png" alt="Logo" class="logo">
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
                    <td>${result.metodo}</td>
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
