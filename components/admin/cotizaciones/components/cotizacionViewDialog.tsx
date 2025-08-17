import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
    X, Calendar, User, Building2, Mail, Phone, MapPin, Package,
    CreditCard, FileText, AlertCircle, CheckCircle2, Clock, XCircle
} from "lucide-react"
import { 
  formatCurrency, 
  formatDate, 
  getEstadoColor, 
  getNombreCompleto, 
  getDocumentoCliente, 
  getEmailCliente, 
  getTelfCliente 
} from "@/utils/index"

interface CotizacionViewDialogProps {
  open: boolean
  onClose: () => void
  cotizacion: any
}

export function CotizacionViewDialog({ open, onClose, cotizacion }: CotizacionViewDialogProps) {
  if (!cotizacion) return null

  // Calcular totales
  const subtotal = cotizacion.detalle_cotizacion?.reduce(
    (sum: number, detalle: any) => sum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int),
    0
  ) || 0
  const igv = cotizacion.cot_igv_bol ? subtotal * 0.18 : 0
  const total = subtotal + igv

  // Determinar si es persona natural o jurídica
  const persona = cotizacion.persona
  const esPersonaNatural = persona?.tipo === 'natural'

  // Obtener ícono de estado
  const getEstadoIcon = (tipo: number) => {
    switch (tipo) {
      case 1: return <Clock className="h-4 w-4" />
      case 2: return <CheckCircle2 className="h-4 w-4" />
      case 3: return <XCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Cotización {cotizacion.cot_num_vac}</h2>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Badge 
                    className={getEstadoColor(cotizacion.estado_cotizacion?.est_cot_tipo_int || 1, 'cotizacion')}
                  >
                    {getEstadoIcon(cotizacion.estado_cotizacion?.est_cot_tipo_int || 1)}
                    {cotizacion.estado_cotizacion?.est_cot_desc_vac || 'Pendiente'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Emitida: {formatDate(cotizacion.cot_fec_emis_dt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Vence: {formatDate(cotizacion.cot_fec_venc_dt)}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Información del Cliente */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                {esPersonaNatural ? <User className="h-5 w-5 text-blue-600" /> : <Building2 className="h-5 w-5 text-blue-600" />}
                <h3 className="text-lg font-semibold">Información del Cliente</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {esPersonaNatural ? (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Nombre Completo</p>
                      <p className="font-medium">{getNombreCompleto(persona)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">DNI</p>
                      <p className="font-medium">{getDocumentoCliente(persona)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Razón Social</p>
                      <p className="font-medium">{getNombreCompleto(persona)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">RUC</p>
                      <p className="font-medium">{getDocumentoCliente(persona)}</p>
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <User className="h-3 w-3" /> Contacto
                  </p>
                  <p className="font-medium">{persona?.per_nom_contac_vac || '-'}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <p className="font-medium">{getEmailCliente(persona)}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Teléfono
                  </p>
                  <p className="font-medium">{getTelfCliente(persona)}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Dirección
                  </p>
                  <p className="font-medium">{persona?.per_direcc_vac || '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalle de Productos */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Detalle de Productos</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Producto</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Cantidad</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Precio Unit.</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cotizacion.detalle_cotizacion?.map((detalle: any, index: number) => (
                      <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{detalle.producto?.pro_nomb_vac}</p>
                            <p className="text-sm text-gray-500">{detalle.producto?.pro_desc_vac}</p>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4 font-medium">
                          {detalle.det_cot_cant_int}
                        </td>
                        <td className="text-right py-3 px-4">
                          {formatCurrency(detalle.det_cot_prec_hist_int)}
                        </td>
                        <td className="text-right py-3 px-4 font-medium">
                          {formatCurrency(detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Separator className="my-4" />

              {/* Totales */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                {cotizacion.cot_igv_bol && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IGV (18%)</span>
                    <span className="font-medium">{formatCurrency(igv)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Adicional */}
          {cotizacion.informacion_adicional && cotizacion.informacion_adicional.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Información Adicional</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cotizacion.informacion_adicional[0].inf_ad_lug_recojo_vac && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Lugar de Recojo
                      </p>
                      <p className="font-medium">{cotizacion.informacion_adicional[0].inf_ad_lug_recojo_vac}</p>
                    </div>
                  )}

                  {cotizacion.informacion_adicional[0].inf_ad_form_entr_vac && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Package className="h-3 w-3" /> Forma de Entrega
                      </p>
                      <p className="font-medium">{cotizacion.informacion_adicional[0].inf_ad_form_entr_vac}</p>
                    </div>
                  )}

                  {cotizacion.informacion_adicional[0].forma_pago && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <CreditCard className="h-3 w-3" /> Forma de Pago
                      </p>
                      <p className="font-medium">{cotizacion.informacion_adicional[0].forma_pago.form_pa_desc_vac}</p>
                    </div>
                  )}
                </div>

                {cotizacion.informacion_adicional[0].inf_ad_term_cond_vac && (
                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-gray-500">Términos y Condiciones</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{cotizacion.informacion_adicional[0].inf_ad_term_cond_vac}</p>
                    </div>
                  </div>
                )} 
              </CardContent>
            </Card>
          )}

          {/* Información Específica del Cliente (si existe) */}
          {persona && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Detalles del Cliente</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {persona.per_cantidad_int && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Cantidad</p>
                      <p className="font-medium">{persona.per_cantidad_int} unidades</p>
                    </div>
                  )}
                  
                  {persona.per_hec_disp_int && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Hectáreas Disponibles</p>
                      <p className="font-medium">{persona.per_hec_disp_int} ha</p>
                    </div>
                  )}
                  
                  {persona.per_hec_inst_int && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Hectáreas Instaladas</p>
                      <p className="font-medium">{persona.per_hec_inst_int} ha</p>
                    </div>
                  )}

                  {persona.per_region_int && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Región</p>
                      <p className="font-medium">Región {persona.per_region_int}</p>
                    </div>
                  )}

                  {persona.per_provincia_int && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Provincia</p>
                      <p className="font-medium">Provincia {persona.per_provincia_int}</p>
                    </div>
                  )}

                  {persona.per_distrito_int && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Distrito</p>
                      <p className="font-medium">Distrito {persona.per_distrito_int}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
