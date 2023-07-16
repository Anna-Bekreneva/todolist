import {instance, ResponseType} from "./instance";

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}