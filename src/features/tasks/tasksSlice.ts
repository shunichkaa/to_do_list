import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';
import {Task, TasksState} from '../../types';
import {createTodolistAC, deleteTodolistAC} from '../todolists/todolistsSlice';

export const createTaskAC = createAction('tasks/createTask', (todolistId: string, title: string) => {
    return {payload: {todolistId, title}};
});

export const deleteTaskAC = createAction('tasks/deleteTask', (todolistId: string, taskId: string) => {
    return {payload: {todolistId, taskId}};
});

export const changeTaskStatusAC = createAction('tasks/changeTaskStatus', (todolistId: string, taskId: string, isDone: boolean) => {
    return {payload: {todolistId, taskId, isDone}};
});

export const changeTaskTitleAC = createAction('tasks/changeTaskTitle', (todolistId: string, taskId: string, title: string) => {
    return {payload: {todolistId, taskId, title}};
});

const initialState: TasksState = {};

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = [];
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask: Task = {id: nanoid(), title: action.payload.title, isDone: false};
            if (!state[action.payload.todolistId]) {
                state[action.payload.todolistId] = [];
            }
            state[action.payload.todolistId].unshift(newTask);
        })
        .addCase(deleteTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            if (tasks) {
                const index = tasks.findIndex((t: Task) => t.id === action.payload.taskId);
                if (index !== -1) {
                    tasks.splice(index, 1);
                }
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            if (tasks) {
                const task = tasks.find((t: Task) => t.id === action.payload.taskId);
                if (task) {
                    task.isDone = action.payload.isDone;
                }
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            if (tasks) {
                const task = tasks.find((t: Task) => t.id === action.payload.taskId);
                if (task) {
                    task.title = action.payload.title;
                }
            }
        });
});