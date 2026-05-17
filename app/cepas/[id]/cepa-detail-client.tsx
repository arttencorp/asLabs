"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Plus, Minus, X, MessageSquare, ArrowLeft, ShoppingCart, Check } from "lucide-react"

interface Presentacion {
  id: string
  tipo: string
  medio?: string
  volumen?: string
  precio: number
}

interface Cepa {
  id: string
  nombre: string
  cientifico: string
  categoria: string
  descripcion: string
  beneficios: string[]
  presentaciones: Presentacion[]
  viabilidad: string
  concentracion: string
  almacenamiento: string
  aplicacion: string
  compatibilidad: string
  imagen: string
}

interface CartItem {
  cepaId: string
  presentacionId: string
  cepaNombre: string
  presentacionInfo: string
  precio: number
  cantidad: number
}

const allCepas: Cepa[] = [
  {
    id: "1",
    nombre: "Bacillus subtilis",
    cientifico: "Bacillus subtilis",
    categoria: "Biofertilizante",
    descripcion: "Bacteria promotora del crecimiento vegetal y fijadora de nitrógeno atmosférico. Mejora la disponibilidad de nutrientes y estimula el desarrollo radicular en cultivos agrícolas.",
    beneficios: ["Aumenta disponibilidad de nutrientes", "Mejora la salud del suelo", "Estimula el desarrollo radicular", "Fija nitrógeno atmosférico"],
    presentaciones: [
      { id: "1-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 14.00 },
      { id: "1-2", tipo: "Placa por Estriado", medio: "TSA", precio: 16.00 },
      { id: "1-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "1-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 23.00 },
      { id: "1-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 18.00 },
      { id: "1-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 21.00 },
      { id: "1-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 16.00 },
      { id: "1-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 14.00 },
      { id: "1-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 32.00 },
      { id: "1-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 30.00 },
      { id: "1-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 50.00 },
      { id: "1-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 48.00 },
      { id: "1-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 85.00 },
      { id: "1-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 80.00 },
      { id: "1-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 320.00 },
      { id: "1-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 300.00 },
    ],
    viabilidad: "> 96%",
    concentracion: "2 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Riego y aspersión foliar",
    compatibilidad: "Compatible con fungicidas y bactericidas",
    imagen: "/bacteria/bacillus-subtilis.jpg",
  },
  {
    id: "2",
    nombre: "Pseudomonas fluorescens",
    cientifico: "Pseudomonas fluorescens",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento. Produce fitohormonas que estimulan el desarrollo vegetal.",
    beneficios: ["Solubiliza fosfato inorgánico", "Produce fitohormonas", "Reduce patógenos del suelo", "Mejora absorción de nutrientes"],
    presentaciones: [
      { id: "2-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 15.00 },
      { id: "2-2", tipo: "Placa por Estriado", medio: "TSA", precio: 17.00 },
      { id: "2-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 21.00 },
      { id: "2-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 24.00 },
      { id: "2-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 19.00 },
      { id: "2-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 22.00 },
      { id: "2-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 17.00 },
      { id: "2-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 15.00 },
      { id: "2-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 34.00 },
      { id: "2-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 32.00 },
      { id: "2-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 52.00 },
      { id: "2-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 50.00 },
      { id: "2-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 88.00 },
      { id: "2-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 83.00 },
      { id: "2-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 330.00 },
      { id: "2-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 310.00 },
    ],
    viabilidad: "> 95%",
    concentracion: "1.5 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 10 meses",
    aplicacion: "Riego, aspersión, tratamiento de semilla",
    compatibilidad: "No compatible con antibióticos sistémicos",
    imagen: "/bacteria/pseudomonas-fluorescens.jpg",
  },
  {
    id: "3",
    nombre: "Azospirillum brasilense",
    cientifico: "Azospirillum brasilense",
    categoria: "Biofertilizante",
    descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas. Reduce significativamente el uso de fertilizantes nitrogenados.",
    beneficios: ["Fija nitrógeno del aire", "Reduce uso de fertilizantes", "Mejora tolerancia al estrés", "Aumenta rendimiento de cosechas"],
    presentaciones: [
      { id: "3-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 14.00 },
      { id: "3-2", tipo: "Placa por Estriado", medio: "TSA", precio: 16.00 },
      { id: "3-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "3-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 23.00 },
      { id: "3-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 18.00 },
      { id: "3-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 21.00 },
      { id: "3-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 16.00 },
      { id: "3-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 14.00 },
      { id: "3-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 32.00 },
      { id: "3-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 30.00 },
      { id: "3-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 50.00 },
      { id: "3-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 48.00 },
      { id: "3-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 85.00 },
      { id: "3-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 80.00 },
      { id: "3-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 320.00 },
      { id: "3-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 300.00 },
    ],
    viabilidad: "> 93%",
    concentracion: "1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 14 meses",
    aplicacion: "Inoculación de semillas y riego",
    compatibilidad: "Compatible con la mayoría de productos",
    imagen: "/bacteria/azospirillum-brasilense.jpg",
  },
  {
    id: "4",
    nombre: "Bacillus megaterium",
    cientifico: "Bacillus megaterium",
    categoria: "Biofertilizante",
    descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal. Mejora significativamente la fertilidad del suelo.",
    beneficios: ["Solubiliza potasio y fosfato", "Mejora fertilidad del suelo", "Aumenta producción", "Optimiza absorción de nutrientes"],
    presentaciones: [
      { id: "4-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 14.00 },
      { id: "4-2", tipo: "Placa por Estriado", medio: "TSA", precio: 16.00 },
      { id: "4-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "4-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 23.00 },
      { id: "4-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 18.00 },
      { id: "4-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 21.00 },
      { id: "4-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 16.00 },
      { id: "4-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 14.00 },
      { id: "4-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 32.00 },
      { id: "4-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 30.00 },
      { id: "4-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 50.00 },
      { id: "4-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 48.00 },
      { id: "4-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 85.00 },
      { id: "4-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 80.00 },
      { id: "4-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 320.00 },
      { id: "4-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 300.00 },
    ],
    viabilidad: "> 96%",
    concentracion: "2 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 13 meses",
    aplicacion: "Riego, aspersión foliar",
    compatibilidad: "Compatible con fungicidas sistémicos",
    imagen: "/bacteria/bacillus-megaterium.jpg",
  },
  {
    id: "5",
    nombre: "Escherichia coli",
    cientifico: "Escherichia coli (K-12)",
    categoria: "Investigación",
    descripcion: "Bacteria modelo para investigación científica y producción de proteínas recombinantes. Ampliamente utilizada en ingeniería genética.",
    beneficios: ["Desarrollo de bioingeniería", "Investigación genética", "Producción de proteínas", "Estudios moleculares"],
    presentaciones: [
      { id: "5-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 12.00 },
      { id: "5-2", tipo: "Placa por Estriado", medio: "TSA", precio: 14.00 },
      { id: "5-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 18.00 },
      { id: "5-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 21.00 },
      { id: "5-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 16.00 },
      { id: "5-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 19.00 },
      { id: "5-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 14.00 },
      { id: "5-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 12.00 },
      { id: "5-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 28.00 },
      { id: "5-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 26.00 },
      { id: "5-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 45.00 },
      { id: "5-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 43.00 },
      { id: "5-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 78.00 },
      { id: "5-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 75.00 },
      { id: "5-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 290.00 },
      { id: "5-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 280.00 },
    ],
    viabilidad: "> 97%",
    concentracion: "1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Investigación y clonación",
    compatibilidad: "Estándar para laboratorios",
    imagen: "/bacteria/escherichia-coli.jpg",
  },
  {
    id: "6",
    nombre: "Bacillus cereus",
    cientifico: "Bacillus cereus",
    categoria: "Investigación",
    descripcion: "Bacteria para estudios de control de plagas y patología. Utilizada en investigación de virulencia bacteriana.",
    beneficios: ["Modelos de investigación", "Entomología aplicada", "Estudios de virulencia", "Desarrollo de bioinsecticidas"],
    presentaciones: [
      { id: "6-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 13.00 },
      { id: "6-2", tipo: "Placa por Estriado", medio: "TSA", precio: 15.00 },
      { id: "6-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 19.00 },
      { id: "6-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 22.00 },
      { id: "6-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 17.00 },
      { id: "6-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 20.00 },
      { id: "6-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 15.00 },
      { id: "6-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 13.00 },
      { id: "6-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 30.00 },
      { id: "6-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 28.00 },
      { id: "6-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 48.00 },
      { id: "6-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 46.00 },
      { id: "6-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 82.00 },
      { id: "6-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 78.00 },
      { id: "6-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 310.00 },
      { id: "6-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 295.00 },
    ],
    viabilidad: "> 94%",
    concentracion: "1.5 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Investigación entomológica",
    compatibilidad: "Requiere precauciones de bioseguridad",
    imagen: "/bacteria/bacillus-cereus.jpg",
  },
  {
    id: "7",
    nombre: "Bacillus thuringiensis",
    cientifico: "Bacillus thuringiensis",
    categoria: "Control Biológico",
    descripcion: "Bacteria natural para control biológico de insectos plaga. Segura para agricultura orgánica y fauna benéfica.",
    beneficios: ["Control de lepidópteros", "Compatible con agricultura orgánica", "Seguro para insectos benéficos", "Sin resistencia cruzada"],
    presentaciones: [
      { id: "7-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 14.00 },
      { id: "7-2", tipo: "Placa por Estriado", medio: "TSA", precio: 16.00 },
      { id: "7-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "7-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 23.00 },
      { id: "7-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 18.00 },
      { id: "7-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 21.00 },
      { id: "7-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 16.00 },
      { id: "7-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 14.00 },
      { id: "7-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 32.00 },
      { id: "7-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 30.00 },
      { id: "7-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 50.00 },
      { id: "7-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 48.00 },
      { id: "7-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 85.00 },
      { id: "7-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 80.00 },
      { id: "7-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 320.00 },
      { id: "7-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 300.00 },
    ],
    viabilidad: "> 95%",
    concentracion: "1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Aspersión en cultivo",
    compatibilidad: "Compatible con la mayoría de productos",
    imagen: "/bacteria/bacillus-thuringiensis.jpg",
  },
  {
    id: "8",
    nombre: "Pseudomonas aeruginosa",
    cientifico: "Pseudomonas aeruginosa",
    categoria: "Investigación",
    descripcion: "Bacteria para investigación molecular y microbiología clínica. Modelo para estudios de patogénesis y resistencia antimicrobiana.",
    beneficios: ["Estudios de patogénesis", "Desarrollo de nuevos antibióticos", "Investigación de biopelículas", "Microbiología clínica"],
    presentaciones: [
      { id: "8-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 15.00 },
      { id: "8-2", tipo: "Placa por Estriado", medio: "TSA", precio: 17.00 },
      { id: "8-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 21.00 },
      { id: "8-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 24.00 },
      { id: "8-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 19.00 },
      { id: "8-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 22.00 },
      { id: "8-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 17.00 },
      { id: "8-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 15.00 },
      { id: "8-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 34.00 },
      { id: "8-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 32.00 },
      { id: "8-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 52.00 },
      { id: "8-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 50.00 },
      { id: "8-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 88.00 },
      { id: "8-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 83.00 },
      { id: "8-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 330.00 },
      { id: "8-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 310.00 },
    ],
    viabilidad: "> 96%",
    concentracion: "1.5 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Investigación molecular",
    compatibilidad: "Requiere precauciones de bioseguridad",
    imagen: "/bacteria/pseudomonas-aeruginosa.jpg",
  },
  {
    id: "9",
    nombre: "Streptomyces lydicus",
    cientifico: "Streptomyces lydicus",
    categoria: "Control Biológico",
    descripcion: "Actinobacteria productora de compuestos antimicrobianos naturales. Controla patógenos del suelo de forma sostenible.",
    beneficios: ["Control de patógenos del suelo", "Producción de antibióticos", "Regeneración de suelo", "Compatible con cultivos orgánicos"],
    presentaciones: [
      { id: "9-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 15.00 },
      { id: "9-2", tipo: "Placa por Estriado", medio: "TSA", precio: 17.00 },
      { id: "9-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 21.00 },
      { id: "9-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 24.00 },
      { id: "9-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 19.00 },
      { id: "9-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 22.00 },
      { id: "9-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 17.00 },
      { id: "9-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 15.00 },
      { id: "9-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 34.00 },
      { id: "9-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 32.00 },
      { id: "9-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 52.00 },
      { id: "9-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 50.00 },
      { id: "9-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 88.00 },
      { id: "9-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 83.00 },
      { id: "9-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 330.00 },
      { id: "9-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 310.00 },
    ],
    viabilidad: "> 94%",
    concentracion: "1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 16 meses",
    aplicacion: "Aspersión y riego",
    compatibilidad: "Compatible con biofertilizantes",
    imagen: "/bacteria/streptomyces-lydicus.jpg",
  },
  {
    id: "10",
    nombre: "Bacillus firmus",
    cientifico: "Bacillus firmus GB-126",
    categoria: "Biofertilizante",
    descripcion: "Bacteria activadora de crecimiento radicular y tolerante a estrés hídrico. Ideal para cultivos en condiciones de sequía.",
    beneficios: ["Tolerancia a sequía", "Desarrollo radicular mejorado", "Resistencia a estrés", "Mejor aprovechamiento hídrico"],
    presentaciones: [
      { id: "10-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 14.00 },
      { id: "10-2", tipo: "Placa por Estriado", medio: "TSA", precio: 16.00 },
      { id: "10-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "10-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 23.00 },
      { id: "10-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 18.00 },
      { id: "10-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 21.00 },
      { id: "10-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 16.00 },
      { id: "10-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 14.00 },
      { id: "10-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 32.00 },
      { id: "10-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 30.00 },
      { id: "10-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 50.00 },
      { id: "10-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 48.00 },
      { id: "10-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 85.00 },
      { id: "10-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 80.00 },
      { id: "10-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 320.00 },
      { id: "10-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 300.00 },
    ],
    viabilidad: "> 95%",
    concentracion: "1.5 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 14 meses",
    aplicacion: "Riego y tratamiento de semilla",
    compatibilidad: "Compatible con la mayoría de productos",
    imagen: "/bacteria/bacillus-firmus.jpg",
  },
]

const categoryColors: { [key: string]: { badge: string; bg: string } } = {
  "Control Biológico": { badge: "border-emerald-500 text-emerald-700 bg-emerald-50", bg: "bg-emerald-50" },
  "Biofertilizante": { badge: "border-blue-500 text-blue-700 bg-blue-50", bg: "bg-blue-50" },
  "Investigación": { badge: "border-purple-500 text-purple-700 bg-purple-50", bg: "bg-purple-50" },
}

export default function CepaDetailClient({ cepaId }: { cepaId: string }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedPresentacion, setSelectedPresentacion] = useState<string | null>(null)

  const cepa = allCepas.find((c) => c.id === cepaId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [cepaId])

  if (!cepa) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <p className="text-slate-600 text-lg">Cepa no encontrada</p>
        </div>
        <Footer />
      </div>
    )
  }

  const agregarAlCarrito = (presentacionId: string) => {
    const pres = cepa.presentaciones.find((p) => p.id === presentacionId)
    if (!pres) return

    const presInfo = pres.volumen
      ? `${pres.tipo} - ${pres.medio} ${pres.volumen}`
      : `${pres.tipo} - ${pres.medio}`

    const existe = cart.find((item) => item.presentacionId === presentacionId)

    if (existe) {
      setCart(
        cart.map((item) =>
          item.presentacionId === presentacionId ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      )
    } else {
      setCart([
        ...cart,
        {
          cepaId: cepa.id,
          presentacionId,
          cepaNombre: cepa.nombre,
          presentacionInfo: presInfo,
          precio: pres.precio,
          cantidad: 1,
        },
      ])
    }

    setSelectedPresentacion(null)
  }

  const actualizarCantidad = (presentacionId: string, nueva: number) => {
    if (nueva <= 0) {
      setCart(cart.filter((item) => item.presentacionId !== presentacionId))
    } else {
      setCart(cart.map((item) => (item.presentacionId === presentacionId ? { ...item, cantidad: nueva } : item)))
    }
  }

  const totalCarrito = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const cantidadItems = cart.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-slate-200">
          <div className="container mx-auto px-4 py-3">
            <Link href="/cepas" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 w-fit">
              <ArrowLeft className="w-4 h-4" />
              Volver al catálogo
            </Link>
          </div>
        </div>

        {/* Hero - Compact Image Left, Details Right */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Left - Image Compact */}
            <div className="flex items-center justify-center bg-slate-50 rounded-xl p-6 h-80 lg:h-auto">
              <img 
                src={cepa.imagen} 
                alt={cepa.nombre}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Middle - Title & Specs */}
            <div>
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 rounded-lg border text-sm font-bold ${categoryColors[cepa.categoria]?.badge}`}>
                  {cepa.categoria}
                </span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-1 leading-tight">{cepa.nombre}</h1>
              <p className="text-slate-500 italic font-normal mb-6">{cepa.cientifico}</p>

              <div className="space-y-3 mb-8">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Características Técnicas</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Viabilidad</span>
                    <span className="font-bold text-slate-900">{cepa.viabilidad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Concentración</span>
                    <span className="font-bold text-slate-900">{cepa.concentracion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Almacenamiento</span>
                    <span className="font-bold text-slate-900">{cepa.almacenamiento}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Aplicación</span>
                    <span className="font-bold text-slate-900 text-right">{cepa.aplicacion}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 rounded-lg p-4">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Compatibilidad</p>
                <p className="text-sm text-slate-700">{cepa.compatibilidad}</p>
              </div>
            </div>

            {/* Right - Beneficios & CTA */}
            <div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 mb-6">
                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide mb-4">Beneficios</h3>
                <ul className="space-y-3">
                  {cepa.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-sm font-light mb-4">{cepa.descripcion}</p>
                <a
                  href={`https://wa.me/51961996645?text=Tengo%20interés%20en%20${encodeURIComponent(cepa.nombre)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold text-sm w-full justify-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  Consultar Disponibilidad
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Presentaciones Section */}
        <div className="container mx-auto px-4 py-12 border-t border-slate-200">
          <h2 className="text-3xl font-black text-slate-900 mb-8">Presentaciones Disponibles</h2>

          {["Placa por Estriado", "Frasco Inclinado", "Frasco por Puntura"].map((tipo) => {
            const pres = cepa.presentaciones.filter((p) => p.tipo === tipo)
            if (pres.length === 0) return null

            return (
              <div key={tipo} className="mb-12">
                <h3 className="text-lg font-bold text-slate-700 mb-4 pb-3 border-b border-slate-200">{tipo}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {pres.map((p) => (
                    <div key={p.id} className="border border-slate-200 rounded-lg p-4 hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                      <p className="text-sm text-slate-600 mb-2">{p.medio}</p>
                      <p className="text-xl font-bold text-emerald-600 mb-4">S/ {p.precio.toFixed(2)}</p>
                      <button
                        onClick={() => agregarAlCarrito(p.id)}
                        className="w-full px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors font-medium text-sm"
                      >
                        Agregar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Caldos */}
          <div>
            <h3 className="text-lg font-bold text-slate-700 mb-4 pb-3 border-b border-slate-200">Caldos</h3>
            <div className="space-y-3">
              {cepa.presentaciones.filter((p) => p.tipo === "Caldo").map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                  <div>
                    <p className="font-bold text-slate-900">{p.medio} - {p.volumen}</p>
                    <p className="text-2xl font-bold text-emerald-600">S/ {p.precio.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => agregarAlCarrito(p.id)}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold"
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cantidadItems > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
              {cantidadItems}
            </span>
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">Carrito</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-slate-600 text-center py-8">Tu carrito está vacío</p>
              ) : (
                cart.map((item) => (
                  <div key={item.presentacionId} className="border border-slate-200 rounded-lg p-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{item.cepaNombre}</h4>
                    <p className="text-xs text-slate-600 mb-3">{item.presentacionInfo}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => actualizarCantidad(item.presentacionId, item.cantidad - 1)}
                          className="p-1 hover:bg-slate-100 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-slate-900 min-w-6 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => actualizarCantidad(item.presentacionId, item.cantidad + 1)}
                          className="p-1 hover:bg-slate-100 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-bold text-emerald-600">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Total:</span>
                  <span className="text-3xl font-black text-emerald-600">S/ {totalCarrito.toFixed(2)}</span>
                </div>
                <a
                  href={`https://wa.me/51961996645?text=Quisiera%20hacer%20un%20pedido%20de%20${encodeURIComponent(cepa.nombre)}%20Total%3A%20S/%20${totalCarrito.toFixed(2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-black text-base"
                >
                  <MessageSquare className="w-5 h-5" />
                  Completar Pedido
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
