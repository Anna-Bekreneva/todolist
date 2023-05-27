import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from './store';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

// initialGlobalStateType = {}

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 1, filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', addedDate: '', order: 1, filter: 'all'},
    ],

    tasks: {
        'todolistId1' : [
            {id: '1', title: 'HTML', deadline: '', order: 0, addedDate: '', startDate: '', status: TaskStatuses.Completed, description: '', todoListId: '', priority: 1},
            {id: '2', title: 'JS', deadline: '', order: 0, addedDate: '', startDate: '', status: TaskStatuses.New, description: '', todoListId: '', priority: 1},
        ],
        'todolistId2' : [
            {id: '1', title: 'Milk', deadline: '', order: 0, addedDate: '', startDate: '', status: TaskStatuses.New, description: '', todoListId: '', priority: 1},
            {id: '2', title: 'React Book', deadline: '', order: 0, addedDate: '', startDate: '', status: TaskStatuses.Completed, description: '', todoListId: '', priority: 1},
        ],
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{ storyFn()}</Provider>
}