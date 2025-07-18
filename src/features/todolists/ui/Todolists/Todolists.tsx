import React from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { TodolistItem } from "./TodolistItem"
import { Todolist } from "@/features/todolists/api/todolistsApi.types"
import { RootState } from "@/features/store"

const selectTodolists = (state: RootState) => state.todolists

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  return (
    <>
      {todolists.map((todolist: Todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
