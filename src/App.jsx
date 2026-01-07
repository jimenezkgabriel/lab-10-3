import { Container, Typography, Box } from '@mui/material'
import { TodoProvider } from './context/TodoContext'
import { FilterProvider } from './context/FilterContext'
import { ThemeProvider } from './context/ThemeContext'
import TodoInput from './components/TodoInput'
import FilterButtons from './components/FilterButtons'
import TodoList from './components/TodoList'
import ThemeToggleButton from './components/ThemeToggleButton'

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <FilterProvider>
          <Container
            maxWidth="sm"
            sx={{ pt: 6, minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4" component="h1">
                Todo App
              </Typography>

              <ThemeToggleButton />
            </Box>

            <TodoInput />
            <FilterButtons />
            <TodoList />
          </Container>
        </FilterProvider>
      </TodoProvider>
    </ThemeProvider>
  )
}

export default App
