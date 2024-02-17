import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {appActions, AppRootStateType} from "../../app";
import {AppDispatch} from "../hooks";
import {BaseResponseType} from "../api";
import {handleServerNetworkError} from "./handle-server-network-error";


export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
        return await logic();
    } catch (error) {
        handleServerNetworkError(dispatch, error);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({ status: "idle" }));
    }
};