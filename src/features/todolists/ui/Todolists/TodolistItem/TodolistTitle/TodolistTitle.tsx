import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch'
import { EditableSpan } from '../../../../../common/components/editableSpan/EditableSpan'
import { changeTodolistTitleTC, removeTodolistTC, type Todolist } from "@/features/todolists/model/todolists-reducer"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"

type Props = {
  todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const deleteTodolist = async () => {
    try {
      await dispatch(removeTodolistTC(id)).unwrap()
    } catch (error) {
      console.error("Failed to delete todolist:", error)
    }
  }

  const changeTodolistTitle = async (title: string) => {
    try {
      await dispatch(changeTodolistTitleTC({ id, title })).unwrap()
    } catch (error) {
      console.error("Failed to update todolist title:", error)
    }
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
