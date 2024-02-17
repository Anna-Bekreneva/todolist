import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootStateType} from "../../app";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector