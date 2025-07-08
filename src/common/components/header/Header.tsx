import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { changeThemeModeAC, selectThemeMode } from "@/features/app-reducer"
import {selectAppError, selectAppStatus} from "@/app/app-selectors"
import {containerSx} from "@/common/styles"
import {NavButton} from "@/common/components/button/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import {Alert, LinearProgress} from "@mui/material"

export const Header = () => {
  const status = useAppSelector(selectAppStatus)
  const error = useAppSelector(selectAppError)
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" })
    )
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} checked={themeMode === "dark"} />
          </div>
        </Container>
      </Toolbar>
      <div>
        {status === "loading" && <LinearProgress />}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </div>
    </AppBar>
  )
}
