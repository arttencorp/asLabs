"use client"

import { useEffect } from "react"

interface FilesFmPlayerProps {
  hash: string
  autoplay?: "on" | "off"
  autoload?: "on" | "off"
  width?: string
  height?: string
  posterSrc?: string
  className?: string
}

export default function FilesFmPlayer({
  hash,
  autoplay = "off",
  autoload = "off",
  width = "100%",
  height = "auto",
  posterSrc,
  className = "",
}: FilesFmPlayerProps) {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.id = `filesfm_embed_js__${hash}`

    // Build the src URL with parameters
    const params = new URLSearchParams({
      hash,
      autoplay,
      autoload,
      w: width,
      h: height,
    })

    if (posterSrc) {
      params.append("poster_src", posterSrc)
    }

    script.src = `https://files.fm/embed/playerv2?${params.toString()}`

    // Append script to document head
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      const existingScript = document.getElementById(`filesfm_embed_js__${hash}`)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [hash, autoplay, autoload, width, height, posterSrc])

  return (
    <div
      id={`filesfm_embed_container_${hash}`}
      className={`files-fm-player ${className}`}
      style={{ width, height: height === "auto" ? "100%" : height }}
    />
  )
}
