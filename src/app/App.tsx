import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useAppSelector } from "../features/common/hooks/useAppSelector"
import { selectThemeMode } from "../features/app-reducer"
import { getTheme } from "../features/common/theme/theme"
import { Header } from "../features/common/components/header/Header"
import { Main } from "../features/common/components/main/Main"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
