import type { Metadata } from "next"
import EcuadorServiceClient from "@/components/ecuador-service-client"

export const metadata: Metadata = {
  title: "Formulaciones Bacterianas en Quito, Ecuador | AS Labs Ecuador",
  description: "Desarrollo, estandarización, fermentación y control de calidad de formulaciones bacterianas y bioinsumos en Quito, Ecuador.",
  keywords: ["formulaciones bacterianas Ecuador", "bioinsumos Quito", "fermentación bacteriana Ecuador", "biofertilizantes Ecuador", "control calidad bacteriano Quito"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/formulaciones-bacterianas", languages: { "es-EC": "https://aslaboratorios.com/ecuador/formulaciones-bacterianas" } },
  openGraph: { locale: "es_EC", url: "https://aslaboratorios.com/ecuador/formulaciones-bacterianas", title: "Formulaciones Bacterianas | AS Labs Ecuador", description: "Biotecnología microbiana y formulaciones desde Quito.", images: ["/servicios/image.png"] },
}

export default function FormulacionesBacterianasEcuadorPage() {
  return <EcuadorServiceClient kind="formulations" eyebrow="Biotecnología microbiana" title="Formulaciones bacterianas con control técnico" description="Desarrollo y estandarización de formulaciones bacterianas para aplicaciones agrícolas, productivas y proyectos de investigación, con parámetros definidos de calidad y viabilidad." image="/servicios/image.png" services={["Desarrollo de formulaciones bacterianas", "Fermentación líquida y sólida", "Estandarización de concentración", "Evaluación de viabilidad", "Producción piloto de bioinsumos", "Formulación de biofertilizantes", "Formulación de bioestimulantes", "Control de calidad microbiano"]} methods={["Selección de condiciones de crecimiento", "Estandarización de biomasa", "Recuento y viabilidad microbiana", "Evaluación de pureza", "Estabilidad bajo alcance acordado"]} deliverables={["Informe técnico del lote o ensayo", "Parámetros de formulación evaluados", "Resultados de viabilidad y pureza", "Registro de controles", "Recomendaciones de conservación"]} />
}
