import {useReducer, useState} from 'react';
import './App.css';
import {TodolistItem} from '../todo_list/TodolistItem';
import {CreateItemForm} from '../components/createItemForm/CreateItemForm';
import {
    AppBar,
    Button,
    Container,
    CssBaseline,
    GridLegacy as Grid,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {containerSx} from '../components/createItemForm/TodolistItem.styles';
import {FilterValues, Task, TasksState} from '../types';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer,
} from '../model/todolists-reducer';
import {nanoid} from '@reduxjs/toolkit';
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { useAppSelector } from "../common/hooks/useAppSelector";
import {changeThemeModeAC, selectThemeMode} from "../model/app-reducer";
import {getTheme} from "../common/theme/theme";


export function App() {
    // Redux theme handling
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(selectThemeMode);
    const theme = getTheme(themeMode);


    // Menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    // Todolists and tasks state
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);
    const [tasks, setTasks] = useState<TasksState>({});

    // Theme toggle handler
    const handleThemeChange = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}));
    };

    // Tasks handlers
    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks((prev) => ({
            ...prev,
            [todolistId]: prev[todolistId]?.filter((t) => t.id !== taskId) || [],
        }));
    };

    const createTask = (todolistId: string, title: string) => {
        const newTask: Task = {id: nanoid(), title, isDone: false};
        setTasks((prev) => ({
            ...prev,
            [todolistId]: [newTask, ...(prev[todolistId] || [])],
        }));
    };

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks((prev) => ({
            ...prev,
            [todolistId]: prev[todolistId]?.map((t) => (t.id === taskId ? {...t, isDone} : t)) || [],
        }));
    };

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks((prev) => ({
            ...prev,
            [todolistId]: prev[todolistId]?.map((t) => (t.id === taskId ? {...t, title} : t)) || [],
        }));
    };

    // Todolist handlers
    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}));
    };

    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC({id: todolistId}));
        setTasks((prev) => {
            const newTasks = {...prev};
            delete newTasks[todolistId];
            return newTasks;
        });
    };

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}));
    };

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title);
        dispatchToTodolists(action);
        setTasks(prev => ({...prev, [action.payload.id]: []}));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
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

                <Container maxWidth="lg">
                    <Grid container sx={{mb: 3}}>
                        <Grid item>
                            <CreateItemForm onCreateItem={createTodolist}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        {todolists.map((todolist) => {
                            const todolistTasks = tasks[todolist.id] || [];
                            const filteredTasks = todolist.filter === 'all'
                                ? todolistTasks
                                : todolist.filter === 'active'
                                    ? todolistTasks.filter((t) => !t.isDone)
                                    : todolistTasks.filter((t) => t.isDone);

                            return (
                                <Grid item key={todolist.id} xs={12} sm={6} md={4}>
                                    <Paper sx={{p: 2}}>
                                        <TodolistItem
                                            todolist={todolist}
                                            tasks={filteredTasks}
                                            deleteTask={(taskId) => deleteTask(todolist.id, taskId)}
                                            changeFilter={changeFilter}
                                            createTask={(title) => createTask(todolist.id, title)}
                                            changeTaskStatus={(_, taskId, isDone) =>
                                                changeTaskStatus(todolist.id, taskId, isDone)
                                            }
                                            deleteTodolist={() => deleteTodolist(todolist.id)}
                                            changeTaskTitle={(_, taskId, title) =>
                                                changeTaskTitle(todolist.id, taskId, title)
                                            }
                                            changeTodolistTitle={(title) =>
                                                changeTodolistTitle(todolist.id, title)
                                            }
                                        />
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}