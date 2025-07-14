import { RootState } from './store'
import { ThemeMode } from '../types'

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode