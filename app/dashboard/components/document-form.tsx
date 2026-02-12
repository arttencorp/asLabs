"use client"
import { useState } from "react"
import type { DocumentType, Service, Document, Client, Sample, ResultRow, Signature, BacterialAnalysis, QCControl, TaxonomicInterpretation, PhotographicRegistry, PathogenicityTest } from "../types"
import { useDocumentStore } from "../hooks/useDocumentStore"
import ClientSection from "./client-section"
import SampleSection from "./sample-section"
import ResultsSection from "./results-section"
import SignaturesSection from "./signatures-section"
import ActionButtons from "./action-buttons"
import BacterialAnalysisSection from "./bacterial-analysis-section"
import QCControlSection from "./qc-control-section"
import TaxonomicInterpretationSection from "./taxonomic-interpretation-section"
import PhotographicRegistrySection from "./photographic-registry-section"
import PathogenicityTestSection from "./pathogenicity-test-section"

interface DocumentFormProps {
  documentType: DocumentType
  service: Service
  onClose: () => void
}

export default function DocumentForm({ documentType, service, onClose }: DocumentFormProps) {
  const { generateDocumentCode, saveDocument } = useDocumentStore()

  const [cliente, setCliente] = useState<Client>({
    razonSocial: "",
    ruc: "",
    contacto: "",
    email: "",
    telefono: "",
    direccion: "",
    proyecto: "",
  })

  const [muestras, setMuestras] = useState<Sample[]>([
    {
      codigoMuestra: `ASLAB-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      tipoMatriz: "suelo",
      fechaToma: new Date().toISOString().split("T")[0],
      lugarMuestreo: "",
      lugarRegistro: "",
      centroRegistro: "AS Laboratorios - Trujillo",
      fechaRecepcion: new Date().toISOString().split("T")[0],
      fechaAnalisis: new Date().toISOString().split("T")[0],
      observaciones: "",
    },
  ])

  const [resultados, setResultados] = useState<ResultRow[]>([])
  const [firmas, setFirmas] = useState<Signature[]>([])
  const [bacterialAnalysis, setBacterialAnalysis] = useState<BacterialAnalysis | undefined>(undefined)
  const [qcControl, setQCControl] = useState<QCControl | undefined>(undefined)
  const [taxonomicInterpretation, setTaxonomicInterpretation] = useState<TaxonomicInterpretation | undefined>(undefined)
  const [photographicRegistry, setPhotographicRegistry] = useState<PhotographicRegistry | undefined>(undefined)
  const [pathogenicityTest, setPathogenicityTest] = useState<PathogenicityTest | undefined>(undefined)

  const handleSave = async () => {
    const codigoDocumento = generateDocumentCode()
    const newDocument: Document = {
      id: Date.now().toString(),
      tipo: documentType,
      area: service.area,
      servicio: service,
      cliente,
      muestras,
      evidencias: [],
      resultados,
      responsable: "",
      firmas,
      fechaEmision: new Date().toISOString().split("T")[0],
      codigoDocumento,
      createdAt: new Date(),
      bacterialAnalysis,
      qcControl,
      taxonomicInterpretation,
      photographicRegistry,
      pathogenicityTest,
    }
    
    // Guardar localmente
    saveDocument(newDocument)
    
          // Guardar en base de datos
    const documentHTML = generateDocumentHTML(newDocument)
    
    try {
      const response = await fetch("/api/documents/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigoDocumento,
          documentoHTML: documentHTML,
          documentoData: newDocument,
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert(`✅ Documento guardado exitosamente\n\nCódigo: ${data.codigo}\nContraseña: ${data.password}\n\nComparte estos datos con el cliente para que vea sus resultados en: ${window.location.origin}/buscar-informe`)
      } else {
        alert("⚠️ Documento guardado localmente pero hubo un error en la nube")
      }
    } catch (error) {
      console.error("Error guardando en Supabase:", error)
      alert("Documento guardado localmente (error de conexión con servidor)")
    }
  }

  const handlePreview = () => {
    const document: Document = {
      id: Date.now().toString(),
      tipo: documentType,
      area: service.area,
      servicio: service,
      cliente,
      muestras,
      evidencias: [],
      resultados,
      responsable: "",
      firmas,
      fechaEmision: new Date().toISOString().split("T")[0],
      codigoDocumento: generateDocumentCode(),
      createdAt: new Date(),
      bacterialAnalysis,
      qcControl,
      taxonomicInterpretation,
      photographicRegistry,
    }
    
    // Generar HTML del documento
    const html = generateDocumentHTML(document)
    
    // Abrir en nueva pestaña
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(html)
      printWindow.document.close()
    }
  }

  const generateDocumentHTML = (doc: Document) => {
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
            margin-top: 12px; 
            font-size: 8px;
            line-height: 1.4;
          }
          .footer { 
            text-align: center; 
            font-size: 8px; 
            color: #666; 
            margin-top: 8px; 
            border-top: 1px solid #ccc; 
            padding-top: 6px;
          }
          .foto-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            max-width: 200px;
            aspect-ratio: 1 / 1;
            margin: 0 auto;
            border: 1px solid #ddd;
            background: #f9f9f9;
            border-radius: 4px;
            overflow: hidden;
          }
          .foto-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          @media print { 
            body { margin: 0; padding: 0; }
            .page { margin: 0; padding: 10mm; }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <!-- Header -->
          <div class="header">
            <div style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border: 2px solid #00A651; border-radius: 4px; background: #f9f9f9; font-weight: bold; color: #00A651; font-size: 14px;">AS</div>
            <div>
              <div class="title">AS LABORATORIOS</div>
              <div class="subtitle">${doc.tipo === "certificado" ? "CERTIFICADO DE ANÁLISIS" : "INFORME DE ANÁLISIS"}</div>
            </div>
            <div class="code-date">
              <div class="label">Código: ${doc.codigoDocumento}</div>
              <div class="label">Fecha: ${doc.fechaEmision}</div>
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
                <div class="value">${doc.cliente.razonSocial}</div>
              </div>
              <div>
                <div class="label">RUC/DNI:</div>
                <div class="value">${doc.cliente.ruc}</div>
              </div>
            </div>
          </div>

          <!-- Servicio -->
          <div class="section-title">ANÁLISIS REALIZADO</div>
          <div class="info-box">
            <div>
              <div class="label">Servicio:</div>
              <div class="value">${doc.servicio.servicio}</div>
            </div>
          </div>

          <!-- Muestras -->
          <div class="section-title">MUESTRAS ANALIZADAS</div>
          ${doc.muestras
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
            doc.resultados.length > 0
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
                ${doc.resultados
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

          <!-- DECLARACION (Bacteriología) -->
          ${
            doc.area === "bacteriologia"
              ? `
            <div class="section-title">DECLARACIÓN</div>
            <div class="info-box">
              <p style="line-height: 1.5; text-align: justify;">Este documento registra la información declarada por el remitente y la evaluación preanalítica realizada al momento de la recepción, además de resultados de tamizaje y pruebas bioquímicas según el alcance solicitado. La identificación puede ser presuntiva o confirmatoria dependiendo del panel aplicado, controles y consistencia del patrón bioquímico.</p>
            </div>
          `
              : ""
          }

          <!-- AISLAMIENTO Y CARACTERIZACION INICIAL (Bacteriología) -->
          ${
            doc.bacterialAnalysis
              ? `
            <div class="section-title">AISLAMIENTO Y CARACTERIZACIÓN INICIAL</div>
            <div class="info-box">
              <table class="results-table">
                <tr>
                  <td colspan="2"><strong>Medios de cultivo utilizados:</strong> ${doc.bacterialAnalysis.mediostilizados?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Condiciones de incubación:</strong> T° ${doc.bacterialAnalysis.temperatura || "___"}°C | Atmósfera: ${doc.bacterialAnalysis.atmosfera?.join(", ") || "__"} | Tiempo: ${doc.bacterialAnalysis.tiempoIncubacion || "___"}h</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Morfología de colonia:</strong> Tamaño: ${doc.bacterialAnalysis.tamanoColonia?.join(", ") || "__"} | Forma: ${doc.bacterialAnalysis.forma?.join(", ") || "__"} | Borde: ${doc.bacterialAnalysis.borde?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Características adicionales:</strong> Elevación: ${doc.bacterialAnalysis.elevacion?.join(", ") || "__"} | Superficie: ${doc.bacterialAnalysis.superficie?.join(", ") || "__"} | Pigmento: ${doc.bacterialAnalysis.pigmento || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Tinción de Gram:</strong> Gram+ ${doc.bacterialAnalysis.gramPositivo ? "☑" : "☐"} | Gram- ${doc.bacterialAnalysis.gramNegativo ? "☑" : "☐"} | Morfología: ${doc.bacterialAnalysis.morfologia?.join(", ") || "__"} | Arreglo: ${doc.bacterialAnalysis.arreglo?.join(", ") || "__"}</td>
                </tr>
              </table>
              ${doc.bacterialAnalysis.notas ? `<p style="margin-top: 4px; font-size: 9px;"><strong>Notas:</strong> ${doc.bacterialAnalysis.notas}</p>` : ""}
            </div>
          `
              : ""
          }

          <!-- CONTROL DE CALIDAD (Bacteriología) -->
          ${
            doc.qcControl
              ? `
            <div class="section-title">CONTROL DE CALIDAD</div>
            <div class="info-box">
              <table class="results-table">
                <tr>
                  <td><strong>Lote de medios:</strong> ${doc.qcControl.loteMedios || "__"}</td>
                  <td><strong>Vence:</strong> ${doc.qcControl.venceMedios || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Control positivo:</strong> ${doc.qcControl.controlPositivoAplicado ? "Aplicado ☑" : "No aplicado ☐"} | Cepa: ${doc.qcControl.controlPositivoCepa || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Control negativo:</strong> ${doc.qcControl.controlNegativoAplicado ? "Aplicado ☑" : "No aplicado ☐"} | Cepa: ${doc.qcControl.controlNegativoCepa || "__"}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Incubadora verificada:</strong> ${doc.qcControl.incubadoraVerificada ? "Si ☑" : "No ☐"} | T° registrada: ${doc.qcControl.temperaturaRegistrada || "___"}°C</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Desviaciones / acciones:</strong> ${doc.qcControl.desviaciones || "__"}</td>
                </tr>
              </table>
            </div>
          `
              : ""
          }

          <!-- INTERPRETACION TAXONOMICA (Bacteriología) -->
          ${
            doc.taxonomicInterpretation
              ? `
            <div class="section-title">INTERPRETACIÓN TAXONÓMICA</div>
            <div class="info-box">
              <table class="results-table">
                <tr>
                  <td><strong>Grupo probable:</strong> ${doc.taxonomicInterpretation.grupoProbable?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Identificación propuesta - Género:</strong> ${doc.taxonomicInterpretation.generoIdentificado || "__"} | Especie: ${doc.taxonomicInterpretation.especieIdentificada || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Nivel de confianza:</strong> ${doc.taxonomicInterpretation.nivelConfianza?.toUpperCase() || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Base de asignación:</strong> ${doc.taxonomicInterpretation.baseAsignacion?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Limitaciones técnicas:</strong> ${doc.taxonomicInterpretation.limitacionesTecnicas?.join(", ") || "__"}</td>
                </tr>
                <tr>
                  <td><strong>Recomendación de confirmación:</strong> ${doc.taxonomicInterpretation.recomendacionConfirmacion?.join(", ") || "__"}</td>
                </tr>
              </table>
              ${doc.taxonomicInterpretation.notas ? `<p style="margin-top: 4px; font-size: 9px;"><strong>Notas:</strong> ${doc.taxonomicInterpretation.notas}</p>` : ""}
            </div>
          `
              : ""
          }

          <!-- PRUEBA DE PATOGENICIDAD (Fitopatología) -->
          ${
            doc.pathogenicityTest
              ? `
            <div class="section-title">PRUEBA DE PATOGENICIDAD</div>
            <div class="info-box">
              <div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 4px;">ORGANISMO DE PRUEBA</div>
                <div style="font-size: 8px;"><strong>Nombre:</strong> ${doc.pathogenicityTest.organismoNombre || "____"} | <strong>Tipo:</strong> ${doc.pathogenicityTest.organismoTipo || "____"}</div>
                <div style="font-size: 8px; margin-top: 2px;"><strong>Concentración:</strong> ${doc.pathogenicityTest.organismoConcentracion || "____"} ${doc.pathogenicityTest.organismoUnidad || ""}</div>
              </div>

              <div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 4px;">PLANTA HOSPEDANTE</div>
                <div style="font-size: 8px;"><strong>Especie:</strong> ${doc.pathogenicityTest.plantaEspecie || "____"} | <strong>Variedad:</strong> ${doc.pathogenicityTest.plantaVariedad || "____"}</div>
                <div style="font-size: 8px; margin-top: 2px;"><strong>Edad:</strong> ${doc.pathogenicityTest.plantaEdad || "____"} ${doc.pathogenicityTest.plantaEdadUnidad || "días"}</div>
              </div>

              <div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 4px;">MÉTODO DE INOCULACIÓN</div>
                <div style="font-size: 8px;"><strong>Método(s):</strong> ${doc.pathogenicityTest.metodoInoculacion?.join(", ") || "____"}</div>
                <div style="font-size: 8px; margin-top: 2px;"><strong>Lugar:</strong> ${doc.pathogenicityTest.lugarInoculacion || "____"} | <strong>Cantidad:</strong> ${doc.pathogenicityTest.cantidadInoculo || "____"}</div>
              </div>

              <div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 4px;">CONDICIONES AMBIENTALES</div>
                <div style="font-size: 8px;"><strong>Temperatura:</strong> ${doc.pathogenicityTest.temperatura || "____"}°C | <strong>Humedad:</strong> ${doc.pathogenicityTest.humedad || "____"}% | <strong>Fotoperiodo:</strong> ${doc.pathogenicityTest.fotoperiodo || "____"}</div>
                <div style="font-size: 8px; margin-top: 2px;"><strong>Duración:</strong> ${doc.pathogenicityTest.duracionPrueba || "____"} ${doc.pathogenicityTest.duracionUnidad || "días"}</div>
              </div>

              <div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 4px;">CONTROLES</div>
                <div style="font-size: 8px;">
                  ${doc.pathogenicityTest.controlNegativo ? "✓ Control Negativo: " + (doc.pathogenicityTest.controlNegativoResultado || "____") : "✗ Control Negativo: No aplicado"}
                </div>
                <div style="font-size: 8px; margin-top: 2px;">
                  ${doc.pathogenicityTest.controlPositivo ? "✓ Control Positivo: " + (doc.pathogenicityTest.controlPositivoResultado || "____") : "✗ Control Positivo: No aplicado"}
                </div>
              </div>

              ${
                doc.pathogenicityTest.diasObservacion && doc.pathogenicityTest.diasObservacion.length > 0
                  ? `<div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
                    <div style="font-weight: bold; font-size: 9px; margin-bottom: 4px;">OBSERVACIONES DIARIAS</div>
                    ${doc.pathogenicityTest.diasObservacion.map(obs => 
                      `<div style="margin-bottom: 6px; padding: 4px; background: #f9f9f9; border-left: 2px solid #999; font-size: 8px;">
                        <strong>Día ${obs.dia}:</strong> Intensidad: ${obs.intensidad || "____"} | Planta: ${obs.porcentajePlanta || "____"}%<br/>
                        Síntomas: ${obs.sintomas || "____"}
                        ${obs.observaciones ? `<br/>Obs: ${obs.observaciones}` : ""}
                      </div>`
                    ).join("")}
                  </div>`
                  : ""
              }

              ${
                doc.pathogenicityTest.imagenes && doc.pathogenicityTest.imagenes.length > 0
                  ? `<div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
                    <div style="font-weight: bold; font-size: 9px; margin-bottom: 4px;">IMÁGENES DE LA PRUEBA (${doc.pathogenicityTest.imagenes.length})</div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                      ${doc.pathogenicityTest.imagenes.map(img =>
                        `<div style="border: 1px solid #ddd; padding: 4px; border-radius: 4px; text-align: center;">
                          <img src="${img.url}" style="width: 100%; height: 100px; object-fit: contain; margin-bottom: 4px;" alt="Día ${img.dia}"/>
                          <div style="font-size: 8px; font-weight: bold;">Día ${img.dia}</div>
                          ${img.descripcion ? `<div style="font-size: 7px; color: #666; margin-top: 2px;">${img.descripcion}</div>` : ""}
                        </div>`
                      ).join("")}
                    </div>
                  </div>`
                  : ""
              }

              <div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 4px;">RESULTADOS</div>
                <div style="font-size: 8px;"><strong>Patogenicidad:</strong> ${doc.pathogenicityTest.resultadoPositivo ? "POSITIVO" : "NEGATIVO"}</div>
                ${doc.pathogenicityTest.sintomaTipico ? `<div style="font-size: 8px; margin-top: 2px;"><strong>Síntoma Típico:</strong> ${doc.pathogenicityTest.sintomaTipico}</div>` : ""}
                ${doc.pathogenicityTest.reaislamiento ? `<div style="font-size: 8px; margin-top: 2px;"><strong>Reaislamiento:</strong> ${doc.pathogenicityTest.reaislado || "Realizado"}</div>` : ""}
              </div>

              ${doc.pathogenicityTest.conclusiones ? `
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 4px;">CONCLUSIONES</div>
                <div style="font-size: 8px; line-height: 1.4; padding: 4px; background: #fafafa; border-left: 2px solid #999;">${doc.pathogenicityTest.conclusiones}</div>
              </div>` : ""}

              ${doc.pathogenicityTest.notas ? `
              <div style="font-size: 8px; padding: 4px; background: #fafafa; border-left: 2px solid #999;">
                <strong>Notas:</strong> ${doc.pathogenicityTest.notas}
              </div>` : ""}
            </div>
          `
              : ""
          }

          <!-- REGISTRO FOTOGRAFICO (Bacteriología) -->
          ${
            doc.photographicRegistry
              ? `
            <div class="section-title">REGISTRO FOTOGRÁFICO</div>
            <div class="info-box">
              ${
                doc.photographicRegistry.imagenes && doc.photographicRegistry.imagenes.length > 0
                  ? `
                <div style="margin-bottom: 12px;">
                  <p style="font-size: 9px; font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">Figuras registradas (${doc.photographicRegistry.imagenes.length})</p>
                  ${doc.photographicRegistry.imagenes
                    .map(
                      (img, idx) => `
                      <div style="margin-bottom: 14px; page-break-inside: avoid; border: 1px solid #eee; padding: 8px; border-radius: 4px;">
                        <div style="font-size: 9px; font-weight: bold; margin-bottom: 8px; color: #222; border-bottom: 1px solid #ddd; padding-bottom: 4px;">Figura ${idx + 1}: ${img.titulo || "Sin título"}</div>
                        <div class="foto-container" style="margin-bottom: 8px;">
                          <img src="${img.url}" alt="Figura ${idx + 1}" />
                        </div>
                        ${img.descripcion ? `<div style="font-size: 8px; color: #444; line-height: 1.5; padding: 6px; background: #f5f5f5; border-left: 3px solid #999; border-radius: 2px;"><strong>Observación:</strong> ${img.descripcion}</div>` : ""}
                      </div>
                    `,
                    )
                    .join("")}
                </div>
              `
                  : ""
              }
              ${
                doc.photographicRegistry.figura || doc.photographicRegistry.nota
                  ? `<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #ddd;">
                    ${doc.photographicRegistry.figura ? `<div style="font-size: 9px; margin-bottom: 4px;"><strong>Descripción General:</strong> ${doc.photographicRegistry.figura}</div>` : ""}
                    ${doc.photographicRegistry.nota ? `<div style="font-size: 8px; line-height: 1.4; padding: 4px; background: #fafafa; border-left: 2px solid #ddd;"><strong>Nota General:</strong> ${doc.photographicRegistry.nota}</div>` : ""}
                  </div>`
                  : ""
              }
            </div>
          `
              : ""
          }

          <!-- Disclaimer -->
          <div class="disclaimer">
            <strong>ACLARACIÓN:</strong> Los resultados no incluyen factores de corrección. Datos almacenados indefinidamente en base de datos para trazabilidad y monitoreo.
          </div>

          <!-- Firmas -->
          <div class="signatures">
            ${
              doc.firmas.length > 0
                ? doc.firmas
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
    <div className="container mx-auto px-4 py-8">
      <button onClick={onClose} className="mb-6 text-gray-600 hover:text-gray-900 font-serif">
        ← Volver
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">
          Crear {documentType === "certificado" ? "Certificado" : "Informe"}
        </h1>

        <div className="space-y-8">
          <ClientSection client={cliente} onChange={setCliente} />
          <SampleSection samples={muestras} onChange={setMuestras} />
          <ResultsSection results={resultados} onChange={setResultados} documentType={documentType} />
          
          {/* Secciones de Bacteriología (condicionales) */}
          {service.area === "bacteriologia" && (
            <>
              <BacterialAnalysisSection 
                analysis={bacterialAnalysis || {}} 
                onChange={setBacterialAnalysis} 
              />
              <QCControlSection 
                qcControl={qcControl || {}} 
                onChange={setQCControl} 
              />
              <TaxonomicInterpretationSection 
                interpretation={taxonomicInterpretation || {}} 
                onChange={setTaxonomicInterpretation} 
              />
              <PhotographicRegistrySection 
                registry={photographicRegistry || {}} 
                onChange={setPhotographicRegistry} 
              />
            </>
          )}

          {/* Sección de Prueba de Patogenicidad (Fitopatología) */}
          {service.servicio === "Prueba de Patogenicidad" && (
            <PathogenicityTestSection 
              test={pathogenicityTest || {}} 
              onChange={setPathogenicityTest} 
            />
          )}
          
          <SignaturesSection firmas={firmas} onChange={setFirmas} />
        </div>

        <ActionButtons onSave={handleSave} onPreview={handlePreview} onNew={onClose} />
      </div>
    </div>
  )
}
