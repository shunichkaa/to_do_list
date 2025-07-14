import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTodolistsAC } from './todolists-slice'
import type { RootState } from './store'

// Моковый API для примера
const todolistsApi = {
  getTodolists: () => Promise.resolve({
    data: [
      { id: '1', title: 'Первая', addedDate: '', order: 0 },
      { id: '2', title: 'Вторая', addedDate: '', order: 1 },
    ]
  })
}

export const Todolists: React.FC = () => {
  const todolists = useSelector((state: RootState) => state.todolists)
  const dispatch = useDispatch()

  useEffect(() => {
    todolistsApi.getTodolists().then(res => {
      dispatch(setTodolistsAC({ todolists: res.data }))
    })
  }, [dispatch])

  return (
    <div>
      <h2>Тудулисты с сервера:</h2>
      <ul>
        {todolists.map(tl => (
          <li key={tl.id}>{tl.title} (filter: {tl.filter})</li>
        ))}
      </ul>
    </div>
  )
} 