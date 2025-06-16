import {useReducer, useState} from 'react';
import './App.css';
import {TodolistItem} from '../todo_list/TodolistItem';
import {v1} from 'uuid';
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
import {createTheme} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {containerSx} from '../components/createItemForm/TodolistItem.styles';
import {FilterValues, Task, TasksState, ThemeMode} from '../types';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer,
} from '../model/todolists-reducer';

export function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {main: '#087EA4'},
        },
    });

    const toggleTheme = () => setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);
    const [tasks, setTasks] = useState<TasksState>({});
    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks((prev) => ({
            ...prev,
            [todolistId]: prev[todolistId]?.filter((t) => t.id !== taskId) || [],
        }));
    };
    const createTask = (todolistId: string, title: string) => {
        const newTask: Task = {id: v1(), title, isDone: false};
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
        const newId = v1();
        const action = createTodolistAC({id: newId, title});
        dispatchToTodolists(action);
        setTasks(prev => ({...prev, [newId]: []}));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <AppBar position="static" sx={{mb: 3}}>
                    <Toolbar>
                        <Container maxWidth="lg" sx={containerSx}>
                            <IconButton color="inherit" onClick={handleMenu}>
                                <MenuIcon/>
                            </IconButton>
                            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                <Button color="inherit">Sign in</Button>
                                <Button color="inherit">Sign up</Button>
                                <Button color="inherit">Faq</Button>
                                <Switch
                                    checked={themeMode === 'dark'}
                                    onChange={toggleTheme}
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
                            const filteredTasks =
                                todolist.filter === 'all'
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
                                            changeTodolistTitle={(title) => changeTodolistTitle(todolist.id, title)}
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
