import {useAppDispatch} from '@/common/hooks'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {addTodolistTC, fetchTodolistsTC} from '@/features/todolists/model/todolists-reducer'
import {Todolists} from '@/features/todolists/ui/Todolists/Todolists'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import {useEffect} from 'react'

export const Main = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  const createTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  return (
      <Container maxWidth={'lg'}>
        <Grid container sx={{mb: '30px'}}>
          <CreateItemForm onCreateItem={createTodolist}/>
        </Grid>
        <Grid container spacing={4}>
          <Todolists/>
        </Grid>
      </Container>
  )
}
