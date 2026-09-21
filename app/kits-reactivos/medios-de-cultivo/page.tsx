import type { Metadata } from "next"
import CatalogCategoryPage from "../catalog-category-page"
import { constructMetadata } from "@/lib/metadata"

const config = {
  scope: "medios" as const,
  eyebrow: "Medios de cultivo",
  title: "Medios de cultivo",
  description: "Agares y medios deshidratados de importación en presentaciones de 500 g, 1 kg y 2 kg para diagnóstico, investigación y control microbiológico.",
  image: "/kit-microbiologia.png",
  introTitle: "Agares y medios deshidratados de importación",
  intro: [
    "Cotiza medios de cultivo microbiológico en Perú para aislamiento, diferenciación, recuento, antibiogramas y control de calidad. Cada ficha incluye código, aplicación, preparación, pH y precio referencial de la presentación de 500 g.",
    "Ofrecemos presentaciones de 500 g, 1 kg y 2 kg. Las presentaciones mayores se cotizan según disponibilidad; antes del pedido confirmamos la referencia exacta, el lote, las condiciones de importación y el plazo estimado.",
  ],
  useCases: [
    { title: "Aislamiento y diferenciación", text: "MacConkey, manitol salado, citrato de Simmons, LIA, TSI y MIO." },
    { title: "Sensibilidad antimicrobiana", text: "Agar Mueller-Hinton para ensayos de difusión en disco y rutinas de antibiograma." },
    { title: "Cultivo general y hongos", text: "TSA, agar sangre y Sabouraud dextrosa para distintos flujos microbiológicos." },
  ],
  faq: [
    { question: "¿Qué presentaciones de medios de cultivo ofrecen?", answer: "Trabajamos presentaciones de 500 g, 1 kg y 2 kg. El precio visible corresponde a 500 g; las presentaciones de 1 kg y 2 kg se cotizan por separado." },
    { question: "¿Las referencias incluyen ficha técnica?", answer: "Sí. Cada referencia muestra su código, presentación, preparación, pH, aplicaciones y condiciones de conservación." },
    { question: "¿Cómo selecciono el agar adecuado?", answer: "Depende del microorganismo, la muestra, el objetivo del ensayo y el método aplicado. Podemos revisar esos datos antes de confirmar el producto." },
    { question: "¿Realizan importación de medios de cultivo a Perú?", answer: "Sí. La cotización final considera disponibilidad, presentación, importación, destino y condiciones de conservación del producto." },
  ],
}

export const metadata: Metadata = constructMetadata({
  title: "Medios de Cultivo en Perú",
  description: "Medios de cultivo en Perú: MacConkey, Mueller-Hinton, TSA, Sabouraud, TSI y más. Presentaciones de 500 g, 1 kg y 2 kg.",
  keywords: ["medios de cultivo Perú", "comprar medios de cultivo Perú", "agar MacConkey Perú", "agar Mueller Hinton Perú", "agar TSA Perú", "agar Sabouraud Perú", "agar TSI Perú", "medios microbiológicos Perú", "medios de cultivo Trujillo"],
  path: "/kits-reactivos/medios-de-cultivo",
  image: config.image,
})

export default function MediosCultivoCatalogPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/medios-de-cultivo" />
}
