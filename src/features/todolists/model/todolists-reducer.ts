import {createAction, createReducer, nanoid} from '@reduxjs/toolkit'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {todolistsApi, Todolist as ApiTodolist} from '../api/todolistsApi.types'
import {BaseResponse} from '@/common/types/types'

export type FilterValues = 'all' | 'active' | 'completed'
export type Todolist = ApiTodolist & { filter: FilterValues }

// Thunks
export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async () => {
    const res = await todolistsApi.getTodolists()
    return res.data.map((tl) => ({ ...tl, filter: 'all' as FilterValues }))
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string) => {
    await todolistsApi.deleteTodolist({id: todolistId})
    return {id: todolistId}
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (title: string) => {
    const res = await todolistsApi.createTodolist({title})
    return { ...res.data.data.item, filter: 'all' as FilterValues }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (payload: {id: string, title: string}) => {
    await todolistsApi.changeTodolistTitle(payload)
    return payload
})

// Actions
export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
  return {payload: {title, id: nanoid(), addedDate: '', order: 0, filter: 'all' as FilterValues}}
})
export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{id: string, filter: FilterValues}>('todolists/changeTodolistFilter')

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, builder => {
  builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state.unshift(action.payload)
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(changeTodolistFilterAC, (state, action) => {
        const todolist = state.find(todolist => todolist.id === action.payload.id)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      })
})
