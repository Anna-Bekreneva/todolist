import {authReducer, InitialStateAuthType, setIsLoggedInAC} from "./auth-reducer";

let startState: InitialStateAuthType;

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('isLoggedIn should be change', () => {
    const endState = authReducer(startState, setIsLoggedInAC(true))
    expect(endState.isLoggedIn).toBe(!startState.isLoggedIn)
})