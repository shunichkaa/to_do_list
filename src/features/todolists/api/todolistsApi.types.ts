import {BaseResponse} from "@/common/types/types"
import {instance} from "@/common/instance"

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>("/todo-lists")
    },
    changeTodolistTitle(payload: { id: string; title: string }) {
        const {title, id} = payload
        return instance.put<BaseResponse>(`/todo-lists/${id}`, {title})
    },
    createTodolist(payload: { title: string }) {
        return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", {title: payload.title})
    },
    deleteTodolist(payload: { id: string }) {
        return instance.delete<BaseResponse>(`/todo-lists/${payload.id}`)
    },
}
