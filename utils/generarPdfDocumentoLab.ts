import jsPDF from "jspdf";
import {
    INFO_EMPRESA,
    TIPOS_AGENTE,
    MATRICES_MUESTRA,
    DECLARACIONES_AREA,
    CAMPOS_EXTRA_POR_SERVICIO,
} from "@/components/admin/documentoLab/constants";
import type { CampoExtraSchema } from "@/components/admin/documentoLab/constants";
import type { DocumentoLabUI } from "@/components/admin/documentoLab/types";
import { formatDate } from "@/utils";

// ─── Constantes de diseño ────────────────────────────────────────
const PW = 210;
const PH = 297;
const M = 14;
const CW = PW - M * 2;
const FOOTER_ZONE = 18; // espacio reservado para footer

// Colores
type RGB = [number, number, number];
const GREEN: RGB = [3, 166, 74];
const GREEN_DARK: RGB = [68, 120, 52];
const DARK: RGB = [33, 33, 33];
const GRAY: RGB = [100, 100, 100];
const GRAY_LIGHT: RGB = [140, 140, 140];
const LIGHT_BG: RGB = [246, 246, 246];
const WHITE: RGB = [255, 255, 255];
const BORDER: RGB = [210, 210, 210];
const BANNER_TEXT: RGB = [255, 255, 255];

// ─── Helpers ─────────────────────────────────────────────────────

async function loadImage(
    url: string,
): Promise<{ data: string; w: number; h: number } | null> {
    try {
        const res = await fetch(url, { mode: "cors" });
        const blob = await res.blob();
        const data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
        if (!data) return null;
        return new Promise((resolve) => {
            const img = new window.Image();
            img.onload = () =>
                resolve({ data, w: img.naturalWidth, h: img.naturalHeight });
            img.onerror = () => resolve(null);
            img.src = data;
        });
    } catch {
        return null;
    }
}

function trunc(text: string, pdf: jsPDF, maxW: number): string {
    if (!text) return "-";
    if (pdf.getTextWidth(text) <= maxW) return text;
    let t = text;
    while (t.length > 0 && pdf.getTextWidth(t + "…") > maxW) t = t.slice(0, -1);
    return t + "…";
}

function checkPage(pdf: jsPDF, y: number, needed: number): number {
    if (y + needed > PH - FOOTER_ZONE) {
        pdf.addPage();
        return M + 2;
    }
    return y;
}

function getMatrizLabel(v: string): string {
    return MATRICES_MUESTRA.find((m) => m.value === v)?.label || v;
}

function getTipoAgenteLabel(v: string): string {
    return TIPOS_AGENTE.find((t) => t.value === v)?.label || v;
}

function getDeclaracion(area?: string): string {
    const key =
        area
            ?.toLowerCase()
            .replace(/[áéíóú]/g, (m) => {
                const map: Record<string, string> = {
                    á: "a",
                    é: "e",
                    í: "i",
                    ó: "o",
                    ú: "u",
                };
                return map[m] || m;
            })
            .replace(/\s+/g, "_") || "default";
    return DECLARACIONES_AREA[key] || DECLARACIONES_AREA.default;
}

// ─── Gráfico de barra referencial (mini bar chart) ──────────────
function drawReferentialBar(
    pdf: jsPDF,
    x: number,
    y: number,
    cellW: number,
    cellH: number,
    resultado: number | null,
    min: number,
    max: number,
    unidad: string,
): void {
    const barW = Math.min(cellW * 0.55, 22); // ancho de la barra
    const barH = 3; // alto de la barra
    const barX = x + 1.5;
    const barY = y + (cellH - barH) / 2;

    const escala = max * 2;
    const posMin = (min / escala) * 100;
    const posMax = (max / escala) * 100;

    // Fondo gris claro de la barra
    pdf.setFillColor(224, 224, 224);
    pdf.rect(barX, barY, barW, barH, "F");

    // Rango normal (gris medio)
    const rangeX = barX + (posMin / 100) * barW;
    const rangeW = ((posMax - posMin) / 100) * barW;
    pdf.setFillColor(190, 190, 190);
    pdf.rect(rangeX, barY, rangeW, barH, "F");

    // Borde de la barra
    pdf.setDrawColor(160, 160, 160);
    pdf.setLineWidth(0.15);
    pdf.rect(barX, barY, barW, barH, "S");

    // Indicador del resultado (línea vertical negra) — solo si es numérico
    if (resultado !== null && !isNaN(resultado)) {
        const posResultado = Math.min(Math.max((resultado / escala) * 100, 0), 100);
        const indicatorX = barX + (posResultado / 100) * barW;
        pdf.setDrawColor(20, 20, 20);
        pdf.setLineWidth(0.4);
        pdf.line(indicatorX, barY - 0.3, indicatorX, barY + barH + 0.3);
    }

    // Texto a la derecha: "resultado unidad" o "min – max"
    const txtX = barX + barW + 1.5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(5.5);
    pdf.setTextColor(80, 80, 80);
    const label = resultado !== null && !isNaN(resultado)
        ? `${resultado} ${unidad}`
        : `${min} – ${max}`;
    pdf.text(label, txtX, barY + barH / 2 + 1);
}

// ─── Banner de sección ──────────────────────────────────────────
function drawBanner(pdf: jsPDF, y: number, title: string): number {
    const h = 7;
    y = checkPage(pdf, y, h + 6);
    pdf.setFillColor(...GREEN);
    pdf.rect(M, y, CW, h, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.setTextColor(...BANNER_TEXT);
    pdf.text(title.toUpperCase(), M + 4, y + h / 2 + 1.2);
    return y + h + 3;
}

// ─── Tabla genérica ─────────────────────────────────────────────
interface TableCol {
    header: string;
    width: number;
    align?: "left" | "center" | "right";
}

function drawTable(
    pdf: jsPDF,
    y: number,
    cols: TableCol[],
    rows: string[][],
): number {
    const hdrH = 6.5;
    const rowH = 5.5;
    const totalW = cols.reduce((s, c) => s + c.width, 0);

    y = checkPage(pdf, y, hdrH + rowH);

    // Cabecera
    pdf.setFillColor(...LIGHT_BG);
    pdf.rect(M, y, totalW, hdrH, "F");

    pdf.setDrawColor(...BORDER);
    pdf.setLineWidth(0.15);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.5);
    pdf.setTextColor(...DARK);

    let x = M;
    for (const col of cols) {
        pdf.rect(x, y, col.width, hdrH, "S");

        const tx = col.align === "center" ? x + col.width / 2 : x + 1.5;
        pdf.text(col.header, tx, y + hdrH / 2 + 1, {
            align: col.align === "center" ? "center" : "left",
        });
        x += col.width;
    }
    y += hdrH;

    // Filas
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);

    for (let i = 0; i < rows.length; i++) {
        y = checkPage(pdf, y, rowH);

        // Fondo alterno
        pdf.setFillColor(
            i % 2 === 0 ? 255 : 248,
            i % 2 === 0 ? 255 : 248,
            i % 2 === 0 ? 255 : 248,
        );
        pdf.rect(M, y, totalW, rowH, "F");

        // Bordes
        pdf.setDrawColor(...BORDER);
        pdf.setLineWidth(0.15);
        x = M;
        for (const col of cols) {
            pdf.rect(x, y, col.width, rowH, "S");
            x += col.width;
        }

        // Texto
        pdf.setTextColor(50, 50, 50);
        x = M;
        for (let j = 0; j < cols.length; j++) {
            const col = cols[j];
            const raw = rows[i]?.[j] || "-";
            const text = trunc(raw, pdf, col.width - 3);
            if (col.align === "center") {
                pdf.text(text, x + col.width / 2, y + rowH / 2 + 0.8, {
                    align: "center",
                });
            } else {
                pdf.text(text, x + 1.5, y + rowH / 2 + 0.8);
            }
            x += col.width;
        }
        y += rowH;
    }
    return y;
}

// ─── Grilla de campo clave-valor ────────────────────────────────
function drawFieldGrid(
    pdf: jsPDF,
    y: number,
    fields: { label: string; value: string }[],
    colsPerRow: number,
): number {
    const cellH = 10;
    const colW = CW / colsPerRow;
    const padding = 1.5;

    for (let i = 0; i < fields.length; i++) {
        const col = i % colsPerRow
        if (col === 0 && i > 0) y += cellH
        if (col === 0) y = checkPage(pdf, y, cellH)

        const x = M + col * colW

        // Label (arriba, gris)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(6.5)
        pdf.setTextColor(...DARK)
        pdf.text(fields[i].label, x + padding, y + 3.5)

        // Valor (abajo, oscuro)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(7)
        pdf.setTextColor(...DARK)
        pdf.text(trunc(fields[i].value, pdf, colW - padding * 2), x + padding, y + 7.5)
    }

    // Cerrar última fila
    const lastRow = Math.ceil(fields.length / colsPerRow)
    y += cellH
    return y
}

// ─── Footers en todas las páginas ───────────────────────────────
function addFooters(pdf: jsPDF) {
    const total = pdf.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
        pdf.setPage(i);
        const fy = PH - FOOTER_ZONE + 2;

        // Línea divisoria
        pdf.setDrawColor(...BORDER);
        pdf.setLineWidth(0.3);
        pdf.line(M, fy, PW - M, fy);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(5.5);
        pdf.setTextColor(150, 150, 150);

        pdf.text(
            `${INFO_EMPRESA.nombre}  |  Teléfono: ${INFO_EMPRESA.telefono}  |  Email: ${INFO_EMPRESA.email}`,
            PW / 2,
            fy + 4,
            { align: "center" },
        );
        pdf.text(
            `${INFO_EMPRESA.direccionCentral} - ${INFO_EMPRESA.ciudad}, ${INFO_EMPRESA.departamento}, ${INFO_EMPRESA.pais}`,
            PW / 2,
            fy + 7.5,
            { align: "center" },
        );
        pdf.text(`Pág. ${i} de ${total}`, PW - M, fy + 4, { align: "right" });
    }
}

// ═══════════════════════════════════════════════════════════════
// Generador principal
// ═══════════════════════════════════════════════════════════════
export async function generarPdfDocumentoLab(
    documento: DocumentoLabUI,
): Promise<void> {
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    let y = M;

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  1. CABECERA (Header)                                     ║
    // ╚═══════════════════════════════════════════════════════════╝

    // Logo a la izquierda
    try {
        const logo = await loadImage("/images/new-logo.png");
        if (logo) {
            const logoW = 48;
            const logoH = (logo.h / logo.w) * logoW;
            pdf.addImage(logo.data, M, y, logoW, logoH);
        }
    } catch {
        /* logo no disponible */
    }

    // Bloque derecho: Código, Tipo de documento, Fecha
    const rightBlockX = PW - M;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...GRAY);
    pdf.text(`Código: ${documento.codigo || "Sin código"}`, rightBlockX, y + 3, {
        align: "right",
    });

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(...DARK);
    pdf.text(
        (documento.tipoDocumentoNombre || "DOCUMENTO DE LABORATORIO").toUpperCase(),
        rightBlockX,
        y + 10,
        { align: "right" },
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...GRAY);
    pdf.text(
        `Fecha: ${documento.fechaEmision ? formatDate(documento.fechaEmision) : "Pendiente"}`,
        rightBlockX,
        y + 15,
        { align: "right" },
    );

    y += 20;

    // Línea verde separadora
    pdf.setDrawColor(...GREEN);
    pdf.setLineWidth(0.8);
    pdf.line(M, y, PW - M, y);
    y += 3;

    // Direcciones de la empresa (dos columnas)
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6);
    pdf.setTextColor(...GRAY);
    pdf.text(`Of. Central: ${INFO_EMPRESA.direccionCentral}`, M, y + 2);

    const labAddr = `Lab. Biotecnología: ${INFO_EMPRESA.direccionLab}`;
    pdf.text(labAddr, PW - M, y + 2, { align: "right" });

    pdf.setFontSize(6.5);
    pdf.text(`${INFO_EMPRESA.ciudad}, ${INFO_EMPRESA.departamento}`, M, y + 5.5);

    y += 10;

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  2. INFORMACIÓN DEL CLIENTE                               ║
    // ╚═══════════════════════════════════════════════════════════╝
    y = drawBanner(pdf, y, "Información del Cliente");

    const clientColW = CW / 2;
    const clientH = 10;

    // 1. Dibujar el fondo continuo para toda la fila (blanco o gris muy claro)
    pdf.setFillColor(255, 255, 255); // Fondo blanco limpio
    pdf.rect(M, y, CW, clientH, "F");

    // 2. Dibujar un único borde que envuelva toda la fila (sin división al medio)
    pdf.setDrawColor(...BORDER);
    pdf.setLineWidth(0.15);
    pdf.rect(M, y, CW, clientH, "S");

    // 3. Imprimir el contenido de la Celda 1 (Izquierda)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.5);
    pdf.setTextColor(...DARK);
    pdf.text("Razón Social / Nombre", M + 2, y + 3.5);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...DARK);
    pdf.text(
        trunc(documento.cliente.razonSocial || "-", pdf, clientColW - 4),
        M + 2,
        y + 8,
    );

    // 4. Imprimir el contenido de la Celda 2 (Derecha)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.5);
    pdf.setTextColor(...DARK);
    pdf.text("RUC / DNI", M + clientColW + 2, y + 3.5); // Alineado a la mitad de la caja

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...DARK);
    pdf.text(documento.cliente.ruc || "-", M + clientColW + 2, y + 8);

    y += clientH + 2;
    /*
      // Fila adicional con más datos del cliente si existen
      if (documento.cliente.direccion || documento.cliente.contacto || documento.cliente.email || documento.cliente.telefono) {
        const extraFields = [
          { label: 'Dirección', value: documento.cliente.direccion || '-' },
          { label: 'Contacto', value: documento.cliente.contacto || '-' },
          { label: 'Email', value: documento.cliente.email || '-' },
          { label: 'Teléfono', value: documento.cliente.telefono || '-' },
        ]
        // Usamos la grilla para los extras, que sí tendrán divisiones por defecto
        y = drawFieldGrid(pdf, y, extraFields, 4)
      }*/

    y += 2;

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  3. ANÁLISIS REALIZADO                                    ║
    // ╚═══════════════════════════════════════════════════════════╝
    y = drawBanner(pdf, y, "Análisis Realizado");

    const analisisColW = CW / 2;
    const analisisH = 10;

    // 1. Dibujar el fondo y un único borde exterior
    pdf.setFillColor(255, 255, 255);
    pdf.rect(M, y, CW, analisisH, "F");

    pdf.setDrawColor(...BORDER);
    pdf.setLineWidth(0.15);
    pdf.rect(M, y, CW, analisisH, "S");

    // 2. Imprimir Celda 1 (Izquierda: Servicio)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.5);
    pdf.setTextColor(...DARK);
    pdf.text("Servicio", M + 2, y + 3.5);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...DARK);
    pdf.text(
        trunc(documento.servicioNombre || "-", pdf, analisisColW - 4),
        M + 2,
        y + 8,
    );

    // 3. Imprimir Celda 2 (Derecha: Área)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.5);
    pdf.setTextColor(...DARK);
    pdf.text("Área", M + analisisColW + 2, y + 3.5);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...DARK);
    pdf.text(
        trunc(documento.areaNombre || "-", pdf, analisisColW - 4),
        M + analisisColW + 2,
        y + 8,
    );

    y += analisisH + 4;

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  4. MUESTRAS ANALIZADAS                                   ║
    // ╚═══════════════════════════════════════════════════════════╝
    y = drawBanner(pdf, y, "Muestras Analizadas");

    if (documento.muestras && documento.muestras.length > 0) {
        for (let mi = 0; mi < documento.muestras.length; mi++) {
            const m = documento.muestras[mi];
            y = checkPage(pdf, y, 30);

            // Tarjeta de muestra con borde
            const cardStartY = y;

            // Fila 1: Código, Matriz, Lugar de Muestreo
            const cardFields1 = [
                { label: "Código", value: m.codigo || "-" },
                { label: "Matriz", value: getMatrizLabel(m.matriz) },
                { label: "Lugar de Muestreo", value: m.lugarMuestreo || "-" },
            ];
            y = drawFieldGrid(pdf, y, cardFields1, 3);

            // Fila 2: Centro Registro, F. Toma, F. Recepción
            const cardFields2 = [
                { label: "Centro Registro", value: m.centroRegistro || "-" },
                {
                    label: "F. Toma",
                    value: m.fechaToma ? formatDate(m.fechaToma) : "-",
                },
                {
                    label: "F. Recepción",
                    value: m.fechaRecepcion ? formatDate(m.fechaRecepcion) : "-",
                },
            ];
            y = drawFieldGrid(pdf, y, cardFields2, 3);

            // Fila 3: F. Inicio Análisis, F. Fin Análisis
            const cardFields3 = [
                {
                    label: "F. Inicio Análisis",
                    value: m.fechaInicio ? formatDate(m.fechaInicio) : "-",
                },
                {
                    label: "F. Fin Análisis",
                    value: m.fechaFin ? formatDate(m.fechaFin) : "-",
                },
            ];
            y = drawFieldGrid(pdf, y, cardFields3, 2);

            // Fila 4: Estado, Motivo de Rechazo
            const cardFields4 = [
                { label: "Estado", value: m.rechazada ? "Rechazada" : "Aceptada" },
                { label: "Motivo Rechazo", value: m.rechazada ? (m.motivoRechazo || "-") : "N/A" },
            ];
            y = drawFieldGrid(pdf, y, cardFields4, 2);

            // Campos dinámicos EAV (si existen)
            if (m.atributosDinamicos && m.atributosEtiquetas) {
                const keys = Object.keys(m.atributosDinamicos).filter(k => m.atributosDinamicos[k])
                if (keys.length > 0) {
                    const dinamicFields = keys.map(k => ({
                        label: m.atributosEtiquetas[k] || `Campo ${k}`,
                        value: m.atributosDinamicos[k] || '-'
                    }))
                    const cols = dinamicFields.length === 1 ? 1 : dinamicFields.length === 2 ? 2 : 3
                    y = drawFieldGrid(pdf, y, dinamicFields, cols)
                }
            }

            pdf.setDrawColor(...BORDER)
            pdf.setLineWidth(0.15)
            pdf.rect(M, cardStartY, CW, y - cardStartY, 'S')

            // Observaciones (ancho completo)
            if (m.recomendaciones) {
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(6.5);
                pdf.setTextColor(...DARK);
                pdf.text("Observaciones Muestra:", M + 1.5, y + 3.5);

                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(6.5);
                pdf.setTextColor(...DARK);
                const obsLines = pdf.splitTextToSize(m.recomendaciones, CW - 3);
                const obsH = obsLines.length * 3 + 6;

                y = checkPage(pdf, y, obsH);
                pdf.setDrawColor(...BORDER);
                pdf.setLineWidth(0.15);
                pdf.rect(M, y, CW, obsH, "S");
                pdf.text(obsLines, M + 1.5, y + 7.5);
                y += obsH;
            }

            // Borde exterior de la tarjeta
            pdf.setDrawColor(...GREEN);
            pdf.setLineWidth(0.3);
            pdf.line(M, cardStartY, M, y); // borde izquierdo verde

            // Separación entre muestras
            if (mi < documento.muestras.length - 1) y += 4;
        }
    } else {
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(7);
        pdf.setTextColor(...GRAY);
        pdf.text("No hay muestras registradas", PW / 2, y + 3, { align: "center" });
        y += 8;
    }

    y += 2;

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  5. RESULTADOS                                            ║
    // ╚═══════════════════════════════════════════════════════════╝
    y = drawBanner(pdf, y, "Resultados");

    if (documento.resultados && documento.resultados.length > 0) {
        // ── Tabla de resultados con soporte para gráfico referencial ──
        const resCols: TableCol[] = [
            { header: "Parámetro", width: 35 },
            { header: "Resultado", width: 20, align: "center" },
            { header: "Unidad", width: 16, align: "center" },
            { header: "Min", width: 14, align: "center" },
            { header: "Max", width: 14, align: "center" },
            { header: "Valor Referencial", width: 45, align: "center" },
            { header: "Método", width: 36 },
        ];
        const hdrH = 6.5;
        const rowH = 6;
        const totalW = resCols.reduce((s, c) => s + c.width, 0);

        y = checkPage(pdf, y, hdrH + rowH);

        // Cabecera
        pdf.setFillColor(...LIGHT_BG);
        pdf.rect(M, y, totalW, hdrH, "F");
        pdf.setDrawColor(...BORDER);
        pdf.setLineWidth(0.15);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(6.5);
        pdf.setTextColor(...DARK);

        let rx = M;
        for (const col of resCols) {
            pdf.rect(rx, y, col.width, hdrH, "S");
            const tx = col.align === "center" ? rx + col.width / 2 : rx + 1.5;
            pdf.text(col.header, tx, y + hdrH / 2 + 1, {
                align: col.align === "center" ? "center" : "left",
            });
            rx += col.width;
        }
        y += hdrH;

        // Filas de resultados
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(6.5);

        for (let i = 0; i < documento.resultados.length; i++) {
            const r = documento.resultados[i];
            y = checkPage(pdf, y, rowH);

            // Restaurar estado de dibujo al inicio de cada fila
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(6.5);

            // Fondo alterno
            pdf.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 248);
            pdf.rect(M, y, totalW, rowH, "F");

            // Bordes
            pdf.setDrawColor(...BORDER);
            pdf.setLineWidth(0.15);
            rx = M;
            for (const col of resCols) {
                pdf.rect(rx, y, col.width, rowH, "S");
                rx += col.width;
            }

            // Texto en columnas normales (0=Parámetro, 1=Resultado, 2=Unidad, 3=Min, 4=Max, 6=Método)
            const textCells = [
                { idx: 0, text: r.parametro },
                { idx: 1, text: r.resultado },
                { idx: 2, text: r.unidad },
                { idx: 3, text: r.valorMin != null ? String(r.valorMin) : "-" },
                { idx: 4, text: r.valorMax != null ? String(r.valorMax) : "-" },
                { idx: 6, text: r.metodo },
            ];
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(6.5);
            pdf.setTextColor(50, 50, 50);

            for (const cell of textCells) {
                const col = resCols[cell.idx];
                let cellX = M;
                for (let k = 0; k < cell.idx; k++) cellX += resCols[k].width;
                const text = trunc(cell.text || "-", pdf, col.width - 3);
                if (col.align === "center") {
                    pdf.text(text, cellX + col.width / 2, y + rowH / 2 + 0.8, { align: "center" });
                } else {
                    pdf.text(text, cellX + 1.5, y + rowH / 2 + 0.8);
                }
            }

            // Columna 5 = Valor Referencial (con gráfico opcional)
            const refCol = resCols[5];
            let refX = M;
            for (let k = 0; k < 5; k++) refX += resCols[k].width;

            const resNum = parseFloat(r.resultado);
            const hasChart = r.mostrarGrafico && r.valorMin != null && r.valorMax != null;

            if (hasChart) {
                drawReferentialBar(pdf, refX, y, refCol.width, rowH, isNaN(resNum) ? null : resNum, r.valorMin!, r.valorMax!, r.unidad || "");
                // Restaurar estado tras dibujar gráfico
                pdf.setDrawColor(...BORDER);
                pdf.setLineWidth(0.15);
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(6.5);
                pdf.setTextColor(50, 50, 50);
            } else {
                // Texto plano del rango
                const refText = r.rangoReferencial
                    || (r.valorMin != null && r.valorMax != null ? `${r.valorMin} – ${r.valorMax}` : "-");
                pdf.setTextColor(50, 50, 50);
                pdf.text(trunc(refText, pdf, refCol.width - 3), refX + refCol.width / 2, y + rowH / 2 + 0.8, { align: "center" });
            }

            y += rowH;
        }
    } else {
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(7);
        pdf.setTextColor(...GRAY);
        pdf.text("No hay resultados registrados", PW / 2, y + 3, {
            align: "center",
        });
        y += 8;
    }

    // ── Sub-sección: Datos Adicionales por resultado ──
    const extraConfig = documento.servicioConfExtra ? CAMPOS_EXTRA_POR_SERVICIO[documento.servicioConfExtra] : undefined;
    if (extraConfig && documento.resultados && documento.resultados.length > 0) {
        const rowsWithExtra = documento.resultados.filter(
            (r) => r.dataExtra && Object.keys(r.dataExtra).length > 0,
        );
        if (rowsWithExtra.length > 0) {
            y += 3;
            // Subtítulo
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(7);
            pdf.setTextColor(...DARK);
            y = checkPage(pdf, y, 12);
            pdf.text(`Datos Adicionales — ${extraConfig.nombre}`, M, y + 3);
            y += 5;

            // Construir columnas: Parámetro + un col por campo extra
            const campos = extraConfig.campos;
            const paramW = 35;
            const remainW = 145;
            const colW = Math.min(Math.floor(remainW / campos.length), 50);

            const extraCols: TableCol[] = [
                { header: "Parámetro", width: paramW },
                ...campos.map((c) => ({
                    header: c.label + (c.unidad ? ` (${c.unidad})` : ""),
                    width: colW,
                    align: "center" as const,
                })),
            ];

            // Resolver valor de select a su label
            const resolveVal = (campo: CampoExtraSchema, val: any): string => {
                if (val == null || val === "") return "-";
                if (campo.type === "select" && campo.options) {
                    const opt = campo.options.find((o) => o.value === val);
                    return opt ? opt.label : String(val);
                }
                return String(val);
            };

            const extraRows = rowsWithExtra.map((r) => [
                r.parametro || "-",
                ...campos.map((c) => resolveVal(c, r.dataExtra?.[c.key])),
            ]);

            y = drawTable(pdf, y, extraCols, extraRows);
        }
    }

    y += 4;

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  6. DECLARACIÓN                                           ║
    // ╚═══════════════════════════════════════════════════════════╝
    y = drawBanner(pdf, y, "Declaración");

    const declaracion = getDeclaracion(documento.areaNombre);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    const declLines = pdf.splitTextToSize(declaracion, CW - 6);

    const declH = declLines.length * 3.2 + 8;

    y = checkPage(pdf, y, declH);
    const declStartY = y;

    pdf.setFillColor(...WHITE);
    pdf.setDrawColor(...BORDER);
    pdf.setLineWidth(0.15);
    pdf.rect(M, declStartY, CW, declH, "FD");

    pdf.setTextColor(60, 60, 60);
    pdf.text(declLines, M + 3, declStartY + 4.5);

    y += declH + 4;

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  8. AGENTE IDENTIFICADO (si hay agentes)                   ║
    // ╚═══════════════════════════════════════════════════════════╝
    if (documento.agentes && documento.agentes.length > 0) {
        // Banner (10mm) + al menos 1 cuadro de agente (32mm) = 42mm
        y = checkPage(pdf, y, 42);
        y = drawBanner(pdf, y, "Agente Identificado");

        for (const a of documento.agentes) {
            // Altura estimada del cuadro: 4 filas × 6 + paddings ≈ 32mm
            y = checkPage(pdf, y, 32);

            const outerStartY = y;
            const padding = 1.5; // Espacio que crea el "cuadro dentro del cuadro"

            const innerX = M + padding;
            const innerW = CW - padding * 2;
            const innerStartY = outerStartY + padding;

            let currentY = innerStartY;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(6.5);
            pdf.setTextColor(50, 50, 50);

            // --- FILA 1 ---
            const line1Parts = [
                `Nombre científico: ${a.nombreCientifico || "-"}`,
                `Grupo probable: ${getTipoAgenteLabel(a.tipo)}`,
            ];
            currentY += 4; // Padding superior interno del texto
            pdf.text(line1Parts.join("  |  "), innerX + 2, currentY);
            currentY += 2; // Espacio debajo del texto antes de la línea

            // Línea separadora interna
            pdf.setDrawColor(...BORDER);
            pdf.setLineWidth(0.15);
            pdf.line(innerX, currentY, innerX + innerW, currentY);

            // --- FILA 2 ---
            const line2Parts = [
                `Reino: ${a.reino || "-"}`,
                `Orden: ${a.orden || "-"}`,
                `Familia: ${a.familia || "-"}`,
            ];
            currentY += 4;
            pdf.text(line2Parts.join("  |  "), innerX + 2, currentY);
            currentY += 2;

            // Línea separadora interna
            pdf.line(innerX, currentY, innerX + innerW, currentY);

            // --- FILA 3 ---
            const line3Parts = [
                `Género: ${a.genero || "-"}`,
                `Especie: ${a.especie || "-"}`,
            ];
            currentY += 4;
            pdf.text(line3Parts.join("  |  "), innerX + 2, currentY);
            currentY += 2;

            // Línea separadora interna
            pdf.line(innerX, currentY, innerX + innerW, currentY);

            // --- FILA 4 ---
            const line4Parts = [
                `Código de aislado: ${a.codigoAislado || "-"}`,
            ];
            currentY += 4;
            pdf.text(line4Parts.join("  |  "), innerX + 2, currentY);
            currentY += 2;

            currentY += 2; // Padding inferior interno antes de cerrar el recuadro

            // 1. Dibujar el CUADRO INTERNO
            pdf.setDrawColor(...BORDER);
            pdf.setLineWidth(0.15);
            pdf.rect(innerX, innerStartY, innerW, currentY - innerStartY, "S");

            // 2. Dibujar el CUADRO EXTERNO
            const outerEndY = currentY + padding;
            pdf.rect(M, outerStartY, CW, outerEndY - outerStartY, "S");

            y = outerEndY + 3; // Espacio antes del siguiente agente
        }

        y += 2;
    }

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  9. NOTAS SOBRE RESULTADOS                                ║
    // ╚═══════════════════════════════════════════════════════════╝
    if (documento.notas && documento.notas.length > 0) {
        y = drawBanner(pdf, y, "Notas");

        for (let i = 0; i < documento.notas.length; i++) {
            const nota = documento.notas[i];
            const resultado = documento.resultados?.find(r => r.id === nota.resultadoId);
            const parametro = resultado?.parametro || "Resultado";
            const contenido = nota.contenido || "-";

            // APA 7ª ed.: "Nota X. " en itálica + texto normal
            const prefijo = `Nota ${i + 1}. `;
            const textoNota = `[${parametro}] ${contenido}`;

            pdf.setFont("helvetica", "italic");
            pdf.setFontSize(6.5);
            const prefijoW = pdf.getTextWidth(prefijo);

            // Calcular altura del bloque para checkPage
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(6.5);
            const allLines = pdf.splitTextToSize(textoNota, CW - 6 - prefijoW);
            const blockH = Math.max(allLines.length, 1) * 2.8 + 3;

            y = checkPage(pdf, y, blockH);
            pdf.setTextColor(...GRAY);

            // "Nota X. " en itálica
            pdf.setFont("helvetica", "italic");
            pdf.setFontSize(6.5);
            pdf.text(prefijo, M + 2, y + 2);

            // Texto en normal
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(6.5);
            const notaLines = pdf.splitTextToSize(textoNota, CW - 6 - prefijoW);

            if (notaLines.length > 0) {
                pdf.text(notaLines[0], M + 2 + prefijoW, y + 2);
            }
            if (notaLines.length > 1) {
                y += 2.8;
                // Líneas restantes indentadas al mismo nivel
                const restText = notaLines.slice(1).join(" ");
                const restLines = pdf.splitTextToSize(restText, CW - 6);
                pdf.text(restLines, M + 2, y + 2);
                y += restLines.length * 2.8;
            } else {
                y += 2.8;
            }

            y += 1.5;
        }

        y += 3;
    }

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  10. REGISTRO FOTOGRÁFICO (anexos — APA 7.ª ed.)          ║
    // ╚═══════════════════════════════════════════════════════════╝
    const imgAnexos = (documento.anexos || []).filter(
        (a) => a.url && /\.(jpg|jpeg|png|gif|webp)/i.test(a.url),
    );

    if (imgAnexos.length > 0) {
        // Banner (10mm) + subtítulo (9mm) + al menos parte de 1 imagen (50mm) = 69mm
        y = checkPage(pdf, y, 69);
        y = drawBanner(pdf, y, "Registro Fotográfico");

        // 1. Iniciamos el registro del inicio del recuadro general
        let boxStartY = y;
        y += 4; // Padding superior interno

        // Subtítulo con cantidad
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(7);
        pdf.setTextColor(...GRAY);
        pdf.text(`Figuras registradas (${imgAnexos.length})`, M + 2, y);
        y += 5;

        // Layout: 1 imagen por fila, ancho completo
        const imgFullW = CW;
        const maxImgH = 100;

        for (let i = 0; i < imgAnexos.length; i++) {
            const anexo = imgAnexos[i];

            // Estimar espacio necesario: imagen + leyenda APA
            const neededH = maxImgH + 20;

            // 2. Control manual de salto de página para cerrar y abrir el borde
            if (y + neededH > PH - FOOTER_ZONE) {
                // Cerramos el recuadro en la página actual
                pdf.setDrawColor(...BORDER);
                pdf.setLineWidth(0.15);
                pdf.rect(M, boxStartY, CW, y - boxStartY, "S");

                // Salto de página
                pdf.addPage();
                y = M + 2;

                // Reiniciamos el inicio del recuadro para la nueva página
                boxStartY = y;
                y += 3; // Padding superior interno en la nueva página
            }

            const x = M;

            // -- APA 7ª ed.: Número de imagen + título (negrita) --
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(7);
            pdf.setTextColor(...DARK);
            const tituloImg = anexo.titulo ? `Imagen ${i + 1}: ${anexo.titulo}` : `Imagen ${i + 1}`;
            pdf.text(tituloImg, x + 2, y); // +2 de padding lateral para no tocar el borde
            y += 3.5;

            // Cargar e insertar imagen
            try {
                const img = await loadImage(anexo.url);
                if (img) {
                    // Restamos 4 al ancho para dar un margen izquierdo y derecho a la foto
                    const ratio = Math.min((imgFullW - 4) / img.w, maxImgH / img.h);
                    const imgW = img.w * ratio;
                    const imgH = img.h * ratio;
                    const imgX = x + (imgFullW - imgW) / 2; // centrar
                    pdf.addImage(img.data, imgX, y, imgW, imgH);
                    y += imgH + 2;
                } else {
                    y += 15;
                }
            } catch {
                y += 15;
            }

            // -- APA 7ª ed.: Nota al pie ("Nota. " en itálica + texto normal) --
            if (anexo.nota) {
                // "Nota. " en itálica
                pdf.setFont("helvetica", "italic");
                pdf.setFontSize(6.5);
                pdf.setTextColor(...GRAY);
                const prefijo = "Nota. ";
                const prefijoW = pdf.getTextWidth(prefijo);
                pdf.text(prefijo, x + 2, y); // +2 de padding

                // Texto de la nota en normal
                pdf.setFont("helvetica", "normal");
                const notaLines = pdf.splitTextToSize(
                    anexo.nota,
                    imgFullW - prefijoW - 4, // Restamos 4 por el padding
                );
                // Primera línea al lado del prefijo
                if (notaLines.length > 0) {
                    pdf.text(notaLines[0], x + 2 + prefijoW, y);
                }
                // Líneas siguientes con indentación completa
                if (notaLines.length > 1) {
                    y += 2.8;
                    const restLines = pdf.splitTextToSize(
                        notaLines.slice(1).join(" "),
                        imgFullW - 4,
                    );
                    pdf.text(restLines, x + 2, y);
                    y += restLines.length * 2.8;
                } else {
                    y += 2.8;
                }
            }

            y += 6; // Separación entre una imagen y la siguiente
        }

        // Padding inferior interno antes de cerrar
        y += 2;

        // 3. Cerramos el recuadro final (engloba todos los anexos o lo que quede en la última pág)
        pdf.setDrawColor(...BORDER);
        pdf.setLineWidth(0.15);
        pdf.rect(M, boxStartY, CW, y - boxStartY, "S");

        y += 4; // Espacio exterior hacia la siguiente sección
    }

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  10. FIRMAS                                               ║
    // ╚═══════════════════════════════════════════════════════════╝
    y = checkPage(pdf, y, 50);

    // Línea separadora
    pdf.setDrawColor(...BORDER);
    pdf.setLineWidth(0.3);
    pdf.line(M, y, PW - M, y);
    y += 6;

    const firmas = documento.firmas || [];
    const firmaColCount = 3;
    const firmaColW = CW / firmaColCount;

    if (firmas.length === 0) {
        // 3 columnas vacías por defecto
        const labels = [
            "Firma del Responsable",
            "Director Técnico",
            "Sello del Laboratorio",
        ];
        for (let i = 0; i < 3; i++) {
            const fx = M + i * firmaColW;
            const cx = fx + firmaColW / 2;

            pdf.setDrawColor(160, 160, 160);
            pdf.setLineWidth(0.4);
            pdf.line(fx + 10, y + 20, fx + firmaColW - 10, y + 20);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(6.5);
            pdf.setTextColor(...GRAY);
            pdf.text(labels[i], cx, y + 24, { align: "center" });
        }
        y += 28;
    } else {
        // Firmas dinámicas en 3 columnas
        for (let i = 0; i < firmas.length; i++) {
            const firma = firmas[i];
            const col = i % firmaColCount;
            const fx = M + col * firmaColW;
            const cx = fx + firmaColW / 2;

            if (col === 0 && i > 0) {
                y += 38;
                y = checkPage(pdf, y, 38);
            }

            const yFirma = y;

            // Imagen de firma
            if (firma.imagenUrl) {
                try {
                    const img = await loadImage(firma.imagenUrl);
                    if (img) {
                        const maxW = 38;
                        const maxH = 18;
                        const ratio = Math.min(maxW / img.w, maxH / img.h);
                        const imgW = img.w * ratio;
                        const imgH = img.h * ratio;
                        pdf.addImage(img.data, cx - imgW / 2, yFirma, imgW, imgH);
                    }
                } catch {
                    /* */
                }
            }

            // Línea sobre el nombre
            pdf.setDrawColor(160, 160, 160);
            pdf.setLineWidth(0.4);
            pdf.line(fx + 8, yFirma + 20, fx + firmaColW - 8, yFirma + 20);

            // Nombre
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(6.5);
            pdf.setTextColor(60, 60, 60);
            pdf.text(firma.nombre, cx, yFirma + 24, { align: "center" });

            // Cargo
            if (firma.cargo) {
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(6);
                pdf.setTextColor(...GRAY);
                pdf.text(firma.cargo, cx, yFirma + 28, { align: "center" });
            }
        }
        y += 32;
    }

    // ╔═══════════════════════════════════════════════════════════╗
    // ║  11. ACLARACIÓN                                           ║
    // ╚═══════════════════════════════════════════════════════════╝
    y += 4;
    y = checkPage(pdf, y, 10);

    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(5.5);
    pdf.setTextColor(...GRAY_LIGHT);
    const aclaracion =
        "ACLARACIÓN: Los resultados corresponden exclusivamente a la(s) muestra(s) analizada(s) y no deben ser utilizados como única base para decisiones sin la evaluación de un profesional competente. Este documento no incluye factores de corrección por muestreo.";
    const aclarLines = pdf.splitTextToSize(aclaracion, CW);
    pdf.text(aclarLines, PW / 2, y, { align: "center" });

    // ── Agregar footers a todas las páginas ──
    addFooters(pdf);

    // ── Descargar ──
    const nombre =
        `${documento.tipoDocumentoNombre || "Documento"}_${documento.codigo || "sin-codigo"}`.replace(
            /[^a-zA-Z0-9_\-.]/g,
            "_",
        );
    pdf.save(`${nombre}.pdf`);
}
