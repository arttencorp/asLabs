// Tipos específicos para el módulo de cotizaciones (interfaz de usuario)
export interface Item {
  id: number
  nombre: string
  descripcion: string
  cantidad: number
  precioUnitario: number
  total: number
  codigo: string
}

export interface Certificado {
  titulo: string
  codigo: string
  tipo: string
  informe: string
  detalle: string[]
  link?: string // URL opcional para enlace del certificado
}

export interface FichaTecnica {
  titulo: string
  descripcion: string
  archivo: string
}

export interface ProductoUI {
  id: string
  descripcion: string
  precioUnitario: number
  certificados?: Certificado[]
  fichaTecnica?: FichaTecnica
  tipoProducto: string
}

export interface CotizacionUIData {
  numeroCotizacion: string
  tipoDocumento: string
  fechaEmision: string
  fechaVencimiento: string
  clienteSeleccionado: string
  razonSocial: string
  dniRuc: string
  direccion: string
  telefono: string
  items: Item[]
  subtotal: number
  impuesto: number
  total: number
  terminosCondiciones: string
  lugarRecojo: string
  formaPago: string
  formaEntrega: string
  totalTexto: string
  certificadosCalidad: string
  certificadosEstructurados?: Certificado[] // Certificados estructurados
  fichasTecnicas: FichaTecnica[]
  tipoProductoSeleccionado: string
  preciosConIGV: boolean
}

// Props para componentes
export interface InformacionGeneralProps { 
  numeroCotizacion: string
  setNumeroCotizacion: (value: string) => void
  fechaEmision: string
  setFechaEmision: (value: string) => void
  fechaVencimiento: string
  setFechaVencimiento: (value: string) => void 
  clienteSeleccionado: string
  setClienteSeleccionado: (value: string) => void
  razonSocial: string
  setRazonSocial: (value: string) => void
  dniRuc: string
  setDniRuc: (value: string) => void
  direccion: string
  setDireccion: (value: string) => void
  telefono: string
  setTelefono: (value: string) => void
  onSiguiente: () => void
}

export interface InformacionAdicionalProps {
  lugarRecojo: string
  setLugarRecojo: (value: string) => void
  formaEntrega: string
  setFormaEntrega: (value: string) => void
  formaPago: FormaPagoUI
  setFormaPago: (value: FormaPagoUI) => void
  terminosCondiciones: string
  setTerminosCondiciones: (value: string) => void
  certificadosCalidad: string
  setCertificadosCalidad: (value: string) => void
  certificadosEstructurados: Certificado[] // Certificados estructurados
  tieneLaboratorio: boolean
  // Nuevas props para formas de pago de BD
  formasPago: import('@/types/database').FormaPago[]
  formaPagoSeleccionada: string
  setFormaPagoSeleccionada: (value: string) => void
  formasPagoLoading: boolean
  // Modo de edición
  isEditMode?: boolean
  onAnterior: () => void
  onVistaPrevia: () => void
  onGuardar: () => void
}

export interface ProductosServiciosProps {
  items: Item[]
  preciosConIGV: boolean
  setPreciosConIGV: (value: boolean) => void
  productos: import('@/types/database').ProductoDatabase[] // Productos de la BD
  productosLoading: boolean
  seleccionarProducto: (id: number, productoId: string) => void
  actualizarItem: (id: number, campo: string, valor: string | number) => void
  agregarItem: () => void
  eliminarItem: (id: number) => void
  calcularTotales: () => { subtotal: number; impuesto: number; total: number }
  onAnterior: () => void
  onSiguiente: () => void
}

// Tipos auxiliares
export type TipoDocumento = 'cotizacion' | 'boleta' | 'factura'
export type FormaPagoUI = 'completo' | 'parcial'
export type TabName = 'informacion' | 'productos' | 'adicional'