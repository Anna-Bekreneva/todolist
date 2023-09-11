import { handleServerNetworkError } from 'common/utils';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {appActions} from "app/app-reducer";
import {BaseResponseType} from "common/api/api";
import {AppRootStateType} from "app/store";
import {AppDispatch} from "common/hooks/useAppDispatch";

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