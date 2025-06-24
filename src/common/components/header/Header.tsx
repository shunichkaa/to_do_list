import {useAppSelector} from "@/common/hooks/useAppSelector";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {changeThemeModeAC, selectThemeMode} from "@/model/app-reducer";
import {getTheme} from "@/common/theme/theme";
import {AppBar, Button, Container, IconButton, Switch, Toolbar} from "@mui/material";
import {containerSx} from "@/common/components/createItemForm/TodolistItem.styles";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <AppBar position="static" sx={{mb: 3}}>
            <Toolbar>
                <Container maxWidth="lg" sx={containerSx}>
                    <IconButton
                        color="inherit"
                        onClick={handleMenu}
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginLeft: 'auto'
                    }}>
                        <Button color="inherit">Sign in</Button>
                        <Button color="inherit">Sign up</Button>
                        <Button color="inherit">FAQ</Button>
                        <Switch
                            checked={themeMode === 'dark'}
                            onChange={handleThemeChange}
                            color="default"
                            inputProps={{'aria-label': 'toggle theme'}}
                        />
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}