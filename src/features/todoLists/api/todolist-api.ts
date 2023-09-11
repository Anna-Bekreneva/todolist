import {api, BaseResponseType} from "common/api/api";
import {TodolistType} from "features/todoLists/api/todolistsTypesApi";

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return api.put<BaseResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return api.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return api.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    getTodolist() {
        return api.get<TodolistType[]>('todo-lists')
    }
}
