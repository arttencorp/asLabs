export function formatearFecha(fechaStr: string | number | Date) {
    if (!fechaStr) return ""
    try {
        const fecha = new Date(fechaStr)
        return fecha.toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        })
    } catch (error) {
        console.error("Error al formatear fecha:", error)
        return fechaStr || ""
    }
}

export function obtenerTituloDocumento(tipoDocumento?: string) {
    if (!tipoDocumento) return "Cotización"

    switch (tipoDocumento) {
        case "boleta":
            return "Boleta de Venta"
        case "factura":
            return "Factura"
        default:
            return "Cotización"
    }
}
 