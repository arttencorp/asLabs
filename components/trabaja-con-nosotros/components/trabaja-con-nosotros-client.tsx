"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Send,
  Loader2,
  User,
  Building2,
  BookOpen,
  FileText,
  Microscope,
  Leaf,
  AlertCircle,
  Sparkles,
  X,
  Clock,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { JobApplicationFormData } from "../types"
import {
  carreraOptions,
  cicloOptions,
  financiamientoOptions,
  validateDriveLink,
} from "../utils"
import {
  obtenerPuestosActivos,
  crearPostulante,
  obtenerAreasInteres,
  obtenerNombresTipoDocumento,
  obtenerNombresEstadoPostulacion,
  consultarEstadoPostulacion,
  parsePresentacionPostulante,
} from "@/lib/supabase/convocatorias"
import type { PuestoDatabase, AreaInteres, PostulanteDatabase } from "@/types/database"

export default function TrabajaConNosotrosClient() {
  const [puestosDB, setPuestosDB] = useState<PuestoDatabase[]>([])
  const [loadingPuestos, setLoadingPuestos] = useState(true)
  const [areasDB, setAreasDB] = useState<AreaInteres[]>([])
  const [tiposDocumento, setTiposDocumento] = useState<string[]>([])
  const [estadosPostulacion, setEstadosPostulacion] = useState<string[]>([])
  const [selectedPuesto, setSelectedPuesto] = useState<PuestoDatabase | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  // Estado para consulta de postulación
  const [consultaDoc, setConsultaDoc] = useState("")
  const [consultaResultados, setConsultaResultados] = useState<PostulanteDatabase[] | null>(null)
  const [consultaLoading, setConsultaLoading] = useState(false)
  const [consultaError, setConsultaError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [puestos, areas, tipos, estados] = await Promise.all([
          obtenerPuestosActivos(),
          obtenerAreasInteres(),
          obtenerNombresTipoDocumento(),
          obtenerNombresEstadoPostulacion(),
        ])
        setPuestosDB(puestos)
        setAreasDB(areas)
        setTiposDocumento(tipos)
        setEstadosPostulacion(estados)
      } catch {
        // fallback silencioso
      } finally {
        setLoadingPuestos(false)
      }
    }
    fetchData()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<JobApplicationFormData>({
    defaultValues: {
      nombresApellidos: "",
      tipoDocumento: "",
      dni: "",
      universidadInstituto: "",
      ciclo: "",
      carrera: "",
      puestoActual: "",
      areasPreferidas: [],
      financiamientoTesis: "tal_vez",
      linkCurriculum: "",
      sobreUsted: "",
    },
  })

  const handleAreaChange = (areaValue: string, checked: boolean) => {
    const newAreas = checked
      ? [...selectedAreas, areaValue]
      : selectedAreas.filter((a) => a !== areaValue)
    setSelectedAreas(newAreas)
    setValue("areasPreferidas", newAreas)
  }

  const openPostulacionForm = (puesto: PuestoDatabase) => {
    setSelectedPuesto(puesto)
    setSubmitStatus("idle")
    reset()
    setSelectedAreas([])
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setSelectedPuesto(null)
    setSubmitStatus("idle")
    reset()
    setSelectedAreas([])
  }

  const handleConsultarEstado = async () => {
    if (!consultaDoc.trim()) return
    setConsultaLoading(true)
    setConsultaError(null)
    setConsultaResultados(null)
    try {
      const resultados = await consultarEstadoPostulacion(consultaDoc)
      setConsultaResultados(resultados)
    } catch {
      setConsultaError("Error al consultar. Verifica tu conexión e intenta nuevamente.")
    } finally {
      setConsultaLoading(false)
    }
  }

  const onSubmit = async (data: JobApplicationFormData) => {
    if (!selectedPuesto) return
    setSubmitStatus("loading")

    try {
      await crearPostulante({
        post_nom_vac: data.nombresApellidos,
        post_nrodoc_vac: data.dni,
        post_institucion_vac: data.universidadInstituto,
        post_ciclo_int: data.ciclo ? parseInt(data.ciclo) || null : null,
        post_carrera_vac: data.carrera,
        post_cv_vac: data.linkCurriculum || null,
        post_presentac_vac: data.sobreUsted || '',
        post_financiam_vac: data.financiamientoTesis,
        tip_doc_iden_nom_vac: data.tipoDocumento || null,
        estpost_nom_vac: estadosPostulacion[0] || null,
        areas_interes: selectedAreas,
        puest_id_int: selectedPuesto.puest_id_int,
        puest_nom_vac: selectedPuesto.puest_nom_vac || '',
      })

      setSubmitStatus("success")
    } catch {
      setSubmitStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-6xl relative z-10"
        >
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              <Sparkles className="w-3 h-3 mr-1" />
              Convocatoria Abierta 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Únete a Nuestro Equipo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Buscamos talento apasionado por la ciencia. Forma parte de un laboratorio
              líder en biotecnología vegetal y contribuye a proyectos de investigación
              que impactan la agricultura peruana.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Consultar Estado de Postulación */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border border-blue-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Consulta el estado de tu postulación
              </CardTitle>
              <CardDescription>
                Ingresa tu número de documento para ver el estado de tus postulaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={consultaDoc}
                  onChange={(e) => setConsultaDoc(e.target.value)}
                  placeholder="Ingresa tu número de documento"
                  onKeyDown={(e) => e.key === "Enter" && handleConsultarEstado()}
                />
                <Button
                  onClick={handleConsultarEstado}
                  disabled={consultaLoading || !consultaDoc.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                >
                  {consultaLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Consultar"
                  )}
                </Button>
              </div>

              {consultaError && (
                <Alert className="bg-red-50 border-red-300">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{consultaError}</AlertDescription>
                </Alert>
              )}

              {consultaResultados !== null && consultaResultados.length === 0 && (
                <Alert className="bg-gray-50 border-gray-300">
                  <AlertCircle className="h-4 w-4 text-gray-600" />
                  <AlertDescription className="text-gray-700">
                    No se encontraron postulaciones con ese número de documento.
                  </AlertDescription>
                </Alert>
              )}

              {consultaResultados && consultaResultados.length > 0 && (
                <div className="space-y-3">
                  {consultaResultados.map((post) => {
                    const parsed = parsePresentacionPostulante(post.post_presentac_vac)
                    const estadoNombre = post.Estado_Postulacion?.estpost_nom_vac || "Sin estado"
                    const isConcluido = estadoNombre.toUpperCase().includes("CONCLUIDO")
                    const isAceptado = estadoNombre.toUpperCase().includes("ACEPTADO/A")
                    const areas = post.Postulacion_Detalle_Area || []
                    return (
                      <Card key={post.post_id_int} className="border">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div>
                              <p className="font-semibold text-gray-900">{post.post_nom_vac}</p>
                              {parsed.puesto_nombre && (
                                <p className="text-sm text-gray-500">
                                  Puesto: <span className="font-medium text-green-700">{parsed.puesto_nombre}</span>
                                </p>
                              )}
                            </div>
                            <Badge
                              className={
                                estadoNombre.includes("ACEPT") ? "bg-green-100 text-green-800 border-green-300" :
                                estadoNombre.includes("RECHA") ? "bg-red-100 text-red-800 border-red-300" :
                                estadoNombre.includes("PENDIEN") ? "bg-yellow-100 text-yellow-800 border-yellow-300" :
                                "bg-blue-100 text-blue-800 border-blue-300"
                              }
                            >
                              {estadoNombre}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <p><span className="font-medium">Documento:</span> {post.Tipo_Documento_Identidad?.tip_doc_iden_nom_vac || '—'} {post.post_nrodoc_vac}</p>
                            <p><span className="font-medium">Carrera:</span> {post.post_carrera_vac || '—'}</p>
                            <p><span className="font-medium">Institución:</span> {post.post_institucion_vac || '—'}</p>
                            <p><span className="font-medium">Fecha:</span> {post.post_created_at_dt ? new Date(post.post_created_at_dt).toLocaleDateString('es-PE') : '—'}</p>
                          </div>
                          {areas.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-gray-500 mb-1">Áreas de interés:</p>
                              <div className="flex flex-wrap gap-1">
                                {areas.map((a) => (
                                  <Badge key={a.area_id_int} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-300">
                                    {a.Area_Interes?.area_nom_vac || '—'}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {isConcluido && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                              Gracias por dedicar tiempo a postular y compartir tu perfil con nosotros. En esta etapa no continuaremos con tu proceso, pero valoramos tu interes y el esfuerzo puesto en tu candidatura. Te animamos a seguir atento a nuevas convocatorias y futuras oportunidades.
                            </div>
                          )}
                          {isAceptado && (
                            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
                              ¡Felicidades! Has sido aceptado para el puesto. Nuestro equipo se pondrá en contacto contigo. Agradecemos tu interés en formar parte de nuestro laboratorio y esperamos contar contigo pronto.
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Puestos desde Base de Datos */}
      {!loadingPuestos && puestosDB.length > 0 && (
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl space-y-6">
            {puestosDB.map((puesto, index) => (
              <motion.div
                key={puesto.puest_id_int}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-2 border-green-200 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{puesto.puest_nom_vac}</CardTitle>
                        {(puesto.modalidad_trabajo?.modalid_nom_vac || puesto.puest_salario_vac || puesto.puest_lugar_vac) && (
                          <CardDescription className="text-white">
                            {puesto.modalidad_trabajo?.modalid_nom_vac || 'Modalidad no especificada'}
                            {puesto.puest_salario_vac && (
                              <> · {puesto.puest_salario_vac}</>
                            )}
                            {puesto.puest_lugar_vac && (
                              <> · {puesto.puest_lugar_vac}</>
                            )}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {puesto.puest_dec_vac && (
                      <p className="text-gray-600 mb-6">{puesto.puest_dec_vac}</p>
                    )}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {puesto.puest_perfil_vac && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-700 font-semibold">
                            <GraduationCap className="w-5 h-5 text-green-600" />
                            <span>Perfil Requerido</span>
                          </div>
                          <ul className="space-y-2">
                            {puesto.puest_perfil_vac.split('\n').filter(Boolean).map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {item.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {puesto.puest_ofrece_vac && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Microscope className="w-5 h-5 text-purple-600" />
                            <span>Qué Ofrecemos</span>
                          </div>
                          <ul className="space-y-2">
                            {puesto.puest_ofrece_vac.split('\n').filter(Boolean).map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                {item.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {puesto.puest_benef_vac && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Leaf className="w-5 h-5 text-emerald-600" />
                            <span>Beneficios</span>
                          </div>
                          <ul className="space-y-2">
                            {puesto.puest_benef_vac.split('\n').filter(Boolean).map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {item.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {/* Botón Postular o mensaje de evaluación */}
                    <div className="mt-6 pt-4 border-t">
                      {puesto.Estado_Puesto?.estpuest_nom_vac === 'EN CONVOCATORIA' ? (
                        <Button
                          onClick={() => openPostulacionForm(puesto)}
                          size="lg"
                          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          Postular
                        </Button>
                      ) : (
                        <div className="flex items-center justify-center gap-3 py-3 px-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          <p className="text-amber-800 font-medium text-center">
                            Esta convocatoria se encuentra en proceso de evaluación y ya no acepta nuevas postulaciones.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State - No active convocatorias */}
      {!loadingPuestos && puestosDB.length === 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border border-gray-200 shadow-sm text-center p-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Briefcase className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    No hay convocatorias activas por el momento
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Actualmente no contamos con vacantes disponibles. Te invitamos a seguirnos
                    en nuestras redes sociales para enterarte de futuras oportunidades.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {loadingPuestos && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
          </div>
        </section>
      )}

      {/* Dialog de Postulación por Puesto */}
      <Dialog open={isFormOpen} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {submitStatus === "success" ? (
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Postulación Enviada!
              </h2>
              <p className="text-gray-600 mb-6">
                Hemos recibido tu postulación para <strong>{selectedPuesto?.puest_nom_vac}</strong>. 
                Nuestro equipo revisará tu perfil y te contactaremos pronto.
              </p>
              <Button onClick={closeForm} className="bg-green-600 hover:bg-green-700 text-white">
                Cerrar
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Postular a: {selectedPuesto?.puest_nom_vac}
                </DialogTitle>
                <DialogDescription>
                  Completa todos los campos para enviar tu postulación
                </DialogDescription>
              </DialogHeader>

              <AnimatePresence>
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Alert className="bg-red-50 border-red-300">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <AlertTitle className="text-red-800">Error al enviar postulación</AlertTitle>
                      <AlertDescription className="text-red-700">
                        Hubo un problema al procesar tu postulación. Verifica tu conexión e intenta nuevamente.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Datos Personales */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <User className="w-5 h-5 text-green-600" />
                    Datos Personales
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombresApellidos">
                        Nombres y Apellidos <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="nombresApellidos"
                        placeholder="Juan Pérez García"
                        {...register("nombresApellidos", {
                          required: "Este campo es obligatorio",
                          minLength: { value: 5, message: "Ingresa tu nombre completo" },
                        })}
                        className={errors.nombresApellidos ? "border-red-500" : ""}
                      />
                      {errors.nombresApellidos && (
                        <p className="text-sm text-red-500">{errors.nombresApellidos.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipoDocumento">
                        Tipo de Documento <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("tipoDocumento", value)}
                      >
                        <SelectTrigger className={errors.tipoDocumento ? "border-red-500" : ""}>
                          <SelectValue placeholder="Selecciona tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposDocumento.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("tipoDocumento", { required: "Selecciona el tipo de documento" })} />
                      {errors.tipoDocumento && (
                        <p className="text-sm text-red-500">{errors.tipoDocumento.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dni">
                        N° de Documento <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="dni"
                        placeholder="Número de documento"
                        {...register("dni", {
                          required: "El número de documento es obligatorio",
                        })}
                        className={errors.dni ? "border-red-500" : ""}
                      />
                      {errors.dni && (
                        <p className="text-sm text-red-500">{errors.dni.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Información Académica */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Información Académica
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="universidadInstituto">
                        Universidad o Instituto <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="universidadInstituto"
                        placeholder="Universidad Nacional de Trujillo"
                        {...register("universidadInstituto", {
                          required: "Este campo es obligatorio",
                        })}
                        className={errors.universidadInstituto ? "border-red-500" : ""}
                      />
                      {errors.universidadInstituto && (
                        <p className="text-sm text-red-500">{errors.universidadInstituto.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ciclo">
                        Ciclo Actual <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue("ciclo", value)}>
                        <SelectTrigger className={errors.ciclo ? "border-red-500" : ""}>
                          <SelectValue placeholder="Selecciona tu ciclo" />
                        </SelectTrigger>
                        <SelectContent>
                          {cicloOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("ciclo", { required: "Selecciona tu ciclo" })} />
                      {errors.ciclo && (
                        <p className="text-sm text-red-500">{errors.ciclo.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="carrera">
                        Carrera <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue("carrera", value)}>
                        <SelectTrigger className={errors.carrera ? "border-red-500" : ""}>
                          <SelectValue placeholder="Selecciona tu carrera" />
                        </SelectTrigger>
                        <SelectContent>
                          {carreraOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("carrera", { required: "Selecciona tu carrera" })} />
                      {errors.carrera && (
                        <p className="text-sm text-red-500">{errors.carrera.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="puestoActual">Puesto en Centro de Estudios</Label>
                      <Input
                        id="puestoActual"
                        placeholder="Ej: Delegado, Asistente de laboratorio..."
                        {...register("puestoActual")}
                      />
                      <p className="text-xs text-gray-500">Opcional</p>
                    </div>
                  </div>
                </div>

                {/* Preferencias */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Preferencias
                  </h3>
                  <div className="space-y-3">
                    <Label>Áreas de Interés <span className="text-red-500">*</span></Label>
                    <p className="text-sm text-gray-500 mb-2">
                      Selecciona una o más áreas en las que te gustaría trabajar
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {areasDB.map((area) => (
                        <div
                          key={area.area_id_int}
                          className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                        >
                          <Checkbox
                            id={area.area_id_int}
                            checked={selectedAreas.includes(area.area_id_int)}
                            onCheckedChange={(checked) =>
                              handleAreaChange(area.area_id_int, checked as boolean)
                            }
                          />
                          <Label htmlFor={area.area_id_int} className="text-sm font-normal cursor-pointer flex-1">
                            {area.area_nom_vac}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {selectedAreas.length === 0 && (
                      <p className="text-xs text-amber-600">Selecciona al menos un área de interés</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label>
                      ¿Te interesa el financiamiento para tu tesis? <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      defaultValue="tal_vez"
                      onValueChange={(value) =>
                        setValue("financiamientoTesis", value as "si" | "no" | "tal_vez")
                      }
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      {financiamientoOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`fin-${option.value}`} />
                          <Label htmlFor={`fin-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                {/* Documentos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    Documentos
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="linkCurriculum">Link de Google Drive con tu CV</Label>
                    <Input
                      id="linkCurriculum"
                      type="url"
                      placeholder="https://drive.google.com/..."
                      {...register("linkCurriculum", {
                        validate: (value) =>
                          validateDriveLink(value) || "Ingresa un enlace válido de Google Drive",
                      })}
                      className={errors.linkCurriculum ? "border-red-500" : ""}
                    />
                    {errors.linkCurriculum && (
                      <p className="text-sm text-red-500">{errors.linkCurriculum.message}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Asegúrate de que el enlace sea público o con acceso para cualquier persona con el link
                    </p>
                  </div>
                </div>

                {/* Información Adicional */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                    Cuéntanos más
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="sobreUsted">
                      Cuéntanos sobre ti o detalles que podrían ser útiles
                    </Label>
                    <Textarea
                      id="sobreUsted"
                      placeholder="Cuéntanos sobre tu experiencia, motivaciones, disponibilidad horaria..."
                      rows={3}
                      {...register("sobreUsted")}
                    />
                    <p className="text-xs text-gray-500">Opcional</p>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold"
                    disabled={isSubmitting || submitStatus === "loading" || selectedAreas.length === 0}
                  >
                    {submitStatus === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando postulación...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Postulación
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Tu información será revisada por nuestro equipo de Recursos Humanos.
                  </p>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
