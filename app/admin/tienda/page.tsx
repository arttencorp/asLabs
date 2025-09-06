"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Tags, Package } from "lucide-react"
import CategoriasManagement from '@/components/admin/tienda/components/CategoriasManagement'

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
          <TabsTrigger value="productos" className="flex items-center gap-2" disabled>
            <Package className="h-4 w-4" />
            Productos (Próximamente)
          </TabsTrigger>
        </TabsList>

        {/* Tab de Categorías */}
        <TabsContent value="categorias">
          <CategoriasManagement />
        </TabsContent>

        {/* Tab de Productos (placeholder) */}
        <TabsContent value="productos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Productos de Tienda
              </CardTitle>
              <CardDescription>
                Gestión de productos específicos de la tienda online
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">Próximamente</h3>
                <p>La gestión de productos de tienda estará disponible próximamente.</p>
                <p className="text-sm mt-1">
                  Primero completa la configuración de categorías.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}