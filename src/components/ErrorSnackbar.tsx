import React from "react";
import {Alert, Snackbar} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {ErrorStatusType, setAppErrorAC} from "../state/app-reducer";

export const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, ErrorStatusType>(state => state.app.error)
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorAC(''))
    };

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}