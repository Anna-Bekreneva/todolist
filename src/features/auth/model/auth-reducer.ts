import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, handleServerAppError, ResultCode, thunkTryCatch} from "common";
import {LoginValuesType} from "../ui";
import {authAPI} from "../api";
import {appActions} from "../../../app";
import {tasksActions, todolistsActions} from "../../todoLists";


const authInitialState = {
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
})

const setIsLoggedIn = createAppAsyncThunk<undefined, { data: LoginValuesType }>
('auth/setIsLoggedIn', async (args, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.login(args.data)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
        } else {
            const isShowAppError = !res.data.fieldsErrors.length;
            handleServerAppError(dispatch, res.data, isShowAppError)
            return rejectWithValue(res.data)
        }
    })
})

const logout = createAppAsyncThunk<undefined, undefined>
('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppInitialized({isInitialized: true}));
            dispatch(authActions.setIsLoggedIn({isLoggedIn: false}));
            dispatch(todolistsActions.clearTodolists())
            dispatch(tasksActions.clearTasks())
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export const authThunks = {setIsLoggedIn, logout}
export type AuthInitialStateType = typeof authInitialState
