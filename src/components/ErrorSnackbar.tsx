import React from "react";
import {Alert, Snackbar} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store";
import {appActions, ErrorStatusType} from "app/app-reducer";
import {selectAppError} from "app/app-selectors";

export const ErrorSnackbar = () => {
    const error = useAppSelector<ErrorStatusType>(selectAppError)
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(appActions.setAppError({error: ''}))
    };

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}