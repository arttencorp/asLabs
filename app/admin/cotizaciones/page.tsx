"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useCotizacion } from "@/components/admin/cotizaciones/hooks/useCotizacion"
import { InformacionGeneral } from "@/components/admin/cotizaciones/components/informacionGeneral"
import { ProductosServicios } from "@/components/admin/cotizaciones/components/productosServicios"
import { InformacionAdicional } from "@/components/admin/cotizaciones/components/informacionAdicional"

export default function CotizacionesPage() {
    const {
        activeTab,
        setActiveTab,
        tipoDocumento,
        setTipoDocumento,
        preciosConIGV,
        setPreciosConIGV,
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
        items,
        terminosCondiciones,
        setTerminosCondiciones,
        lugarRecojo,
        setLugarRecojo,
        formaPago,
        setFormaPago,
        formaEntrega,
        setFormaEntrega,
        certificadosCalidad,
        setCertificadosCalidad,
        productos,
        productosLoading,
        seleccionarProducto,
        actualizarItem,
        agregarItem,
        eliminarItem,
        vistaPrevia,
        guardarCotizacion,
        avanzarPaso,
        retrocederPaso,
        calcularTotales,
        tieneLaboratorio,
        obtenerTituloDocumento
    } = useCotizacion()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Cotizaciones</h1>
                <p className="text-gray-600">Gestione las cotizaciones de AS Laboratorios</p>
            </div>

            {/* Selección de tipo de documento */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-3 text-gray-900">Seleccione el tipo de documento</h2>
                <div className="flex gap-3">
                    <Button
                        variant={tipoDocumento === "cotizacion" ? "default" : "outline"}
                        onClick={() => setTipoDocumento("cotizacion")}
                        className={
                            tipoDocumento === "cotizacion"
                                ? "bg-[#5D9848] hover:bg-[#4a7c3a]"
                                : "border-gray-800 text-gray-900 hover:bg-gray-100"
                        }
                    >
                        Cotización
                    </Button>
                    <Button
                        variant={tipoDocumento === "boleta" ? "default" : "outline"}
                        onClick={() => setTipoDocumento("boleta")}
                        className={
                            tipoDocumento === "boleta"
                                ? "bg-[#5D9848] hover:bg-[#4a7c3a]"
                                : "border-gray-800 text-gray-900 hover:bg-gray-100"
                        }
                    >
                        Boleta
                    </Button>
                    <Button
                        variant={tipoDocumento === "factura" ? "default" : "outline"}
                        onClick={() => setTipoDocumento("factura")}
                        className={
                            tipoDocumento === "factura"
                                ? "bg-[#5D9848] hover:bg-[#4a7c3a]"
                                : "border-gray-800 text-gray-900 hover:bg-gray-100"
                        }
                    >
                        Factura
                    </Button>
                </div>
            </div>

            {/* Título y descripción */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Nueva {obtenerTituloDocumento()}</h2>
                <p className="text-muted-foreground">
                    Crea un {obtenerTituloDocumento().toLowerCase()} profesional en pocos pasos
                </p>
            </div>

            {/* Tabs principales */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "informacion" | "productos" | "adicional")} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                        value="informacion"
                        className="data-[state=active]:bg-[#5D9848] data-[state=active]:text-white"
                    >
                        1. Información General
                    </TabsTrigger>
                    <TabsTrigger
                        value="productos"
                        className="data-[state=active]:bg-[#5D9848] data-[state=active]:text-white"
                    >
                        2. Productos y Servicios
                    </TabsTrigger>
                    <TabsTrigger
                        value="adicional"
                        className="data-[state=active]:bg-[#5D9848] data-[state=active]:text-white"
                    >
                        3. Información Adicional
                    </TabsTrigger>
                </TabsList>

                {/* Tab 1: Información General */}
                <TabsContent value="informacion">
                    <InformacionGeneral
                        numeroCotizacion={numeroCotizacion}
                        setNumeroCotizacion={setNumeroCotizacion}
                        fechaEmision={fechaEmision}
                        setFechaEmision={setFechaEmision}
                        fechaVencimiento={fechaVencimiento}
                        setFechaVencimiento={setFechaVencimiento}
                        clienteSeleccionado={clienteSeleccionado}
                        setClienteSeleccionado={setClienteSeleccionado}
                        razonSocial={razonSocial}
                        setRazonSocial={setRazonSocial}
                        dniRuc={dniRuc}
                        setDniRuc={setDniRuc}
                        direccion={direccion}
                        setDireccion={setDireccion}
                        telefono={telefono}
                        setTelefono={setTelefono}
                        onSiguiente={avanzarPaso}
                    />
                </TabsContent>

                {/* Tab 2: Productos y Servicios */}
                <TabsContent value="productos">
                    <ProductosServicios
                        items={items}
                        preciosConIGV={preciosConIGV}
                        setPreciosConIGV={setPreciosConIGV}
                        productos={productos}
                        productosLoading={productosLoading}
                        seleccionarProducto={seleccionarProducto}
                        actualizarItem={actualizarItem}
                        agregarItem={agregarItem}
                        eliminarItem={eliminarItem}
                        calcularTotales={calcularTotales}
                        onAnterior={retrocederPaso}
                        onSiguiente={avanzarPaso}
                    />
                </TabsContent>

                {/* Tab 3: Información Adicional */}
                <TabsContent value="adicional">
                    <InformacionAdicional
                        lugarRecojo={lugarRecojo}
                        setLugarRecojo={setLugarRecojo}
                        formaEntrega={formaEntrega}
                        setFormaEntrega={setFormaEntrega}
                        formaPago={formaPago}
                        setFormaPago={setFormaPago}
                        terminosCondiciones={terminosCondiciones}
                        setTerminosCondiciones={setTerminosCondiciones}
                        certificadosCalidad={certificadosCalidad}
                        setCertificadosCalidad={setCertificadosCalidad}
                        tieneLaboratorio={tieneLaboratorio}
                        onAnterior={retrocederPaso}
                        onVistaPrevia={vistaPrevia}
                        onGuardar={guardarCotizacion}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}