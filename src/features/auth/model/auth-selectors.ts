import {AppRootStateType} from "../../../app";

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectCaptcha = (state: AppRootStateType) => state.auth.captcha