import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppRootStateType} from "../../app";
import {AppDispatch} from "../hooks";
import {BaseResponseType} from "../api";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: BaseResponseType | null
}>()