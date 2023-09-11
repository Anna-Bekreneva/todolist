import {useDispatch} from "react-redux";
import {AppRootStateType} from "app/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()