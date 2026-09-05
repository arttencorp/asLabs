import type { Metadata } from "next"
import EcuadorServiceClient from "@/components/ecuador-service-client"

export const metadata: Metadata = {
  title: "Formulaciones Bacterianas en Quito, Ecuador | AS Labs Ecuador",
  description: "Desarrollo, estandarización, fermentación piloto y control de calidad para formulaciones bacterianas y bioinsumos agrícolas.",
  keywords: ["formulaciones bacterianas Ecuador", "bioinsumos Quito", "fermentación bacteriana Ecuador", "biofertilizantes Ecuador", "control calidad bacteriano Quito"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/formulaciones-bacterianas", languages: { "es-EC": "https://aslaboratorios.com/ecuador/formulaciones-bacterianas" } },
  openGraph: { locale: "es_EC", url: "https://aslaboratorios.com/ecuador/formulaciones-bacterianas", title: "Formulaciones Bacterianas | AS Labs Ecuador", description: "Biotecnología microbiana y formulaciones desde Quito.", images: ["/servicios/image.png"] },
}

export default function FormulacionesBacterianasEcuadorPage() {
  return <EcuadorServiceClient kind="formulations" eyebrow="Formulaciones bacterianas" title="Microorganismos convertidos en soluciones aplicables" description="Diseñamos y evaluamos formulaciones bacterianas a partir de una necesidad concreta: cultivo objetivo, forma de aplicación, concentración, viabilidad y condiciones de conservación." image="/servicios/image.png" services={["Diseño de formulaciones bacterianas", "Fermentación líquida y sólida", "Estandarización de concentración microbiana", "Recuento, pureza y evaluación de viabilidad", "Producción piloto de bioinsumos", "Desarrollo de biofertilizantes", "Desarrollo de bioestimulantes", "Control microbiológico de lotes"]} methods={["Caracterización inicial del microorganismo", "Selección de condiciones de crecimiento", "Optimización y estandarización de biomasa", "Recuento, pureza y viabilidad microbiana", "Evaluación de estabilidad bajo alcance acordado", "Definición de condiciones de conservación"]} deliverables={["Informe técnico del lote o ensayo", "Parámetros de formulación evaluados", "Resultados de concentración, viabilidad y pureza", "Registro de controles aplicados", "Observaciones de estabilidad", "Recomendaciones de conservación y uso técnico"]} />
}
