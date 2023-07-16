import {
    AddTodoListAT,
    RemoveTodoListAT,
    SetTodoListEntityStatusAT,
    SetTodoListsAT
} from '../TodoLists/todolists-reducer';
import {TasksStateType} from "../../../app/App";
import {AppThunk} from "../../../app/store";
import {RequestStatusType, SetErrorAT, setStatusAC, SetStatusAT} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/utils-error";
import {AxiosError} from "axios"
import {tasksAPI, TaskStatuses, TaskType} from "../../../api/tasks-api";
import {ErrorsType, ResultCode} from "../../../api/instance";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{...action.task, entityStatus: 'idle'}, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    status: action.status
                } : task)
            }
        }
        case 'CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const {[action.todoListId]: [], ...rest} = {...state}
            return rest
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todoLists.forEach((todolist) => {
                copyState[todolist.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todoListId]: action.tasks.map(task => ({...task, entityStatus: 'idle'}))}
        }
        case "CHANGE-TASK-ENTITY-STATUS": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    entityStatus: action.entityStatus
                } : task)
            }
        }
        case "CHANGE-TASKS-ENTITY-STATUS-AT-THE-TODOLIST": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => ({
                    ...task,
                    entityStatus: action.entityStatus
                }))
            }
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', task, todolistId} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-STATUS-TASK',
    taskId,
    status,
    todolistId
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TITLE-TASK',
    taskId,
    title,
    todolistId
} as const)
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todoListId, tasks} as const)
export const changeTaskEntityStatusAC = (todoListId: string, taskId: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE-TASK-ENTITY-STATUS",
    todoListId,
    taskId,
    entityStatus
} as const)
export const changeTasksEntityStatusAtTheTodoListAC = (todoListId: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE-TASKS-ENTITY-STATUS-AT-THE-TODOLIST",
    todoListId,
    entityStatus
} as const)

export const setTasksTC = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksAPI.getTasks(todoListId)
        .then((res) => {
            dispatch(setTasksAC(todoListId, res.data.items))
            dispatch(setStatusAC('succeeded'))
        })
}

export const removeTaskTC = (todoListId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todoListId, taskId, 'loading'))
    tasksAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(removeTaskAC(taskId, todoListId))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
            dispatch(changeTaskEntityStatusAC(todoListId, taskId, 'idle'))
        })
        .catch((e: AxiosError<ErrorsType>) => {
            const errorMessage = e.response ? e.response?.data.message : e.message
            handleServerNetworkError(dispatch, errorMessage)
            dispatch(changeTaskEntityStatusAC(todoListId, taskId, 'failed'))
        })
}

export const addTaskTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksAPI.createTask(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(addTaskAC(todoListId, res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            const errorMessage = e.response ? e.response?.data.message : e.message
            handleServerNetworkError(dispatch, errorMessage)
        })
}

export const changeTaskTitleTC = (todoListId: string, taskId: string, title: string): AppThunk => (dispatch, getState) => {
    const task = getState().tasks[todoListId].find(task => task.id === taskId)
    if (task) {
        dispatch(setStatusAC('loading'))
        tasksAPI.updateTask(todoListId, taskId, {
            status: task.status,
            deadline: task.deadline,
            priority: task.priority,
            description: task.description,
            startDate: task.startDate,
            title
        })
            .then((res) => {
                if (res.data.resultCode === ResultCode.OK) {
                    dispatch(changeTaskTitleAC(taskId, title, todoListId))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((e: AxiosError<ErrorsType>) => {
                const errorMessage = e.response ? e.response?.data.message : e.message
                handleServerNetworkError(dispatch, errorMessage)
            })
    }
}

export const changeTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses): AppThunk => (dispatch, getState) => {
    const task = getState().tasks[todoListId].find(task => task.id === taskId)
    if (task) {
        dispatch(setStatusAC('loading'))
        tasksAPI.updateTask(todoListId, taskId, {
            status,
            deadline: task.deadline,
            priority: task.priority,
            description: task.description,
            startDate: task.startDate,
            title: task.title
        })
            .then((res) => {
                if (res.data.resultCode === ResultCode.OK) {
                    dispatch(changeTaskStatusAC(taskId, status, todoListId))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((e: AxiosError<ErrorsType>) => {
                const errorMessage = e.response ? e.response?.data.message : e.message
                handleServerNetworkError(dispatch, errorMessage)
            })
    }
}

type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type SetTasksAT = ReturnType<typeof setTasksAC>
type ChangeTaskEntityStatusAT = ReturnType<typeof changeTaskEntityStatusAC>
export type ChangeTasksEntityStatusAtTheTodoListAT = ReturnType<typeof changeTasksEntityStatusAtTheTodoListAC>

export type TasksActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListsAT
    | SetTasksAT
    | SetStatusAT
    | SetErrorAT
    | SetTodoListEntityStatusAT
    | ChangeTaskEntityStatusAT
    | ChangeTasksEntityStatusAtTheTodoListAT
