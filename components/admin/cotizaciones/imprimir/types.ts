export interface Cotizacion {
  tipoDocumento?: string
  numeroCotizacion?: string
  razonSocial?: string
  dniRuc?: string
  direccion?: string
  telefono?: string
  fechaEmision?: string | number | Date
  fechaVencimiento?: string | number | Date
  items?: Array<{
    codigo?: string
    descripcion?: string
    cantidad?: number
    precioUnitario?: number
    total?: number
  }>
  subtotal?: number
  impuesto?: number
  total?: number
  totalTexto?: string
  terminosCondiciones?: string
  certificadosCalidad?: string
  lugarRecojo?: string
  formaPago?: string
  formaEntrega?: string
  tipoProductoSeleccionado?: string
  preciosConIGV?: boolean
  fichasTecnicas?: Array<{ archivo?: string }>
}