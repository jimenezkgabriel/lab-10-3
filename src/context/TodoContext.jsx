import React, { createContext, useContext, useEffect, useReducer } from 'react'

const TodoContext = createContext(null)

const initialState = {
  todos: [],
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo = action.payload
      return { ...state, todos: [newTodo, ...state.todos] }
    }
    case 'TOGGLE_TODO': {
      const id = action.payload
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      }
    }
    case 'DELETE_TODO': {
      const id = action.payload
      return { ...state, todos: state.todos.filter((t) => t.id !== id) }
    }
    case 'EDIT_TODO': {
      const { id, newText } = action.payload
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === id ? { ...t, text: newText } : t)),
      }
    }
    case 'CLEAR_COMPLETED': {
      return { ...state, todos: state.todos.filter((t) => !t.completed) }
    }
    case 'SET_TODOS': {
      return { ...state, todos: action.payload }
    }
    default:
      return state
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(
    todoReducer,
    undefined,
    () => {
      try {
        const raw = localStorage.getItem('todos_v1')
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) return { todos: parsed }
        }
      } catch (err) {
        // ignore and fall through to default
      }

      return initialState
    },
  )

  // persist todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos_v1', JSON.stringify(state.todos))
  }, [state.todos])

  const addTodo = (text) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 9)
    const newTodo = { id, text, completed: false }
    dispatch({ type: 'ADD_TODO', payload: newTodo })
  }

  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id })
  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: id })
  const editTodo = (id, newText) => dispatch({ type: 'EDIT_TODO', payload: { id, newText } })
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' })

  return (
    <TodoContext.Provider value={{ todos: state.todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodos() {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodos must be used within a TodoProvider')
  return ctx
}
