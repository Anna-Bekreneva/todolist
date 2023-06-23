import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionType, tasksReducer} from './tasks-reducer';
import {TodoListsActionsType, todolistsReducer} from './todolists-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";
import {AppActionsType, appReducer} from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export const useAppDispatch = () => useDispatch<AppDispatchType>()

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType = TodoListsActionsType | TasksActionType | AppActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store