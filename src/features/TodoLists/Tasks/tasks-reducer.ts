import {TasksStateType} from "app/App";
import {AppThunk} from "app/store";
import {handleServerAppError, handleServerNetworkError} from "utils/utils-error";
import {AxiosError} from "axios"
import {tasksAPI, TaskStatuses, TaskType} from "api/tasks-api";
import {ErrorsType, ResultCode} from "api/instance";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions, RequestStatusType} from "app/app-reducer";
import {todolistsActions} from "../../TodoLists/todolists-reducer";

const tasksInitialState: TasksStateType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ taskId: string, todoListId: string }>) => {
            const tasks = state[action.payload.todoListId]
            const taskIndex = tasks.findIndex(task => task.id === action.payload.taskId)
            if (taskIndex !== -1) tasks.splice(taskIndex, 1)
        },
        addTask: (state, action: PayloadAction<{ todoListId: string, task: TaskType }>) => {
            const tasks = state[action.payload.todoListId]
            tasks.unshift({...action.payload.task, entityStatus: 'idle'})
        },
        changeTaskStatus: (state, action: PayloadAction<{ taskId: string, status: TaskStatuses, todoListId: string }>) => {
            const tasks = state[action.payload.todoListId]
            const task = tasks.find(task => task.id === action.payload.taskId)
            if (task) task.status = action.payload.status
        },
        changeTaskTitle: (state, action: PayloadAction<{ taskId: string, title: string, todoListId: string }>) => {
            const tasks = state[action.payload.todoListId]
            const task = tasks.find(task => task.id === action.payload.taskId)
            if (task) task.title = action.payload.title
        },
        setTasks: (state, action: PayloadAction<{ todoListId: string, tasks: TaskType[] }>) => {
            state[action.payload.todoListId] = action.payload.tasks.map(task => ({...task, entityStatus: 'idle'}))
        },
        changeTaskEntityStatus: (state, action: PayloadAction<{ todoListId: string, taskId: string, entityStatus: RequestStatusType }>) => {
            const tasks = state[action.payload.todoListId]
            const task = tasks.find(task => task.id === action.payload.taskId)
            if (task) task.entityStatus = action.payload.entityStatus
        },
        changeTasksEntityStatusAtTheTodoList: (state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) => {
            const tasks = state[action.payload.todoListId]
            tasks.forEach(task => task.entityStatus = action.payload.entityStatus)
        },
        clearTasks: () => {
            return {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(todolistsActions.addTodoList, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(todolistsActions.removeTodoList, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(todolistsActions.setTodoLists, (state, action) => {
            action.payload.todoLists.forEach((todolist) => {
                state[todolist.id] = []
            })
        })
    }
})

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions

export const setTasksTC = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    tasksAPI.getTasks(todoListId)
        .then((res) => {
            dispatch(tasksActions.setTasks({todoListId, tasks: res.data.items}))
            dispatch(appActions.setStatus({status: 'succeeded'}))
        })
}

export const removeTaskTC = (todoListId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    dispatch(tasksActions.changeTaskEntityStatus({todoListId, taskId, entityStatus: 'loading'}))
    tasksAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(tasksActions.removeTask({taskId, todoListId}))
                dispatch(appActions.setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
            dispatch(tasksActions.changeTaskEntityStatus({todoListId, taskId, entityStatus: 'idle'}))
        })
        .catch((e: AxiosError<ErrorsType>) => {
            const errorMessage = e.response ? e.response?.data.message : e.message
            handleServerNetworkError(dispatch, errorMessage)
            dispatch(tasksActions.changeTaskEntityStatus({todoListId, taskId, entityStatus: 'failed'}))
        })
}

export const addTaskTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    tasksAPI.createTask(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(tasksActions.addTask({todoListId, task: res.data.data.item}))
                dispatch(appActions.setStatus({status: 'succeeded'}))
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
        dispatch(appActions.setStatus({status: 'loading'}))
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
                    dispatch(tasksActions.changeTaskTitle({taskId, title, todoListId}))
                    dispatch(appActions.setStatus({status: 'succeeded'}))
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
        dispatch(appActions.setStatus({status: 'loading'}))
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
                    dispatch(tasksActions.changeTaskStatus({taskId, status, todoListId}))
                    dispatch(appActions.setStatus({status: 'succeeded'}))
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
