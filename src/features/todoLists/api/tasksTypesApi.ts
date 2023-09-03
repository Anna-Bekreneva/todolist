import {TaskPriorities, TaskStatuses} from "common/enums/enums";

export type GetTasksType = {
    items: TaskType[]
    totalCount: number,
    error: null | string
}

export type TaskType = {
    id: string
    title: string
    description: string
    todolistId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}