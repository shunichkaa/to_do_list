import {configureStore} from '@reduxjs/toolkit';
import {todolistsReducer} from './todolists/todolistsSlice';
import {appReducer} from './app-reducer';
import { tasksReducer } from './tasks/tasksSlice';

export const store = configureStore({
    reducer: {
        todolists: todolistsReducer,
        tasks: tasksReducer,
        app: appReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;