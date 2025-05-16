import './App.css';
import { TodolistItem } from "./todo_list/TodolistItem";
import { useState } from "react";
import { v1 } from 'uuid';

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
};

export type FilterValues = 'all' | 'active' | 'completed';

export type Todolist = {
    id: string;
    title: string;
    filter: FilterValues;
};

export const App = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([
        { id: v1(), title: 'What to learn', filter: 'all' },
        { id: v1(), title: 'What to buy', filter: 'all' },
    ]);

    const [tasks, setTasks] = useState<{ [todolistId: string]: Task[] }>({
        [todolists[0].id]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolists[1].id]: [
            { id: v1(), title: 'Milk', isDone: false },
            { id: v1(), title: 'Bread', isDone: true },
        ],
    });

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        });
    };

    const createTask = (todolistId: string, title: string) => {
        const newTask: Task = { id: v1(), title, isDone: false };
        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        });
    };

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task =>
                task.id === taskId ? { ...task, isDone } : task
            )
        });
    };

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(
            todolists.map(todolist =>
                todolist.id === todolistId ? { ...todolist, filter } : todolist
            )
        );
    };

    const getFilteredTasks = (todolist: Todolist): Task[] => {
        const allTasks = tasks[todolist.id] || [];
        switch (todolist.filter) {
            case 'active':
                return allTasks.filter(t => !t.isDone);
            case 'completed':
                return allTasks.filter(t => t.isDone);
            default:
                return allTasks;
        }
    };

    return (
        <div className="app">
            {todolists.map(todolist => (
                <TodolistItem
                    key={todolist.id}
                    todolist={todolist}
                    tasks={getFilteredTasks(todolist)}
                    deleteTask={(taskId) => deleteTask(todolist.id, taskId)}
                    changeFilter={(filter) => changeFilter(todolist.id, filter)}
                    createTask={(title) => createTask(todolist.id, title)}
                    changeTaskStatus={(taskId, isDone) => changeTaskStatus(todolist.id, taskId, isDone)}
                />
            ))}
        </div>
    );
};