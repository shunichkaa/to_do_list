import {expect, test, beforeEach} from 'vitest'
import {
    createTodolistAC, deleteTaskAC,
    deleteTodolistAC,
    tasksReducer,
    todolistsReducer as importedTodolistsReducer
} from './todolists-reducer'
import {TasksState, Todolist} from '../types'

let todolistId1: string
let todolistId2: string
let tasksStartState: TasksState = {}
let todolistsStartState: Todolist[] = []

beforeEach(() => {
    todolistId1 = 'todolistId1'
    todolistId2 = 'todolistId2'

    tasksStartState = {
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }

    todolistsStartState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be deleted in todolistsReducer', () => {
    const endState = importedTodolistsReducer(todolistsStartState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created in todolistsReducer', () => {
    const title = 'New todolist'
    const action = createTodolistAC(title)
    const endState = importedTodolistsReducer(todolistsStartState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)
    expect(endState[0].filter).toBe('all')
})

// Убраны тесты, связанные с отсутствующими action creators (changeTodolistTitleAC, changeTodolistFilterAC)

test('array should be created for new todolist in tasksReducer', () => {
    const action = createTodolistAC('New todolist')
    const endState = tasksReducer(tasksStartState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw new Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted in tasksReducer', () => {
    const endState = tasksReducer(tasksStartState, deleteTodolistAC(todolistId2))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).toBeUndefined()
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(
        tasksStartState,
        deleteTaskAC({todolistId: todolistId2, taskId: '2'})
    )

    expect(endState).toEqual({
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
})
