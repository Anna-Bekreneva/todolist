import {AnyAction, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "features/Login/auth-reducer";
import {tasksReducer} from "features/TodoLists/Tasks/tasks-reducer";
import {todolistsReducer} from "features/TodoLists/todolists-reducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer,
})
// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({reducer: rootReducer})
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store