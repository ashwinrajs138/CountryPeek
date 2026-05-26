import { useContext } from 'react'
import ThemeContext from '../context/ThemeContextValue'

export default function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
