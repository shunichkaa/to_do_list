import React, { ChangeEvent } from 'react'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan } from '@/common/components/editableSpan/EditableSpan'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC } from '../features/tasks/tasksSlice'
import { getListItemSx } from '../common/components/createItemForm/TodolistItem.styles'
import { DomainTask } from '../features/todolists/api/tasksApi.types'

type Props = {
    task: DomainTask
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC(todolistId, task.id))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked ? 2 : 0
        dispatch(changeTaskStatusAC(todolistId, task.id, newStatusValue === 2))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, title))
    }

    return (
        <ListItem sx={getListItemSx(task.status === 2)}>
            <div>
                <Checkbox checked={task.status === 2} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle} />
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}