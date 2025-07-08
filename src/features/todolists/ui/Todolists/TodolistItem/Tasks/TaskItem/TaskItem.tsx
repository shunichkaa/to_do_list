import { EditableSpan } from '../../../../features/common/components/editableSpan/EditableSpan'
import { useAppDispatch } from '../../../../../features/common/hooks/useAppDispatch'
import { removeTaskTC, updateTaskTC } from "@/features/todolists/model/tasks-reducer"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from '../../../../../features/common/enums'
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = async () => {
    try {
      await dispatch(removeTaskTC({ todolistId, taskId: task.id })).unwrap()
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const changeTaskStatus = async (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    try {
      await dispatch(
        updateTaskTC({
          todolistId,
          taskId: task.id,
          model: {
            title: task.title,
            description: task.description,
            status: newStatusValue,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
          },
        }),
      ).unwrap()
    } catch (error) {
      console.error("Failed to update task status:", error)
    }
  }

  const changeTaskTitle = async (title: string) => {
    try {
      await dispatch(
        updateTaskTC({
          todolistId,
          taskId: task.id,
          model: {
            title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
          },
        }),
      ).unwrap()
    } catch (error) {
      console.error("Failed to update task title:", error)
    }
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
