import React, { useState } from "react"
import { TextField } from "@mui/material"

type Props = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<Props> = ({ value, onChange }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(value)
  }

  const activateViewMode = () => {
    setEditMode(false)
    if (title.trim() !== value) {
      onChange(title.trim())
    }
  }

  return editMode ? (
    <TextField
      value={title}
      onChange={e => setTitle(e.target.value)}
      onBlur={activateViewMode}
      autoFocus
      size="small"
      variant="standard"
    />
  ) : (
    <span onDoubleClick={activateEditMode} style={{ cursor: "pointer" }}>
      {value}
    </span>
  )
} 