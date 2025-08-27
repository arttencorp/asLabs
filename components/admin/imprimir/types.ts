export interface CotizacionImpresion {
  tipoDocumento?: string
  numeroCotizacion?: string
  razonSocial?: string
  dniRuc?: string
  direccion?: string
  telefono?: string
  fechaEmision?: string | number | Date
  fechaVencimiento?: string | number | Date
  tipoCliente?: 'natural' | 'juridica' // Nuevo campo para determinar DNI o RUC
  items?: Array<{
    codigo?: string
    nombre?: string
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
  certificadosEstructurados?: Array<{
    titulo: string;
    codigo: string;
    tipo: string;
    informe: string;
    detalle: string[];
    link?: string;
  }>
  lugarRecojo?: string
  formaPago?: string
  formaEntrega?: string
  tipoProductoSeleccionado?: string
  preciosConIGV?: boolean
  fichasTecnicas?: Array<{ 
    titulo?: string
    descripcion?: string
    archivo?: string 
  }>
}

export interface ConfiguracionImpresion {
  mostrarCertificados: boolean
  mostrarFichasTecnicas: boolean
  incluirLogos: boolean
  formatoPagina: 'A4' | 'Carta'
  orientacion: 'portrait' | 'landscape'
}