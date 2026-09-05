import type { Metadata } from "next"
import EcuadorServiceClient from "@/components/ecuador-service-client"

export const metadata: Metadata = {
  title: "Biología Molecular en Quito, Ecuador | AS Labs Ecuador",
  description: "PCR, qPCR, RT-PCR, secuenciación, identificación molecular y genética vegetal en AS Labs Ecuador, Quito.",
  keywords: ["biología molecular Quito", "PCR Ecuador", "qPCR Quito", "secuenciación Sanger Ecuador", "identificación molecular Ecuador"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/biologia-molecular", languages: { "es-EC": "https://aslaboratorios.com/ecuador/biologia-molecular" } },
  openGraph: { locale: "es_EC", url: "https://aslaboratorios.com/ecuador/biologia-molecular", title: "Biología Molecular | AS Labs Ecuador", description: "Análisis moleculares especializados desde Quito.", images: ["/research/research-lab.png"] },
}

export default function BiologiaMolecularEcuadorPage() {
  return <EcuadorServiceClient kind="molecular" eyebrow="Biología molecular" title="Análisis moleculares para decisiones precisas" description="Diagnóstico, identificación y caracterización molecular para agricultura, microbiología, ambiente, alimentos e investigación desde nuestra sede en Quito." image="/research/research-lab.png" services={["Diagnóstico molecular agrícola", "Identificación bacteriana mediante 16S rRNA", "Identificación de hongos mediante ITS", "PCR, qPCR y RT-PCR", "Genética e identidad vegetal", "Diseño de primers y apoyo bioinformático", "Secuenciación Sanger", "Desarrollos moleculares a medida"]} methods={["Extracción de ADN y ARN según matriz", "PCR convencional, qPCR y RT-PCR", "Marcadores 16S e ITS", "Controles técnicos por corrida", "Comparación y análisis de secuencias"]} deliverables={["Informe de resultados", "Trazabilidad de muestras", "Interpretación del alcance", "Datos de secuencia según servicio", "Orientación técnica posterior"]} />
}
