import { createContext, useContext, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    setTheme((previousTheme) => {
      const nextTheme = previousTheme === 'light' ? 'dark' : 'light'

      if (nextTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark')
      } else {
        document.body.removeAttribute('data-theme')
      }

      return nextTheme
    })
  }

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
