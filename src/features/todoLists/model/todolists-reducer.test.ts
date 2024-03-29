import {v1} from 'uuid';
import {FilterValuesType, TodoListDomainType} from "../../../common";
import {todolistsActions, todolistsReducer, todolistsThunks} from './todolists-reducer';
import {ChangeTodoListTitleArgType, CreateTodolistArgType, TodolistType} from "../api";


let todolistId1: string;
let todolistId2: string;

let startState: Array<TodoListDomainType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 1, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 1, entityStatus: 'idle'}
    ];
})

test('correct todolist should be removed', () => {

    type ActionType = {
        type: typeof todolistsThunks.removeTodolist.fulfilled.type,
        payload: {
            id: string
        }
    }

    const action: ActionType = {
        type: todolistsThunks.removeTodolist.fulfilled.type,
        payload: {id: todolistId1}
    }

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newId = 'new_todo'
    const newTodoList: TodoListDomainType = {
        title: 'New todo', order: 0, addedDate: '', id: newId, filter: 'all', entityStatus: 'idle'
    };

    type ActionType = {
        type: typeof todolistsThunks.addTodolist.fulfilled.type
        payload: CreateTodolistArgType
    }

    const action: ActionType = {
        type: todolistsThunks.addTodolist.fulfilled.type,
        payload: {todoList: newTodoList, id: newId}
    }

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].id).toBe(newId);
});

test('correct todolist should be change filter', () => {
    let newFilter: FilterValuesType = 'completed';
    const endState = todolistsReducer(startState, todolistsActions.changeTodoListFilter({
        filter: newFilter,
        id: todolistId2
    }));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should be change its name', () => {
    let newTodolistTitle = 'New Todolist';

    type ActionType = {
        type: typeof todolistsThunks.changeTodoListTitle.fulfilled.type,
        payload: ChangeTodoListTitleArgType
    }

    const action: ActionType = {
        type: todolistsThunks.changeTodoListTitle.fulfilled.type,
        payload: {
            title: newTodolistTitle,
            id: todolistId2
        }
    }
    const endState = todolistsReducer(startState, action);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('all todolists should be set', () => {
    type ActionType = {
        type: typeof todolistsThunks.setTodolists.fulfilled.type,
        payload: {
            todoLists: TodolistType[]
        }
    }

    const todoLists: TodolistType[] = [
        {id: 'bla', title: 'What to learn', order: 1, addedDate: ''},
        {id: 'bla2', title: 'What to buy', order: 1, addedDate: ''}
    ]

    const action: ActionType = {
        type: todolistsThunks.setTodolists.fulfilled.type,
        payload: {todoLists}
    }

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe("all");
});
