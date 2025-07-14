import React, { useState } from "react"
import { Button, TextField } from "@mui/material"

type Props = {
  onCreateItem: (title: string) => void
}

export const CreateItemForm: React.FC<Props> = ({ onCreateItem }) => {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onCreateItem(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
      <TextField
        value={title}
        onChange={e => setTitle(e.target.value)}
        size="small"
        label="Название"
      />
      <Button type="submit" variant="contained" color="primary">
        Добавить
      </Button>
    </form>
  )
} 