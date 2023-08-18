import {
    tasksActions,
    tasksReducer
} from './tasks-reducer';
import {TaskStatuses} from "api/tasks-api";
import {todolistsActions} from "features/TodoLists/todolists-reducer";
import {TasksStateType} from "app/App";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.New,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'JS',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'React',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.New,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.New,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'milk',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'tea',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.New,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = tasksActions.removeTask({taskId: '2', todoListId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.New,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'JS',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'React',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.New,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.New,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'tea',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                status: TaskStatuses.New,
                description: '',
                todoListId: '',
                priority: 1,
                entityStatus: 'idle'
            },
        ]
    })
})

test('status of specified task should be changed', () => {
    const action = tasksActions.changeTaskStatus({taskId: '2', status: TaskStatuses.New, todoListId: 'todolistId2'})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
    const newTitle = 'Html'
    const action = tasksActions.changeTaskTitle({taskId: '2', title: newTitle, todoListId: 'todolistId2'})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe(newTitle)
    expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {
    const action = todolistsActions.addTodoList({
        id: 'new_todo',
        todoList: {title: 'New Todolist', order: 1, addedDate: '', id: 'new_todo', filter: 'all', entityStatus: 'idle'}
    })

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = todolistsActions.removeTodoList({id: 'todolistId2'})
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('empty array should be added when we set todoLists', () => {
    const action = todolistsActions.setTodoLists({
        todoLists: [
            {id: '1', title: 'TodoList 1', order: 0, addedDate: ''},
            {id: '2', title: 'TodoList 2', order: 1, addedDate: ''},
        ]
    })
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(4)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be set', () => {
	const action = tasksActions.setTasks({todoListId: 'todolistId2', tasks: [
			{
				id: '1',
				title: 'task1',
				addedDate: '',
				order: 2,
				deadline: '',
				startDate: '',
				status: 1,
				todoListId: 'todolistId2',
				description: '',
				priority: 1
			},
			{
				id: '2',
				title: 'task2',
				addedDate: '',
				order: 2,
				deadline: '',
				startDate: '',
				status: 1,
				todoListId: 'todolistId2',
				description: '',
				priority: 1
			},
		]})
    const endState = tasksReducer({}, action)
    expect(endState['todolistId2'].length).toBe(2)
})

test('entity status should be change', () => {
    const action = tasksActions.changeTaskEntityStatus({todoListId: 'todolistId1', taskId: '2', entityStatus: 'loading'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].entityStatus).toBe('loading')
})

test('entity status should be change for tasks at the todolist', () => {
	const action = tasksActions.changeTasksEntityStatusAtTheTodoList({todoListId: 'todolistId1', entityStatus: 'loading'})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].entityStatus).toBe('loading')
    expect(endState['todolistId1'][1].entityStatus).toBe('loading')
    expect(endState['todolistId2'][0].entityStatus).toBe('idle')
})