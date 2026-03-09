import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Usar false como valor inicial para evitar flash durante hidratación SSR
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Retornar false durante SSR para evitar mismatch de hidratación
  if (!hasMounted) return false
  return isMobile
}
