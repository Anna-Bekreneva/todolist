import {api, ResponseType} from "common/api/api";
import {GetTasksType, TaskType, UpdateTaskModelType} from "features/todoLists/api/tasksTypesApi";

export const tasksAPI = {
    getTasks(todolistId: string) {
        return api.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return api.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return api.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return api.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}