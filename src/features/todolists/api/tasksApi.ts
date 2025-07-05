import { instance } from '@/common/instance';
import { BaseResponse } from '@/common/types/types';

export type Task = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type UpdateTaskModel = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<{ items: Task[] }>(`/todo-lists/${todolistId}/tasks`);
    },
    deleteTask(payload: { todolistId: string, taskId: string }) {
        return instance.delete<BaseResponse>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`);
    },
    createTask(payload: { todolistId: string, title: string }) {
        return instance.post<BaseResponse<{ item: Task }>>(`/todo-lists/${payload.todolistId}/tasks`, { title: payload.title });
    },
    updateTask(payload: { todolistId: string, taskId: string, model: UpdateTaskModel }) {
        return instance.put<BaseResponse<{ item: Task }>>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`, payload.model);
    },
}; 