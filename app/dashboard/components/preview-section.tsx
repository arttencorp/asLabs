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

  const getDocumentHTML = () => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Documento AS Laboratorios</title>
      <style>
        body { font-family: 'Georgia', serif; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .header { display: flex; align-items: center; gap: 15px; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 15px; }
        .logo { width: 60px; height: 60px; }
        .title { font-size: 14px; font-weight: bold; }
        .subtitle { font-size: 11px; color: #666; }
        .code-date { text-align: right; font-size: 10px; }
        .address-section { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 12px; font-size: 10px; }
        .address-title { font-weight: bold; font-size: 10px; }
        .section-title { font-size: 11px; font-weight: bold; background: #000; color: white; padding: 6px; margin: 12px 0 8px 0; }
        .info-box { border: 1px solid #ccc; padding: 8px; margin-bottom: 8px; font-size: 10px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; }
        .label { font-weight: bold; font-size: 9px; color: #333; }
        .value { font-size: 10px; margin-top: 2px; }
        .results-table { width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 12px; }
        .results-table th { background: #f5f5f5; border: 1px solid #ddd; padding: 6px; text-align: left; font-weight: bold; }
        .results-table td { border: 1px solid #ddd; padding: 6px; }
        .signatures { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 30px; text-align: center; }
        .sig-line { border-top: 1px solid #000; height: 40px; }
        .sig-name { font-size: 10px; font-weight: bold; margin-top: 5px; }
        .sig-cargo { font-size: 9px; color: #666; }
        .disclaimer { background: #fff9e6; border: 1px solid #ffc107; padding: 8px; margin-top: 15px; font-size: 9px; }
        .footer { text-align: center; font-size: 9px; color: #666; margin-top: 15px; border-top: 1px solid #ccc; padding-top: 10px; }
        @media print { body { margin: 0; padding: 10px; } }
      </style>
    </head>
    <body>
      <div class="container">
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
            <div style="font-size: 10px;">Jr. Huancavelica 315, II Piso<br>Urb. Palermo</div>
          </div>
          <div>
            <div class="address-title">Lab. Biotecnología:</div>
            <div style="font-size: 10px;">Mz J1 II Piso<br>Urb. San Isidro 2da Etapa</div>
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
            <div>
              <div class="label">Contacto:</div>
              <div class="value">${document.cliente.contacto}</div>
            </div>
            <div>
              <div class="label">Teléfono:</div>
              <div class="value">${document.cliente.telefono}</div>
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
          <div style="margin-top: 6px;">
            <div class="label">Alcance:</div>
            <div class="value">${document.servicio.alcance}</div>
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
            <div class="grid-3" style="margin-top: 6px;">
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
                <th>Valor Ref.</th>
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
                  <td>${result.valorReferencial?.min ? `${result.valorReferencial.min}-${result.valorReferencial.max}` : "-"}</td>
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
              <div style="font-size: 9px; color: #999;">${firma.fecha}</div>
            </div>
          `,
                  )
                  .join("")
              : `
            <div><div class="sig-line"></div><div style="font-size: 10px;">Firma Autorizada</div></div>
            <div><div class="sig-line"></div><div style="font-size: 10px;">Firma Autorizada</div></div>
            <div><div class="sig-line"></div><div style="font-size: 10px;">Firma Autorizada</div></div>
          `
          }
        </div>

        <!-- Disclaimer -->
        <div class="disclaimer">
          <strong>ACLARACIÓN IMPORTANTE:</strong> Los resultados presentados en este documento no incluyen factores de corrección. Todos los datos, evidencia y resultados se almacenarán en la base de datos de AS Laboratorios de forma indefinida para propósitos de trazabilidad, control de calidad y monitoreo según normativas nacionales e internacionales.
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>AS Laboratorios - Trujillo, La Libertad, Perú</p>
          <p>Teléfono: +51 961 996 645 | Email: ventas@aslaboratorios.com</p>
          <p>Documento generado por sistema ASLAB</p>
        </div>
      </div>
      <script>
        window.print();
      </script>
    </body>
    </html>
  `

  return (
    <div className="text-center">
      <button
        onClick={handleOpenInNewTab}
        className="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-serif text-sm font-semibold"
      >
        Abrir Documento en Nueva Pestaña
      </button>
    </div>
  )
}
