import { useAppDispatch } from "@/common/hooks"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { addTaskTC, fetchTasksTC } from "@/features/todolists/model/tasks-reducer"
import type { Todolist } from "@/features/todolists/model/todolists-reducer"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { CreateItemForm } from "@/common/components/createItemForm/CreateItemForm"
import { useEffect } from "react"

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await dispatch(fetchTasksTC(todolist.id)).unwrap()
      } catch (error) {
        console.error("Failed to load tasks:", error)
      }
    }

    loadTasks()
  }, [dispatch, todolist.id])

  const createTask = async (title: string) => {
    try {
      await dispatch(addTaskTC({ todolistId: todolist.id, title })).unwrap()
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
