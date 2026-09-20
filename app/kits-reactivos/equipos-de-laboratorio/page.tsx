import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import CatalogCategoryPage from "../catalog-category-page"

export const metadata: Metadata = constructMetadata({
  title: "Equipos de Laboratorio",
  description:
    "Catálogo de equipos de laboratorio en Perú: centrífugas, agitadores magnéticos, vortex, agitadores orbitales, pipetas, incubadoras y medidores de pH con precios referenciales en soles.",
  keywords: [
    "equipos de laboratorio Perú",
    "centrífuga de laboratorio Perú",
    "agitador magnético con calefacción Perú",
    "mezclador vortex Perú",
    "agitador orbital laboratorio Perú",
    "micropipetas Perú",
    "incubadora de laboratorio Perú",
    "medidor de pH laboratorio Perú",
    "equipos de laboratorio Trujillo",
    "importación equipos de laboratorio Perú",
  ],
  path: "/kits-reactivos/equipos-de-laboratorio",
  image: "https://m.media-amazon.com/images/I/61USTYJ+OPL._AC_CR0%2C0%2C0%2C0_SX1500_.jpg",
})

const config = {
  scope: "laboratorio" as const,
  eyebrow: "Equipos de laboratorio",
  title: "Equipos de laboratorio",
  description:
    "Cincuenta referencias para mezcla, centrifugación, pipeteo, incubación y medición, con fotografías del producto y precios referenciales en soles.",
  image: "https://m.media-amazon.com/images/I/61USTYJ+OPL._AC_CR0%2C0%2C0%2C0_SX1500_.jpg",
  introTitle: "Instrumentación seleccionada para rutinas reales",
  intro: [
    "La selección reúne equipos para preparación de soluciones, procesamiento de muestras, transferencia de líquidos y control básico de laboratorio. Cada referencia tiene una ficha individual con aplicaciones y características principales.",
    "Consulta la disponibilidad, configuración eléctrica, accesorios incluidos y condiciones de importación antes de confirmar tu pedido.",
  ],
  useCases: [
    { title: "Preparación y mezcla", text: "Agitadores magnéticos, orbitales, vortex y de techo para distintas escalas y viscosidades." },
    { title: "Procesamiento", text: "Centrífugas y equipos térmicos para separación, incubación y preparación de muestras." },
    { title: "Pipeteo y medición", text: "Micropipetas, dispensadores y medición de pH para rutinas reproducibles." },
  ],
  faq: [
    {
      question: "¿Cómo solicito una cotización?",
      answer: "Selecciona el equipo y la cantidad requerida. Un asesor confirmará la versión, disponibilidad, configuración eléctrica, accesorios y plazo de importación antes de procesar el pedido.",
    },
    {
      question: "¿El precio incluye el envío internacional?",
      answer: "No. El envío referencial se presenta por separado: US$90, equivalente a S/360 por pedido. El importe final puede variar por peso, volumen, destino, impuestos, aduanas o modalidad de entrega.",
    },
    {
      question: "¿La alimentación eléctrica es compatible con Perú?",
      answer: "La tensión, frecuencia y tipo de enchufe se validan antes de confirmar cada pedido. No procesamos la importación sin revisar primero la configuración eléctrica de la referencia seleccionada.",
    },
    {
      question: "¿Stock, accesorios y garantía están confirmados?",
      answer: "Se confirman durante la cotización. Las publicaciones y precios de origen pueden cambiar, por lo que AS Laboratorios verifica disponibilidad, accesorios incluidos, versión y condiciones de garantía antes de procesar el pedido.",
    },
  ],
}

export default function EquiposLaboratorioPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/equipos-de-laboratorio" />
}
