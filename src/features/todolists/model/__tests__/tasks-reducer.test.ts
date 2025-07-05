import { beforeEach, expect, test } from 'vitest'
import {
  changeTaskStatusAC, changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer, type TasksState
} from '../tasks-reducer'
import {createTodolistAC, deleteTodolistAC} from '../todolists-reducer'
import {TaskStatuses} from '../../api/tasksApi'

let startState: TasksState = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: ''},
      {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: ''},
      {id: '3', title: 'React', status: TaskStatuses.New, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: ''},
    ],
    todolistId2: [
      {id: '1', title: 'bread', status: TaskStatuses.New, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: ''},
      {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: ''},
      {id: '3', title: 'tea', status: TaskStatuses.New, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: ''},
    ],
  }
})

test('correct task should be deleted', () => {
  const endState = tasksReducer(startState, deleteTaskAC({todolistId: 'todolistId2', taskId: '2'}))

  expect(endState).toEqual({
    todolistId1: [
      { id: '1', title: 'CSS', status: TaskStatuses.New, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: '' },
      { id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: '' },
      { id: '3', title: 'React', status: TaskStatuses.New, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: '' },
    ],
    todolistId2: [
      { id: '1', title: 'bread', status: TaskStatuses.New, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: '' },
      { id: '3', title: 'tea', status: TaskStatuses.New, description: '', todoListId: '', order: 0, priority: 1, startDate: '', deadline: '', addedDate: '' },
    ],
  })
})

test('correct task should be created at correct array', () => {
  const endState = tasksReducer(startState, createTaskAC({
    todolistId: 'todolistId2',
    title: 'juice'
  }))

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe('juice')
  expect(endState.todolistId2[0].status).toBe(TaskStatuses.New)
})

test('correct task should change its status', () => {
  const endState = tasksReducer(startState, changeTaskStatusAC({todolistId: 'todolistId2', taskId: '2', isDone: false}))

  expect(endState.todolistId2[1].status).toBe(TaskStatuses.New)
  expect(endState.todolistId1[1].status).toBe(TaskStatuses.Completed)
})

test('correct task should change its title', () => {
  const endState = tasksReducer(startState, changeTaskTitleAC({todolistId: 'todolistId2', taskId: '2', title: 'coffee'}))

  expect(endState.todolistId2[1].title).toBe('coffee')
  expect(endState.todolistId1[1].title).toBe('JS')
})

test('array should be created for new todolist', () => {
  const endState = tasksReducer(startState, createTodolistAC('New todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('New key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(startState, deleteTodolistAC({id: 'todolistId2'}))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
  // or
  expect(endState['todolistId2']).toBeUndefined()
})
