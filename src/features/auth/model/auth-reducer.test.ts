import {AuthInitialStateType, authReducer, authThunks} from "./auth-reducer";

let startState: AuthInitialStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        captcha: ''
    }
})

test('isLoggedIn should be change', () => {
    type ActionType = {
        type: typeof authThunks.setIsLoggedIn.fulfilled.type
        payload: {isLoggedIn: boolean}
    }
    const action: ActionType = {
        type: authThunks.setIsLoggedIn.fulfilled.type,
        payload: {isLoggedIn: true}
    }
    const endState = authReducer(startState, action)
    expect(endState.isLoggedIn).toBe(!startState.isLoggedIn)
})