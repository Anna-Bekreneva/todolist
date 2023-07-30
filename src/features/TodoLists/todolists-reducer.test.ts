import {FilterValuesType, TodoListDomainType} from '../../app/App';
import {v1} from 'uuid';
import {
	addTodoListAC, changeTodoListEntityStatusAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	removeTodoListAC, setTodoListsAC,
	todolistsReducer
} from './todolists-reducer';

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
	const endState = todolistsReducer(startState, removeTodoListAC(todolistId1));

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
	const newId = 'new_todo'
	const newTodoList: TodoListDomainType = {
		title: 'New todo', order: 0, addedDate: '', id: newId, filter: 'all', entityStatus: 'idle'
	};

	const endState = todolistsReducer(startState, addTodoListAC(newTodoList, newId));

	expect(endState.length).toBe(3);
	expect(endState[2].id).toBe(newId);
});

test('correct todolist should be change filter', () => {
	let newFilter: FilterValuesType = 'completed';
	const endState = todolistsReducer(startState, changeTodoListFilterAC(newFilter, todolistId2));

	expect(endState[0].filter).toBe('all');
	expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should be change its name', () => {
	let newTodolistTitle = 'New Todolist';
	const endState = todolistsReducer(startState, changeTodoListTitleAC(newTodolistTitle, todolistId2));

	expect(endState[0].title).toBe('What to learn');
	expect(endState[1].title).toBe(newTodolistTitle);
});

test('all todolists should be set', () => {
	const endState: TodoListDomainType[] = todolistsReducer([], setTodoListsAC([
		{id: 'bla', title: 'What to learn', order: 1, addedDate: ''},
		{id: 'bla2', title: 'What to buy', order: 1, addedDate: ''}
	]));

	expect(endState.length).toBe(2);
	expect(endState[0].filter).toBe("all");
});

test('entity status should be change', () => {
	const action = changeTodoListEntityStatusAC(todolistId1, 'loading')

	const endState = todolistsReducer(startState, action)

	expect(endState[0].entityStatus).toBe('loading')
	expect(endState[1].entityStatus).toBe('idle')
})