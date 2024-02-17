import {GetTasksType, TaskType, UpdateTaskModelType} from "./tasks-types-api";
import {api, BaseResponseType} from "../../../../common";


export const tasksAPI = {
    getTasks(todolistId: string) {
        return api.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return api.post<BaseResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return api.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return api.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}