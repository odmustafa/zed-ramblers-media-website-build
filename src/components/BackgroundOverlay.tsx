'use client'

import { useTheme } from '@/components/ThemeProvider'
import { useEffect, useState } from 'react'

export function BackgroundOverlay() {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const updateTheme = () => {
      if (theme === 'dark') {
        setIsDark(true)
      } else if (theme === 'light') {
        setIsDark(false)
      } else if (theme === 'system') {
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(systemIsDark)
      }
    }

    updateTheme()

    // Listen for system theme changes when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => updateTheme()
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  return (
    <div
      className={`fixed inset-0 -z-10 transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-10'
        }`}
      style={{
        backgroundImage: `url('/textures/${isDark ? 'black-grunge.webp' : 'white-cracks.webp'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    />
  )
}
