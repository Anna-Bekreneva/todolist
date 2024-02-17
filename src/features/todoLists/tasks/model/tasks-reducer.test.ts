import {
    RemoveTaskArgType,
    TasksStateType,
    TaskStatuses,
    TodoListDomainType,
    UpdateTaskArgType
} from "../../../../common";
import {tasksActions, tasksReducer, tasksThunks} from "./tasks-reducer";
import {todolistsThunks} from "../../model";
import {TodolistType} from "../../api";
import {TaskType} from "../api";


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
                status: TaskStatuses.new,
                description: '',
                todolistId: '',
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
                status: TaskStatuses.completed,
                description: '',
                todolistId: '',
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
                status: TaskStatuses.new,
                description: '',
                todolistId: '',
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
                status: TaskStatuses.new,
                description: '',
                todolistId: '',
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
                status: TaskStatuses.completed,
                description: '',
                todolistId: '',
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
                status: TaskStatuses.new,
                description: '',
                todolistId: '',
                priority: 1,
                entityStatus: 'idle'
            },
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    type ActionType = {
        type: typeof tasksThunks.removeTask.fulfilled.type,
        payload: RemoveTaskArgType
    }

    const action: ActionType = {
        type: tasksThunks.removeTask.fulfilled.type,
        payload: {
            todolistId: 'todolistId2',
            taskId: '2'
        }
    }

    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
})

test('status of specified task should be changed', () => {
    type ActionType = {
        type: typeof tasksThunks.updateTask.fulfilled.type,
        payload: UpdateTaskArgType
    }

    const action: ActionType = {
        type: tasksThunks.updateTask.fulfilled.type,
        payload: {
            todolistId: 'todolistId2',
            taskId: '2',
            domainModel: {
                title: 'milk',
                deadline: '',
                startDate: '',
                status: TaskStatuses.new,
                description: '',
                priority: 1
            }
        }
    }

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.new)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.completed)
})

test('title of specified task should be changed', () => {
    type ActionType = {
        type: typeof tasksThunks.updateTask.fulfilled.type,
        payload: UpdateTaskArgType
    }

    const newTitle = 'Html'
    const action: ActionType = {
        type: tasksThunks.updateTask.fulfilled.type,
        payload: {
            todolistId: 'todolistId2',
            taskId: '2',
            domainModel: {
                title: newTitle,
                deadline: '',
                startDate: '',
                status: 1,
                description: '',
                priority: 1
            }
        }
    }

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe(newTitle)
    expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {

    type ActionType = {
        type: typeof todolistsThunks.addTodolist.fulfilled.type,
        payload: {
            id: string,
            todoList: TodoListDomainType
        }
    }

    const todoList: TodoListDomainType = {title: 'New Todolist', order: 1, addedDate: '', id: 'new_todo', filter: 'all', entityStatus: 'idle'}

    const action: ActionType = {
        type: todolistsThunks.addTodolist.fulfilled.type,
        payload: {
            id: 'new_todo',
            todoList
        }
    }

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    type ActionType = {
        type: typeof todolistsThunks.removeTodolist.fulfilled.type,
        payload: {id: string}
    }

    const action: ActionType = {
        type: todolistsThunks.removeTodolist.fulfilled.type,
        payload: {id: 'todolistId2'}
    }

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('empty array should be added when we set todoLists', () => {

    type ActionType = {
        type: typeof todolistsThunks.setTodolists.fulfilled.type,
        payload: {
            todoLists: TodolistType[]
        }
    }

    const todoLists: TodolistType[] = [
        {id: '1', title: 'TodoList 1', order: 0, addedDate: ''},
        {id: '2', title: 'TodoList 2', order: 1, addedDate: ''},
    ]

    const action: ActionType = {
        type: todolistsThunks.setTodolists.fulfilled.type,
        payload: {todoLists}
    }

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(4)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be set', () => {

    type ActionType = {
        type: typeof tasksThunks.setTasks.fulfilled.type,
        payload: {
            todolistId: string,
            tasks: Array<TaskType>
        }
    }

    const tasks = [
        {
            id: '1',
            title: 'task1',
            addedDate: '',
            order: 2,
            deadline: '',
            startDate: '',
            status: 2,
            todolistId: 'todolistId2',
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
            todolistId: 'todolistId2',
            description: '',
            priority: 1
        },
    ]

	const action: ActionType = {
        type: tasksThunks.setTasks.fulfilled.type,
        payload: {
            todolistId: 'todolistId2',
            tasks
        }
    }
    const endState = tasksReducer({}, action)
    expect(endState['todolistId2'].length).toBe(2)
})

test('entity status should be change', () => {
    const action = tasksActions.changeTaskEntityStatus({todolistId: 'todolistId1', taskId: '2', entityStatus: 'loading'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].entityStatus).toBe('loading')
})

test('entity status should be change for tasks at the todolist', () => {
	const action = tasksActions.changeTasksEntityStatusAtTheTodoList({todolistId: 'todolistId1', entityStatus: 'loading'})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].entityStatus).toBe('loading')
    expect(endState['todolistId1'][1].entityStatus).toBe('loading')
    expect(endState['todolistId2'][0].entityStatus).toBe('idle')
})