import React from 'react'
import List from '@mui/material/List'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { TaskItem } from './TaskItem'
import { Todolist, Task } from '../types'
import { RootState } from '../features/store'

type Props = {
    todolist: Todolist
}

const selectTasks = (state: RootState) => state.tasks

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

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