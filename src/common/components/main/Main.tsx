import React from "react"
import { Container, Grid } from "@mui/material"
import { CreateItemForm } from "../createItemForm/CreateItemForm"
import { Todolists } from "../../../todo_list/Todolists"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { createTodolistAC } from "../../../features/todolists/todolistsSlice"

export const Main = () => {
  const dispatch = useAppDispatch()
  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }
  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
