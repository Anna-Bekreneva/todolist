import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f7924403-26c6-4ed7-ac40-d679f3c4cd6f',
    },
})

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

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    fieldsError: string
    messages: string[]
    data: T
}