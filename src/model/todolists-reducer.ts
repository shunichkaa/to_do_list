import { FilterValues, Todolist } from '../types'

export const changeTodolistFilter = (id: string, filter: FilterValues) => ({
    type: 'change-filter' as const,
    payload: { id, filter },
})

export const deleteTodolist = (id: string) => ({
    type: 'delete' as const,
    payload: { id },
})

export const createTodolist = (id: string, title: string) => ({
    type: 'create' as const,
    payload: { id, title },
})

export const changeTodolistTitle = (id: string, title: string) => ({
    type: 'change-title' as const,
    payload: { id, title },
})

type Action =
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof deleteTodolist>
    | ReturnType<typeof createTodolist>
    | ReturnType<typeof changeTodolistTitle>

const initialState: Todolist[] = []

export const todolistsReducer = (state = initialState, action: Action): Todolist[] => {
    switch (action.type) {
        case 'change-filter':
            return state.map(tl =>
                tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl
            )

        case 'delete':
            return state.filter(tl => tl.id !== action.payload.id)

        case 'create':
            return [...state, { id: action.payload.id, title: action.payload.title, filter: 'all' }]

        case 'change-title':
            return state.map(tl =>
                tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl
            )

        default:
            return state
    }
}
