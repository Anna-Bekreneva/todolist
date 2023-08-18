import {todolistAPI, TodolistType} from "api/todolist-api";
import {ErrorsType, ResultCode} from "api/instance";
import {FilterValuesType, TodoListDomainType} from "app/App";
import {AppThunk} from "app/store";
import {handleServerAppError, handleServerNetworkError} from "utils/utils-error";
import {AxiosError} from "axios"
import {appActions, RequestStatusType} from "app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setTasksTC, tasksActions} from "features/TodoLists/Tasks/tasks-reducer";

const todolistsInitialState: Array<TodoListDomainType> = []

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: todolistsInitialState,
    reducers: {
        removeTodoList: (state, action: PayloadAction<{id: string}>) => {
            const index = state.findIndex((todolist: TodolistType) => todolist.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        },
        addTodoList: (state, action: PayloadAction<{todoList: TodoListDomainType, id: string}>) => {
            state.push(action.payload.todoList)
        },
        changeTodoListFilter: (state, action: PayloadAction<{filter: FilterValuesType, id: string}>) => {
            const todolist = state.find((todolist: TodolistType) => todolist.id === action.payload.id)
            if (todolist) todolist.filter = action.payload.filter
        },
        changeTodoListTitle: (state, action: PayloadAction<{title: string, id: string}>) => {
            const todolist = state.find((todolist: TodolistType) => todolist.id === action.payload.id)
            if (todolist) todolist.title = action.payload.title
        },
        setTodoLists: (state, action: PayloadAction<{todoLists: TodolistType[]}>) => {
            return action.payload.todoLists.map((todolist) => ({...todolist, filter: "all", entityStatus: "idle"}))
        },
        changeTodoListEntityStatus: (state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) => {
            const todolist = state.find((todolist: TodolistType) => todolist.id === action.payload.id)
            if (todolist) todolist.entityStatus = action.payload.entityStatus
        },
        clearTodolists: (state) => {
            return []
        }
    }
})

export const setTodoListsTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}));
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(todolistsActions.setTodoLists({todoLists: res.data}))
            dispatch(appActions.setStatus({status: 'succeeded'}));
            return res.data
        })
        .then((todolists) => {
            todolists.forEach((todolist) => {
                dispatch(setTasksTC(todolist.id))
            })
        })
        .catch(() => {
            dispatch(appActions.setStatus({status: 'failed'}));
        })
}

export const removeTodoListTC = (id: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}));
    dispatch(todolistsActions.changeTodoListEntityStatus({id, entityStatus: "loading"}))
    dispatch(tasksActions.changeTasksEntityStatusAtTheTodoList({todoListId: id, entityStatus: 'loading'}))
    todolistAPI.deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(todolistsActions.removeTodoList({id}))
                dispatch(appActions.setStatus({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data)
                dispatch(todolistsActions.changeTodoListEntityStatus({id, entityStatus: "idle"}))
            }
            dispatch(tasksActions.changeTasksEntityStatusAtTheTodoList({todoListId: id, entityStatus: 'idle'}))
        })
}

export const addTodoListTC = (title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}));
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                const todoList: TodoListDomainType = {...res.data.data.item, filter: 'all', entityStatus: 'idle'}
                dispatch(todolistsActions.addTodoList({todoList, id: res.data.data.item.id}))
                dispatch(appActions.setStatus({status: 'succeeded'}));
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
    dispatch(appActions.setStatus({status: 'loading'}));
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(todolistsActions.changeTodoListTitle({title, id}))
                dispatch(appActions.setStatus({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            const errorMessage = e.response ? e.response?.data.message : e.message
            handleServerNetworkError(dispatch, errorMessage)
        })
}

export const todolistsReducer = todolistsSlice.reducer
export const todolistsActions = todolistsSlice.actions