// import { useAppDispatch } from "../features/common/hooks/useAppDispatch"
// import { useAppSelector } from "../features/common/hooks/useAppSelector"
// import { CreateItemForm } from "../features/common/components/createItemForm/CreateItemForm"
// import { addTodolistTC, fetchTodolistsTC } from "@/features/todolists/model/todolists-reducer"
// import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
// import { selectAppIsInitialized } from "@/app/app-selectors"
// import { setAppInitializedAC } from "@/app/app-reducer"
// import Container from "@mui/material/Container"
// import Grid from "@mui/material/Grid"
// import { useEffect } from "react"
// import { CircularProgress, Box } from "@mui/material"
//
// export const Main = () => {
//   const dispatch = useAppDispatch()
//   const isInitialized = useAppSelector(selectAppIsInitialized)
//
//   useEffect(() => {
//     const initializeApp = async () => {
//       try {
//         await dispatch(fetchTodolistsTC()).unwrap()
//         dispatch(setAppInitializedAC({ isInitialized: true }))
//       } catch (error) {
//         console.error("Failed to initialize app:", error)
//         dispatch(setAppInitializedAC({ isInitialized: true }))
//       }
//     }
//
//     initializeApp()
//   }, [dispatch])
//
//   const createTodolist = async (title: string) => {
//     try {
//       await dispatch(addTodolistTC(title)).unwrap()
//     } catch (error) {
//       console.error("Failed to create todolist:", error)
//     }
//   }
//
//   if (!isInitialized) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
//         <CircularProgress />
//       </Box>
//     )
//   }
//
//   return (
//     <Container maxWidth={"lg"}>
//       <Grid container sx={{ mb: "30px" }}>
//         <CreateItemForm onCreateItem={createTodolist} />
//       </Grid>
//       <Grid container spacing={4}>
//         <Todolists />
//       </Grid>
//     </Container>
//   )
// }



import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "@/app/store"
import { App } from "@/app/App"

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
)
