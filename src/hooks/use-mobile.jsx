import React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Function to check if window is mobile width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value
    checkIsMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}