import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(() => undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set initial value inside the effect carefully
    const updateMobileStatus = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    mql.addEventListener("change", updateMobileStatus)
    updateMobileStatus()
    
    return () => mql.removeEventListener("change", updateMobileStatus)
  }, [])

  return !!isMobile
}
