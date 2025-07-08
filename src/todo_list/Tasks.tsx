import React from "react"
import List from "@mui/material/List"
import { useAppSelector } from "../../common 2/hooks/useAppSelector"
import { TaskItem } from "./TaskItem"
import { Todolist } from "@/features/todolists/api/todolistsApi.types"
import { RootState } from "../features/store"
import { DomainTask } from "../features/todolists/api/tasksApi.types"

type Props = {
  todolist: Todolist
}

const selectTasks = (state: RootState) => state.tasks

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const todolistTasks: DomainTask[] = tasks[id] || []
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status !== 2)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === 2)
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} todolistId={id} />
          ))}
        </List>
      )}
    </>
  )
}
