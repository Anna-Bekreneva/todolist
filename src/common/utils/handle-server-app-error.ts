import {Dispatch} from "redux";
import {BaseResponseType} from "common/api/api";
import {appActions} from "app/app-reducer";

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponseType<T>, showError: boolean = true) => {
    if (showError) {
        dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}