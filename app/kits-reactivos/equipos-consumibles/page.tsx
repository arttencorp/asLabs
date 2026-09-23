import type { Metadata } from "next"
import CatalogCategoryPage from "../catalog-category-page"
import { constructMetadata } from "@/lib/metadata"

const config = {
  scope: "equipos" as const,
  eyebrow: "Equipos y consumibles",
  title: "Equipos y consumibles para laboratorio molecular",
  description: "Instrumentos, consumibles para PCR y materiales de laboratorio seleccionados para flujos de biología molecular, investigación y análisis.",
  image: "/lab-equipment.png",
  introTitle: "Instrumentos y consumibles para flujos de laboratorio",
  intro: [
    "Encuentra equipos, consumibles para PCR y materiales de biología molecular para laboratorios de análisis, universidades y proyectos de investigación en Perú.",
    "La selección reúne referencias compatibles con preparación de muestras, amplificación, manipulación de líquidos, conservación y procesamiento. Validamos código, capacidad, compatibilidad y presentación antes de importar.",
  ],
  useCases: [
    { title: "Consumibles para PCR", text: "Tubos, placas, sellos y materiales para amplificación convencional y en tiempo real." },
    { title: "Equipamiento molecular", text: "Instrumentos y accesorios para preparación, medición y procesamiento de muestras." },
    { title: "Material de laboratorio", text: "Referencias para manipulación, almacenamiento y organización de flujos analíticos." },
  ],
  faq: [
    { question: "¿Cómo verifican la compatibilidad de un consumible?", answer: "Revisamos el modelo del equipo, formato, volumen, material, esterilidad y código de fabricante antes de confirmar la referencia." },
    { question: "¿Importan equipos de laboratorio a Perú?", answer: "Sí. La disponibilidad, garantía, accesorios, voltaje y plazo se validan individualmente antes de emitir la cotización final." },
    { question: "¿Puedo solicitar una referencia que no aparece?", answer: "Sí. Envíanos la marca, código o ficha técnica y revisaremos disponibilidad y alternativas equivalentes." },
    { question: "¿El precio incluye instalación o capacitación?", answer: "Depende del equipo. La cotización especificará producto, accesorios, envío y cualquier servicio adicional incluido." },
  ],
}

export const metadata: Metadata = constructMetadata({
  title: "Equipos y Consumibles de Laboratorio en Perú",
  description: "Equipos, consumibles para PCR y materiales de biología molecular. Validación técnica e importación coordinada para laboratorios en Perú.",
  keywords: ["equipos laboratorio Perú", "consumibles PCR Perú", "materiales biología molecular Perú", "equipos moleculares Perú", "insumos de laboratorio Perú", "equipos laboratorio Trujillo", "consumibles qPCR Perú"],
  path: "/kits-reactivos/equipos-consumibles",
  image: config.image,
})

export default function EquiposConsumiblesCatalogPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/equipos-consumibles" />
}
