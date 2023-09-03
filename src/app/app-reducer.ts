import {AppThunk} from "./store";
import {authAPI} from "features/auth/api/auth-api";
import {ErrorsType, ResultCode} from "common/api/api";
import {AxiosError} from "axios"
import {handleServerAppError, handleServerNetworkError} from "common/utils";
import {authActions} from "features/auth/model/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = null | string

const appInitialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorStatusType,
    isInitialized: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        setStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{error: ErrorStatusType}>) => {
            state.error = action.payload.error
        },
        setAppInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const setAppInitializedTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}));
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setStatus({status: 'succeeded'}));
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            } else {
                handleServerAppError(dispatch, res.data)
                dispatch(appActions.setStatus({status: 'failed'}));
            }
            //dispatch(appActions.setAppInitialized({isInitialized: true})); ??
        })
        .catch((e: AxiosError<ErrorsType>) => {
            const error = e.response ? e.response?.data.message : e.message
            handleServerNetworkError(dispatch, error)
        })
        .finally(() => {
            dispatch(appActions.setAppInitialized({isInitialized: true}));
        })
}

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
export type appInitialStateType = typeof appInitialState