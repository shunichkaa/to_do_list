import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {changeThemeModeAC, selectThemeMode} from "../../../features/app-reducer";
import {AppBar, Box, Button, Container, IconButton, Switch, Toolbar} from "@mui/material";
import {containerSx} from "../createItemForm/TodolistItem.styles";
import MenuIcon from "@mui/icons-material/Menu";
import {ThemeMode} from "../../../types";

const headerSx = {mb: 3};
const navigationContainerSx = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginLeft: 'auto'
};

interface NavigationMenuProps {
    themeMode: ThemeMode;
    onThemeChange: () => void;
}

const NavigationMenu = ({themeMode, onThemeChange}: NavigationMenuProps) => {
    return (
        <Box sx={navigationContainerSx}>
            <Button color="inherit">Sign in</Button>
            <Button color="inherit">Sign up</Button>
            <Button color="inherit">FAQ</Button>
            <Switch
                checked={themeMode === 'dark'}
                onChange={onThemeChange}
                color="default"
                inputProps={{'aria-label': 'toggle theme'}}
            />
        </Box>
    );
};

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode);
    const dispatch = useAppDispatch();

    const handleThemeChange = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}));
    };

    const handleMenuClick = () => {
        console.log('Menu clicked');
    };

    return (
        <AppBar position="static" sx={headerSx}>
            <Toolbar>
                <Container maxWidth="lg" sx={containerSx}>
                    <IconButton
                        color="inherit"
                        onClick={handleMenuClick}
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <NavigationMenu themeMode={themeMode} onThemeChange={handleThemeChange}/>
                </Container>
            </Toolbar>
        </AppBar>
    );
};