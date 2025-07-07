import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { todolistsApi, Todolist as ApiTodolist } from "../api/todolistsApi.types"
import { BaseResponse } from "@/common/types/types"
import { setAppErrorAC, setAppStatusAC } from "@/app/app-reducer"

export type FilterValues = "all" | "active" | "completed"
export type Todolist = ApiTodolist & { filter: FilterValues }

// Thunks
export const fetchTodolistsTC = createAsyncThunk("todolists/fetchTodolists", async (_, { dispatch }) => {
  try {
    dispatch(setAppStatusAC({ status: "loading" }))
    const res = await todolistsApi.getTodolists()
    dispatch(setAppStatusAC({ status: "succeeded" }))
    return res.data.map((tl) => ({ ...tl, filter: "all" as FilterValues }))
  } catch (error) {
    dispatch(setAppErrorAC({ error: error instanceof Error ? error.message : "Some error occurred" }))
    dispatch(setAppStatusAC({ status: "failed" }))
    throw error
  }
})

export const removeTodolistTC = createAsyncThunk(
  "todolists/removeTodolist",
  async (todolistId: string, { dispatch }) => {
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      await todolistsApi.deleteTodolist({ id: todolistId })
      dispatch(setAppStatusAC({ status: "succeeded" }))
      return { id: todolistId }
    } catch (error) {
      dispatch(setAppErrorAC({ error: error instanceof Error ? error.message : "Some error occurred" }))
      dispatch(setAppStatusAC({ status: "failed" }))
      throw error
    }
  },
)

export const addTodolistTC = createAsyncThunk("todolists/addTodolist", async (title: string, { dispatch }) => {
  try {
    dispatch(setAppStatusAC({ status: "loading" }))
    const res = await todolistsApi.createTodolist({ title })
    dispatch(setAppStatusAC({ status: "succeeded" }))
    return { ...res.data.data.item, filter: "all" as FilterValues }
  } catch (error) {
    dispatch(setAppErrorAC({ error: error instanceof Error ? error.message : "Some error occurred" }))
    dispatch(setAppStatusAC({ status: "failed" }))
    throw error
  }
})

export const changeTodolistTitleTC = createAsyncThunk(
  "todolists/changeTodolistTitle",
  async (payload: { id: string; title: string }, { dispatch }) => {
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      await todolistsApi.changeTodolistTitle(payload)
      dispatch(setAppStatusAC({ status: "succeeded" }))
      return payload
    } catch (error) {
      dispatch(setAppErrorAC({ error: error instanceof Error ? error.message : "Some error occurred" }))
      dispatch(setAppStatusAC({ status: "failed" }))
      throw error
    }
  },
)

// Actions
export const deleteTodolistAC = createAction<{ id: string }>("todolists/deleteTodolist")
export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
  return { payload: { title, id: nanoid(), addedDate: "", order: 0, filter: "all" as FilterValues } }
})
export const changeTodolistTitleAC = createAction<{ id: string; title: string }>("todolists/changeTodolistTitle")
export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValues }>(
  "todolists/changeTodolistFilter",
)

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload
    })
    .addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    })
    .addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift(action.payload)
    })
    .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    })
})
