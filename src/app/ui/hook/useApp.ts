import {appThunks, RequestStatusType, selectAppIsInitialized, selectAppStatus} from "../../model";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../common";
import {selectIsLoggedIn} from "../../../features";

export const useApp = () => {
    const lineProgressStatus = useAppSelector<RequestStatusType>(selectAppStatus)
    const isInitialized = useAppSelector<boolean>(selectAppIsInitialized)
    const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isInitialized) dispatch(appThunks.setAppInitialized())
    }, [])

    return {isInitialized, dispatch, isLoggedIn, lineProgressStatus}
}