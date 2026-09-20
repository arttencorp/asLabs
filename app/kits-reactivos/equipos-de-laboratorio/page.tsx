import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import CatalogCategoryPage from "../catalog-category-page"

export const metadata: Metadata = constructMetadata({
  title: "Equipos de Laboratorio ONiLAB en Perú",
  description:
    "Catálogo de equipos ONiLAB en Perú: centrífugas, agitadores magnéticos, vortex, agitadores orbitales, pipetas, incubadoras y medidores de pH con precio referencial en soles.",
  keywords: [
    "equipos de laboratorio Perú",
    "equipos ONiLAB Perú",
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
  title: "Equipos ONiLAB para tu laboratorio.",
  description:
    "Cincuenta referencias para mezcla, centrifugación, pipeteo, incubación y medición, con fotografías del producto y cálculo referencial transparente en soles.",
  image: "https://m.media-amazon.com/images/I/61USTYJ+OPL._AC_CR0%2C0%2C0%2C0_SX1500_.jpg",
  introTitle: "Instrumentación seleccionada para rutinas reales",
  intro: [
    "La selección reúne equipos ONiLAB para preparación de soluciones, procesamiento de muestras, transferencia de líquidos y control básico de laboratorio. Cada referencia tiene una ficha individual con aplicaciones, características y código ASIN.",
    "El precio referencial se calcula con el precio base en dólares consultado el 20 de septiembre de 2026, tipo de cambio de S/4 por dólar y un factor comercial de 1,50. El envío referencial es de US$90, equivalente a S/360 por pedido, y se muestra por separado.",
  ],
  useCases: [
    { title: "Preparación y mezcla", text: "Agitadores magnéticos, orbitales, vortex y de techo para distintas escalas y viscosidades." },
    { title: "Procesamiento", text: "Centrífugas y equipos térmicos para separación, incubación y preparación de muestras." },
    { title: "Pipeteo y medición", text: "Micropipetas, dispensadores y medición de pH para rutinas reproducibles." },
  ],
  faq: [
    {
      question: "¿Cómo se calcula el precio publicado?",
      answer: "Se toma el precio base visible en dólares, se convierte con US$1 = S/4 y se multiplica por 1,50. La ficha muestra el precio base usado y la fecha de consulta para que el cálculo pueda auditarse.",
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
  noticeTitle: "Cálculo transparente.",
  notice:
    "Precio base consultado × S/4 × 1,50. Envío referencial de S/360 por pedido no incluido. Stock, impuestos, aduanas, peso, voltaje y configuración final se confirman en la cotización.",
}

export default function EquiposLaboratorioPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/equipos-de-laboratorio" />
}
