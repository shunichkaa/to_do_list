import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { selectTodolists, Todolist } from '../features/todolists/todolistsSlice'
import { TodolistItem } from './TodolistItem'

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists) as Todolist[]

    return (
        <>
            {todolists.map((todolist: Todolist) => (
                <Grid key={todolist.id}>
                    <Paper sx={{p: '0 20px 20px 20px'}}>
                        <TodolistItem todolist={todolist}/>
                    </Paper>
                </Grid>
            ))}
        </>
    )
}