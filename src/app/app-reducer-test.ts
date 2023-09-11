import {appActions, appInitialStateType, appReducer} from "./app-reducer";

let startState: appInitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('app status should be change', () => {
    const action = appActions.setAppStatus({status: 'idle'})

    const endState = appReducer(startState, action)
    expect(endState.status).toBe('idle')
})

test('app error should be change', () => {
    const action = appActions.setAppError({error: 'error'})
    const endState = appReducer(startState, action)
    expect(endState.error).toBe('error')
})

test('app initialized should be change',() => {
    const endState = appReducer(startState, appActions.setAppInitialized({isInitialized: true}))
    expect(endState.isInitialized).toBe(!endState.isInitialized)
})