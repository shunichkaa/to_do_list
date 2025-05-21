import {KeyboardEvent, useState} from 'react';
import './App.css'
import {TodolistItem} from "./todo_list/TodolistItem";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = Record<string, Task[]>

export function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
    }

    const addTask = (todolistId: string) => {
        if (newTaskTitle.trim() !== '') {
            const newTask: Task = {
                id: v1(),
                title: newTaskTitle.trim(),
                isDone: false
            };
            setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
            setNewTaskTitle('');
        }
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task)})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        const newTasks = {...tasks}
        delete newTasks[todolistId]
        setTasks(newTasks)
    }

    return (
        <div className="app">
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                    <TodolistItem 
                        key={todolist.id}
                        todolist={todolist}
                        tasks={filteredTasks}
                        deleteTask={(taskId) => deleteTask(todolist.id, taskId)}
                        changeFilter={changeFilter} // Просто передаем оригинальную функцию
                        createTask={(title) => createTask(todolist.id, title)}
                        changeTaskStatus={(taskId, isDone) => changeTaskStatus(todolist.id, taskId, isDone)}
                        deleteTodolist={() => deleteTodolist(todolist.id)}
                    />
                )
            })}
        </div>
    )
}