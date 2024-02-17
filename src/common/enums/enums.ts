import {UpdateTaskModelType} from "../../features";

export enum TaskStatuses {
    new = 0,
    inProgress = 1,
    completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    low = 0,
    middle = 1,
    hi = 2,
    urgently = 3,
    later = 4
}

export type UpdateTaskArgType = {
    todolistId: string,
    taskId: string,
    domainModel: UpdateTaskModelType
}

export type RemoveTaskArgType = {
    todolistId: string,
    taskId: string
}