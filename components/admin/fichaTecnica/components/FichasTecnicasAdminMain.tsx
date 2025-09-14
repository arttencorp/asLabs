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
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Fichas Técnicas</h1>
        <p className="text-lg text-muted-foreground">
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
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-900">Incluye:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Nombre de la planta</li>
                      <li>• Código técnico</li>
                      <li>• Producto asociado</li>
                      <li>• Imagen de la ficha</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-900">Ideal para:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Gestión rápida</li>
                      <li>• Uso inmediato</li>
                      <li>• Procesos simples</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-900">Características:</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs border-blue-300 text-blue-800 bg-white">
                        <Image className="mr-1 h-3 w-3" />
                        Subida de Imágenes
                      </Badge>
                      <Badge variant="outline" className="text-xs border-blue-300 text-blue-800 bg-white">
                        <Settings className="mr-1 h-3 w-3" />
                        Interfaz Simple
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
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
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-900">Incluye todo lo básico más:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Información taxonómica</li>
                      <li>• Zona de colecta y fecha</li>
                      <li>• Detalles de presentación</li>
                      <li>• Parcelas y descripción</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-900">Ideal para:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Investigación científica</li>
                      <li>• Control de calidad</li>
                      <li>• Trazabilidad completa</li>
                      <li>• Reportes detallados</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-900">Características:</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs border-green-300 text-green-800 bg-white">
                        <Leaf className="mr-1 h-3 w-3" />
                        Taxonomía
                      </Badge>
                      <Badge variant="outline" className="text-xs border-green-300 text-green-800 bg-white">
                        <MapPin className="mr-1 h-3 w-3" />
                        Zona Colecta
                      </Badge>
                      <Badge variant="outline" className="text-xs border-green-300 text-green-800 bg-white">
                        <FileText className="mr-1 h-3 w-3" />
                        Detalles
                      </Badge>
                      <Badge variant="outline" className="text-xs border-green-300 text-green-800 bg-white">
                        <Settings className="mr-1 h-3 w-3" />
                        Interfaz por Pestañas
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
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