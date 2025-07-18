import React from "react"
import { Todolist } from "@/features/todolists/api/todolistsApi.types"
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { createTaskAC } from "../../../tasks/tasksSlice"
import { TodolistTitle } from "./TodolistTitle"
import { CreateItemForm } from '../../../common/components/createItemForm/CreateItemForm'
import { Tasks } from "./Tasks"
import { FilterButtons } from "./FilterButtons"

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC(todolist.id, title))
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
