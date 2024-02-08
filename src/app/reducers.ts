import {combineReducers} from "@reduxjs/toolkit";
import {tasksReducer} from "../features/todoLists/model/tasks-reducer";
import {todolistsReducer} from "../features/todoLists/model/todolists-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/auth/model/auth-reducer";
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
