import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { CreateItemForm } from "@/common/components/createItemForm/CreateItemForm"
import { addTodolistTC, fetchTodolistsTC } from "@/features/todolists/model/todolists-reducer"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import { selectAppIsInitialized } from "@/app/app-selectors"
import { setAppInitializedAC } from "@/app/app-reducer"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { useEffect } from "react"
import { CircularProgress, Box } from "@mui/material"

export const Main = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectAppIsInitialized)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await dispatch(fetchTodolistsTC()).unwrap()
        dispatch(setAppInitializedAC({ isInitialized: true }))
      } catch (error) {
        console.error("Failed to initialize app:", error)
        dispatch(setAppInitializedAC({ isInitialized: true }))
      }
    }

    initializeApp()
  }, [dispatch])

  const createTodolist = async (title: string) => {
    try {
      await dispatch(addTodolistTC(title)).unwrap()
    } catch (error) {
      console.error("Failed to create todolist:", error)
    }
  }

  if (!isInitialized) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    )
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
