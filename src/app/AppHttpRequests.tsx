import {type ChangeEvent, type CSSProperties, useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import {CreateItemForm, EditableSpan} from '@/common/components/index.ts'
import {BaseResponse} from "@/common/types/types.ts";
import {instance} from "@/common/instance";
import {Todolist, todolistsApi} from "@/features/todolists/api/todolistsApi.types.ts";

export type FieldError = {
    error: string
    field: string
}

export const AppHttpRequests = () => {

    const [todolists, setTodolists] = useState<any>([])
    const [tasks, setTasks] = useState<any>({})

    useEffect(() => {
        todolistsApi.getTodolists().then(res => setTodolists(res.data))
    }, [])

    const createTodolist = (title: string) => {
        todolistsApi.createTodolist({ title }).then(res => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })
    }

    const deleteTodolist = (id: string) => {
        todolistsApi.deleteTodolist({ id }).then(() => {
            setTodolists(todolists.filter((todolist: Todolist) => todolist.id !== id))
        })
    }

    const changeTodolistTitle = (id: string, title: string) => {
        todolistsApi.changeTodolistTitle({ id, title }).then(() => {
            setTodolists(todolists.map((todolist: Todolist) =>
                todolist.id === id ? { ...todolist, title } : todolist
            ))
        })
    }

    const createTask = (todolistId: string, title: string) => {
    }

    const deleteTask = (todolistId: string, taskId: string) => {
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {
    }

    const changeTaskTitle = (task: any, title: string) => {
    }

    return (
        <div style={{margin: '20px'}}>
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map((todolist: any) => (
                <div key={todolist.id} style={container}>
                    <div>
                        <EditableSpan value={todolist.title}
                                      onChange={title => changeTodolistTitle(todolist.id, title)}/>
                        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
                    </div>
                    <CreateItemForm onCreateItem={title => createTask(todolist.id, title)}/>
                    {tasks[todolist.id]?.map((task: any) => (
                        <div key={task.id}>
                            <Checkbox checked={task.isDone}
                                      onChange={e => changeTaskStatus(e, task)}/>
                            <EditableSpan value={task.title}
                                          onChange={title => changeTaskTitle(task, title)}/>
                            <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const container: CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
