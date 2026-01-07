import React from 'react'
import { ButtonGroup, Button, Box } from '@mui/material'
import { useFilter } from '../context/FilterContext'

export default function FilterButtons() {
  const { filter, setFilter } = useFilter()

  const buttons = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]

  return (
    <Box sx={{ mb: 2 }}>
      <ButtonGroup variant="outlined" aria-label="filter todos">
        {buttons.map((b) => (
          <Button key={b.key} variant={filter === b.key ? 'contained' : 'outlined'} onClick={() => setFilter(b.key)}>
            {b.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}
