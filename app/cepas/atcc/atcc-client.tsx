"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, Download, Lock, X, ShoppingCart } from "lucide-react"

const ENVIO_PERU = 155.00

interface CartItem {
  cepa: typeof cepasATCC[0]
  cantidad: number
}

// Datos de Cepas ATCC desde catálogo - Solo BSL-1 (con envío incluido)
const cepasATCC = [
  {
    id: "atcc-1",
    nombre: "Bacillus licheniformis",
    codigo: "ATCC 14580",
    cientifico: "Bacillus licheniformis (Weigmann) Chester",
    bsl: "BSL-1",
    categoria: "Bacilos & Esporulados",
    productFormat: "Freeze-dried",
    strainDesignation: "[46, NCIB 9375, NCTC 10341, NRS 1264]",
    depositedAs: "Bacillus licheniformis",
    typeStrain: "Sí",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-14580",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20licheniformis%20ATCC%2014580",
    disponibilidad: true,
  },
  {
    id: "atcc-2",
    nombre: "Bacillus subtilis",
    codigo: "ATCC 6051",
    cientifico: "Bacillus subtilis (Ehrenberg) Cohn",
    bsl: "BSL-1",
    categoria: "Bacilos & Esporulados",
    productFormat: "Freeze-dried",
    strainDesignation: "Marburg strain [ATCC 6051-U, DSM 10, NCIB 3610, NCTC 3610]",
    depositedAs: "Bacillus subtilis",
    typeStrain: "Sí",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-6051",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20subtilis%20ATCC%206051",
    disponibilidad: true,
  },
  {
    id: "atcc-3",
    nombre: "Escherichia coli",
    codigo: "ATCC 25922-MINI-PACK",
    cientifico: "Escherichia coli",
    bsl: "BSL-1",
    categoria: "Control de Calidad & Esterilización",
    productFormat: "Frozen glycerol stock",
    strainDesignation: "FDA strain Seattle 1946",
    depositedAs: "Escherichia coli",
    typeStrain: "No",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "6 viales de 200 µL",
    referencia: "ATCC-25922",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Escherichia%20coli%20ATCC%2025922",
    disponibilidad: true,
  },
  {
    id: "atcc-4",
    nombre: "Geobacillus stearothermophilus",
    codigo: "ATCC 7953",
    cientifico: "Geobacillus stearothermophilus",
    bsl: "BSL-1",
    categoria: "Control de Calidad & Esterilización",
    productFormat: "Freeze-dried",
    strainDesignation: "",
    depositedAs: "Geobacillus stearothermophilus",
    typeStrain: "No",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-7953",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Geobacillus%20stearothermophilus%20ATCC%207953",
    disponibilidad: true,
  },
  {
    id: "atcc-5",
    nombre: "Geobacillus stearothermophilus",
    codigo: "ATCC 12980",
    cientifico: "Geobacillus stearothermophilus",
    bsl: "BSL-1",
    categoria: "Control de Calidad & Esterilización",
    productFormat: "Freeze-dried",
    strainDesignation: "NCA 26",
    depositedAs: "Geobacillus stearothermophilus",
    typeStrain: "Sí",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-12980",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Geobacillus%20stearothermophilus%20ATCC%2012980",
    disponibilidad: true,
  },
  {
    id: "atcc-6",
    nombre: "Geobacillus stearothermophilus",
    codigo: "ATCC 10149",
    cientifico: "Geobacillus stearothermophilus",
    bsl: "BSL-1",
    categoria: "Alimentos & Fermentación",
    productFormat: "Freeze-dried",
    strainDesignation: "NRS T15 [JCM 11297]",
    depositedAs: "Geobacillus stearothermophilus",
    typeStrain: "No",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-10149",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Geobacillus%20stearothermophilus%20ATCC%2010149",
    disponibilidad: true,
  },
  {
    id: "atcc-7",
    nombre: "Heyndrickxia coagulans",
    codigo: "ATCC 7050",
    cientifico: "Heyndrickxia coagulans (Hammer) Narsing Rao et al.",
    bsl: "BSL-1",
    categoria: "Alimentos & Fermentación",
    productFormat: "Freeze-dried",
    strainDesignation: "NRS 609 [NCIB 9365, NCTC 10334]",
    depositedAs: "Antes: Weizmannia coagulans / Bacillus coagulans",
    typeStrain: "Sí",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-7050",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20coagulans%20ATCC%207050",
    disponibilidad: true,
  },
  {
    id: "atcc-8",
    nombre: "Lacticaseibacillus casei",
    codigo: "ATCC 393",
    cientifico: "Lacticaseibacillus casei (Orla-Jensen) Zheng et al.",
    bsl: "BSL-1",
    categoria: "Alimentos & Fermentación",
    productFormat: "Freeze-dried",
    strainDesignation: "03 [7, IAM 12473, Orland L-323, R.P. Tittsler 303]",
    depositedAs: "Antes: Lactobacillus casei",
    typeStrain: "Sí",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-393",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Lacticaseibacillus%20casei%20ATCC%20393",
    disponibilidad: true,
  },
  {
    id: "atcc-9",
    nombre: "Lactobacillus acidophilus",
    codigo: "ATCC 4356",
    cientifico: "Lactobacillus acidophilus (Moro) Hansen and Mocquot",
    bsl: "BSL-1",
    categoria: "Alimentos & Fermentación",
    productFormat: "Freeze-dried",
    strainDesignation: "Scav [IFO 13951, M. Rogosa 210X, NCIB 8690, P.A. Hansen L 917]",
    depositedAs: "Lactobacillus acidophilus",
    typeStrain: "Sí",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-4356",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Lactobacillus%20acidophilus%20ATCC%204356",
    disponibilidad: true,
  },
  {
    id: "atcc-10",
    nombre: "Paenibacillus polymyxa",
    codigo: "ATCC 842",
    cientifico: "Paenibacillus polymyxa",
    bsl: "BSL-1",
    categoria: "Biotecnología & Agricultura",
    productFormat: "Freeze-dried",
    strainDesignation: "BUCSAV 162 / CCM 1459 / NCIB 8158 / NCTC 10343",
    depositedAs: "Paenibacillus polymyxa",
    typeStrain: "Sí",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-842",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Paenibacillus%20polymyxa%20ATCC%20842",
    disponibilidad: true,
  },
  {
    id: "atcc-11",
    nombre: "Pseudomonas putida",
    codigo: "ATCC 12633",
    cientifico: "Pseudomonas putida",
    bsl: "BSL-1",
    categoria: "Biotecnología & Agricultura",
    productFormat: "",
    strainDesignation: "ATCC 12633 / IFO 14164",
    depositedAs: "Pseudomonas putida",
    typeStrain: "Sí",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-12633",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Pseudomonas%20putida%20ATCC%2012633",
    disponibilidad: true,
  },
  {
    id: "atcc-12",
    nombre: "Serratia marcescens subsp. marcescens",
    codigo: "ATCC 13880",
    cientifico: "Serratia marcescens subsp. marcescens",
    bsl: "BSL-1",
    categoria: "Bacilos & Esporulados",
    productFormat: "Freeze-dried",
    strainDesignation: "BS 303 [CDC 813-60, NCIB 9155, NCTC 10211]",
    depositedAs: "Serratia marcescens subsp. marcescens",
    typeStrain: "Sí",
    precio: 771.47,
    precioSinEnvio: 616.47,
    cantidad: "1 unidad",
    referencia: "ATCC-13880",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Serratia%20marcescens%20ATCC%2013880",
    disponibilidad: true,
  },
  {
    id: "atcc-13",
    nombre: "Priestia megaterium",
    codigo: "ATCC 14581-MINI-PACK",
    cientifico: "Priestia megaterium",
    bsl: "BSL-1",
    categoria: "Bacilos & Esporulados",
    productFormat: "Frozen glycerol stock",
    strainDesignation: "BCRC 10608 / DSM 32 / NCTC 10342",
    depositedAs: "Antes: Bacillus megaterium",
    typeStrain: "Sí",
    precio: 1710.15,
    cantidad: "6 viales",
    referencia: "ATCC-14581",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Priestia%20megaterium%20ATCC%2014581",
    disponibilidad: true,
  },
  {
    id: "atcc-14",
    nombre: "Bacillus spizizenii",
    codigo: "ATCC 6633-MINI-PACK",
    cientifico: "Bacillus spizizenii (Nakamura et al.) Dunlap et al.",
    bsl: "BSL-1",
    categoria: "Control de Calidad & Esterilización",
    productFormat: "Frozen",
    strainDesignation: "NRS 231",
    depositedAs: "Antes: Bacillus subtilis subsp. spizizenii",
    typeStrain: "No",
    precio: 1836.00,
    cantidad: "6 viales listos para usar; 200 µL en stock de glicerol",
    referencia: "ATCC-6633",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20spizizenii%20ATCC%206633",
    disponibilidad: true,
  },
  {
    id: "atcc-15",
    nombre: "Bacillus atrophaeus",
    codigo: "ATCC 9372",
    cientifico: "Bacillus atrophaeus Nakamura",
    bsl: "BSL-1",
    categoria: "Control de Calidad & Esterilización",
    productFormat: "Freeze-dried",
    strainDesignation: "NRS 1221A",
    depositedAs: "Bacillus atrophaeus",
    typeStrain: "No",
    precio: 1904.18,
    cantidad: "1 unidad",
    referencia: "ATCC-9372",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20atrophaeus%20ATCC%209372",
    disponibilidad: true,
  },
  {
    id: "atcc-16",
    nombre: "Micrococcus luteus",
    codigo: "ATCC 4698",
    cientifico: "Micrococcus luteus",
    bsl: "BSL-1",
    categoria: "Control de Calidad & Esterilización",
    productFormat: "Freeze-dried",
    strainDesignation: "",
    depositedAs: "Micrococcus luteus",
    typeStrain: "",
    precio: 2460.04,
    cantidad: "1 unidad",
    referencia: "ATCC-4698",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Micrococcus%20luteus%20ATCC%204698",
    disponibilidad: true,
  },
  {
    id: "atcc-17",
    nombre: "Bacillus amyloliquefaciens",
    codigo: "ATCC 23350",
    cientifico: "Bacillus amyloliquefaciens (Fukumoto) Priest et al.",
    bsl: "BSL-1",
    categoria: "Biotecnología & Agricultura",
    productFormat: "Freeze-dried",
    strainDesignation: "F [IFO 15535]",
    depositedAs: "Bacillus amyloliquefaciens",
    typeStrain: "Sí",
    precio: 2858.58,
    cantidad: "1 unidad",
    referencia: "ATCC-23350",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20amyloliquefaciens%20ATCC%2023350",
    disponibilidad: true,
  },
  {
    id: "atcc-18",
    nombre: "Bacillus sp.",
    codigo: "ATCC 14884",
    cientifico: "Bacillus sp.",
    bsl: "BSL-1",
    categoria: "Bacilos & Esporulados",
    productFormat: "Freeze-dried",
    strainDesignation: "NCTC 8241 [CCM 2218, DSM 361, NCIB 8982]",
    depositedAs: "Bacillus sp.",
    typeStrain: "No",
    precio: 2858.58,
    cantidad: "1 unidad",
    referencia: "ATCC-14884",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20pumilus%20ATCC%2014884",
    disponibilidad: true,
  },
  {
    id: "atcc-19",
    nombre: "Bacillus thuringiensis",
    codigo: "ATCC 10792",
    cientifico: "Bacillus thuringiensis Berliner",
    bsl: "BSL-1",
    categoria: "Biotecnología & Agricultura",
    productFormat: "Freeze-dried",
    strainDesignation: "CCUG 7429 / CIP 53.137 / DSM 2046 / HAMBI 478 / LMG 7138 / NRRL HD-735",
    depositedAs: "Bacillus thuringiensis",
    typeStrain: "Sí",
    precio: 2858.58,
    cantidad: "1 unidad",
    referencia: "ATCC-10792",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20thuringiensis%20ATCC%2010792",
    disponibilidad: true,
  },
  {
    id: "atcc-20",
    nombre: "Lactiplantibacillus plantarum",
    codigo: "ATCC 14917",
    cientifico: "Lactiplantibacillus plantarum",
    bsl: "BSL-1",
    categoria: "Alimentos & Fermentación",
    productFormat: "Freeze-dried",
    strainDesignation: "Lp 39 [IAM 12477]",
    depositedAs: "Antes: Lactobacillus plantarum subsp. plantarum",
    typeStrain: "Sí",
    precio: 2858.58,
    cantidad: "1 unidad",
    referencia: "ATCC-14917",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Lactiplantibacillus%20plantarum%20ATCC%2014917",
    disponibilidad: true,
  },
  {
    id: "atcc-21",
    nombre: "Lactococcus lactis subsp. lactis",
    codigo: "ATCC 19435",
    cientifico: "Lactococcus lactis subsp. lactis",
    bsl: "BSL-1",
    categoria: "Alimentos & Fermentación",
    productFormat: "Freeze-dried",
    strainDesignation: "NCTC 6681 [DSM 20481, NCDO 604, NCIB 6681, OJ]",
    depositedAs: "Lactococcus lactis subsp. lactis",
    typeStrain: "Sí",
    precio: 2858.58,
    cantidad: "1 unidad",
    referencia: "ATCC-19435",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Lactococcus%20lactis%20ATCC%2019435",
    disponibilidad: true,
  },
  {
    id: "atcc-22",
    nombre: "Streptococcus thermophilus",
    codigo: "ATCC 19258",
    cientifico: "Streptococcus thermophilus Orla-Jensen",
    bsl: "BSL-1",
    categoria: "Alimentos & Fermentación",
    productFormat: "Freeze-dried",
    strainDesignation: "NCDO 573 [NCIMB 8510, CNCTC 28/89, DSM 20617, CCUG 21957, CIP 102303, LMG 6896]",
    depositedAs: "Streptococcus thermophilus",
    typeStrain: "Sí",
    precio: 2858.58,
    cantidad: "1 unidad",
    referencia: "ATCC-19258",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Streptococcus%20thermophilus%20ATCC%2019258",
    disponibilidad: true,
  },
  {
    id: "atcc-23",
    nombre: "Azotobacter vinelandii",
    codigo: "ATCC 12837",
    cientifico: "Azotobacter vinelandii Lipman",
    bsl: "BSL-1",
    categoria: "Biotecnología & Agricultura",
    productFormat: "Freeze-dried",
    strainDesignation: "3a",
    depositedAs: "Azotobacter vinelandii",
    typeStrain: "No",
    precio: 3744.82,
    cantidad: "1 unidad",
    referencia: "ATCC-12837",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Azotobacter%20vinelandii%20ATCC%2012837",
    disponibilidad: true,
  },
  {
    id: "atcc-24",
    nombre: "Bacillus subtilis",
    codigo: "ATCC 49822",
    cientifico: "Bacillus subtilis",
    bsl: "BSL-1",
    categoria: "Control de Calidad & Esterilización",
    productFormat: "Freeze-dried",
    strainDesignation: "",
    depositedAs: "Bacillus subtilis subsp. subtilis",
    typeStrain: "No",
    precio: 3744.82,
    cantidad: "1 unidad",
    referencia: "ATCC-49822",
    link: "https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=Bacillus%20subtilis%20ATCC%2049822",
    disponibilidad: true,
  },
]

const categorias = [
  "Bacilos & Esporulados",
  "Control de Calidad & Esterilización",
  "Alimentos & Fermentación",
  "Biotecnología & Agricultura",
]

export default function ATCCClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [lista, setLista] = useState<typeof cepasATCC>([])
  const [showCartModal, setShowCartModal] = useState(false)
  const [selectedCepaForCart, setSelectedCepaForCart] = useState<typeof cepasATCC[0] | null>(null)
  const [cantidadCarrito, setCantidadCarrito] = useState(1)

  const filteredCepas = cepasATCC.filter((cepa) => {
    const matchesSearch =
      cepa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cepa.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cepa.cientifico.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || cepa.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedCepas = [...filteredCepas].sort((a, b) => {
    if (sortBy === "price-low") return a.precio - b.precio
    if (sortBy === "price-high") return b.precio - a.precio
    if (sortBy === "name") return a.nombre.localeCompare(b.nombre)
    return 0
  })

  const handleAgregarAlCarrito = (cepa: typeof cepasATCC[0]) => {
    setSelectedCepaForCart(cepa)
    setCantidadCarrito(1)
    setShowCartModal(true)
  }

  const confirmAgregar = () => {
    if (selectedCepaForCart) {
      const existente = carrito.find((item) => item.cepa.id === selectedCepaForCart.id)
      if (existente) {
        setCarrito(
          carrito.map((item) =>
            item.cepa.id === selectedCepaForCart.id
              ? { ...item, cantidad: item.cantidad + cantidadCarrito }
              : item
          )
        )
      } else {
        setCarrito([...carrito, { cepa: selectedCepaForCart, cantidad: cantidadCarrito }])
      }
      setShowCartModal(false)
    }
  }

  const handleAgregarALista = (cepa: typeof cepasATCC[0]) => {
    const existe = lista.find((item) => item.id === cepa.id)
    if (!existe) {
      setLista([...lista, cepa])
    }
  }

  const removerDelCarrito = (id: string) => {
    setCarrito(carrito.filter((item) => item.cepa.id !== id))
  }

  const removerDeLista = (id: string) => {
    setLista(lista.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b pt-12 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-emerald-900 mb-2">Cepas ATCC</h1>
          <p className="text-emerald-700 font-light max-w-2xl">
            Cepas referencia internacional certificadas BSL-1. Importación desde USA con garantía de identidad, viabilidad y trazabilidad bajo normas ISO.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Top Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="text-sm text-emerald-700">
              <p className="font-semibold">Resultados <span className="font-bold text-emerald-900">{filteredCepas.length}-{Math.min(itemsPerPage, filteredCepas.length)}</span> de <span className="font-bold text-emerald-900">{filteredCepas.length}</span></p>
            </div>

            <div className="flex gap-6 items-center flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-emerald-800">Ordenar por</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:border-emerald-500 bg-white text-emerald-900 font-medium text-sm"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="name">Nombre (A-Z)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-emerald-800">Mostrar por página</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:border-emerald-500 bg-white text-emerald-900 font-medium text-sm"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-12">
            {/* Sidebar Filters */}
            <div className="w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-emerald-900">Refinar búsqueda</h3>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory(null)
                    }}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors"
                  >
                    Limpiar búsqueda
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input
                      type="text"
                      placeholder="Buscar por código ATCC, nombre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-emerald-200 rounded focus:outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-3">Categoría</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!selectedCategory}
                        onChange={() => setSelectedCategory(null)}
                        className="w-4 h-4 rounded border-emerald-300"
                      />
                      <span className="text-sm text-emerald-700">Todas</span>
                    </label>
                    {categorias.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                          className="w-4 h-4 rounded border-emerald-300"
                        />
                        <span className="text-sm text-emerald-700">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="flex-1 space-y-1">
              {sortedCepas.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-emerald-600 text-lg">Sin resultados</p>
                </div>
              ) : (
                sortedCepas.slice(0, itemsPerPage).map((cepa) => (
                  <div
                    key={cepa.id}
                    className="border-b border-emerald-100 py-6 hover:bg-emerald-50 px-4 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:gap-12 lg:justify-between">
                      {/* Left: Info */}
                      <div className="flex-1 mb-6 lg:mb-0">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-xl">🧬</span>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-emerald-900">{cepa.nombre}</h3>
                            <p className="text-emerald-700 text-sm">{cepa.codigo}</p>
                            <p className="text-emerald-600 text-xs font-light italic mt-1">{cepa.cientifico}</p>
                          </div>
                        </div>

                        <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-semibold mb-4">
                          {cepa.bsl}
                        </div>

                        <div className="grid grid-cols-2 gap-6 text-sm mb-4">
                          <div>
                            <p className="font-bold text-emerald-900">Formato del producto:</p>
                            <p className="text-emerald-700">{cepa.productFormat}</p>
                          </div>
                          <div>
                            <p className="font-bold text-emerald-900">Designación de cepa:</p>
                            <p className="text-emerald-700 text-xs">{cepa.strainDesignation}</p>
                          </div>
                          <div>
                            <p className="font-bold text-emerald-900">Depositado como:</p>
                            <p className="text-emerald-700 italic">{cepa.depositedAs}</p>
                          </div>
                          <div>
                            <p className="font-bold text-emerald-900">Cepa tipo:</p>
                            <p className="text-emerald-700">{cepa.typeStrain}</p>
                          </div>
                        </div>

                        {/* Documents and Actions */}
                        <div className="flex gap-3 flex-wrap">
                          {cepa.link && (
                            <a
                              href={cepa.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-semibold text-sm transition-colors flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Ver Genoma
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right: Price and Actions */}
                      <div className="lg:w-72 flex-shrink-0 lg:text-right">
                        <div className="bg-emerald-50 rounded p-6 lg:p-4">
                          <p className="text-sm font-semibold text-emerald-700 mb-1">Precio base:</p>
                          <p className="text-3xl font-bold text-emerald-900 mb-1">S/ {cepa.precioSinEnvio.toFixed(2)}</p>
                          <p className="text-xs text-emerald-500 mb-4">+ S/ 155 envío a Trujillo, Perú</p>
                          <p className="text-xs text-emerald-500 mb-4">{cepa.cantidad}</p>

                          {cepa.disponibilidad ? (
                            <>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm text-emerald-700">Cantidad</span>
                                <input type="number" min="1" defaultValue="1" className="w-16 px-2 py-1 border border-emerald-300 rounded text-sm" />
                              </div>
                              <button
                                onClick={() => handleAgregarAlCarrito(cepa)}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded mb-2 transition-colors flex items-center justify-center gap-2"
                              >
                                🛒 Agregar al carrito
                              </button>
                              <button
                                onClick={() => handleAgregarALista(cepa)}
                                className="w-full bg-white border-2 border-emerald-300 text-emerald-700 font-semibold py-2 rounded hover:bg-emerald-50 transition-colors text-sm"
                              >
                                ♡ Agregar a lista
                              </button>
                            </>
                          ) : (
                            <button className="w-full bg-emerald-300 text-emerald-800 font-bold py-3 rounded flex items-center justify-center gap-2 cursor-not-allowed">
                              <Lock className="w-4 h-4" />
                              Verificar disponibilidad
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Carrito */}
      {showCartModal && selectedCepaForCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-emerald-900">Agregar al carrito</h2>
              <button
                onClick={() => setShowCartModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4 pb-4 border-b border-emerald-200">
              <p className="font-semibold text-emerald-900">{selectedCepaForCart.nombre}</p>
              <p className="text-sm text-emerald-600">{selectedCepaForCart.codigo}</p>
            </div>

            <div className="bg-emerald-50 rounded p-4 mb-4">
              <p className="text-sm text-emerald-700 mb-1">Precio por unidad:</p>
              <p className="text-2xl font-bold text-emerald-900 mb-3">S/ {selectedCepaForCart.precioSinEnvio.toFixed(2)}</p>
              
              <div className="border-t border-emerald-200 pt-3 mt-3">
                <p className="text-sm text-emerald-700 mb-1">Envío a Trujillo, Perú:</p>
                <p className="text-lg font-bold text-emerald-900">S/ {ENVIO_PERU.toFixed(2)}</p>
              </div>

              <div className="border-t border-emerald-300 pt-3 mt-3 bg-white rounded p-2">
                <p className="text-sm text-emerald-700">Total por unidad:</p>
                <p className="text-2xl font-bold text-emerald-900">S/ {(selectedCepaForCart.precioSinEnvio + ENVIO_PERU).toFixed(2)}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-emerald-900 mb-2">Cantidad</label>
              <input
                type="number"
                min="1"
                value={cantidadCarrito}
                onChange={(e) => setCantidadCarrito(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-emerald-300 rounded focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="bg-blue-50 rounded p-3 mb-4">
              <p className="text-xs text-blue-700">
                <strong>Nota:</strong> El envío incluido en tu carrito es una estimación. El costo final dependerá de la cantidad y peso total del pedido.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowCartModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAgregar}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
