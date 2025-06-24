import { FilterValues, Todolist } from '../../types'

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => ({
    type: 'CHANGE_TODOLIST_FILTER' as const,
    payload,
})

export const deleteTodolistAC = (payload: { id: string }) => ({
    type: 'DELETE_TODOLIST' as const,
    payload,
})

export const createTodolistAC = (payload: { title: string; id: string }) => ({
    type: 'CREATE_TODOLIST' as const,
    payload,
})

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => ({
    type: 'CHANGE_TODOLIST_TITLE' as const,
    payload,
})

type Actions =
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl =>
                tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl
            )
        case 'DELETE_TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'CREATE_TODOLIST':
            return [...state, { id: action.payload.id, title: action.payload.title, filter: 'all' }]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl =>
                tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl
            )
        default:
            return state
    }
}
