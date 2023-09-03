import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore} from 'redux';
import {appReducer} from "./app-reducer";
import {AppRootStateType} from "./store";
import {authReducer} from "features/auth/model/auth-reducer";
import {tasksReducer} from "features/todoLists/model/tasks-reducer";
import {todolistsReducer} from "features/todoLists/model/todolists-reducer";
import {TaskStatuses} from "common/enums/enums";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 1, filter: 'all', entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', addedDate: '', order: 1, filter: 'all', entityStatus: 'idle'},
    ],

    tasks: {
        'todolistId1' : [
            {id: '1', title: 'HTML', deadline: '', order: 0, addedDate: '', startDate: '', status: TaskStatuses.completed, description: '', todolistId: '', priority: 1, entityStatus: 'idle'},
            {id: '2', title: 'JS', deadline: '', order: 0, addedDate: '', startDate: '', status: TaskStatuses.new, description: '', todolistId: '', priority: 1, entityStatus: 'idle'},
        ],
        'todolistId2' : [
            {id: '1', title: 'Milk', deadline: '', order: 0, addedDate: '', startDate: '', status: TaskStatuses.new, description: '', todolistId: '', priority: 1, entityStatus: 'idle'},
            {id: '2', title: 'React Book', deadline: '', order: 0, addedDate: '', startDate: '', status: TaskStatuses.completed, description: '', todolistId: '', priority: 1, entityStatus: 'idle'},
        ],
    },

    app: {
        status: 'loading',
        error: null,
        isInitialized: false,
    },

    auth: {
        isLoggedIn: false
    },
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{ storyFn()}</Provider>
}