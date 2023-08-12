import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {ErrorsType, ResultCode} from "../../api/instance";
import {FilterValuesType, TodoListDomainType} from "../../app/App";
import {AppThunk} from "../../app/store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/utils-error";
import {AxiosError} from "axios"
import {RequestStatusType, setStatusAC, SetStatusAT} from "../../app/app-reducer";
import {
    changeTasksEntityStatusAtTheTodoListAC,
    ChangeTasksEntityStatusAtTheTodoListAT,
    setTasksTC
} from "./Tasks/tasks-reducer";

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: TodoListsActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListId)
        case 'ADD-TODOLIST':
            return [...state, action.todoList]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "SET-TODOLISTS": {
            return action.todoLists.map(todolist => ({...todolist, filter: "all", entityStatus: 'idle'}))
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        case "CLEAR-DATA": {
            return []
        }
        default:
            return state
    }
}

export const removeTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', todoListId: id} as const)
export const addTodoListAC = (todoList: TodoListDomainType, id: string) => ({
    type: 'ADD-TODOLIST',
    todoList,
    id
} as const)
export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    todoListId
} as const)
export const changeTodoListTitleAC = (title: string, todoListId: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    todoListId
} as const)
export const setTodoListsAC = (todoLists: TodolistType[]) => ({type: "SET-TODOLISTS", todoLists} as const)
export const changeTodoListEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    id,
    entityStatus
} as const)

export const clearTodolistsAC = () => ({type: "CLEAR-DATA"} as const)

export const setTodoListsTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setStatusAC('succeeded'))
            return res.data
        })
        .then((todolists) => {
            todolists.forEach((todolist) => {
                dispatch(setTasksTC(todolist.id))
            })
        })
        .catch(() => {
            dispatch(setStatusAC('failed'))
        })
}

export const removeTodoListTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(id, 'loading'))
    dispatch(changeTasksEntityStatusAtTheTodoListAC(id, 'loading'))
    todolistAPI.deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(removeTodoListAC(id))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
                dispatch(changeTodoListEntityStatusAC(id, 'idle'))
            }
            dispatch(changeTasksEntityStatusAtTheTodoListAC(id, 'idle'))
        })
}

export const addTodoListTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                const todoList: TodoListDomainType = {...res.data.data.item, filter: 'all', entityStatus: 'idle'}
                dispatch(addTodoListAC(todoList, res.data.data.item.id))
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

export const updateTodoListTC = (id: string, title: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(changeTodoListTitleAC(title, id))
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

export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>
export type SetTodoListEntityStatusAT = ReturnType<typeof changeTodoListEntityStatusAC>
export type ClearTodolistsAT = ReturnType<typeof clearTodolistsAC>

export type TodoListsActionsType =
    RemoveTodoListAT
    | AddTodoListAT
    | SetTodoListsAT
    | SetStatusAT
    | SetTodoListEntityStatusAT
    | ChangeTasksEntityStatusAtTheTodoListAT
    | ClearTodolistsAT
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>