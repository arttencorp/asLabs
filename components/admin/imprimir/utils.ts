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
 