import { createSlice, nanoid } from '@reduxjs/toolkit'
import { createTodolistAC, deleteTodolistAC } from './todolists-slice'

export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type TasksState = Record<string, Task[]>

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: create => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      if (tasks) {
        const index = tasks.findIndex(task => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      }
    }),
    createTaskAC: create.preparedReducer(
      (todolistId: string, title: string) => ({ payload: { todolistId, title, id: nanoid() } }),
      (state, action) => {
        if (!state[action.payload.todolistId]) state[action.payload.todolistId] = []
        state[action.payload.todolistId].unshift({ id: action.payload.id, title: action.payload.title, isDone: false })
      }
    ),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      if (tasks) {
        const task = tasks.find(task => task.id === action.payload.taskId)
        if (task) {
          task.isDone = action.payload.isDone
        }
      }
    }),
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      if (tasks) {
        const task = tasks.find(task => task.id === action.payload.taskId)
        if (task) {
          task.title = action.payload.title
        }
      }
    }),
  }),
  extraReducers: builder => {
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer 