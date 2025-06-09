import type { FilterValues, TasksState, Todolist } from '../types'
import { v1 } from 'uuid'

// Actions
export const deleteTodolistAC = (id: string) => {
    return { type: 'delete_todolist', payload: { id } } as const
}

export const createTodolistAC = (title: string) => {
    return {
        type: 'create_todolist',
        payload: {
            title,
            id: v1()
        }
    } as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {
        type: 'change_todolist_title',
        payload
    } as const
}

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => {
    return {
        type: 'change_todolist_filter',
        payload
    } as const
}

// Action Types
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type TodolistsActions =
    | DeleteTodolistAction
    | CreateTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction

type TasksActions =
    | CreateTodolistAction
    | DeleteTodolistAction

// Tasks Reducer
const tasksInitialState: TasksState = {}

export const tasksReducer = (state: TasksState = tasksInitialState, action: TasksActions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return { ...state, [action.payload.id]: [] }
        }
        case 'delete_todolist': {
            const newState = { ...state }
            delete newState[action.payload.id]
            return newState
        }
        default:
            return state
    }
}

// Todolists Reducer
const todolistsInitialState: Todolist[] = []

export const createNewTodolist = (id: string, title: string): Todolist => ({
    id,
    title,
    filter: 'all'
})

export const todolistsReducer = (state: Todolist[] = todolistsInitialState, action: TodolistsActions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const { id, title } = action.payload
            const newTodolist = createNewTodolist(id, title)
            return [newTodolist, ...state]
        }
        case 'change_todolist_title': {
            return state.map(todolist =>
                todolist.id === action.payload.id
                    ? { ...todolist, title: action.payload.title }
                    : todolist
            )
        }
        case 'change_todolist_filter': {
            return state.map(todolist =>
                todolist.id === action.payload.id
                    ? { ...todolist, filter: action.payload.filter }
                    : todolist
            )
        }
        default:
            return state
    }
}
