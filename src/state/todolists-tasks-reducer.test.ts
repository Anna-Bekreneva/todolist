import {TasksStateType, TodoListDomainType} from '../App';
import {tasksReducer} from './tasks-reducer';
import {addTodoListAC, todolistsReducer} from './todolists-reducer';

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {}
	const startTodolistsState: Array<TodoListDomainType> = []

	const action = addTodoListAC({
		title: 'New todo', order: 0, addedDate: '', id: 'newId', filter: 'all', entityStatus: 'idle'
	}, 'newId')

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState[0].id

	expect(idFromTasks).toBe(action.id)
	expect(idFromTodolists).toBe(action.id)
})