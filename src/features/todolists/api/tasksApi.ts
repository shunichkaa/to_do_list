import { instance } from "@/common/instance"
import { BaseResponse } from "@/common/types/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    return instance.delete<BaseResponse>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${payload.todolistId}/tasks`, {
      title: payload.title,
    })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
      payload.model,
    )
  },
}
