import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f7924403-26c6-4ed7-ac40-d679f3c4cd6f',
    },
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TasksType>(`${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<TasksType>(`${todolistId}/tasks/${taskId}`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TasksType>(`${todolistId}/tasks/${taskId}`)
    },
}

type TaskType = {
    id: string
    title: string
    description: null | string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: null | string
    deadline: null | string
    addedDate: string
}

type GetTasksType = {
    items: TaskType[]
    "totalCount": 1,
    "error": null
}

type TasksType = {
    data: {
        items: TaskType[]
    }
    messages: string[]
    fieldsErrors: string[]
    resultCode: 0
}