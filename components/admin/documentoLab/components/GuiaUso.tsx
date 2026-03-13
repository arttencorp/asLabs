'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  HelpCircle,
  ClipboardList,
  Info,
  FlaskConical,
  BarChart2,
  Bug,
  Paperclip,
  PenLine,
  Save,
  Download,
} from 'lucide-react'

const secciones = [
  {
    icon: ClipboardList,
    tab: 'Órdenes de Servicio',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    pasos: [
      'Al entrar a <strong>Recepción / Lab</strong>, primero verá la sección de <strong>Órdenes de Servicio</strong>.',
      'Use <strong>Nuevo Ingreso</strong> para abrir el selector de cotizaciones disponibles.',
      'Seleccione la <strong>Cotización</strong> correcta del cliente. Esa acción crea la orden de servicio y la vincula con el flujo de recepción.',
      'Después podrá abrir esa orden desde la tabla para gestionar ingresos, muestras y el documento de laboratorio asociado.',
      'Si la orden ya existe, búsquela en la lista y haga clic en <strong>Ver</strong> para continuar el proceso.',
    ],
  },
  {
    icon: Info,
    tab: 'Información',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    pasos: [
      'Seleccione el <strong>Área</strong> de laboratorio correspondiente (ej. Microbiología, Química).',
      'Elija el <strong>Servicio</strong> que se va a documentar.',
      'Seleccione el <strong>Tipo de documento</strong> (Certificado, Informe, Acta, etc.).',
      'Busque y asigne el <strong>Cliente</strong> usando el campo de búsqueda.',
      'Ajuste el <strong>Estado</strong> del documento según su etapa actual (Borrador, Pendiente, En proceso, Emitido).',
    ],
  },
  {
    icon: FlaskConical,
    tab: 'Muestras',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    pasos: [
      'Haga clic en <strong>Agregar Muestra</strong> para registrar una nueva muestra.',
      'Complete el <strong>Código</strong> y la <strong>Matriz</strong> de la muestra (agua, suelo, alimento, etc.).',
      'Ingrese el <strong>Lugar de muestreo</strong> y las fechas de toma, recepción e inicio/fin de análisis.',
      'Si la muestra fue rechazada, marque la opción y complete el <strong>Motivo de rechazo</strong>.',
      'Los campos dinámicos adicionales dependen de la configuración del área.',
    ],
  },
  {
    icon: BarChart2,
    tab: 'Resultados',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    pasos: [
      'Haga clic en <strong>Agregar Resultado</strong> para incluir un ensayo.',
      'Complete el <strong>Parámetro</strong>, <strong>Resultado</strong>, <strong>Unidad</strong> y <strong>Método</strong>.',
      'Opcionalmente defina el <strong>Rango referencial</strong> (mín/máx) para que aparezca la barra gráfica en el PDF.',
      'Use la sección de <strong>Notas de resultado</strong> al final de esta pestaña para agregar observaciones globales.',
      'Puede vincular una nota a un resultado o muestra específica.',
    ],
  },
  {
    icon: Bug,
    tab: 'Agentes',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    pasos: [
      'Registre los <strong>Agentes identificados</strong> durante el análisis (microorganismos, contaminantes, etc.).',
      'Indique el <strong>Tipo de agente</strong> y su <strong>Concentración</strong> si aplica.',
      'Puede asociar cada agente a una <strong>Muestra</strong> específica.',
    ],
  },
  {
    icon: Paperclip,
    tab: 'Anexos',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    pasos: [
      'Adjunte archivos complementarios al documento (fotografías, cromatogramas, certificados de reactivos).',
      'Seleccione el <strong>Tipo de anexo</strong> según la configuración del área.',
      'Ingrese la <strong>URL</strong> del archivo o suba el archivo directamente.',
      'La descripción aparecerá listada en el cuerpo del PDF.',
    ],
  },
  {
    icon: PenLine,
    tab: 'Firmas',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    pasos: [
      'Seleccione los <strong>Responsables</strong> que deben firmar el documento.',
      'Puede agregar más de una firma (ej. Analista + Jefe de laboratorio).',
      'Las firmas aparecerán al pie del PDF junto con el cargo configurado.',
    ],
  },
]

const acciones = [
  {
    icon: Save,
    color: 'text-white',
    bg: 'bg-primary',
    nombre: 'Guardar',
    desc: 'Persiste todos los cambios realizados en el documento. Úselo frecuentemente para no perder información.',
  },
  {
    icon: Download,
    color: 'text-foreground',
    bg: 'bg-muted',
    nombre: 'Descargar',
    desc: 'Genera y descarga el PDF final con toda la información configurada. Solo disponible cuando el documento ya fue guardado.',
  },
]

interface GuiaUsoProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function GuiaUso({ open: openProp, onOpenChange }: GuiaUsoProps = {}) {
  const [openInterno, setOpenInterno] = useState(false)
  const open = openProp !== undefined ? openProp : openInterno
  const setOpen = onOpenChange ?? setOpenInterno

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:text-primary hover:bg-primary/5">
          <HelpCircle className="h-4 w-4 mr-1.5" />
          Ayuda
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col w-full sm:max-w-xl p-0">
        <SheetHeader className="px-6 pt-6 pb-4 shrink-0 border-b">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="h-5 w-5 text-primary" />
            Guía de uso — Recepción y Documentos de Laboratorio
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Esta guía explica el flujo completo: desde la creación de la orden de servicio, hasta la emisión de uno o varios documentos de laboratorio.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Flujo recomendado */}
          <div className="p-3 rounded-lg border border-dashed bg-muted/40 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Flujo recomendado:</span>{' '}
            Órdenes de Servicio → Selección de Cotización → Información → Muestras → Resultados → Agentes → Anexos → Firmas →{' '}
            <span className="font-medium text-foreground">Guardar → Descargar</span>
          </div>

          <div className="p-3 rounded-lg border bg-slate-50 text-sm text-slate-700 space-y-2">
            <p className="font-semibold text-slate-900">Cómo funciona</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Primero se crea o selecciona una <strong>Orden de Servicio</strong> desde una <strong>Cotización</strong>.</li>
              <li>La orden queda como base operativa para el trabajo de laboratorio.</li>
              <li>Con esa base, se pueden generar <strong>uno o varios documentos</strong> (por tipo, por etapa o por necesidad del cliente).</li>
              <li>Cada documento se edita de forma independiente: información, muestras, resultados, anexos y firmas.</li>
              <li>Al final, cada documento se guarda y se descarga en PDF de manera individual.</li>
            </ol>
          </div>
          {secciones.map(({ icon: Icon, tab, color, bg, pasos }) => (
            <div key={tab} className={`rounded-lg border ${bg} p-4`}>
              <div className={`flex items-center gap-2 font-semibold mb-3 ${color}`}>
                <Icon className="h-4 w-4" />
                {tab}
              </div>
              <ol className="space-y-1.5 list-decimal list-inside text-sm text-foreground/80">
                {pasos.map((paso, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: paso }} />
                ))}
              </ol>
            </div>
          ))}

          {/* Botones de acción */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Botones principales</p>
            {acciones.map(({ icon: Icon, color, bg, nombre, desc }) => (
              <div key={nombre} className="flex items-start gap-3 rounded-lg border p-3">
                <span className={`inline-flex items-center justify-center h-7 w-7 rounded ${bg} shrink-0`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </span>
                <div className="text-sm">
                  <p className="font-medium">{nombre}</p>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tip final */}
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-800">
            <span className="font-semibold">Tip:</span> Si el usuario todavía no tiene una orden de servicio creada, primero debe seleccionar la cotización desde <strong>Nuevo Ingreso</strong>. Luego puede crear tantos documentos como necesite para ese flujo (por ejemplo, certificado e informe por separado), y descargar cada uno en su propio PDF.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
