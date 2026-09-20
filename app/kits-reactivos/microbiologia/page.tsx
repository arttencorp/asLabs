import type { Metadata } from "next"
import CatalogCategoryPage from "../catalog-category-page"
import { constructMetadata } from "@/lib/metadata"

const config = {
  scope: "microbiologia" as const,
  eyebrow: "Microbiología",
  title: "Reactivos para microbiología e identificación bacteriana",
  description: "Pruebas bioquímicas, reactivos bacteriológicos y soluciones para identificación de microorganismos con soporte técnico e importación en Perú.",
  image: "/servicios/micro.jpeg",
  introTitle: "Reactivos y pruebas para identificación microbiológica",
  intro: [
    "Esta sección reúne reactivos para microbiología, bacteriología e identificación de microorganismos dirigidos a laboratorios de análisis, investigación, industria y universidades en Perú.",
    "Organizamos las referencias por aplicación para facilitar la elección de pruebas bioquímicas, sistemas de identificación, colorantes, suplementos y materiales compatibles con rutinas microbiológicas.",
  ],
  useCases: [
    { title: "Identificación bacteriana", text: "Pruebas para caracterización presuntiva y confirmación de microorganismos de interés." },
    { title: "Control microbiológico", text: "Reactivos para análisis de alimentos, agua, superficies y procesos productivos." },
    { title: "Investigación aplicada", text: "Insumos para docencia, tesis, aislamiento y caracterización de bacterias." },
  ],
  faq: [
    { question: "¿Qué información necesitan para recomendar una prueba?", answer: "Indica el microorganismo objetivo, tipo de muestra, método de referencia, cantidad de determinaciones y equipamiento disponible." },
    { question: "¿Tienen reactivos para identificar bacterias?", answer: "Sí. El catálogo incluye pruebas y reactivos para identificación bacteriana; la referencia se valida de acuerdo con el flujo de trabajo del laboratorio." },
    { question: "¿Los productos son de importación?", answer: "Gran parte del portafolio se importa. Confirmamos fabricante, código, presentación, stock y condiciones de transporte antes de emitir la cotización final." },
    { question: "¿Realizan envíos dentro del Perú?", answer: "Coordinamos entregas nacionales según destino y requerimientos de conservación. El costo y el plazo se confirman en cada cotización." },
  ],
}

export const metadata: Metadata = constructMetadata({
  title: "Reactivos para Microbiología en Perú",
  description: "Reactivos para microbiología, identificación bacteriana y pruebas bioquímicas. Catálogo técnico e importación coordinada para laboratorios en Perú.",
  keywords: ["reactivos microbiología Perú", "identificación bacteriana Perú", "pruebas bioquímicas bacterianas Perú", "kits microbiología Perú", "reactivos bacteriología Perú", "insumos microbiología Trujillo", "reactivos laboratorio microbiológico"],
  path: "/kits-reactivos/microbiologia",
  image: config.image,
})

export default function MicrobiologiaCatalogPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/microbiologia" />
}
