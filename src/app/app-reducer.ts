import { createAction, createReducer } from "@reduxjs/toolkit"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type AppStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

const initialState: AppStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
}

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAppStatusAC, (state, action) => {
      state.status = action.payload.status
    })
    .addCase(setAppErrorAC, (state, action) => {
      state.error = action.payload.error
    })
    .addCase(setAppInitializedAC, (state, action) => {
      state.isInitialized = action.payload.isInitialized
    })
})

export const setAppStatusAC = createAction<{ status: RequestStatusType }>("app/setAppStatus")
export const setAppErrorAC = createAction<{ error: string | null }>("app/setAppError")
export const setAppInitializedAC = createAction<{ isInitialized: boolean }>("app/setAppInitialized")
