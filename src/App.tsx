import { useState } from 'react';
import './App.css';
import { TodolistItem } from "./todo_list/TodolistItem";
import { v1 } from "uuid";
import { CreateItemForm } from "./components/createItemForm/CreateItemForm";
import {
    AppBar,
    Button,
    Container,
    GridLegacy as Grid,
    IconButton,
    Paper,
    Toolbar,
    ThemeProvider,
    CssBaseline
} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { containerSx } from "./components/createItemForm/TodolistItem.styles";
import Switch from '@mui/material/Switch';

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = Record<string, Task[]>

type ThemeMode = 'dark' | 'light'

export function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    });

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)});
    };

    const addTask = (todolistId: string) => {
        if (newTaskTitle.trim() !== '') {
            const newTask: Task = {
                id: v1(),
                title: newTaskTitle.trim(),
                isDone: false
            };
            setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
            setNewTaskTitle('');
        }
    };

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    };

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task =>
                task.id === taskId ? {...task, isDone} : task
            )
        });
    };

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist =>
            todolist.id === todolistId ? {...todolist, filter} : todolist
        ));
    };

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
        const newTasks = {...tasks};
        delete newTasks[todolistId];
        setTasks(newTasks);
    };

    const createTodolist = (title: string) => {
        const todolistId = v1();
        const newTodolist: Todolist = {id: todolistId, title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [todolistId]: []});
    };

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task =>
                task.id === taskId ? {...task, title} : task
            )
        });
    };

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist =>
            todolist.id === todolistId ? {...todolist, title} : todolist
        ));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
                <AppBar position="static" sx={{ mb: '30px' }}>
                    <Toolbar>
                        <Container maxWidth="lg" sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button color="inherit">Sign in</Button>
                                <Button color="inherit">Sign up</Button>
                                <Button color="inherit">Faq</Button>
                                <Switch
                                    checked={themeMode === 'dark'}
                                    onChange={changeMode}
                                    color="default"
                                    inputProps={{ 'aria-label': 'toggle theme' }}
                                />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="lg">
                    <Grid container sx={{ mb: '30px' }}>
                        <Grid item>
                            <CreateItemForm onCreateItem={createTodolist} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map((todolist) => {
                            const todolistTasks = tasks[todolist.id];
                            let filteredTasks = todolistTasks;

                            if (todolist.filter === 'active') {
                                filteredTasks = todolistTasks.filter((task) => !task.isDone);
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = todolistTasks.filter((task) => task.isDone);
                            }

                            return (
                                <Grid
                                    item
                                    key={todolist.id}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <Paper sx={{ p: '0 20px 20px 20px' }}>
                                        <TodolistItem
                                            todolist={todolist}
                                            tasks={filteredTasks}
                                            deleteTask={(taskId) => deleteTask(todolist.id, taskId)}
                                            changeFilter={changeFilter}
                                            createTask={(title) => createTask(todolist.id, title)}
                                            changeTaskStatus={(taskId, isDone) => changeTaskStatus(todolist.id, taskId, isDone)}
                                            deleteTodolist={() => deleteTodolist(todolist.id)}
                                            changeTaskTitle={(taskId, title) => changeTaskTitle(todolist.id, taskId, title)}
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