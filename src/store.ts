import { configureStore } from '@reduxjs/toolkit'
import { appSlice, appReducer } from './app-slice'
import { todolistsSlice, todolistsReducer } from './todolists-slice'
import { tasksSlice, tasksReducer } from './tasks-slice'

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState> 