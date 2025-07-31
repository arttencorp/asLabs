export interface Item {
  id: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
  codigo: string;
}

export interface Certificado {
  titulo: string;
  codigo: string;
  tipo: string;
  informe: string;
  detalle: string[];
}

export interface FichaTecnica {
  titulo: string;
  descripcion: string;
  archivo: string;
}

export interface Producto {
  id: string;
  descripcion: string;
  precioUnitario: number;
  certificados?: Certificado[];
  fichaTecnica?: FichaTecnica;
  tipoProducto: string;
}

export interface CotizacionData {
  numeroCotizacion: string;
  tipoDocumento: string;
  fechaEmision: string;
  fechaVencimiento: string;
  razonSocial: string;
  dniRuc: string;
  direccion: string;
  telefono: string;
  items: Item[];
  subtotal: number;
  impuesto: number;
  total: number;
  terminosCondiciones: string;
  lugarRecojo: string;
  formaPago: string;
  formaEntrega: string;
  totalTexto: string;
  certificadosCalidad: string;
  fichasTecnicas: FichaTecnica[];
  tipoProductoSeleccionado: string;
  preciosConIGV: boolean;
}

export interface InformacionGeneralProps { 
  numeroCotizacion: string
  setNumeroCotizacion: (value: string) => void
  fechaEmision: string
  setFechaEmision: (value: string) => void
  fechaVencimiento: string
  setFechaVencimiento: (value: string) => void 

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
  formaPago: FormaPago
  setFormaPago: (value: FormaPago) => void
  terminosCondiciones: string
  setTerminosCondiciones: (value: string) => void
  certificadosCalidad: string
  setCertificadosCalidad: (value: string) => void
  tieneLaboratorio: boolean
  onAnterior: () => void
  onVistaPrevia: () => void
}

export interface ProductosServiciosProps {
  items: Item[]
  preciosConIGV: boolean
  setPreciosConIGV: (value: boolean) => void
  seleccionarProducto: (id: number, productoId: string) => void
  actualizarItem: (id: number, campo: string, valor: string | number) => void
  agregarItem: () => void
  eliminarItem: (id: number) => void
  calcularTotales: () => { subtotal: number; impuesto: number; total: number }
  onAnterior: () => void
  onSiguiente: () => void
}

export type TipoDocumento = 'cotizacion' | 'boleta' | 'factura';
export type FormaPago = 'completo' | 'parcial';
export type TabName = 'informacion' | 'productos' | 'adicional';

