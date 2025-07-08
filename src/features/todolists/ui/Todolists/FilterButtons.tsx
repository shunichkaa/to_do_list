import React from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { changeTodolistFilterAC } from "../../../todolists/todolistsSlice"
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { FilterValues } from "../types"
import { Todolist } from "@/features/todolists/api/todolistsApi.types"

type Props = {
  todolist: Todolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id, filter }))
  }

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
