"use client"

import { useEffect, useState } from "react"

interface ProgressBarProps {
  progress: number
  color?: "blue" | "orange" | "green"
}

export default function ProgressBar({ progress, color = "green" }: ProgressBarProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  const getColorClass = () => {
    if (progress === 1.0) return "bg-gradient-to-r from-green-400 to-green-600"
    if (progress >= 0.5) return "bg-gradient-to-r from-blue-400 to-blue-600"
    return "bg-gradient-to-r from-amber-400 to-amber-600"
  }

  const getPhaseText = () => {
    if (progress === 1.0) return "Completado"
    if (progress >= 0.66) return "Fase 3"
    if (progress >= 0.33) return "Fase 2"
    return "Fase 1"
  }

  const percentage = Math.round(progress * 100)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-700 transition-colors duration-300 hover:text-[#2e7d32]">
          {getPhaseText()}
        </span>
        <span className="text-xs font-medium text-gray-700 transition-colors duration-300 hover:text-[#2e7d32]">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className={`h-3 rounded-full ${getColorClass()} transition-all duration-1000 ease-out shadow-sm relative overflow-hidden`}
          style={{ width: `${animatedProgress * 100}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-40 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
