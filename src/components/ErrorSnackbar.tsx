import React from "react";
import {Alert, Snackbar} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/store";
import {ErrorStatusType, setAppErrorAC} from "../app/app-reducer";

export const ErrorSnackbar = () => {
    const error = useAppSelector<ErrorStatusType>(state => state.app.error)
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