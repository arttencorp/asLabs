"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Database, Image, Leaf, MapPin, Settings } from "lucide-react"
import { FichasTecnicasManagement } from './FichasTecnicasManagement'
import { FichasTecnicasAdminCompleta } from './FichasTecnicasAdminCompleta'

export function FichasTecnicasAdminMain() {
  const [activeTab, setActiveTab] = useState<string>("basica")

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Fichas Técnicas</h1>
        <p className="text-gray-600">
          Administra las fichas técnicas de productos con diferentes niveles de detalle.
        </p>
      </div>

      {/* Selector de Modo */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="basica" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Gestión Básica
          </TabsTrigger>
          <TabsTrigger value="completa" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Gestión Completa
          </TabsTrigger>
        </TabsList>

        {/* Información sobre cada modo */}
        <div className="mt-6 mb-8">
          <TabsContent value="basica" className="space-y-4">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <FileText className="h-5 w-5" />
                  Modo Básico
                </CardTitle>
                <CardDescription className="text-blue-800">
                  Gestión simple de fichas técnicas con información esencial.
                </CardDescription>
              </CardHeader> 
            </Card>
          </TabsContent>

          <TabsContent value="completa" className="space-y-4">
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Database className="h-5 w-5" />
                  Modo Completo
                </CardTitle>
                <CardDescription className="text-green-800">
                  Gestión avanzada con información detallada de taxonomía, zona de colecta y características específicas.
                </CardDescription>
              </CardHeader> 
            </Card>
          </TabsContent>
        </div>

        {/* Contenido de cada pestaña */}
        <TabsContent value="basica">
          <FichasTecnicasManagement />
        </TabsContent>

        <TabsContent value="completa">
          <FichasTecnicasAdminCompleta />
        </TabsContent>
      </Tabs>
    </div>
  )
}