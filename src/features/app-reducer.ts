import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeMode} from '../types';
import { RootState } from '../features/store';

interface AppState {
    themeMode: ThemeMode;
}

const initialState: AppState = {
    themeMode: 'light'
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeThemeModeAC(state, action: PayloadAction<{ themeMode: ThemeMode }>) {
            state.themeMode = action.payload.themeMode;
        }
    }
});

export const {changeThemeModeAC} = appSlice.actions;
export const appReducer = appSlice.reducer;

// Selector
export const selectThemeMode = (state: RootState) => state.app.themeMode;