import { StrainDevelopmentPageContent } from "@/app/servicios/aislamiento-seleccion-cepas/page"
import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Aislamiento, Selección e Identificación de Cepas en Ecuador",
  description:
    "Desarrollo de cepas para biofertilizantes y control biológico en Ecuador: aislamiento de hasta 30 candidatos, selección funcional, WGS, bioinformática, validación y seguimiento.",
  path: "/ecuador/aislamiento-seleccion-cepas",
  image: "/research/research-lab.png",
  locale: "es_EC",
  languages: {
    "es-EC": "https://aslaboratorios.com/ecuador/aislamiento-seleccion-cepas",
    "es-PE": "https://aslaboratorios.com/servicios/aislamiento-seleccion-cepas",
    "x-default": "https://aslaboratorios.com/servicios/aislamiento-seleccion-cepas",
  },
  keywords: [
    "aislamiento de cepas bacterianas Ecuador",
    "selección de cepas biofertilizantes Ecuador",
    "WGS bacteriano Ecuador",
    "cepas para control biológico Ecuador",
    "microorganismos promotores del crecimiento Ecuador",
    "desarrollo de bioinsumos Ecuador",
    "secuenciación de genoma bacteriano Ecuador",
    "análisis bioinformático bacteriano Ecuador",
    "AS Labs Quito",
  ],
})

export default function EcuadorStrainDevelopmentPage() {
  return <StrainDevelopmentPageContent ecuador />
}
