import React from "react";

interface TerminosCondicionesProps {
  terminosCondiciones?: string
  esLaboratorio: boolean
}

export function TerminosCondiciones({ 
  terminosCondiciones, 
  esLaboratorio 
}: TerminosCondicionesProps) {
  return (
    <div className={`mt-3 whitespace-pre-line text-xs ${esLaboratorio ? "bg-white p-3 border border-gray-200 rounded-md" : ""}`}>
      {terminosCondiciones || ""}
    </div>
  )
}