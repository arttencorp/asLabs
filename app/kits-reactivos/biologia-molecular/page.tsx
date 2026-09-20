import type { Metadata } from "next"
import CatalogCategoryPage from "../catalog-category-page"
import { constructMetadata } from "@/lib/metadata"

const config = {
  scope: "molecular" as const,
  eyebrow: "Biología molecular",
  title: "Reactivos y kits de biología molecular",
  description: "Referencias para PCR, qPCR, extracción, purificación, cuantificación, electroforesis y análisis de ADN y ARN con importación coordinada en Perú.",
  image: "/kit-biologia-molecular.png",
  introTitle: "Insumos para PCR, extracción y análisis de ácidos nucleicos",
  intro: [
    "Seleccionamos kits y reactivos de biología molecular para laboratorios, universidades, tesistas y equipos de investigación que trabajan con ADN o ARN en Perú.",
    "El catálogo reúne soluciones para preparación de muestras, extracción y purificación, PCR y qPCR, cuantificación, electroforesis, clonación y transcriptómica. Antes de importar validamos la aplicación, la presentación y las condiciones de conservación.",
  ],
  useCases: [
    { title: "PCR y qPCR", text: "Master mixes, enzimas, sondas, primers y reactivos para amplificación y detección." },
    { title: "Extracción de ADN y ARN", text: "Kits y consumibles según matriz vegetal, bacteriana, tisular o ambiental." },
    { title: "Cuantificación y electroforesis", text: "Ensayos fluorescentes, marcadores, agarosas y materiales para análisis molecular." },
  ],
  faq: [
    { question: "¿Cómo elijo un kit de extracción de ADN?", answer: "La elección depende de la matriz, cantidad de muestras, pureza requerida y técnica posterior. Nuestro equipo revisa esos datos antes de confirmar la referencia." },
    { question: "¿Importan reactivos para PCR y qPCR a Perú?", answer: "Sí. Coordinamos la importación y validamos presentación, disponibilidad, temperatura de transporte y plazo estimado antes del pedido." },
    { question: "¿Los precios son definitivos?", answer: "Son referencias iniciales. El precio final se confirma según presentación, stock, impuestos, tipo de cambio y requisitos de conservación." },
    { question: "¿Ofrecen asesoría para investigadores y tesistas?", answer: "Sí. Podemos orientar la selección según el protocolo, número de muestras, equipo disponible y objetivo del análisis." },
  ],
}

export const metadata: Metadata = constructMetadata({
  title: "Kits de Biología Molecular en Perú",
  description: "Kits y reactivos para PCR, qPCR, extracción de ADN y ARN, cuantificación y electroforesis. Importación coordinada y asesoría técnica en Perú.",
  keywords: ["reactivos biología molecular Perú", "kits biología molecular Perú", "kits PCR Perú", "reactivos qPCR Perú", "kit extracción ADN Perú", "kit extracción ARN Perú", "purificación ADN Perú", "reactivos ADN ARN Perú", "insumos laboratorio molecular Trujillo"],
  path: "/kits-reactivos/biologia-molecular",
  image: config.image,
})

export default function BiologiaMolecularCatalogPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/biologia-molecular" />
}
