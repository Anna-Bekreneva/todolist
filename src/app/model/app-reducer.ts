import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, ResultCode, thunkTryCatch} from "../../common";
import {authActions, authAPI} from "../../features";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = null | string

const appInitialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorStatusType,
    isInitialized: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: ErrorStatusType }>) => {
            state.error = action.payload.error
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

const setAppInitialized = createAppAsyncThunk<undefined, undefined>
('app/setAppInitialized', async (_, thunkAPI) => {
    const {dispatch} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
        }
        return undefined
    }).finally(() => {
        dispatch(appActions.setAppInitialized({isInitialized: true}));
    })
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
export const appThunks = {setAppInitialized}
export type appInitialStateType = typeof appInitialState