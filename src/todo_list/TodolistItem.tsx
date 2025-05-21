import {Task} from "../App"
import {Button} from "./Button"
import {ChangeEvent, KeyboardEvent, useState} from "react";

type FilterValues = 'all' | 'active' | 'completed';

type Todolist = {
    id: string;
    title: string;
    filter: FilterValues;
}

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
    } = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskStatusHandler = (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(taskId, newStatusValue)
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler();
        }
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const deleteTaskHandler = (taskId: string) => () => {
        deleteTask(taskId)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler(task.id)}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler(task.id)} />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
}