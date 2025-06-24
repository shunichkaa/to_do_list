import React, { ChangeEvent } from 'react'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan } from '../common/components/editableSpan/EditableSpan'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { Task, deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC } from '../features/tasks/tasksSlice'
import { getListItemSx } from '../common/components/main/listItemSx'

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatusValue}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
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