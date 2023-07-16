import {AppThunk} from "./store";
import {authAPI} from "../api/auth-api";
import {ErrorsType, ResultCode} from "../api/instance";
import {AxiosError} from "axios"
import {handleServerAppError, handleServerNetworkError} from "../utils/utils-error";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = null | string

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorStatusType,
    isInitialized: false,
}

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case "APP/SET-STATUS": {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "APP/SET-INITIALIZED": {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: ErrorStatusType) => ({type: "APP/SET-ERROR", error} as const)
export const setAppInitializedAC = (isInitialized: boolean) => ({type: "APP/SET-INITIALIZED", isInitialized} as const)

export const setAppInitializedTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'));
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setStatusAC('succeeded'));
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(dispatch, res.data)
                dispatch(setStatusAC('failed'));
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            const error = e.response ? e.response?.data.message : e.message
            handleServerNetworkError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
        })
}

export type SetStatusAT = ReturnType<typeof setStatusAC>
export type SetErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppInitializedAT = ReturnType<typeof setAppInitializedAC>
export type InitialAppStateType = typeof initialState
export type AppActionsType = SetStatusAT | SetErrorAT | SetAppInitializedAT
