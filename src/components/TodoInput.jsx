import React, { useState } from 'react'
import { Box, TextField, Button, Paper } from '@mui/material'
import { useTodos } from '../context/TodoContext'

export default function TodoInput() {
  const [text, setText] = useState('')
  const { addTodo } = useTodos()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    addTodo(trimmed)
    setText('')
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Add a new todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="small"
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </Paper>
  )
}
