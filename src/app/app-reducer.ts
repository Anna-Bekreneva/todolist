export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = null | string

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorStatusType
}

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case "APP-SET-STATUS": {
            return {...state, status: action.status}
        }
        case "APP-SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type: "APP-SET-STATUS", status} as const)
export const setAppErrorAC = (error: ErrorStatusType) => ({type: "APP-SET-ERROR", error} as const)

export type SetStatusAT = ReturnType<typeof setStatusAC>
export type SetErrorAT = ReturnType<typeof setAppErrorAC>
export type InitialAppStateType = typeof initialState
export type AppActionsType = SetStatusAT | SetErrorAT
