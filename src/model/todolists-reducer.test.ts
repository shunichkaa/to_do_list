import { expect, test, beforeEach } from 'vitest'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    tasksReducer,
    todolistsReducer
} from './todolists-reducer'
import { TasksState, Todolist } from '../types'

let todolistId1: string
let todolistId2: string
let tasksStartState: TasksState = {}
let todolistsStartState: Todolist[] = []

beforeEach(() => {
    todolistId1 = 'todolistId1'
    todolistId2 = 'todolistId2'

    tasksStartState = {
        [todolistId1]: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        [todolistId2]: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }

    todolistsStartState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(todolistsStartState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    const title = 'New todolist'
    const action = createTodolistAC(title)
    const endState = todolistsReducer(todolistsStartState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its title', () => {
    const title = 'New title'
    const action = changeTodolistTitleAC({ id: todolistId2, title })
    const endState = todolistsReducer(todolistsStartState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter = 'completed'
    const action = changeTodolistFilterAC({ id: todolistId2, filter })
    const endState = todolistsReducer(todolistsStartState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)
})

test('array should be created for new todolist in tasks state', () => {
    const action = createTodolistAC('New todolist')
    const endState = tasksReducer(tasksStartState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
