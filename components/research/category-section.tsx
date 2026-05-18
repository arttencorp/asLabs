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
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-gray-900",
    label: "text-blue-700",
    accent: "text-blue-600",
    progress: "bg-blue-500",
    hoverBorder: "hover:border-blue-400",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-gray-900",
    label: "text-green-700",
    accent: "text-green-600",
    progress: "bg-green-500",
    hoverBorder: "hover:border-green-400",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-gray-900",
    label: "text-purple-700",
    accent: "text-purple-600",
    progress: "bg-purple-500",
    hoverBorder: "hover:border-purple-400",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-gray-900",
    label: "text-orange-700",
    accent: "text-orange-600",
    progress: "bg-orange-500",
    hoverBorder: "hover:border-orange-400",
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
    <div className={`${colors.bg} rounded-lg p-6 ${colors.border} border`}>
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          {Icon && <Icon className={`w-6 h-6 ${colors.accent}`} />}
          <h3 className={`text-2xl font-bold ${colors.text}`}>{title}</h3>
        </div>
        {description && <p className={`${colors.label} opacity-80`}>{description}</p>}
      </div>

      <div className="space-y-6">
        {subsections.map((subsection, subsectionIndex) => (
          <div key={subsectionIndex}>
            {subsection.title && <h4 className={`text-lg font-semibold ${colors.label} mb-4`}>{subsection.title}</h4>}

            <div className="grid gap-4">
              {subsection.projects.map((project, projectIndex) => (
                <Card key={projectIndex} className="hover:shadow-md transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {project.id}
                          </Badge>
                          {isCompleted && (
                            <Badge className="bg-green-500 text-white text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completado
                            </Badge>
                          )}
                        </div>
                        <CardTitle className={`text-lg leading-tight ${colors.text}`}>
                          {getProjectLink(project) !== "#" ? (
                            <Link href={getProjectLink(project)} className={`${colors.accent} hover:underline transition-colors`}>
                              {project.name}
                            </Link>
                          ) : (
                            project.name
                          )}
                        </CardTitle>
                        {project.subtitle && <CardDescription className="mt-1 text-gray-600">{project.subtitle}</CardDescription>}
                      </div>

                      <div className="text-right ml-4">
                        {isCompleted ? (
                          <div className="flex items-center space-x-1 text-green-600">
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-semibold">100%</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <Clock className={`w-4 h-4 ${colors.accent}`} />
                            <span className={`text-sm font-semibold ${colors.accent}`}>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>{project.status}</span>
                        </div>

                        {project.researcher && (
                          <div className="flex items-center space-x-2 md:col-span-2">
                            <User className="w-4 h-4" />
                            <span className="text-gray-700">{project.researcher}</span>
                          </div>
                        )}

                        {project.completedDate && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Completado: {project.completedDate}</span>
                          </div>
                        )}

                        {project.plantsProduced && (
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4" />
                            <span>Plantas: {project.plantsProduced}</span>
                          </div>
                        )}
                      </div>

                      {getProjectLink(project) !== "#" && (
                        <div className="pt-2">
                          <Link
                            href={getProjectLink(project)}
                            className={`inline-flex items-center text-sm ${colors.accent} hover:underline`}
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
