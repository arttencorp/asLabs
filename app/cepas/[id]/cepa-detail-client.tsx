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
    descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento. Produce fitohormonas que estimulan el desarrollo vegetal y reduce patógenos del suelo.",
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
    descripcion: "Bacteria fijadora de nitrógeno atmosférico que se asocia simbióticamente con las raíces de las plantas. Reduce la dependencia de fertilizantes nitrogenados químicos.",
    beneficios: ["Fija nitrógeno del aire", "Reduce uso de fertilizantes", "Mejora estrés hídrico", "Aumenta vigor del cultivo"],
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
    descripcion: "Bacteria solubilizadora de potasio y fosfato que mejora significativamente la fertilidad del suelo. Aumenta la producción y la calidad de los cultivos.",
    beneficios: ["Solubiliza potasio y fosfato", "Mejora fertilidad del suelo", "Aumenta producción", "Compatible con otras bacterias"],
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
    descripcion: "Cepa modelo de E. coli ampliamente utilizada en investigación científica, ingeniería genética y producción de proteínas recombinantes en biotecnología.",
    beneficios: ["Desarrollo de bioingeniería", "Investigación genética", "Producción de proteínas", "Modelo estándar de laboratorio"],
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
      { id: "5-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 75.00 },
      { id: "5-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 70.00 },
      { id: "5-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 280.00 },
      { id: "5-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 260.00 },
    ],
    viabilidad: "> 97%",
    concentracion: "1 x 10^10 UFC/ml",
    almacenamiento: "2-8°C, 24 meses",
    aplicacion: "Investigación, ingeniería genética",
    compatibilidad: "Compatible con medios selectivos",
    imagen: "/bacteria/escherichia-coli.jpg",
  },
  {
    id: "6",
    nombre: "Bacillus cereus",
    cientifico: "Bacillus cereus",
    categoria: "Investigación",
    descripcion: "Bacteria utilizada en estudios de control de plagas, patología microbiana y desarrollo de agentes biocontroladores. Material de referencia para investigación.",
    beneficios: ["Modelos de investigación", "Entomología aplicada", "Estudio de patogenicidad", "Desarrollo de bioinsecticidas"],
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
      { id: "6-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 45.00 },
      { id: "6-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 80.00 },
      { id: "6-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 75.00 },
      { id: "6-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 300.00 },
      { id: "6-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 280.00 },
    ],
    viabilidad: "> 94%",
    concentracion: "1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 18 meses",
    aplicacion: "Investigación, biocontrol",
    compatibilidad: "Compatible con otros microorganismos",
    imagen: "/bacteria/bacillus-cereus.jpg",
  },
  {
    id: "7",
    nombre: "Bacillus thuringiensis",
    cientifico: "Bacillus thuringiensis",
    categoria: "Control Biológico",
    descripcion: "Bacteria natural ampliamente utilizada en agricultura ecológica para el control biológico de insectos plaga, especialmente lepidópteros. Segura para humanos y animales.",
    beneficios: ["Control de lepidópteros", "Compatible con agricultura orgánica", "Seguro para fauna benéfica", "Sin resistencia cruzada"],
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
    almacenamiento: "2-8°C, 16 meses",
    aplicacion: "Aspersión foliar, riego",
    compatibilidad: "Compatible con biofertilizantes",
    imagen: "/bacteria/bacillus-thuringiensis.jpg",
  },
  {
    id: "8",
    nombre: "Pseudomonas aeruginosa",
    cientifico: "Pseudomonas aeruginosa",
    categoria: "Investigación",
    descripcion: "Bacteria Gram-negativa importante en investigación molecular, microbiología clínica y desarrollo de nuevos antibióticos. Modelo para estudios de patogénesis.",
    beneficios: ["Estudios de patogénesis", "Desarrollo de nuevos antibióticos", "Investigación molecular", "Microbiología clínica"],
    presentaciones: [
      { id: "8-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 13.00 },
      { id: "8-2", tipo: "Placa por Estriado", medio: "TSA", precio: 15.00 },
      { id: "8-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 19.00 },
      { id: "8-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 22.00 },
      { id: "8-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 17.00 },
      { id: "8-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 20.00 },
      { id: "8-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 15.00 },
      { id: "8-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 13.00 },
      { id: "8-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 30.00 },
      { id: "8-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 28.00 },
      { id: "8-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 48.00 },
      { id: "8-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 45.00 },
      { id: "8-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 80.00 },
      { id: "8-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 75.00 },
      { id: "8-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 300.00 },
      { id: "8-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 280.00 },
    ],
    viabilidad: "> 95%",
    concentracion: "1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 20 meses",
    aplicacion: "Investigación, estudios clínicos",
    compatibilidad: "Compatible con medios selectivos",
    imagen: "/bacteria/pseudomonas-aeruginosa.jpg",
  },
  {
    id: "9",
    nombre: "Streptomyces lydicus",
    cientifico: "Streptomyces lydicus",
    categoria: "Control Biológico",
    descripcion: "Actinobacteria productora de compuestos antimicrobianos naturales. Eficaz contra patógenos del suelo y proveedora de metabolitos secundarios de valor comercial.",
    beneficios: ["Control de patógenos del suelo", "Producción de antibióticos", "Compuestos antimicrobianos naturales", "Alternativa a químicos sintéticos"],
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
    aplicacion: "Aspersión foliar, riego",
    compatibilidad: "Compatible con biofertilizantes",
    imagen: "/bacteria/streptomyces-lydicus.jpg",
  },
  {
    id: "10",
    nombre: "Bacillus firmus",
    cientifico: "Bacillus firmus GB-126",
    categoria: "Biofertilizante",
    descripcion: "Bacteria activadora de crecimiento radicular tolerante a estrés hídrico. Mejora significativamente la capacidad de la planta para resistir sequías.",
    beneficios: ["Tolerancia a sequía", "Desarrollo radicular mejorado", "Resistencia a estrés hídrico", "Aumenta eficiencia de agua"],
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
    viabilidad: "> 96%",
    concentracion: "2 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 14 meses",
    aplicacion: "Riego, aspersión foliar",
    compatibilidad: "Compatible con fungicidas",
    imagen: "/bacteria/bacillus-firmus.jpg",
  },
]

export default function CepaDetailClient({ cepaId }: { cepaId: string }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedPresentacion, setSelectedPresentacion] = useState<string | null>(null)
  const [showCartPanel, setShowCartPanel] = useState(false)

  const cepa = allCepas.find((c) => c.id === cepaId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [cepaId])

  if (!cepa) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600 text-lg">Cepa no encontrada</p>
        </div>
        <Footer />
      </div>
    )
  }

  const agregarAlCarrito = (presentacionId: string) => {
    const presentacion = cepa.presentaciones.find((p) => p.id === presentacionId)
    if (!presentacion) return

    const presentacionInfo = presentacion.volumen
      ? `${presentacion.tipo} - ${presentacion.medio} - ${presentacion.volumen}`
      : `${presentacion.tipo} - ${presentacion.medio}`

    const existingItem = cart.find((item) => item.presentacionId === presentacionId)

    if (existingItem) {
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
          presentacionInfo,
          precio: presentacion.precio,
          cantidad: 1,
        },
      ])
    }
    setShowCartPanel(true)
  }

  const removerDelCarrito = (presentacionId: string) => {
    setCart(cart.filter((item) => item.presentacionId !== presentacionId))
  }

  const actualizarCantidad = (presentacionId: string, nueva: number) => {
    if (nueva <= 0) {
      removerDelCarrito(presentacionId)
    } else {
      setCart(cart.map((item) => (item.presentacionId === presentacionId ? { ...item, cantidad: nueva } : item)))
    }
  }

  const totalCarrito = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const cantidadItems = cart.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/cepas" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            Volver al Catálogo
          </Link>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8 flex items-center justify-center h-fit sticky top-24">
            <img 
              src={cepa.imagen} 
              alt={cepa.nombre}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{cepa.nombre}</h1>
              <p className="text-lg text-gray-600 italic mb-4">{cepa.cientifico}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm">
                  {cepa.categoria}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg border border-blue-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Especificaciones Técnicas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Viabilidad</p>
                  <p className="font-bold text-gray-900 text-sm">{cepa.viabilidad}</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Concentración</p>
                  <p className="font-bold text-gray-900 text-sm">{cepa.concentracion}</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Almacenamiento</p>
                  <p className="font-bold text-gray-900 text-sm">{cepa.almacenamiento}</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Aplicación</p>
                  <p className="font-bold text-gray-900 text-sm">{cepa.aplicacion}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-gray-600 font-semibold mb-1">Compatibilidad</p>
                <p className="text-gray-900 text-sm">{cepa.compatibilidad}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Selecciona una presentación:</label>
              <select
                value={selectedPresentacion || ""}
                onChange={(e) => setSelectedPresentacion(e.target.value || null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-medium text-gray-900 bg-white"
              >
                <option value="">-- Elige una presentación --</option>
                {cepa.presentaciones.map((pres) => {
                  const presLabel = pres.volumen
                    ? `${pres.tipo} - ${pres.medio} - ${pres.volumen}`
                    : `${pres.tipo} - ${pres.medio}`
                  return (
                    <option key={pres.id} value={pres.id}>
                      {presLabel} - S/ {pres.precio.toFixed(2)}
                    </option>
                  )
                })}
              </select>
            </div>

            {selectedPresentacion && (
              <button
                onClick={() => agregarAlCarrito(selectedPresentacion)}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingCart className="w-6 h-6" />
                Agregar al Carrito
              </button>
            )}

            {cantidadItems > 0 && (
              <div className="bg-emerald-50 rounded-lg border-2 border-emerald-200 p-4">
                <p className="text-sm text-emerald-700 font-semibold">
                  {cantidadItems} {cantidadItems === 1 ? "item" : "items"} en tu carrito
                </p>
                <p className="text-2xl font-bold text-emerald-700 mt-2">S/ {totalCarrito.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Producto</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{cepa.descripcion}</p>

          <h3 className="text-lg font-bold text-gray-900 mb-4">Beneficios Principales</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {cepa.beneficios.map((beneficio, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700">
                <span className="text-green-600 font-bold text-xl flex-shrink-0">
                  <Check className="w-5 h-5" />
                </span>
                {beneficio}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Todas las Presentaciones</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Placas por Estriado</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cepa.presentaciones
                  .filter((p) => p.tipo === "Placa por Estriado")
                  .map((pres) => (
                    <div
                      key={pres.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-green-300 bg-gradient-to-br from-gray-50 to-white"
                    >
                      <p className="font-semibold text-gray-900 text-sm mb-2">{pres.medio}</p>
                      <p className="text-2xl font-bold text-green-600 mb-4">S/ {pres.precio.toFixed(2)}</p>
                      <button
                        onClick={() => {
                          setSelectedPresentacion(pres.id)
                          agregarAlCarrito(pres.id)
                        }}
                        className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                      >
                        Agregar
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Frascos Inclinados</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cepa.presentaciones
                  .filter((p) => p.tipo === "Frasco Inclinado")
                  .map((pres) => (
                    <div
                      key={pres.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-green-300 bg-gradient-to-br from-gray-50 to-white"
                    >
                      <p className="font-semibold text-gray-900 text-sm mb-2">{pres.medio}</p>
                      <p className="text-2xl font-bold text-green-600 mb-4">S/ {pres.precio.toFixed(2)}</p>
                      <button
                        onClick={() => {
                          setSelectedPresentacion(pres.id)
                          agregarAlCarrito(pres.id)
                        }}
                        className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                      >
                        Agregar
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Frascos por Puntura</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cepa.presentaciones
                  .filter((p) => p.tipo === "Frasco por Puntura")
                  .map((pres) => (
                    <div
                      key={pres.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-green-300 bg-gradient-to-br from-gray-50 to-white"
                    >
                      <p className="font-semibold text-gray-900 text-sm mb-2">{pres.medio}</p>
                      <p className="text-2xl font-bold text-green-600 mb-4">S/ {pres.precio.toFixed(2)}</p>
                      <button
                        onClick={() => {
                          setSelectedPresentacion(pres.id)
                          agregarAlCarrito(pres.id)
                        }}
                        className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                      >
                        Agregar
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Caldos Líquidos</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cepa.presentaciones
                  .filter((p) => p.tipo === "Caldo")
                  .map((pres) => (
                    <div
                      key={pres.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-green-300 bg-gradient-to-br from-gray-50 to-white"
                    >
                      <p className="font-semibold text-gray-900 text-sm mb-1">{pres.medio}</p>
                      <p className="text-xs text-gray-600 mb-2">{pres.volumen}</p>
                      <p className="text-2xl font-bold text-green-600 mb-4">S/ {pres.precio.toFixed(2)}</p>
                      <button
                        onClick={() => {
                          setSelectedPresentacion(pres.id)
                          agregarAlCarrito(pres.id)
                        }}
                        className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                      >
                        Agregar
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">¿Necesitas Asesoría?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Nuestros especialistas están disponibles para recomendarte la presentación más adecuada para tu investigación o aplicación
          </p>
          <a
            href="https://wa.me/51961996645"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold"
          >
            <MessageSquare className="w-5 h-5" />
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      <Footer />

      {cantidadItems > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setShowCartPanel(!showCartPanel)}
            className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 hover:-translate-y-1 border-4 border-white"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
              {cantidadItems}
            </span>
          </button>
        </div>
      )}

      {showCartPanel && cantidadItems > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50">
              <h2 className="text-xl font-bold text-gray-900">Mi Carrito</h2>
              <button
                onClick={() => setShowCartPanel(false)}
                className="p-1 hover:bg-white rounded transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div key={item.presentacionId} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.cepaNombre}</h4>
                  <p className="text-xs text-gray-600 mb-3">{item.presentacionInfo}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() => actualizarCantidad(item.presentacionId, item.cantidad - 1)}
                        className="p-1 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-gray-900 min-w-8 text-center">{item.cantidad}</span>
                      <button
                        onClick={() => actualizarCantidad(item.presentacionId, item.cantidad + 1)}
                        className="p-1 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-bold text-green-600">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-6 space-y-4 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 text-lg">Total:</span>
                <span className="text-3xl font-bold text-green-600">S/ {totalCarrito.toFixed(2)}</span>
              </div>
              <a
                href={`https://wa.me/51961996645?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20de%20cepas%20bacterianas.%20Total%3A%20S/%20${totalCarrito.toFixed(2)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                Completar Pedido
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
