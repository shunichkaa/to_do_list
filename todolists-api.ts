import {instance} from "storybook/internal/node-logger";
import {ResponseType} from "axios";

export const todoListsApi = {
    getTodolists() {
        const promise = instance.get<TodolistType[]>('todo-lists');
        return promise;
    }
},
    createTodolist(title: string) {
const promise = instance.post<ResponseType<{item: TodolistType}>>('todo-lists');
return promise;
},
