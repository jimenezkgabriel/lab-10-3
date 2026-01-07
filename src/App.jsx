import { CssBaseline, Container, Typography } from '@mui/material'
import { TodoProvider } from './context/TodoContext'
import { FilterProvider } from './context/FilterContext'
import TodoInput from './components/TodoInput'
import FilterButtons from './components/FilterButtons'
import TodoList from './components/TodoList'

function App() {
  return (
    <TodoProvider>
      <FilterProvider>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ pt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Todo App
          </Typography>

          <TodoInput />
          <FilterButtons />
          <TodoList />
        </Container>
      </FilterProvider>
    </TodoProvider>
  )
}

export default App
