import {useAppDispatch} from '@/common/hooks'
import {FilterButtons} from './FilterButtons/FilterButtons'
import {addTaskTC, fetchTasksTC} from '@/features/todolists/model/tasks-reducer'
import type {Todolist} from '@/features/todolists/model/todolists-reducer'
import {Tasks} from './Tasks/Tasks'
import {TodolistTitle} from './TodolistTitle/TodolistTitle'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {useEffect} from 'react'

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [dispatch, todolist.id])

  const createTask = (title: string) => {
    dispatch(addTaskTC({todolistId: todolist.id, title}))
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
