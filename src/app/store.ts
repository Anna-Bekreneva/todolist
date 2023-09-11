import {appReducer} from "./app-reducer";
import {authReducer} from "features/auth/model/auth-reducer";
import {tasksReducer} from "features/todoLists/model/tasks-reducer";
import {todolistsReducer} from "features/todoLists/model/todolists-reducer";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        auth: authReducer,
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store