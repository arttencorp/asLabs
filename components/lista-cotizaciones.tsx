"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, FileEdit, Trash2, Search, FileText, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Datos de ejemplo para cotizaciones
const cotizacionesIniciales = [
  {
    id: "COT-001",
    cliente: "Empresa ABC",
    fecha: "2024-04-01",
    total: 1250.0,
    estado: "Pendiente",
  },
  {
    id: "COT-002",
    cliente: "Corporación XYZ",
    fecha: "2024-03-28",
    total: 3450.75,
    estado: "Aprobada",
  },
  {
    id: "COT-003",
    cliente: "Distribuidora 123",
    fecha: "2024-03-25",
    total: 875.5,
    estado: "Rechazada",
  },
  {
    id: "COT-004",
    cliente: "Servicios Técnicos",
    fecha: "2024-03-20",
    total: 2100.0,
    estado: "Aprobada",
  },
  {
    id: "COT-005",
    cliente: "Constructora Norte",
    fecha: "2024-03-15",
    total: 5600.25,
    estado: "Pendiente",
  },
]

export function ListaCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState(cotizacionesIniciales)
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [ordenarPor, setOrdenarPor] = useState("fecha")
  const [ordenAscendente, setOrdenAscendente] = useState(false)

  // Filtrar cotizaciones
  const cotizacionesFiltradas = cotizaciones
    .filter(
      (cot) =>
        (busqueda === "" ||
          cot.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
          cot.id.toLowerCase().includes(busqueda.toLowerCase())) &&
        (filtroEstado === "todos" || cot.estado === filtroEstado),
    )
    .sort((a, b) => {
      if (ordenarPor === "fecha") {
        return ordenAscendente
          ? new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
          : new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      } else if (ordenarPor === "total") {
        return ordenAscendente ? a.total - b.total : b.total - a.total
      } else if (ordenarPor === "cliente") {
        return ordenAscendente ? a.cliente.localeCompare(b.cliente) : b.cliente.localeCompare(a.cliente)
      }
      return 0
    })

  // Eliminar cotización
  const eliminarCotizacion = (id) => {
    setCotizaciones(cotizaciones.filter((cot) => cot.id !== id))
  }

  // Cambiar orden
  const cambiarOrden = (campo) => {
    if (ordenarPor === campo) {
      setOrdenAscendente(!ordenAscendente)
    } else {
      setOrdenarPor(campo)
      setOrdenAscendente(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cotizaciones</CardTitle>
        <CardDescription>Gestiona todas tus cotizaciones desde aquí</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cotización..."
              className="pl-8"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <Select value={filtroEstado} onValueChange={setFiltroEstado}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="Aprobada">Aprobada</SelectItem>
              <SelectItem value="Rechazada">Rechazada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => cambiarOrden("cliente")}
                    className="flex items-center p-0 font-medium"
                  >
                    Cliente
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => cambiarOrden("fecha")}
                    className="flex items-center p-0 font-medium"
                  >
                    Fecha
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => cambiarOrden("total")}
                    className="flex items-center p-0 font-medium"
                  >
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cotizacionesFiltradas.length > 0 ? (
                cotizacionesFiltradas.map((cotizacion) => (
                  <TableRow key={cotizacion.id}>
                    <TableCell className="font-medium">{cotizacion.id}</TableCell>
                    <TableCell>{cotizacion.cliente}</TableCell>
                    <TableCell>{new Date(cotizacion.fecha).toLocaleDateString()}</TableCell>
                    <TableCell>${cotizacion.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          cotizacion.estado === "Aprobada"
                            ? "bg-green-100 text-green-800"
                            : cotizacion.estado === "Rechazada"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {cotizacion.estado}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/cotizaciones/${cotizacion.id}`}>
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                        </Link>
                        <Link href={`/cotizaciones/${cotizacion.id}/editar`}>
                          <Button size="icon" variant="ghost">
                            <FileEdit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente la cotización{" "}
                                {cotizacion.id}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => eliminarCotizacion(cotizacion.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button size="icon" variant="ghost">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">PDF</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron cotizaciones
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
