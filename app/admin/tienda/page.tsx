"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Tags, Package } from "lucide-react"
import CategoriasManagement from '@/components/admin/tienda/components/CategoriasManagement'
import { ProductosTiendaManagement } from '@/components/admin/tienda/components/ProductosTiendaManagement'

export default function TiendaAdminPage() {
  const [activeTab, setActiveTab] = useState('categorias')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Store className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Tienda</h1>
            <p className="text-gray-600">Administra categorías y productos de la tienda online</p>
          </div>
        </div>
      </div>

      {/* Navegación por tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categorias" className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            Categorías
          </TabsTrigger>
          <TabsTrigger value="productos" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Productos
          </TabsTrigger>
        </TabsList>

        {/* Tab de Categorías */}
        <TabsContent value="categorias">
          <CategoriasManagement />
        </TabsContent>

        {/* Tab de Productos */}
        <TabsContent value="productos">
          <ProductosTiendaManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}