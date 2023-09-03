import {Dispatch} from "redux";
import {ResponseType} from "common/api/api";
import {appActions} from "app/app-reducer";

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length && typeof data.messages[0] === 'string' && data.messages[0].trim()) {
        dispatch(appActions.setAppError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setStatus({status: 'failed'}))
}