import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, handleServerAppError, ResultCode, thunkTryCatch} from "common";
import {LoginValuesType} from "../ui";
import {authAPI} from "../api";
import {appActions} from "../../../app";
import {tasksActions, todolistsActions} from "../../todoLists";

const authInitialState = {
    isLoggedIn: false,
    captcha: '' as string | null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setCaptcha: (state, action: PayloadAction<{captcha: string | null}>) => {
            state.captcha = action.payload.captcha
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
        } else if (res.data.resultCode === ResultCode.captcha) {
            dispatch(authThunks.getCaptcha())
        } else {
            const isShowAppError = !res.data.fieldsErrors.length;
            handleServerAppError(dispatch, res.data, isShowAppError)
            return rejectWithValue(res.data)
        }
    })
})

const getCaptcha = createAppAsyncThunk<undefined, undefined>
('auth/captcha', async (_, thunkAPI) => {
    const { dispatch} = thunkAPI

    return thunkTryCatch(thunkAPI, async() => {
        const response = await authAPI.captcha()
        dispatch(authActions.setCaptcha({captcha: response.data.url}))
        return undefined
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
export const authThunks = {setIsLoggedIn, logout, getCaptcha}
export type AuthInitialStateType = typeof authInitialState
