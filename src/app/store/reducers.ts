import {combineReducers} from "@reduxjs/toolkit";
import {authReducer, tasksReducer, todolistsReducer} from "../../features";
import {appReducer} from "../model";
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
