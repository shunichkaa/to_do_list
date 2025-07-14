// Тип Todolist из API (здесь определён локально для примера)
export type ApiTodolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

import { createSlice, nanoid } from '@reduxjs/toolkit'

export type FilterValues = 'all' | 'active' | 'completed'
export type DomainTodolist = ApiTodolist & { filter: FilterValues }

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: create => ({
    setTodolistsAC: create.reducer<{ todolists: ApiTodolist[] }>((state, action) => {
      return action.payload.todolists.map(tl => ({ ...tl, filter: 'all' }))
    }),
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>(
      (state, action) => {
        const todolist = state.find(todolist => todolist.id === action.payload.id)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }
    ),
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, id: nanoid(), addedDate: '', order: 0 } }),
      (state, action) => {
        state.push({ ...action.payload, filter: 'all' })
      }
    ),
  }),
})

export const {
  setTodolistsAC,
  deleteTodolistAC,
  createTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer 