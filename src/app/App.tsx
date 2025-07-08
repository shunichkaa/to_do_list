import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useAppSelector } from "../common 2/hooks/useAppSelector"
import { selectThemeMode } from "../features/app-reducer"
import { getTheme } from "../common 2/theme/theme"
import { Header } from "../common 2/components/header/Header"
import { Main } from "../common 2/components/main/Main"

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
