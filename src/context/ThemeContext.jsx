import React, { createContext, useContext, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('cn-theme')
    return stored ? stored === 'dark' : true
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
    localStorage.setItem('cn-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggle = () => {
    if (!document.startViewTransition) {
      setIsDark(p => !p)
      return
    }
    document.startViewTransition(() => {
      flushSync(() => setIsDark(p => !p))
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
