import type { RootState } from "../features/store"

export const selectAppStatus = (state: RootState) => state.app.status
export const selectAppError = (state: RootState) => state.app.error
export const selectAppIsInitialized = (state: RootState) => state.app.isInitialized
