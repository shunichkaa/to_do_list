import {createAction, createReducer, nanoid} from '@reduxjs/toolkit'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer'
import {tasksApi, Task, TaskStatuses, UpdateTaskModel} from '../api/tasksApi'
import {BaseResponse} from '@/common/types/types'

// Thunks
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string) => {
    const res = await tasksApi.getTasks(todolistId)
    return {tasks: res.data.items, todolistId}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (payload: {todolistId: string, taskId: string}) => {
    await tasksApi.deleteTask(payload)
    return payload
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (payload: {todolistId: string, title: string}) => {
    const res = await tasksApi.createTask(payload)
    return {task: res.data.data.item, todolistId: payload.todolistId}
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (payload: {todolistId: string, taskId: string, model: UpdateTaskModel}) => {
    const res = await tasksApi.updateTask(payload)
    return {task: res.data.data.item, todolistId: payload.todolistId}
})

// Actions
export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTask')
export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTask')
export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/changeTaskTitle')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, builder => {
  builder
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        if (tasks) {
          const index = tasks.findIndex(task => task.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        }
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        state[action.payload.todolistId].unshift(action.payload.task)
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(task => task.id === action.payload.task.id)
        if (index !== -1) {
          tasks[index] = action.payload.task
        }
      })
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
})

export type TasksState = Record<string, Task[]>
