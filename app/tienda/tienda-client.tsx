"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  TestTubeIcon as Test,
  FlaskRoundIcon as Flask,
  VolumeIcon as Vial,
  PipetteIcon as PetriDish,
  Droplets,
  Microscope,
  Pipette,
  ShoppingCart,
  Beaker,
  Search,
  Filter,
} from "lucide-react"
import Navbar from "@/components/navbar"

/* ---------- Datos ------------- */
const allProducts = [
  // Medios de Cultivo
  { id: "agar-tsa", name: "Agar TSA", price: "S/. 5.00", category: "medios", categoryName: "Medios de Cultivo" },
  { id: "agar-tsi", name: "Agar TSI", price: "S/. 5.00", category: "medios", categoryName: "Medios de Cultivo" },
  {
    id: "agar-macconkey",
    name: "Agar MacConkey",
    price: "S/. 5.00",
    category: "medios",
    categoryName: "Medios de Cultivo",
  },
  { id: "agar-puro", name: "Agar Puro", price: "S/. 3.00", category: "medios", categoryName: "Medios de Cultivo" },

  // Caldos
  { id: "caldo-caso", name: "Caldo CASO", price: "S/. 5.00", category: "caldos", categoryName: "Caldos" },

  // Tubos de Ensayo
  { id: "tubo-13x100", name: "Tubo 13×100 mm", price: "S/. 2.00", category: "tubos", categoryName: "Tubos de Ensayo" },
  { id: "tubo-16x150", name: "Tubo 16×150 mm", price: "S/. 3.00", category: "tubos", categoryName: "Tubos de Ensayo" },

  // Placas Petri
  { id: "placa-90", name: "Placa Petri 90 mm", price: "S/. 3.00", category: "placas", categoryName: "Placas Petri" },
  { id: "placa-150", name: "Placa Petri 150 mm", price: "S/. 5.00", category: "placas", categoryName: "Placas Petri" },

  // Tubos de Recolección
  {
    id: "tubo-rojo",
    name: "Tubo tapa roja",
    price: "S/. 4.00",
    category: "recoleccion",
    categoryName: "Tubos de Recolección",
    desc: "Sin aditivo",
  },
  {
    id: "tubo-lila",
    name: "Tubo tapa lila (EDTA)",
    price: "S/. 5.00",
    category: "recoleccion",
    categoryName: "Tubos de Recolección",
    desc: "EDTA",
  },

  // Asas Bacteriológicas
  {
    id: "asa-delgada",
    name: "Asa mango delgado",
    price: "S/. 18.00",
    category: "asas",
    categoryName: "Asas Bacteriológicas",
  },
  {
    id: "asa-gruesa",
    name: "Asa mango grueso",
    price: "S/. 13.00",
    category: "asas",
    categoryName: "Asas Bacteriológicas",
  },

  // Porta Objetos
  {
    id: "porta-premium",
    name: "Porta Objetos Premium",
    price: "S/. 8.00",
    category: "porta",
    categoryName: "Porta Objetos",
  },

  // Colorantes
  {
    id: "kit-gram",
    name: "Kit tinción de Gram",
    price: "S/. 25.00",
    category: "colorantes",
    categoryName: "Colorantes",
  },
  { id: "kit-wright", name: "Kit Wright", price: "S/. 20.00", category: "colorantes", categoryName: "Colorantes" },

  // Servicios
  {
    id: "serv-esteril",
    name: "Esterilización (2 L)",
    price: "S/. 10.00",
    category: "servicios",
    categoryName: "Servicios",
    desc: "Autoclave profesional",
  },
  {
    id: "serv-siembra",
    name: "Siembra en placa",
    price: "S/. 10.00",
    category: "servicios",
    categoryName: "Servicios",
    desc: "Preparación y sembrado",
  },
  {
    id: "serv-centrifuga",
    name: "Centrifugado de tubos",
    price: "S/. 10.00",
    category: "servicios",
    categoryName: "Servicios",
    desc: "Hasta 10 tubos",
  },

  // Frascos
  {
    id: "frasco-5ml",
    name: "Frasco 5ml vidrio",
    price: "S/. 1.00",
    category: "frascos",
    categoryName: "Frascos de Vidrio",
    desc: "No estéril, tapa de jebe",
  },
  {
    id: "frasco-10ml",
    name: "Frasco 10ml vidrio",
    price: "S/. 1.70",
    category: "frascos",
    categoryName: "Frascos de Vidrio",
    desc: "No estéril, tapa de jebe",
  },
]

const categories = [
  { id: "todos", name: "Todos los productos", icon: ShoppingCart, count: allProducts.length },
  { id: "medios", name: "Medios de Cultivo", icon: PetriDish, count: 4 },
  { id: "caldos", name: "Caldos", icon: Flask, count: 1 },
  { id: "tubos", name: "Tubos de Ensayo", icon: Test, count: 2 },
  { id: "placas", name: "Placas Petri", icon: PetriDish, count: 2 },
  { id: "recoleccion", name: "Tubos de Recolección", icon: Vial, count: 2 },
  { id: "asas", name: "Asas Bacteriológicas", icon: Pipette, count: 2 },
  { id: "porta", name: "Porta Objetos", icon: Microscope, count: 1 },
  { id: "colorantes", name: "Colorantes", icon: Droplets, count: 2 },
  { id: "servicios", name: "Servicios", icon: Beaker, count: 3 },
  { id: "frascos", name: "Frascos de Vidrio", icon: Vial, count: 2 },
]

export default function TiendaClient() {
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [loaded, setLoaded] = useState(false)

  /* efecto de entrada */
  useEffect(() => setLoaded(true), [])

  /* filtrado de productos */
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  /* helpers */
  const openProductDialog = (id: string) => setOpenDialog(id)
  const closeDialog = () => setOpenDialog(null)
  const sendWhatsApp = (prod: string, price: string) => {
    const msg = encodeURIComponent(`Hola, estoy interesado en: ${prod} (${price}). ¿Podrían brindarme más información?`)
    window.open(`https://walink.co/0441cf?text=${msg}`, "_blank")
  }

  /* ---------- Render Card ------------- */
  const ProductCard = ({ product }: { product: (typeof allProducts)[0] }) => (
    <Card
      key={product.id}
      className={`overflow-hidden border-t-4 border-t-[#2e7d32]/80 transition-all duration-500 hover:shadow-lg ${
        loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <CardHeader className="p-5 bg-gradient-to-b from-gray-50 to-white">
        <CardTitle className="text-lg font-semibold text-gray-800">{product.name}</CardTitle>
        <CardDescription className="text-gray-500">
          {product.desc || `${product.categoryName} - Producto de laboratorio`}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-5 pt-0 flex justify-between items-center">
        <p className="text-xl font-bold text-[#2e7d32]">{product.price}</p>
        {/* diálogo */}
        <Dialog open={openDialog === product.id} onOpenChange={(o) => !o && closeDialog()}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#2e7d32] hover:text-white"
              onClick={() => openProductDialog(product.id)}
            >
              Ver detalles
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
              <DialogDescription>{product.categoryName}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {product.desc ? (
                  <>
                    Descripción: <strong>{product.desc}</strong>
                  </>
                ) : (
                  <>
                    Descripción breve de <strong>{product.name}</strong>. Ideal para prácticas académicas.
                  </>
                )}
              </p>
              <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span className="font-bold text-2xl text-[#2e7d32]">{product.price}</span>
                <span className="text-sm text-gray-500">Precio unitario</span>
              </div>
            </div>

            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DialogClose>
              <Button
                className="bg-[#25D366] hover:bg-[#128C7E]"
                onClick={() => sendWhatsApp(product.name, product.price)}
              >
                WhatsApp
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )

  /* ---------- JSX ------------- */
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative bg-gradient-to-r from-[#1b5e20] to-[#4caf50] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-green-laboratory.png')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Tienda <span className="text-green-200">AS Laboratorios</span>
          </h1>
          <p className="text-white/90 text-lg md:text-2xl mb-8">
            Materiales y servicios de laboratorio para estudiantes UNT
          </p>
          <Button
            className="bg-white text-green-800 hover:bg-green-50 shadow-lg"
            onClick={() => window.open("https://walink.co/0441cf", "_blank")}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Consultar disponibilidad
          </Button>
        </div>
        {/* onda */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none">
          <path
            fill="#f9fafb"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32V120H0Z"
          />
        </svg>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* BARRA LATERAL DE FILTROS */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {/* Buscador */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-[#2e7d32] focus:ring-[#2e7d32]"
                  />
                </div>
              </div>

              {/* Filtros por categoría */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-[#2e7d32]" />
                  <h3 className="text-lg font-semibold text-gray-800">Categorías</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                          selectedCategory === category.id
                            ? "bg-[#2e7d32] text-white shadow-md"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4" />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category.id ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {category.count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Botón de cotización personalizada */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-md flex gap-2"
                  onClick={() =>
                    window.open(
                      "https://walink.co/0441cf?text=" +
                        encodeURIComponent(
                          "Hola, necesito una cotización personalizada para productos de laboratorio.",
                        ),
                      "_blank",
                    )
                  }
                >
                  <Beaker className="h-4 w-4" />
                  Cotización personalizada
                </Button>
              </div>
            </div>
          </div>

          {/* ÁREA DE PRODUCTOS */}
          <div className="lg:w-3/4">
            {/* Header de resultados */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === "todos"
                    ? "Todos los productos"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado
                  {filteredProducts.length !== 1 ? "s" : ""}
                  {searchTerm && ` para "${searchTerm}"`}
                </p>
              </div>
            </div>

            {/* Grid de productos */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm
                    ? `No hay productos que coincidan con "${searchTerm}"`
                    : "No hay productos en esta categoría"}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("todos")
                  }}
                >
                  Ver todos los productos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
