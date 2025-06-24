import React, { ChangeEvent } from 'react'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan } from '../common/components/editableSpan/EditableSpan'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC } from '../features/tasks/tasksSlice'
import { getListItemSx } from '../common/components/createItemForm/TodolistItem.styles'
import { Task } from '../types'

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC(todolistId, task.id))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolistId, task.id, newStatusValue))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, title))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle} />
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}