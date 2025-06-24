// Menu state
import {Container, CssBaseline, GridLegacy as Grid, Paper, ThemeProvider} from "@mui/material";
import {CreateItemForm} from "@/common/components/createItemForm/CreateItemForm";
import {TodolistItem} from "@/todo_list/TodolistItem";
import {useReducer, useState} from "react";
import {changeTodolistFilterAC, todolistsReducer} from "@/model/todolists-reducer";
import {FilterValues, Task, TasksState} from "@/types";
import {changeThemeModeAC} from "@/model/app-reducer";
import {nanoid} from "@reduxjs/toolkit";



export const Main = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClose = () => setAnchorEl(null);

// Todolists and tasks state
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);
    const [tasks, setTasks] = useState<TasksState>({});

// Theme toggle handler
    const handleThemeChange = () => {
        dispatch(changeThemeModeAC({themeMode: this.themeMode === 'light' ? 'dark' : 'light'}));
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
}
return (
<ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className="app">
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

function dispatch(arg0: { payload: { themeMode: import("@/types").ThemeMode; }; type: "app/changeThemeModeAC"; }) {
    throw new Error("Function not implemented.");
}
