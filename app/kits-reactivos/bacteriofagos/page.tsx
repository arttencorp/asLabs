import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import CatalogCategoryPage from "../catalog-category-page"

export const metadata: Metadata = constructMetadata({
  title: "Bacteriófagos para Investigación en Perú",
  description:
    "Catálogo de bacteriófagos para investigación en Perú: SniPha 360, SniPha 580, ZeptoMetrix MS2 y PYO. Consulta microorganismos objetivo, concentración, conservación y precio referencial.",
  keywords: [
    "bacteriófagos Perú",
    "bacteriófagos para investigación Perú",
    "comprar bacteriófagos Perú",
    "bacteriófago MS2 Perú",
    "control interno MS2 RT PCR Perú",
    "SniPha 360 Perú",
    "SniPha 580 Perú",
    "bacteriófago PYO Perú",
    "mezcla de fagos bacterianos Perú",
    "bacteriófagos E coli Perú",
    "bacteriófagos Pseudomonas aeruginosa Perú",
    "bacteriófagos Staphylococcus aureus Perú",
    "bacteriófagos para microbiología Trujillo",
    "reactivos para investigación microbiológica Perú",
  ],
  path: "/kits-reactivos/bacteriofagos",
  image: "https://www.phage24.com/media/image/product/1/lg/snipha-360-bakteriophagen-mikroorganismen-20ml~2.jpg",
})

const config = {
  scope: "bacteriofagos" as const,
  eyebrow: "Bacteriófagos",
  title: "Bacteriófagos para investigación microbiológica.",
  description:
    "Mezclas líticas y controles de proceso con información técnica clara sobre microorganismos objetivo, título, presentación y conservación.",
  image: "https://www.phage24.com/media/image/product/1/lg/snipha-360-bakteriophagen-mikroorganismen-20ml~2.jpg",
  introTitle: "Una selección técnica para ensayos reproducibles",
  intro: [
    "Reunimos preparados de bacteriófagos para estudios microbiológicos, evaluación de especificidad bacteriana y control de procesos de amplificación molecular. Cada ficha diferencia el organismo objetivo, la concentración declarada y las condiciones de almacenamiento.",
    "La disponibilidad, los permisos aplicables, la cadena de frío y el plazo de importación se validan antes de confirmar cada solicitud.",
  ],
  useCases: [
    { title: "Investigación microbiológica", text: "Mezclas dirigidas a especies bacterianas definidas para ensayos controlados." },
    { title: "Control molecular", text: "MS2 como control de extracción, retrotranscripción y amplificación de ARN." },
    { title: "Conservación validada", text: "Revisión de temperatura, transporte y documentación antes de la entrega." },
  ],
  faq: [
    {
      question: "¿Estos bacteriófagos pueden utilizarse con fines médicos?",
      answer: "No. Las referencias publicadas por AS Laboratorios se ofrecen únicamente para investigación. No están destinadas a diagnóstico, tratamiento, consumo humano, uso clínico ni administración a personas o animales.",
    },
    {
      question: "¿Qué bacterias cubren SniPha 360 y SniPha 580?",
      answer: "SniPha 360 está dirigido a E. coli, S. aureus, P. aeruginosa, S. pyogenes, P. vulgaris y P. mirabilis. SniPha 580 está dirigido a E. coli, K. pneumoniae y E. faecalis.",
    },
    {
      question: "¿Para qué se utiliza el bacteriófago MS2?",
      answer: "La referencia ZeptoMetrix MS2 de 0,1 mL puede emplearse como control interno o de proceso en flujos de extracción, retrotranscripción y amplificación de ácidos nucleicos. El laboratorio debe validar su idoneidad para el protocolo previsto.",
    },
    {
      question: "¿El precio incluye importación, IGV y cadena de frío?",
      answer: "Los precios son referenciales. En SniPha 360 y SniPha 580 el valor publicado se muestra más IGV. AS Laboratorios confirmará stock, impuestos, permisos, transporte y cadena de frío antes de procesar la solicitud.",
    },
  ],
  notice:
    "Todos los bacteriófagos de esta sección son únicamente para investigación. No están destinados a diagnóstico, tratamiento, consumo humano, uso veterinario ni procedimientos clínicos.",
  noticeTitle: "Uso restringido.",
}

export default function BacteriofagosPage() {
  return <CatalogCategoryPage config={config} path="/kits-reactivos/bacteriofagos" />
}
