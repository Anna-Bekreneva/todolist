import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createAppAsyncThunk,
    FilterValuesType,
    handleServerAppError,
    ResultCode,
    thunkTryCatch,
    TodoListDomainType
} from "../../../common";
import {ChangeTodoListTitleArgType, CreateTodolistArgType, todolistAPI, TodolistType} from "../api";

const todolistsInitialState: Array<TodoListDomainType> = []

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: todolistsInitialState,
    reducers: {
        changeTodoListFilter: (state, action: PayloadAction<{filter: FilterValuesType, id: string}>) => {
            const todolist = state.find((todolist: TodolistType) => todolist.id === action.payload.id)
            if (todolist) todolist.filter = action.payload.filter
        },
        clearTodolists: (state) => {
            return []
        }
    },
    extraReducers(builder) {
        builder.addCase(setTodolists.fulfilled, (state, action) => {
            return action.payload.todoLists.map((todolist) => ({...todolist, filter: "all", entityStatus: "idle"}))
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex((todolist: TodolistType) => todolist.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        })
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift(action.payload.todoList)
        })
        builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
            const todolist = state.find((todolist: TodolistType) => todolist.id === action.payload.id)
            if (todolist) todolist.title = action.payload.title
        })
    }
})

const setTodolists = createAppAsyncThunk<{todoLists: TodolistType[]}, undefined>
('todolists/setTodoLists', async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistAPI.getTodolist()
        return {todoLists: res.data}
    })
})

const removeTodolist = createAppAsyncThunk<{id: string}, {id: string}>
('todolists/removeTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistAPI.deleteTodolist(arg.id)
        if (res.data.resultCode === ResultCode.success) {
            return {id: arg.id}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

const addTodolist = createAppAsyncThunk<CreateTodolistArgType, {title: string}>
('todolists/addTodolist', async (arg,thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistAPI.createTodolist(arg.title)
        if (res.data.resultCode === ResultCode.success) {
            const todoList: TodoListDomainType = {...res.data.data.item, filter: 'all', entityStatus: 'idle'}
            return {todoList, id: res.data.data.item.id}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

const changeTodoListTitle = createAppAsyncThunk<ChangeTodoListTitleArgType, ChangeTodoListTitleArgType>
('todolists/updateTodoList', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistAPI.updateTodolist(arg.id, arg.title)
        if (res.data.resultCode === ResultCode.success) {
            return {id: arg.id, title: arg.title}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

export const todolistsReducer = todolistsSlice.reducer
export const todolistsActions = todolistsSlice.actions
export const todolistsThunks = {setTodolists, removeTodolist, addTodolist, changeTodoListTitle}