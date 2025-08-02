import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Cotizacion } from "../types"

export function useCotizacionImpresion() {
    const router = useRouter()
    const [cotizacion, setCotizacion] = useState<Cotizacion | null>(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        try {
            // Recuperar datos de la cotización del localStorage
            const cotizacionGuardada = localStorage.getItem("cotizacionActual")
            if (cotizacionGuardada) {
                const cotizacionData = JSON.parse(cotizacionGuardada)

                // Asegurarse de que los items tengan la propiedad codigo
                if (cotizacionData.items) {
                    cotizacionData.items = cotizacionData.items.map((item: { codigo: any }) => ({
                        ...item,
                        codigo: item.codigo || "",
                    }))
                } else {
                    cotizacionData.items = []
                }

                // Asegurarse de que fichasTecnicas existe
                if (!cotizacionData.fichasTecnicas) {
                    cotizacionData.fichasTecnicas = []
                }

                // Asegurarse de que todos los campos necesarios existan
                cotizacionData.subtotal = cotizacionData.subtotal || 0
                cotizacionData.impuesto = cotizacionData.impuesto || 0
                cotizacionData.total = cotizacionData.total || 0
                cotizacionData.totalTexto = cotizacionData.totalTexto || ""
                cotizacionData.terminosCondiciones = cotizacionData.terminosCondiciones || ""
                cotizacionData.certificadosCalidad = cotizacionData.certificadosCalidad || ""
                cotizacionData.lugarRecojo = cotizacionData.lugarRecojo || ""
                cotizacionData.formaPago = cotizacionData.formaPago || "completo"
                cotizacionData.formaEntrega = cotizacionData.formaEntrega || ""
                cotizacionData.tipoProductoSeleccionado = cotizacionData.tipoProductoSeleccionado || "vegetal"
                cotizacionData.tipoDocumento = cotizacionData.tipoDocumento || "cotizacion"

                // Asegurarse de que el campo preciosConIGV exista
                cotizacionData.preciosConIGV = cotizacionData.preciosConIGV || false

                setCotizacion(cotizacionData)
            }
        } catch (error) {
            console.error("Error al cargar la cotización:", error)
            setError("Error al cargar los datos de la cotización. Por favor, intente nuevamente.")
        } finally {
            setCargando(false)
        }
    }, [])

    // Asegurar que la ficha técnica se muestre correctamente
    useEffect(() => {
        if (cotizacion && cotizacion.fichasTecnicas && cotizacion.fichasTecnicas.length > 0) {
            try {
                // Precargar las imágenes para asegurar que se muestren correctamente
                cotizacion.fichasTecnicas.forEach((ficha: { archivo?: string }) => {
                    if (ficha && ficha.archivo) {
                        const img = document.createElement("img")
                        img.crossOrigin = "anonymous" // Evitar problemas CORS
                        img.src = ficha.archivo
                    }
                })
            } catch (error) {
                console.error("Error al precargar imágenes:", error)
            }
        }
    }, [cotizacion])

    // Funciones
    const imprimir = () => {
        window.print()
    }

    const volverACrear = () => {
        router.push("/admin/pedidos")
    }

    const volverAlInicio = () => {
        router.push("/admin/pedidos")
    }

    const tieneASWG =
        cotizacion?.items &&
        Array.isArray(cotizacion.items) &&
        cotizacion.items.some(item => item && item.codigo === "ASWG") || false

    const tieneASC5 =
        cotizacion?.items &&
        Array.isArray(cotizacion.items) &&
        cotizacion.items.some(item => item && item.codigo === "ASC5") || false

    const tieneLAB =
        cotizacion?.items &&
        Array.isArray(cotizacion.items) &&
        cotizacion.items.some(item => item && item.codigo === "LAB") || false

    // Determinar el tipo de producto principal
    const esLaboratorio = tieneLAB || cotizacion?.tipoProductoSeleccionado === "laboratorio"

    return {
        cotizacion,
        cargando,
        error,
        imprimir,
        volverACrear,
        volverAlInicio,
        tieneASWG,
        tieneASC5,
        tieneLAB,
        esLaboratorio
    }
}