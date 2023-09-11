import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppRootStateType} from "app/store";
import {AppDispatch} from "common/hooks/useAppDispatch";
import {BaseResponseType} from "common/api/api";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: BaseResponseType | null
}>()