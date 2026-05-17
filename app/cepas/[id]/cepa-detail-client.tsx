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
    descripcion: "Bacteria modelo para investigación científica y producción de proteínas recombinantes. Cepa no patogénica certificada.",
    beneficios: ["Desarrollo de bioingeniería", "Investigación genética", "Producción de proteínas", "Validada en laboratorio"],
    presentaciones: [
      { id: "5-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 15.00 },
      { id: "5-2", tipo: "Placa por Estriado", medio: "TSA", precio: 17.00 },
      { id: "5-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 22.00 },
      { id: "5-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 25.00 },
      { id: "5-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 20.00 },
      { id: "5-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 23.00 },
      { id: "5-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 18.00 },
      { id: "5-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 16.00 },
      { id: "5-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 36.00 },
      { id: "5-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 34.00 },
      { id: "5-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 58.00 },
      { id: "5-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 55.00 },
      { id: "5-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 98.00 },
      { id: "5-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 90.00 },
      { id: "5-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 360.00 },
      { id: "5-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 330.00 },
    ],
    viabilidad: "> 97%",
    concentracion: "3 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Investigación, cultivo de proteínas",
    compatibilidad: "Uso en laboratorio certificado",
    imagen: "/bacteria/escherichia-coli.jpg",
  },
  {
    id: "6",
    nombre: "Bacillus cereus",
    cientifico: "Bacillus cereus",
    categoria: "Investigación",
    descripcion: "Bacteria para estudios de control de plagas y patología. Ampliamente utilizada en investigación entomológica.",
    beneficios: ["Modelos de investigación", "Entomología aplicada", "Estudios de patogenia", "Certificada para investigación"],
    presentaciones: [
      { id: "6-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 15.00 },
      { id: "6-2", tipo: "Placa por Estriado", medio: "TSA", precio: 17.00 },
      { id: "6-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 21.00 },
      { id: "6-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 24.00 },
      { id: "6-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 19.00 },
      { id: "6-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 22.00 },
      { id: "6-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 17.00 },
      { id: "6-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 15.00 },
      { id: "6-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 34.00 },
      { id: "6-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 32.00 },
      { id: "6-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 52.00 },
      { id: "6-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 50.00 },
      { id: "6-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 88.00 },
      { id: "6-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 83.00 },
      { id: "6-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 330.00 },
      { id: "6-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 310.00 },
    ],
    viabilidad: "> 95%",
    concentracion: "1.5 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 11 meses",
    aplicacion: "Investigación, control de plagas",
    compatibilidad: "Para uso en investigación",
    imagen: "/bacteria/bacillus-cereus.jpg",
  },
  {
    id: "7",
    nombre: "Bacillus thuringiensis",
    cientifico: "Bacillus thuringiensis",
    categoria: "Control Biológico",
    descripcion: "Bacteria natural para control biológico de insectos plaga. Totalmente compatible con agricultura orgánica.",
    beneficios: ["Control de lepidópteros", "Compatible con agricultura orgánica", "Seguro para fauna benéfica", "Certificado orgánico"],
    presentaciones: [
      { id: "7-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 16.00 },
      { id: "7-2", tipo: "Placa por Estriado", medio: "TSA", precio: 18.00 },
      { id: "7-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 24.00 },
      { id: "7-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 27.00 },
      { id: "7-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 22.00 },
      { id: "7-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 25.00 },
      { id: "7-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 19.00 },
      { id: "7-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 17.00 },
      { id: "7-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 37.00 },
      { id: "7-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 34.00 },
      { id: "7-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 58.00 },
      { id: "7-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 53.00 },
      { id: "7-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 98.00 },
      { id: "7-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 88.00 },
      { id: "7-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 370.00 },
      { id: "7-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 340.00 },
    ],
    viabilidad: "> 95%",
    concentracion: "1 x 10^8 esporas/ml",
    almacenamiento: "4-10°C, 20 meses",
    aplicacion: "Riego al suelo, aspersión foliar",
    compatibilidad: "Compatible con biofertilizantes",
    imagen: "/bacteria/bacillus-thuringiensis.jpg",
  },
  {
    id: "8",
    nombre: "Pseudomonas aeruginosa",
    cientifico: "Pseudomonas aeruginosa",
    categoria: "Investigación",
    descripcion: "Bacteria para investigación molecular y microbiología clínica. Modelo para estudios de patogénesis bacteriana.",
    beneficios: ["Estudios de patogénesis", "Desarrollo de antibióticos", "Investigación molecular", "Investigación clínica"],
    presentaciones: [
      { id: "8-1", tipo: "Placa por Estriado", medio: "Agar Nutritivo", precio: 17.00 },
      { id: "8-2", tipo: "Placa por Estriado", medio: "TSA", precio: 19.00 },
      { id: "8-3", tipo: "Frasco Inclinado", medio: "Agar Nutritivo", precio: 25.00 },
      { id: "8-4", tipo: "Frasco Inclinado", medio: "TSA", precio: 28.00 },
      { id: "8-5", tipo: "Frasco por Puntura", medio: "Agar Nutritivo", precio: 23.00 },
      { id: "8-6", tipo: "Frasco por Puntura", medio: "TSA", precio: 26.00 },
      { id: "8-7", tipo: "Caldo", medio: "CASO", volumen: "100ml", precio: 19.00 },
      { id: "8-8", tipo: "Caldo", medio: "Nutritivo", volumen: "100ml", precio: 17.00 },
      { id: "8-9", tipo: "Caldo", medio: "CASO", volumen: "300ml", precio: 38.00 },
      { id: "8-10", tipo: "Caldo", medio: "Nutritivo", volumen: "300ml", precio: 35.00 },
      { id: "8-11", tipo: "Caldo", medio: "CASO", volumen: "500ml", precio: 60.00 },
      { id: "8-12", tipo: "Caldo", medio: "Nutritivo", volumen: "500ml", precio: 55.00 },
      { id: "8-13", tipo: "Caldo", medio: "CASO", volumen: "1000ml", precio: 100.00 },
      { id: "8-14", tipo: "Caldo", medio: "Nutritivo", volumen: "1000ml", precio: 90.00 },
      { id: "8-15", tipo: "Caldo", medio: "CASO", volumen: "5L+", precio: 380.00 },
      { id: "8-16", tipo: "Caldo", medio: "Nutritivo", volumen: "5L+", precio: 350.00 },
    ],
    viabilidad: "> 94%",
    concentracion: "1.2 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 9 meses",
    aplicacion: "Investigación, estudios clínicos",
    compatibilidad: "Para laboratorio especializado",
    imagen: "/bacteria/pseudomonas-aeruginosa.jpg",
  },
  {
    id: "9",
    nombre: "Streptomyces lydicus",
    cientifico: "Streptomyces lydicus",
    categoria: "Control Biológico",
    descripcion: "Actinobacteria productora de compuestos antimicrobianos naturales. Controla patógenos fúngicos y bacterianos del suelo.",
    beneficios: ["Control de patógenos del suelo", "Producción de antibióticos", "Biocontrol natural", "Mejora salud del suelo"],
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
    descripcion: "Bacteria activadora de crecimiento radicular y tolerante a estrés hídrico. Optimiza la absorción de nutrientes en condiciones adversas.",
    beneficios: ["Tolerancia a sequía", "Desarrollo radicular mejorado", "Resistencia al estrés", "Optimiza nutrición vegetal"],
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
    almacenamiento: "2-8°C, 15 meses",
    aplicacion: "Riego, aspersión foliar",
    compatibilidad: "Compatible con nutrientes y fungicidas",
    imagen: "/bacteria/bacillus-firmus.jpg",
  },
]

const categoryColors: { [key: string]: string } = {
  "Control Biológico": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Biofertilizante": "bg-blue-100 text-blue-700 border-blue-300",
  "Investigación": "bg-purple-100 text-purple-700 border-purple-300",
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

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm">
          <Link href="/cepas" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Hero - Image Left, Info Right */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left - Image */}
            <div className="flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 h-96 lg:h-auto lg:min-h-[500px]">
              <img 
                src={cepa.imagen} 
                alt={cepa.nombre}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Right - Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-4 py-1 rounded-full text-sm font-bold border ${categoryColors[cepa.categoria]}`}>
                    {cepa.categoria}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">{cepa.nombre}</h1>
                <p className="text-lg text-slate-600 italic font-light">{cepa.cientifico}</p>
              </div>

              <p className="text-slate-700 text-base leading-relaxed border-l-4 border-emerald-500 pl-4">
                {cepa.descripcion}
              </p>

              {/* Beneficios */}
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Beneficios Principales</h3>
                <ul className="space-y-3">
                  {cepa.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Specs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-1">Viabilidad</p>
                  <p className="text-xl font-bold text-blue-900">{cepa.viabilidad}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-xs text-purple-600 font-bold uppercase mb-1">Concentración</p>
                  <p className="text-lg font-bold text-purple-900">{cepa.concentracion}</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-xs text-orange-600 font-bold uppercase mb-1">Almacenamiento</p>
                  <p className="text-sm font-bold text-orange-900">{cepa.almacenamiento}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs text-green-600 font-bold uppercase mb-1">Aplicación</p>
                  <p className="text-sm font-bold text-green-900">{cepa.aplicacion}</p>
                </div>
              </div>

              {/* Compatibilidad */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg p-6">
                <p className="text-xs font-bold uppercase text-slate-300 mb-2">Compatibilidad</p>
                <p className="text-base leading-relaxed">{cepa.compatibilidad}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/51961996645?text=Interesado%20en%20${cepa.nombre}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold"
                >
                  <MessageSquare className="w-5 h-5" />
                  Contactar
                </a>
              </div>
            </div>
          </div>

          {/* Presentaciones Section */}
          <div className="border-t border-slate-200 pt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Presentaciones Disponibles</h2>
            <p className="text-slate-600 mb-8">Selecciona el tipo y cantidad que necesitas</p>

            {/* Tabs por Tipo */}
            <div className="space-y-8">
              {["Placa por Estriado", "Frasco Inclinado", "Frasco por Puntura", "Caldo"].map((tipo) => {
                const presentacionesPorTipo = cepa.presentaciones.filter((p) => p.tipo === tipo)
                return (
                  <div key={tipo} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                      <h3 className="font-bold text-slate-900">{tipo}</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {presentacionesPorTipo.map((pres) => (
                          <div
                            key={pres.id}
                            className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-emerald-300 rounded-lg p-4 transition-all cursor-pointer"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-slate-900 text-sm">
                                {pres.medio} {pres.volumen && `- ${pres.volumen}`}
                              </p>
                              <p className="text-lg font-bold text-emerald-600">S/ {pres.precio.toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => agregarAlCarrito(pres.id)}
                              className="ml-4 p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cantidadItems > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-emerald-700 transition-all hover:scale-110"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
              {cantidadItems}
            </span>
          </button>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && cantidadItems > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Mi Carrito</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div key={item.presentacionId} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{item.cepaNombre}</h4>
                  <p className="text-xs text-slate-600 mb-3">{item.presentacionInfo}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1">
                      <button
                        onClick={() => actualizarCantidad(item.presentacionId, item.cantidad - 1)}
                        className="p-1 hover:bg-slate-100 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4 text-slate-600" />
                      </button>
                      <span className="font-bold text-slate-900 min-w-6 text-center">{item.cantidad}</span>
                      <button
                        onClick={() => actualizarCantidad(item.presentacionId, item.cantidad + 1)}
                        className="p-1 hover:bg-slate-100 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                    <p className="font-bold text-emerald-600">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-300 pb-4">
                <span className="font-bold text-slate-900">Total:</span>
                <span className="text-3xl font-bold text-emerald-600">S/ {totalCarrito.toFixed(2)}</span>
              </div>
              <a
                href={`https://wa.me/51961996645?text=Pedido:%0A${cart.map((item) => `${item.cantidad}x ${item.cepaNombre} (${item.presentacionInfo})`).join("%0A")}%0ATotal: S/ ${totalCarrito.toFixed(2)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold text-center"
              >
                <MessageSquare className="w-5 h-5" />
                Confirmar Pedido
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
