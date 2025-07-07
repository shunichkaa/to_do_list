import "./App.css"
import { Main } from "@/app/Main"
import { Header } from "@/common/components/Header/Header"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"

const theme = createTheme()

export const App = () => {
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
