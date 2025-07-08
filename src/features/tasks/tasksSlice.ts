import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';
import { DomainTask } from '../todolists/api/tasksApi.types';
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

export type TasksState = Record<string, DomainTask[]>;

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
            const newTask: DomainTask = {
                id: nanoid(),
                title: action.payload.title,
                description: '',
                todoListId: action.payload.todolistId,
                order: 0,
                status: 0,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: '',
            };
            if (!state[action.payload.todolistId]) {
                state[action.payload.todolistId] = [];
            }
            state[action.payload.todolistId].unshift(newTask);
        })
        .addCase(deleteTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            if (tasks) {
                const index = tasks.findIndex((t: DomainTask) => t.id === action.payload.taskId);
                if (index !== -1) {
                    tasks.splice(index, 1);
                }
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            if (tasks) {
                const task = tasks.find((t: DomainTask) => t.id === action.payload.taskId);
                if (task) {
                    task.status = action.payload.isDone ? 2 : 0;
                }
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            if (tasks) {
                const task = tasks.find((t: DomainTask) => t.id === action.payload.taskId);
                if (task) {
                    task.title = action.payload.title;
                }
            }
        });
});