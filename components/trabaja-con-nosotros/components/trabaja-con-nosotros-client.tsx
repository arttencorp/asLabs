"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  GraduationCap,
  Clock,
  DollarSign,
  CheckCircle2,
  Send,
  Loader2,
  User,
  Building2,
  BookOpen,
  FileText,
  Microscope,
  Leaf,
  FlaskConical,
  AlertCircle,
  Sparkles,
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

import { JobApplicationFormData, FormSubmitStatus } from "../types"
import {
  currentJobPosition,
  carreraOptions,
  cicloOptions,
  areasOptions,
  financiamientoOptions,
  validateDNI,
  validateDriveLink,
} from "../utils"

export default function TrabajaConNosotrosClient() {
  const [submitStatus, setSubmitStatus] = useState<FormSubmitStatus>("idle")
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<JobApplicationFormData>({
    defaultValues: {
      nombresApellidos: "",
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

  const onSubmit = async (data: JobApplicationFormData) => {
    setSubmitStatus("loading")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: "b069c010-5e77-441c-8f1c-f36d3029d45a",
          subject: "Nueva Postulación - Prácticas",
          nombre: data.nombresApellidos,
          dni: data.dni,
          universidad: data.universidadInstituto,
          ciclo: data.ciclo,
          carrera: data.carrera,
          puesto: data.puestoActual,
          areas: selectedAreas.join(", "),
          financiamiento: data.financiamientoTesis,
          cv_link: data.linkCurriculum,
          info_adicional: data.sobreUsted,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        window.scrollTo({ top: 0, behavior: "smooth" })
        setTimeout(() => {
          reset()
          setSelectedAreas([])
          setSubmitStatus("idle")
        }, 8000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    }
  }

  // Si se envió exitosamente, mostrar solo el mensaje de éxito
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full"
        >
          <Card className="shadow-2xl border-green-200">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Postulación Enviada! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Hemos recibido tu postulación correctamente. Nuestro equipo revisará 
                tu perfil y te contactaremos pronto.
              </p>
              <p className="text-sm text-green-600 mb-6">
                Recibirás noticias nuestras en los próximos días. ¡Gracias por tu interés en AS Laboratorios!
              </p>
              <Button
                onClick={() => {
                  reset()
                  setSelectedAreas([])
                  setSubmitStatus("idle")
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Enviar otra postulación
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
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

      {/* Job Position Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-green-200 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{currentJobPosition.title}</CardTitle>
                    <CardDescription className="text-green-100">
                      Prácticas Pre-Profesionales
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Perfiles */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                      <GraduationCap className="w-5 h-5 text-green-600" />
                      <span>Perfiles</span>
                    </div>
                    <ul className="space-y-2">
                      {currentJobPosition.profiles.map((profile, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {profile}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Modalidad y Salario */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>Modalidad</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-600 text-white hover:bg-green-700">Part Time</Badge>
                        Técnicos en Laboratorio
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-600 text-white hover:bg-green-700">Full Time</Badge>
                        Microbiólogos / Biólogos
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">{currentJobPosition.salary}</span>
                    </div>
                  </div>

                  {/* Áreas de trabajo */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                      <Microscope className="w-5 h-5 text-purple-600" />
                      <span>Áreas de Trabajo</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentJobPosition.areas.slice(0, 4).map((area, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Beneficios */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                      <Leaf className="w-5 h-5 text-emerald-600" />
                      <span>Beneficios</span>
                    </div>
                    <ul className="space-y-2">
                      {currentJobPosition.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Destacado: Financiamiento de Tesis */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-full">
                      <FlaskConical className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900">
                        ¡Posibilidad de Financiamiento de Tesis!
                      </h4>
                      <p className="text-sm text-amber-700">
                        Apoyamos tu desarrollo académico. Consulta por nuestros programas de
                        financiamiento para tu proyecto de investigación.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl text-gray-900">
                  Formulario de Postulación
                </CardTitle>
                <CardDescription>
                  Completa todos los campos para enviar tu postulación
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                {/* Error Message */}
                <AnimatePresence>
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="mb-6"
                    >
                      <Alert className="bg-red-50 border-red-300 shadow-lg">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <AlertTitle className="text-red-800 text-lg font-semibold">
                          Error al enviar postulación
                        </AlertTitle>
                        <AlertDescription className="text-red-700 mt-2">
                          <p className="mb-2">
                            Hubo un problema al procesar tu postulación. Por favor, verifica tu conexión 
                            a internet e intenta nuevamente.
                          </p>
                          <p className="text-sm text-red-600">
                            Si el problema persiste, contáctanos directamente por WhatsApp.
                          </p>
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Sección: Datos Personales */}
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
                            minLength: {
                              value: 5,
                              message: "Ingresa tu nombre completo",
                            },
                          })}
                          className={errors.nombresApellidos ? "border-red-500" : ""}
                        />
                        {errors.nombresApellidos && (
                          <p className="text-sm text-red-500">{errors.nombresApellidos.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dni">
                          DNI <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="dni"
                          placeholder="12345678"
                          maxLength={8}
                          {...register("dni", {
                            required: "El DNI es obligatorio",
                            validate: (value) =>
                              validateDNI(value) || "Ingresa un DNI válido (8 dígitos)",
                          })}
                          className={errors.dni ? "border-red-500" : ""}
                        />
                        {errors.dni && (
                          <p className="text-sm text-red-500">{errors.dni.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sección: Información Académica */}
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
                        <Select
                          onValueChange={(value) => setValue("ciclo", value)}
                        >
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
                        <input
                          type="hidden"
                          {...register("ciclo", { required: "Selecciona tu ciclo" })}
                        />
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
                        <Select
                          onValueChange={(value) => setValue("carrera", value)}
                        >
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
                        <input
                          type="hidden"
                          {...register("carrera", { required: "Selecciona tu carrera" })}
                        />
                        {errors.carrera && (
                          <p className="text-sm text-red-500">{errors.carrera.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="puestoActual">
                          Puesto en Centro de Estudios
                        </Label>
                        <Input
                          id="puestoActual"
                          placeholder="Ej: Delegado, Asistente de laboratorio..."
                          {...register("puestoActual")}
                        />
                        <p className="text-xs text-gray-500">Opcional</p>
                      </div>
                    </div>
                  </div>

                  {/* Sección: Preferencias */}
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
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {areasOptions.map((area) => (
                          <div
                            key={area.value}
                            className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                          >
                            <Checkbox
                              id={area.value}
                              checked={selectedAreas.includes(area.value)}
                              onCheckedChange={(checked) =>
                                handleAreaChange(area.value, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={area.value}
                              className="text-sm font-normal cursor-pointer flex-1"
                            >
                              {area.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {selectedAreas.length === 0 && (
                        <p className="text-xs text-amber-600">
                          Selecciona al menos un área de interés
                        </p>
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

                  {/* Sección: Documentos */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
                      <FileText className="w-5 h-5 text-amber-600" />
                      Documentos
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="linkCurriculum">
                        Link de Google Drive con tu CV
                      </Label>
                      <Input
                        id="linkCurriculum"
                        type="url"
                        placeholder="https://drive.google.com/..."
                        {...register("linkCurriculum", {
                          validate: (value) =>
                            validateDriveLink(value) ||
                            "Ingresa un enlace válido de Google Drive",
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

                  {/* Sección: Información Adicional */}
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
                        placeholder="Cuéntanos sobre tu experiencia, motivaciones, disponibilidad horaria, proyectos en los que has participado..."
                        rows={4}
                        {...register("sobreUsted")}
                      />
                      <p className="text-xs text-gray-500">
                        Este campo es opcional pero nos ayuda a conocerte mejor
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
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
                      Te contactaremos pronto.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Requisitos y Proceso de Selección
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Requisitos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentJobPosition.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Proceso de Selección
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      1
                    </span>
                    Envío de formulario de postulación
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      2
                    </span>
                    Revisión de CV y perfil
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      3
                    </span>
                    Entrevista virtual o presencial
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      4
                    </span>
                    Incorporación y capacitación
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
