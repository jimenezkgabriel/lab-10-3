import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { TodoProvider } from './context/TodoContext'
import { FilterProvider } from './context/FilterContext'

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <FilterProvider>{children}</FilterProvider>
      </TodoProvider>
    </ThemeProvider>
  )
}
