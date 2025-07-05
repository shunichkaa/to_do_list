import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan'
import {useAppDispatch} from '@/common/hooks'
import {
  removeTaskTC,
  updateTaskTC,
} from '@/features/todolists/model/tasks-reducer'
import {Task, TaskStatuses} from '@/features/todolists/api/tasksApi'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import type {ChangeEvent} from 'react'
import {getListItemSx} from './TaskItem.styles'

type Props = {
  task: Task
  todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(removeTaskTC({todolistId, taskId: task.id}))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTaskTC({
      todolistId, 
      taskId: task.id, 
      model: {
        title: task.title,
        description: task.description,
        status: newStatusValue,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
      }
    }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC({
      todolistId, 
      taskId: task.id, 
      model: {
        title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
      }
    }))
  }

  return (
      <ListItem sx={getListItemSx(task.status === TaskStatuses.Completed)}>
        <div>
          <Checkbox checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatus}/>
          <EditableSpan value={task.title} onChange={changeTaskTitle} />
        </div>
        <IconButton onClick={deleteTask}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
  )
}
