import {configureStore} from "@reduxjs/toolkit"
import {appReducer, appSlice} from '../app-slice'
import {todolistsReducer, todolistsSlice} from '../todolists-slice'
import {tasksReducer, tasksSlice} from '../tasks-slice'

export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        [todolistsSlice.name]: todolistsReducer,
        [tasksSlice.name]: tasksReducer,
    },
})

export type RootState = ReturnType<typeof store.getState> 