import React from 'react'
import { Todolist } from '../types'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { createTaskAC } from '../features/tasks/tasksSlice'
import { TodolistTitle } from './TodolistTitle'
import { CreateItemForm } from '../common/components/createItemForm/CreateItemForm'
import { Tasks } from './Tasks'
import { FilterButtons } from './FilterButtons'

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC(todolist.id, title))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}