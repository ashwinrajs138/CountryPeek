import { useMemo, useState } from 'react'
import ThemeContext from './themeContext'

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
