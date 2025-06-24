import {configureStore} from '@reduxjs/toolkit';
import {todolistsReducer} from './todolists-reducer';
import {appReducer} from './app-reducer';

export const store = configureStore({
    reducer: {
        todolists: todolistsReducer,
        app: appReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;