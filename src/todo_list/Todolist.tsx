import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
import {Button} from "../Button";
import {FilterValues} from "../App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValues) => void,
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const OnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.addTask(newTaskTitle);
        if (e.key === "Enter") {
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const OnAllClickHandler = () => props.changeFilter("all")
    const OnActiveClickHandler = () => props.changeFilter("active")
    const OnCompletedClickHandler = () => props.changeFilter("completed")

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={OnKeyDownHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {

                const OnRemoveHandler = () => {
                    props.removeTask(t.id)
                }

                return <li key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={() => {
                           }}/>
                    <span>{t.title}</span>
                    <button onClick={OnRemoveHandler}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={OnAllClickHandler}>All</button>
            <button onClick={OnActiveClickHandler}>Active</button>
            <button onClick={OnCompletedClickHandler}>Completed</button>
        </div>
    </div>
}