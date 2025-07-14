import {createSlice} from "@reduxjs/toolkit";
import {ThemeMode} from "@/types";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
    },
    // reducers состоит из подредьюсеров, эквивалентных одному оператору case в switch
    reducers: create => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            // логика в подредьюсерах мутабельная, а иммутабельность достигается благодаря immer.js
            state.themeMode = action.payload.themeMode
        }),
    }),
})

// action creator достается из appSlice.actions
export const { changeThemeModeAC } = appSlice.actions
// reducer достается из appSlice.reducer
export const appReducer = appSlice.reducer