import React, { useState } from 'react'
import {
    ListItem,
    ListItemText,
    Checkbox,
    IconButton,
    TextField,
    Box,
    ListItemSecondaryAction,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { useTodos } from '../context/TodoContext'

export default function TodoItem({ todo }) {
    const { toggleTodo, deleteTodo, editTodo } = useTodos()
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)

    const handleSave = () => {
        const trimmed = editText.trim()
        if (!trimmed) return
        editTodo(todo.id, trimmed)
        setIsEditing(false)
    }

    return (
        <ListItem divider secondaryAction={
            isEditing ? (
                <>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton edge="end" aria-label="save" onClick={handleSave}>
                            <SaveIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="cancel" onClick={() => setIsEditing(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </>
            )
        }>
            <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />

            {isEditing ? (
                <Box sx={{ flex: 1 }}>
                    <TextField value={editText} onChange={(e) => setEditText(e.target.value)} size="small" />
                </Box>
            ) : (
                <ListItemText sx={{ wordBreak: 'break-word' }} primary={todo.text} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
            )}
        </ListItem>
    )
}
