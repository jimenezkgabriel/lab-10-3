import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssBaseline, useMediaQuery } from '@mui/material'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  const [mode, setMode] = useState(() => {
    try {
      const raw = localStorage.getItem('theme_mode')
      if (raw === 'light' || raw === 'dark') return raw
    } catch (err) {
      // ignore
    }
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme_mode', mode)
    } catch (err) {
      // ignore
    }
  }, [mode])

  const toggleTheme = () => setMode((m) => (m === 'light' ? 'dark' : 'light'))

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                // ensure Paper follows the theme
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeMode must be used within a ThemeProvider')
  return ctx
}
