import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components/index"
import { BaseResponse } from "@/common/types/types"
import { instance } from "@/common/instance"
import { Todolist, todolistsApi } from "@/features/todolists/api/todolistsApi.types"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"

export type FieldError = {
  error: string
  field: string
}

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res: { data: Todolist[] }) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((todolist: Todolist) => {
        tasksApi.getTasks(todolist.id).then((res: { data: { items: DomainTask[] } }) => {
          setTasks((prev) => ({ ...prev, [todolist.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist({ title }).then((res: { data: { data: { item: Todolist } } }) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist({ id }).then(() => {
      setTodolists(todolists.filter((todolist: Todolist) => todolist.id !== id))
      setTasks((prev) => {
        const newTasks = { ...prev }
        delete newTasks[id]
        return newTasks
      })
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle({ id, title }).then(() => {
      setTodolists(todolists.map((todolist: Todolist) => (todolist.id === id ? { ...todolist, title } : todolist)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask({ todolistId, title }).then((res: { data: { data: { item: DomainTask } } }) => {
      const newTask = res.data.data.item
      setTasks((prev) => ({ ...prev, [todolistId]: [newTask, ...(prev[todolistId] || [])] }))
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask({ todolistId, taskId }).then(() => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId]?.filter((t) => t.id !== taskId) || [],
      }))
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const todolistId = task.todoListId
    const model = {
      description: task.description,
      title: task.title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: e.target.checked ? TaskStatus.Completed : TaskStatus.New,
    }
    tasksApi.updateTask({ todolistId, taskId: task.id, model }).then(() => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId]?.map((t) => (t.id === task.id ? { ...t, ...model } : t)) || [],
      }))
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const todolistId = task.todoListId
    const model = {
      description: task.description,
      title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    }
    tasksApi.updateTask({ todolistId, taskId: task.id, model }).then(() => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId]?.map((t) => (t.id === task.id ? { ...t, ...model } : t)) || [],
      }))
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist: Todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan
              value={todolist.title}
              onChange={(title: string) => changeTodolistTitle(todolist.id, title)}
            />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title: string) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task: DomainTask) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan value={task.title} onChange={(title: string) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
