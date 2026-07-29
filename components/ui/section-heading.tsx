import type { ReactNode } from "react"

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  light?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center"
  return (
    <div className={`${isCenter ? "text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${
            light ? "text-white/80" : "text-[#2e7d32]"
          }`}
        >
          <span className={`h-px w-6 ${light ? "bg-white/50" : "bg-[#2e7d32]/50"}`} />
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight ${
          light ? "text-white" : "text-[#01283c]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"
          } ${light ? "text-white/80" : "text-gray-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
