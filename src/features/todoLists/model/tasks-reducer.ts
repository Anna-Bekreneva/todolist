import {TasksStateType} from "app/App";
import {ResultCode} from "common/api/api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "app/app-reducer";
import {todolistsThunks} from "features/todoLists/model/todolists-reducer";
import {createAppAsyncThunk, handleServerAppError, thunkTryCatch} from "common/utils";
import {TaskType, UpdateTaskModelType} from "features/todoLists/api/tasksTypesApi";
import {tasksAPI} from "features/todoLists/api/tasks-api";
import {RemoveTaskArgType, UpdateTaskArgType} from "common/enums/enums";

const tasksInitialState: TasksStateType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {
        changeTaskEntityStatus: (state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) => {
            const tasks = state[action.payload.todolistId]
            const task = tasks.find(task => task.id === action.payload.taskId)
            if (task) task.entityStatus = action.payload.entityStatus
        },
        changeTasksEntityStatusAtTheTodoList: (state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) => {
            const tasks = state[action.payload.todolistId]
            tasks.forEach(task => task.entityStatus = action.payload.entityStatus)
        },
        clearTasks: () => {
            return {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(todolistsThunks.setTodolists.fulfilled, (state, action) => {
            action.payload.todoLists.forEach((todolist) => {
                state[todolist.id] = []
            })
        })
        builder.addCase(setTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks.map(task => ({...task, entityStatus: 'idle'}))
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const taskIndex = tasks.findIndex(task => task.id === action.payload.taskId)
            if (taskIndex !== -1) tasks.splice(taskIndex, 1)
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            tasks.unshift({...action.payload.task, entityStatus: 'idle'})
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const taskIndex = tasks.findIndex(task => task.id === action.payload.taskId)
            if (taskIndex !== -1) tasks[taskIndex] = {...tasks[taskIndex], ...action.payload.domainModel}
        })
    }
})

const setTasks = createAppAsyncThunk<{ todolistId: string, tasks: TaskType[] }, { todolistId: string }>
('tasks/setTasks', async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await tasksAPI.getTasks(arg.todolistId)
        return {todolistId: arg.todolistId, tasks: res.data.items}
    })
})

const removeTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>
('tasks/removeTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        dispatch(tasksActions.changeTaskEntityStatus({
            todolistId: arg.todolistId,
            taskId: arg.taskId,
            entityStatus: 'loading'
        }))
        const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(tasksActions.changeTaskEntityStatus({
                todolistId: arg.todolistId,
                taskId: arg.taskId,
                entityStatus: 'idle'
            }))
            return {todolistId: arg.todolistId, taskId: arg.taskId}
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(tasksActions.changeTaskEntityStatus({
                todolistId: arg.todolistId,
                taskId: arg.taskId,
                entityStatus: 'idle'
            }))
            return rejectWithValue(null)
        }
    })
})

const addTask = createAppAsyncThunk<{ todolistId: string, task: TaskType }, { todolistId: string, title: string }>
('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await tasksAPI.createTask(arg.todolistId, arg.title)
        if (res.data.resultCode === ResultCode.success) {
            return {todolistId: arg.todolistId, task: res.data.data.item}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>
('tasks/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const task = getState().tasks[arg.todolistId].find(task => task.id === arg.taskId)
        if (!task) {
            return rejectWithValue(null)
        }
        const updateModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            priority: task.priority,
            description: task.description,
            startDate: task.startDate,
            ...arg.domainModel
        }
        const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, updateModel)
        if (res.data.resultCode === ResultCode.success) {
            return {todolistId: arg.todolistId, taskId: arg.taskId, domainModel: arg.domainModel}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions
export const tasksThunks = {setTasks, removeTask, addTask, updateTask}