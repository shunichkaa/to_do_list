import {v1} from 'uuid'

type FilterValues = 'all' | 'active' | 'completed'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

type TasksState = {
    [key: string]: TaskType[]
}

const tasksInitialState: TasksState = {}

const todolistsInitialState: Todolist[] = []

export const deleteTodolistAC = (id: string) => ({
    type: 'delete_todolist' as const,
    payload: {id}
})

export const createTodolistAC = (title: string) => ({
    type: 'create_todolist' as const,
    payload: {
        title,
        id: v1()
    }
})

export const deleteTaskAC = (payload: { todolistId: string; taskId: string }) => ({
    type: 'DELETE_TASK' as const,
    payload
})

export const createTaskAC = (payload: { todolistId: string; title: string }) => ({
    type: 'CREATE_TASK' as const,
    payload
})

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => ({
    type: 'change_todolist_title' as const,
    payload
})

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => ({
    type: 'change_todolist_filter' as const,
    payload
})

type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
type CreateTodolistAction = ReturnType<typeof createTodolistAC>
type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>

type TodolistsActions =
    | DeleteTodolistAction
    | CreateTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction

type TasksActions =
    | CreateTodolistAction
    | DeleteTodolistAction
    | DeleteTaskAction
    | CreateTaskAction

export const tasksReducer = (
    state: TasksState = tasksInitialState,
    action: TasksActions
): TasksState => {
    switch (action.type) {
        case 'CREATE_TASK': {
            const {todolistId, title} = action.payload
            const newTask: TaskType = {
                id: crypto.randomUUID(),
                title,
                isDone: false
            }

            return {
                ...state,
                [todolistId]: [newTask, ...(state[todolistId] || [])]
            }
        }

        case 'DELETE_TASK': {
            const {todolistId, taskId} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].filter(task => task.id !== taskId)
            }
        }

        case 'create_todolist': {
            return {
                ...state,
                [action.payload.id]: []
            }
        }

        case 'delete_todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }

        default:
            return state
    }
}

export const createNewTodolist = (id: string, title: string): Todolist => ({
    id,
    title,
    filter: 'all'
})

export const todolistsReducer = (
    state: Todolist[] = todolistsInitialState,
    action: TodolistsActions
): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return state.filter(todolist => todolist.id !== action.payload.id)

        case 'create_todolist': {
            const {id, title} = action.payload
            const newTodolist = createNewTodolist(id, title)
            return [newTodolist, ...state]
        }

        case 'change_todolist_title':
            return state.map(todolist =>
                todolist.id === action.payload.id
                    ? {...todolist, title: action.payload.title}
                    : todolist
            )

        case 'change_todolist_filter':
            return state.map(todolist =>
                todolist.id === action.payload.id
                    ? {...todolist, filter: action.payload.filter}
                    : todolist
            )

        default:
            return state
    }
}
