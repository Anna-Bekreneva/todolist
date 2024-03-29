import {Dispatch} from "redux";
import axios from "axios";
import {appActions} from "../../app";

export const handleServerNetworkError = (dispatch: Dispatch, error: unknown) => {
    let errorMessage = "Some error occurred"

    if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error?.message || errorMessage
    } else if (error instanceof Error) {
        errorMessage = `Native error: ${error.message}`
    } else {
        errorMessage = JSON.stringify(error)
    }

    dispatch(appActions.setAppError({ error: errorMessage }));
    dispatch(appActions.setAppStatus({ status: "failed" }));
}