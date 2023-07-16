import {appReducer, InitialAppStateType, setAppErrorAC, setAppInitializedAC, setStatusAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('app status should be change', () => {
    const action = setStatusAC('idle')

    const endState = appReducer(startState, action)
    expect(endState.status).toBe('idle')
})

test('app error should be change', () => {
    const action = setAppErrorAC('error')

    const endState = appReducer(startState, action)
    expect(endState.error).toBe('error')
})

test('app initialized should be change',() => {
    const endState = appReducer(startState, setAppInitializedAC(true))
    expect(endState.isInitialized).toBe(!endState.isInitialized)
})