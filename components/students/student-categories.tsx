"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Eye, MessageCircle, Star, Users, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import StudentProductsPopup from "./student-products-popup"
import StudentMaterialsPopup from "./student-materials-popup"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  isPopular?: boolean
  discount?: number
}

const products: Product[] = [
  {
    id: "1",
    name: "Kit de Microbiología Básica",
    description:
      "Kit completo para prácticas de microbiología con medios de cultivo, placas petri y herramientas básicas.",
    price: 120,
    originalPrice: 150,
    image: "/kit-microbiologia.png",
    category: "Kits Educativos",
    rating: 4.8,
    reviews: 45,
    inStock: true,
    isPopular: true,
    discount: 20,
  },
  {
    id: "2",
    name: "Kit de Biología Molecular",
    description: "Incluye reactivos para PCR, electroforesis y análisis de ADN. Perfecto para estudiantes avanzados.",
    price: 280,
    originalPrice: 350,
    image: "/kit-biologia-molecular.png",
    category: "Kits Educativos",
    rating: 4.9,
    reviews: 32,
    inStock: true,
    discount: 20,
  },
  {
    id: "3",
    name: "Kit de Histología",
    description: "Materiales para preparación y tinción de muestras histológicas. Incluye colorantes y portaobjetos.",
    price: 95,
    originalPrice: 120,
    image: "/kit-histologia.png",
    category: "Kits Educativos",
    rating: 4.7,
    reviews: 28,
    inStock: true,
    discount: 21,
  },
  {
    id: "4",
    name: "Reactivos de Tinción",
    description: "Set completo de colorantes para tinción diferencial: Gram, azul de metileno, safranina.",
    price: 45,
    originalPrice: 60,
    image: "/reactivos-tincion.png",
    category: "Reactivos",
    rating: 4.6,
    reviews: 67,
    inStock: true,
    discount: 25,
  },
  {
    id: "5",
    name: "Medios de Cultivo",
    description: "Variedad de medios de cultivo deshidratados: LB, MacConkey, Sabouraud, PDA.",
    price: 35,
    originalPrice: 45,
    image: "/medios-cultivo.png",
    category: "Reactivos",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    discount: 22,
  },
  {
    id: "6",
    name: "Reactivos Bioquímicos",
    description: "Reactivos para pruebas bioquímicas: catalasa, oxidasa, indol, citrato.",
    price: 55,
    originalPrice: 70,
    image: "/reactivos-bioquimica.png",
    category: "Reactivos",
    rating: 4.5,
    reviews: 41,
    inStock: true,
    discount: 21,
  },
  {
    id: "7",
    name: "Micropipetas (Set)",
    description: "Set de micropipetas de precisión: 10-100μL, 100-1000μL, 1000-5000μL con puntas.",
    price: 180,
    originalPrice: 220,
    image: "/micropipetas.png",
    category: "Equipos",
    rating: 4.9,
    reviews: 23,
    inStock: true,
    discount: 18,
  },
  {
    id: "8",
    name: "Placas Petri (Pack 50)",
    description: "Placas petri estériles de 90mm, ideales para cultivos microbiológicos.",
    price: 25,
    originalPrice: 35,
    image: "/placas-petri.png",
    category: "Equipos",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    discount: 29,
  },
  {
    id: "9",
    name: "Asas de Siembra",
    description: "Asas de siembra estériles desechables, pack de 100 unidades.",
    price: 15,
    originalPrice: 20,
    image: "/asas-siembra.png",
    category: "Equipos",
    rating: 4.4,
    reviews: 78,
    inStock: true,
    discount: 25,
  },
  {
    id: "10",
    name: "Manual de Microbiología",
    description: "Guía completa de prácticas de microbiología con protocolos detallados.",
    price: 40,
    originalPrice: 50,
    image: "/manual-microbiologia.png",
    category: "Material Educativo",
    rating: 4.8,
    reviews: 92,
    inStock: true,
    discount: 20,
  },
  {
    id: "11",
    name: "Atlas de Histología",
    description: "Atlas visual con imágenes de alta calidad de tejidos y órganos.",
    price: 65,
    originalPrice: 80,
    image: "/atlas-histologia.png",
    category: "Material Educativo",
    rating: 4.9,
    reviews: 34,
    inStock: true,
    discount: 19,
  },
  {
    id: "12",
    name: "Guía de Biología Molecular",
    description: "Manual práctico con protocolos de PCR, electroforesis y clonación.",
    price: 55,
    originalPrice: 70,
    image: "/guia-molecular.png",
    category: "Material Educativo",
    rating: 4.7,
    reviews: 47,
    inStock: true,
    discount: 21,
  },
]

const categories = ["Todos", "Kits Educativos", "Reactivos", "Equipos", "Material Educativo"]

export default function StudentCategories() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductsPopup, setShowProductsPopup] = useState(false)
  const [showMaterialsPopup, setShowMaterialsPopup] = useState(false)

  const filteredProducts =
    selectedCategory === "Todos" ? products : products.filter((product) => product.category === selectedCategory)

  const handleWhatsAppContact = (product: Product) => {
    const message = `Hola, soy estudiante universitario y me interesa el producto: ${product.name} (${product.id}). ¿Podrían darme más información sobre disponibilidad y descuentos para estudiantes?`
    const whatsappUrl = `https://wa.me/51961996645?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Productos para Estudiantes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra amplia gama de productos diseñados especialmente para estudiantes universitarios con
            descuentos exclusivos
          </p>
        </div>

        {/* Benefits Banner */}
        <div className="bg-gradient-to-r from-[#2e7d32] to-[#4caf50] text-white p-6 rounded-lg mb-8">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Users className="h-6 w-6" />
              <span className="font-semibold">Descuentos Estudiantiles</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="h-6 w-6" />
              <span className="font-semibold">Calidad Garantizada</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MessageCircle className="h-6 w-6" />
              <span className="font-semibold">Soporte Técnico</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-[#2e7d32] hover:bg-[#1b5e20]"
                  : "hover:bg-[#2e7d32] hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.isPopular && (
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Popular</Badge>
                  )}
                  {product.discount && (
                    <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="text-sm mb-3 line-clamp-2">{product.description}</CardDescription>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-[#2e7d32]">S/ {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">S/ {product.originalPrice}</span>
                    )}
                  </div>
                  <Badge
                    variant={product.inStock ? "default" : "destructive"}
                    className={product.inStock ? "bg-green-100 text-green-800" : ""}
                  >
                    {product.inStock ? "En Stock" : "Agotado"}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelectedProduct(product)} className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleWhatsAppContact(product)}
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E]"
                    disabled={!product.inStock}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Consultar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿No encuentras lo que buscas?</h3>
            <p className="text-gray-600 mb-6">
              Contáctanos directamente y te ayudaremos a encontrar los productos perfectos para tus estudios
              universitarios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setShowProductsPopup(true)} className="bg-[#2e7d32] hover:bg-[#1b5e20]">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ver Catálogo Completo
              </Button>
              <Button
                onClick={() => setShowMaterialsPopup(true)}
                variant="outline"
                className="hover:bg-[#2e7d32] hover:text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                Materiales Especializados
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
                  ✕
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <Badge className="mb-2">{selectedProduct.category}</Badge>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(selectedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {selectedProduct.rating} ({selectedProduct.reviews} reseñas)
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl font-bold text-[#2e7d32]">S/ {selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">S/ {selectedProduct.originalPrice}</span>
                    )}
                    {selectedProduct.discount && (
                      <Badge className="bg-green-500">Ahorra {selectedProduct.discount}%</Badge>
                    )}
                  </div>

                  <Button
                    onClick={() => handleWhatsAppContact(selectedProduct)}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E]"
                    disabled={!selectedProduct.inStock}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Consultar por WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popups */}
      <StudentProductsPopup isOpen={showProductsPopup} onClose={() => setShowProductsPopup(false)} />
      <StudentMaterialsPopup isOpen={showMaterialsPopup} onClose={() => setShowMaterialsPopup(false)} />
    </section>
  )
}
