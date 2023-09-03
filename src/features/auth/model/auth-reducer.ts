import {LoginValuesType} from "features/auth/model/Login";
import {AppThunk} from "app/store";
import {authAPI} from "features/auth/api/auth-api";
import {ErrorsType, ResultCode} from "common/api/api";
import {handleServerAppError, handleServerNetworkError} from "common/utils";
import {AxiosError} from "axios"
import {todolistsActions} from "features/todoLists/model/todolists-reducer";
import {appActions} from "app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {tasksActions} from "features/todoLists/model/tasks-reducer";

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
    }
})

export const setIsLoggedInTC = (data: LoginValuesType): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}));
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                dispatch(appActions.setStatus({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            const error = e.response ? e.response.data.message : e.message
            handleServerNetworkError(dispatch, error)
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}));
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setStatus({status: 'succeeded'}));
                dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(appActions.setAppInitialized({isInitialized: true}));
                dispatch(todolistsActions.clearTodolists())
                dispatch(tasksActions.clearTasks())
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            const error = e.response ? e.response.data.message : e.message
            handleServerNetworkError(dispatch, error)
        })
}

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export type AuthInitialStateType = typeof authInitialState
