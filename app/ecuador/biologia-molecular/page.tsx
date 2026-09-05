import type { Metadata } from "next"
import EcuadorServiceClient from "@/components/ecuador-service-client"

export const metadata: Metadata = {
  title: "Biología Molecular en Quito, Ecuador | AS Labs Ecuador",
  description: "Recepción y coordinación en Quito para PCR, qPCR, 16S rRNA, ITS, secuenciamiento Sanger y genoma completo procesados en los laboratorios de AS Labs Perú.",
  keywords: ["biología molecular Quito", "PCR Ecuador", "16S rRNA Ecuador", "secuenciamiento genoma completo Ecuador", "qPCR Quito", "secuenciamiento Sanger Ecuador", "identificación molecular Ecuador"],
  alternates: { canonical: "https://aslaboratorios.com/ecuador/biologia-molecular", languages: { "es-EC": "https://aslaboratorios.com/ecuador/biologia-molecular" } },
  openGraph: { locale: "es_EC", url: "https://aslaboratorios.com/ecuador/biologia-molecular", title: "Biología Molecular | AS Labs Ecuador", description: "Análisis moleculares especializados desde Quito.", images: ["/research/research-lab.png"] },
}

export default function BiologiaMolecularEcuadorPage() {
  return <EcuadorServiceClient kind="molecular" eyebrow="Biología molecular" title="Respuestas moleculares para preguntas complejas" description="Coordinamos la recepción de muestras y el alcance técnico desde Quito. Los análisis, la amplificación y el secuenciamiento se realizan en nuestros laboratorios especializados del Perú." image="/research/research-lab.png" services={["Secuenciamiento de genoma completo (WGS)", "Identificación bacteriana mediante 16S rRNA", "Identificación de hongos mediante región ITS", "PCR convencional, qPCR y RT-PCR", "Diagnóstico molecular de patógenos agrícolas", "Genética e identidad vegetal", "Diseño de primers y soporte bioinformático", "Secuenciamiento Sanger y análisis de secuencias"]} methods={["Recepción y revisión técnica desde Quito", "Extracción de ADN o ARN según la matriz", "PCR convencional, qPCR y RT-PCR", "Marcadores 16S rRNA e ITS", "Secuenciamiento Sanger o de genoma completo", "Controles técnicos y análisis bioinformático en Perú"]} deliverables={["Informe técnico de resultados", "Trazabilidad e identificación de muestras", "Archivos de secuencia según el servicio", "Resultados de comparación bioinformática", "Interpretación dentro del alcance contratado", "Orientación técnica posterior a la entrega"]} />
}
