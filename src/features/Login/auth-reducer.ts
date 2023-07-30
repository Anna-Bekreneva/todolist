import {LoginValuesType} from "./Login";
import {AppThunk} from "../../app/store";
import {authAPI} from "../../api/auth-api";
import {setAppInitializedAC, setStatusAC} from "../../app/app-reducer";
import {ErrorsType, ResultCode} from "../../api/instance";
import {handleServerAppError, handleServerNetworkError} from "../../utils/utils-error";
import {AxiosError} from "axios"
import {clearTodolistsAC} from "../TodoLists/todolists-reducer";

const initialStateAuth = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateAuthType = initialStateAuth, action: AuthReducerActionsTypes): InitialStateAuthType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default: return state
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', isLoggedIn} as const)

export const setIsLoggedInTC = (data: LoginValuesType): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAC('succeeded'))
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
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppInitializedAC(true))
                dispatch(clearTodolistsAC())
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            const error = e.response ? e.response.data.message : e.message
            handleServerNetworkError(dispatch, error)
        })
}

export type setIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>
export type InitialStateAuthType = typeof initialStateAuth
export type AuthReducerActionsTypes = setIsLoggedInAT