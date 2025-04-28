import './App.css'
import {v1} from "uuid";
import {useState} from 'react';
import {Todolist} from "./todo_list/Todolist";

export type FilterValues = "all" | "active" | "completed";

export function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ]);
    console.log(tasks)

    function removeTask(id: string) {
        let FilterTasks = tasks.filter(t => t.id !== id);
        setTasks(FilterTasks);
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    let [filter, setFilter] = useState<FilterValues>("all");

    let tasksForToTodolist = tasks;

    if (filter === "active") {
        tasksForToTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForToTodolist = tasks.filter(t => t.isDone);
    }


    function changeFilter(value: FilterValues) {
        setFilter(value);
    }

    return (
        <div className="app">
            <Todolist title="What to learn"
                      tasks={tasksForToTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    )
}