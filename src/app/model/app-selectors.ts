import {AppRootStateType} from "app/store/store";

export const selectAppIsInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppError = (state: AppRootStateType) => state.app.error
