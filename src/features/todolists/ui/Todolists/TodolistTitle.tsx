import React from "react"
import { deleteTodolistAC, changeTodolistTitleAC } from "../../../todolists/todolistsSlice"
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { EditableSpan } from '../../../common/components/editableSpan/EditableSpan'
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { Todolist } from "../../todolists/api/todolistsApi.types"

type Props = {
  todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    dispatch(deleteTodolistAC({ id }))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }))
  }

  return (
    <div className={"container"}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
