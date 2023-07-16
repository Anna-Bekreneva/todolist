import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TodoListsActionsType, todolistsReducer} from '../features/TodolistLists/TodoLists/todolists-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActionsType, appReducer} from "./app-reducer";
import {TasksActionType, tasksReducer} from "../features/TodolistLists/Tasks/tasks-reducer";
import {authReducer, AuthReducerActionsTypes} from "../features/Login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType = TodoListsActionsType | TasksActionType | AppActionsType | AuthReducerActionsTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store