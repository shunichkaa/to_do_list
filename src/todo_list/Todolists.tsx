import React, {useEffect} from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem"
import { RootState } from "../features/store"
import {Todolist, todolistsApi} from "@/features/todolists/api/todolistsApi.types";
import {useAppSelector} from "@/common/hooks";

const selectTodolists = (state: RootState) => state.todolists

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    todolistsApi.getTodolists().then(res => {
      const todolists = res.data
      console.log(todolists)
    })
  }, [])

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
