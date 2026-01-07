import React from 'react'
import { List, Typography, Box, Button, Paper } from '@mui/material'
import { useTodos } from '../context/TodoContext'
import { useFilter } from '../context/FilterContext'
import TodoItem from './TodoItem'

export default function TodoList() {
  const { todos, clearCompleted } = useTodos()
  const { filter } = useFilter()

  const completedCount = todos.filter((t) => t.completed).length

  const visibleTodos = todos.filter((t) => {
    if (filter === 'all') return true
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <Box>
      <Paper sx={{ p: 2 }} elevation={2}>
        {visibleTodos.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No todos match the selected filter
          </Typography>
        ) : (
          <List>
            {visibleTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </List>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {todos.length} total • {completedCount} completed
          </Typography>

          <Button size="small" color="secondary" onClick={clearCompleted} disabled={completedCount === 0}>
            Clear completed
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
