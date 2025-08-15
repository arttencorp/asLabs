import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, ExternalLink, User, Building2, Search, X, Calendar, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { InformacionGeneralProps} from "../types"
import { useClientes } from "@/components/admin/clientes"
import { getNombreCompleto, getDocumentoCliente } from "@/utils"
import { useEffect, useState } from "react"

export function InformacionGeneral({
  numeroCotizacion,
  setNumeroCotizacion,
  fechaEmision,
  setFechaEmision,
  fechaVencimiento,
  setFechaVencimiento,
  clienteSeleccionado,
  setClienteSeleccionado,
  razonSocial,
  setRazonSocial,
  dniRuc,
  setDniRuc,
  direccion,
  setDireccion,
  telefono,
  setTelefono,
  onSiguiente
}: InformacionGeneralProps) {
  const { clientes, loading: clientesLoading } = useClientes()
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar clientes por término de búsqueda
  const clientesFiltrados = clientes.filter(cliente => {
    const nombre = getNombreCompleto(cliente).toLowerCase()
    const documento = getDocumentoCliente(cliente).toLowerCase()
    const email = cliente.per_email_vac?.toLowerCase() || ""
    const search = searchTerm.toLowerCase()
    
    return nombre.includes(search) || documento.includes(search) || email.includes(search)
  })

  // Obtener cliente seleccionado
  const clienteActual = clientes.find(c => c.per_id_int === clienteSeleccionado)

  // Limpiar selección
  const limpiarSeleccion = () => {
    setClienteSeleccionado("")
    // Limpiar también los campos del formulario padre
    setRazonSocial("")
    setDniRuc("")
    setDireccion("")
    setTelefono("")
  }

  // Actualizar campos del formulario padre cuando se selecciona un cliente
  useEffect(() => {
    if (clienteActual) {
      setRazonSocial(getNombreCompleto(clienteActual))
      setDniRuc(getDocumentoCliente(clienteActual).replace('DNI: ', '').replace('RUC: ', ''))
      setDireccion(clienteActual.per_direc_vac || '')
      setTelefono(clienteActual.per_telef_int || '')
    }
  }, [clienteActual, setRazonSocial, setDniRuc, setDireccion, setTelefono])

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Información de la Cotización
            </CardTitle>
            <CardDescription>Datos generales de la cotización</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numeroCotizacion" className="text-sm font-medium">
                Número de Cotización
              </Label>
              <Input
                id="numeroCotizacion"
                value={numeroCotizacion}
                onChange={(e) => setNumeroCotizacion(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fechaEmision" className="flex items-center gap-1 text-sm font-medium">
                  <Calendar className="h-3 w-3" />
                  Fecha de Emisión
                </Label>
                <Input
                  id="fechaEmision"
                  type="date"
                  value={fechaEmision}
                  onChange={(e) => setFechaEmision(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaVencimiento" className="flex items-center gap-1 text-sm font-medium">
                  <Calendar className="h-3 w-3" />
                  Fecha de Vencimiento
                </Label>
                <Input
                  id="fechaVencimiento"
                  type="date"
                  value={fechaVencimiento}
                  onChange={(e) => setFechaVencimiento(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Selección de Cliente
            </CardTitle>
            <CardDescription>
              Selecciona el cliente para quien se realizará la cotización
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cliente seleccionado actual */}
            {clienteActual ? (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-blue-500 text-white text-lg">
                        {clienteActual.tipo === 'natural' ? (
                          <User className="h-8 w-8" />
                        ) : (
                          <Building2 className="h-8 w-8" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900">{getNombreCompleto(clienteActual)}</h3>
                        <Badge variant="secondary" className="text-sm">
                          {clienteActual.tipo === 'natural' ? 'Persona Natural' : 'Persona Jurídica'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium">{getDocumentoCliente(clienteActual)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{clienteActual.per_email_vac || ''}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{clienteActual.per_telef_int || ''}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{clienteActual.per_direc_vac || ''}</span>
                        </div>
                      </div>
                      {clienteActual.per_cultivo_vac && (
                        <div className="mt-2 p-2 bg-green-50 rounded-md">
                          <span className="text-sm text-green-700 font-medium">
                            Cultivo: {clienteActual.per_cultivo_vac}
                          </span>
                          {clienteActual.per_cantidad_int && (
                            <span className="text-sm text-green-600 ml-2">
                              (Cantidad: {clienteActual.per_cantidad_int})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={limpiarSeleccion}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
              /* Selector de cliente cuando no hay ninguno seleccionado */
              <div className="space-y-6">
                {/* Campo de búsqueda */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label htmlFor="cliente" className="text-sm font-medium mb-2 block">
                      Buscar Cliente
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por nombre, email o documento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <Link href="/admin/clientes" target="_blank">
                      <Button 
                        type="button" 
                        className="h-12 w-12 bg-blue-600 hover:bg-blue-700" 
                        size="icon"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Lista de clientes filtrados */}
                {searchTerm && (
                  <div className="max-h-80 overflow-y-auto border rounded-lg bg-white shadow-sm">
                    {clientesFiltrados.length > 0 ? (
                      <div className="p-3 space-y-2">
                        {clientesFiltrados.slice(0, 8).map((cliente) => (
                          <button
                            key={cliente.per_id_int}
                            type="button"
                            onClick={() => {
                              setClienteSeleccionado(cliente.per_id_int)
                              setSearchTerm("")
                            }}
                            className="w-full text-left p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-gray-100 text-gray-600">
                                  {cliente.tipo === 'natural' ? (
                                    <User className="h-5 w-5" />
                                  ) : (
                                    <Building2 className="h-5 w-5" />
                                  )}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-gray-900 truncate">
                                    {getNombreCompleto(cliente)}
                                  </p>
                                  <Badge variant="outline" className="text-xs">
                                    {cliente.tipo === 'natural' ? 'Natural' : 'Jurídica'}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                  <span>{getDocumentoCliente(cliente)}</span>
                                  {cliente.per_email_vac && (
                                    <>
                                      <span>•</span>
                                      <span className="truncate">{cliente.per_email_vac}</span>
                                    </>
                                  )}
                                  {cliente.per_cultivo_vac && (
                                    <>
                                      <span>•</span>
                                      <span className="truncate text-green-600">{cliente.per_cultivo_vac}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                        {clientesFiltrados.length > 8 && (
                          <p className="text-xs text-gray-500 p-3 text-center border-t">
                            Y {clientesFiltrados.length - 8} clientes más...
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm font-medium mb-2">No se encontraron clientes</p>
                        <p className="text-xs text-gray-400 mb-4">
                          Intenta con otro término de búsqueda
                        </p>
                        <Link href="/admin/clientes" target="_blank">
                          <Button variant="outline" size="sm">
                            <Plus className="h-3 w-3 mr-2" />
                            Crear cliente nuevo
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Estado inicial sin búsqueda */}
                {!searchTerm && (
                  <div className="text-center py-12">
                    <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-12 w-12 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Busca un cliente para comenzar
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Usa el campo de búsqueda para encontrar clientes existentes o crea uno nuevo si no existe.
                    </p>
                    <div className="flex justify-center gap-3">
                      <Link href="/admin/clientes" target="_blank">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Crear Cliente Nuevo
                        </Button>
                      </Link>
                      <Link href="/admin/clientes" target="_blank">
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Gestionar Clientes
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Paso 1 de 3 - Información General
        </div>
        <Button 
          onClick={onSiguiente}
          disabled={!clienteSeleccionado}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
            clienteSeleccionado 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          size="lg"
        >
          {clienteSeleccionado ? 'Continuar con Productos' : 'Selecciona un cliente primero'}
          {clienteSeleccionado && <ExternalLink className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </>
  )
}