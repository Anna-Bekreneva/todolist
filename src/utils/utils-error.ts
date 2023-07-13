import {setAppErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, errorMessage: string) => {
    dispatch(setAppErrorAC(errorMessage))
    dispatch(setStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
    if (data.messages.length && typeof data.messages[0] === 'string' && data.messages[0].trim()) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

type ErrorUtilsDispatchType = SetErrorAT | SetStatusAT