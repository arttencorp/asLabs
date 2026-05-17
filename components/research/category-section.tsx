"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, User, TrendingUp, CheckCircle, Clock, Award } from "lucide-react"
import Link from "next/link"

interface Project {
  name: string
  id: string
  progress: number
  location: string
  status: string
  subtitle?: string
  researcher?: string
  completedDate?: string
  plantsProduced?: string
}

interface Subsection {
  title: string
  projects: Project[]
}

interface CategorySectionProps {
  title: string
  subsections: Subsection[]
  color: "blue" | "green" | "purple" | "orange"
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  data?: Subsection[]
  bgColor?: string
  textColor?: string
  isCompleted?: boolean
}

const colorClasses = {
  blue: {
    bg: "from-blue-900/30 to-blue-900/10",
    border: "border-blue-500/20",
    text: "text-white",
    label: "text-blue-300",
    accent: "text-blue-400",
    progress: "bg-blue-500",
    hoverBorder: "hover:border-blue-500/60",
  },
  green: {
    bg: "from-green-900/30 to-green-900/10",
    border: "border-green-500/20",
    text: "text-white",
    label: "text-green-300",
    accent: "text-green-400",
    progress: "bg-green-500",
    hoverBorder: "hover:border-green-500/60",
  },
  purple: {
    bg: "from-purple-900/30 to-purple-900/10",
    border: "border-purple-500/20",
    text: "text-white",
    label: "text-purple-300",
    accent: "text-purple-400",
    progress: "bg-purple-500",
    hoverBorder: "hover:border-purple-500/60",
  },
  orange: {
    bg: "from-orange-900/30 to-orange-900/10",
    border: "border-orange-500/20",
    text: "text-white",
    label: "text-orange-300",
    accent: "text-orange-400",
    progress: "bg-orange-500",
    hoverBorder: "hover:border-orange-500/60",
  },
}

export default function CategorySection({
  title,
  subsections,
  color,
  description,
  icon: Icon,
  isCompleted = false,
}: CategorySectionProps) {
  const colors = colorClasses[color]

  if (!subsections || subsections.length === 0) {
    return null
  }

  const getProjectLink = (project: Project) => {
    if (project.id === "SGF-015") return "/research/secuenciamiento-fusarium"
    if (project.id === "BB-001") return "/research/banano-baby"
    if (project.id === "CATFOM-001") return "/research/trichoderma-fusarium"
    if (project.id === "DPBSB-002") return "/research/bioreactores-bacterianos"
    if (project.name.includes("Fusarium")) return "/research/fusarium-genoma"
    return "#"
  }

  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border ${colors.border} backdrop-blur-sm ${colors.hoverBorder} transition-all`}>
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          {Icon && <Icon className={`w-7 h-7 ${colors.accent}`} />}
          <h3 className={`text-3xl font-bold ${colors.text}`}>{title}</h3>
        </div>
        {description && <p className={`${colors.label} opacity-90 mt-2`}>{description}</p>}
      </div>

      <div className="space-y-6">
        {subsections.map((subsection, subsectionIndex) => (
          <div key={subsectionIndex}>
            {subsection.title && <h4 className={`text-lg font-semibold ${colors.label} mb-4 uppercase tracking-wide text-sm`}>{subsection.title}</h4>}

            <div className="grid gap-4">
              {subsection.projects.map((project, projectIndex) => (
                <Card key={projectIndex} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className={`text-xs ${colors.label} border-slate-600`}>
                            {project.id}
                          </Badge>
                          {isCompleted && (
                            <Badge className={`${colors.progress} text-white text-xs`}>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completado
                            </Badge>
                          )}
                        </div>
                        <CardTitle className={`text-lg leading-tight ${colors.text}`}>
                          {getProjectLink(project) !== "#" ? (
                            <Link href={getProjectLink(project)} className={`${colors.accent} hover:brightness-110 transition-colors`}>
                              {project.name}
                            </Link>
                          ) : (
                            project.name
                          )}
                        </CardTitle>
                        {project.subtitle && <CardDescription className="mt-1 text-slate-400">{project.subtitle}</CardDescription>}
                      </div>

                      <div className="text-right ml-4">
                        {isCompleted ? (
                          <div className={`flex items-center space-x-1 ${colors.accent}`}>
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-semibold">100%</span>
                          </div>
                        ) : (
                          <div className={`flex items-center space-x-1 ${colors.accent}`}>
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {Math.round(project.progress * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <Progress value={project.progress * 100} className="h-2" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-400">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <span>{project.location}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-slate-500" />
                          <span>{project.status}</span>
                        </div>

                        {project.researcher && (
                          <div className="flex items-center space-x-2 md:col-span-2">
                            <User className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-300">{project.researcher}</span>
                          </div>
                        )}

                        {project.completedDate && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span>Completado: {project.completedDate}</span>
                          </div>
                        )}

                        {project.plantsProduced && (
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-slate-500" />
                            <span>Plantas: {project.plantsProduced}</span>
                          </div>
                        )}
                      </div>

                      {getProjectLink(project) !== "#" && (
                        <div className="pt-2">
                          <Link
                            href={getProjectLink(project)}
                            className={`inline-flex items-center text-sm ${colors.accent} hover:brightness-110 transition-all`}
                          >
                            Ver detalles del proyecto
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
