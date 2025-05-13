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

export const App = () => {
    const [filter, setFilter] = useState<FilterValues>('all');
    const [tasks, setTasks] = useState<Task[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
    ]);

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const createTask = (title: string) => {
        const newTask = { id: v1(), title, isDone: false };
        setTasks([newTask, ...tasks]);
    };

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, isDone } : task));
    };

    const changeFilter = (value: FilterValues) => {
        setFilter(value);
    };

    const getFilteredTasks = (): Task[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone);
            case 'completed':
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    };

    return (
        <div className="app">
            <TodolistItem
                title="What to learn"
                tasks={getFilteredTasks()}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
};
