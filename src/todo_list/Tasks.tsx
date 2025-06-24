import React from 'react'
import List from '@mui/material/List'
import { Todolist } from '../features/todolists/todolistsSlice'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { selectTasks, Task } from '../features/tasks/tasksSlice'
import { TaskItem } from './TaskItem'

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks) as Record<string, Task[]>

    const todolistTasks = tasks[id] || []
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter((task: Task) => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter((task: Task) => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map((task: Task) => (
                        <TaskItem key={task.id} task={task} todolistId={id}/>
                    ))}
                </List>
            )}
        </>
    )
}