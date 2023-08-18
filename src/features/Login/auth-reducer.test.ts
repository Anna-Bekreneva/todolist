import {authActions, AuthInitialStateType, authReducer,} from "./auth-reducer";

let startState: AuthInitialStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('isLoggedIn should be change', () => {
    const endState = authReducer(startState, authActions.setIsLoggedIn({isLoggedIn: true}))
    expect(endState.isLoggedIn).toBe(!startState.isLoggedIn)
})