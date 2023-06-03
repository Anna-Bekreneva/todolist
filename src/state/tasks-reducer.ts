import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {TasksStateType} from "../App";
import {AppThunk} from "./store";

type removeTaskAT = ReturnType<typeof removeTaskAC>
type addTaskAT = ReturnType<typeof addTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type setTasksAT = ReturnType<typeof setTasksAC>

export type TasksActionType = removeTaskAT
	| addTaskAT
	| changeTaskStatusAT
	| changeTaskTitleAT
	| AddTodoListAT
	| RemoveTodoListAT
	| SetTodoListsAT
	| setTasksAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
		}
		case 'ADD-TASK': {
			return {...state, [action.todolistId] : [action.task, ...state[action.todolistId]]}
		}
		case 'CHANGE-STATUS-TASK': {
			return {...state, [action.todolistId] : state[action.todolistId].map(task => task.id === action.taskId ? {...task, status: action.status} : task)}
		}
		case 'CHANGE-TITLE-TASK': {
			return {...state, [action.todolistId] : state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)}
		}
		case 'ADD-TODOLIST': {
			return {...state, [action.id] : []}
		}
		case 'REMOVE-TODOLIST': {
			const {[action.todoListId] : [], ...rest} = {...state}
			return rest
		}
		case "SET-TODOLISTS": {
			const copyState = {...state}
			action.todoLists.forEach((todolist) => {
				copyState[todolist.id] = []
			})
			return copyState
		}
		case "SET-TASKS": {
			return {...state, [action.todoListId] : action.tasks}
		}
		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', task, todolistId} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({type: 'CHANGE-STATUS-TASK', taskId, status, todolistId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TITLE-TASK', taskId, title, todolistId} as const)
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todoListId, tasks} as const)

export const setTasksTC = (todoListId: string):AppThunk => (dispatch) => {
	todolistAPI.getTasks(todoListId)
		.then((res) => {
			dispatch(setTasksAC(todoListId, res.data.items))
		})
}

export const removeTaskTC = (todoListId: string, taskId: string):AppThunk => (dispatch) => {
	todolistAPI.deleteTask(todoListId, taskId)
		.then((res) => {
			dispatch(removeTaskAC(taskId, todoListId))
		})
}

export const addTaskTC = (todoListId: string, title: string):AppThunk => (dispatch) => {
	todolistAPI.createTask(todoListId, title)
		.then((res) => {
			dispatch(addTaskAC(todoListId, res.data.data.item))
		})
}

export const changeTaskTitleTC = (todoListId: string, taskId: string, title: string):AppThunk => (dispatch, getState) => {
	const task = getState().tasks[todoListId].find(task => task.id === taskId)
	if (task) {
		console.log(title)
		todolistAPI.updateTask(todoListId, taskId, {
			status: task.status,
			deadline: task.deadline,
			priority: task.priority,
			description: task.description,
			startDate: task.startDate,
			title
		})
			.then((res) => {
				dispatch(changeTaskTitleAC(taskId, title, todoListId))
			})
	}
}

export const changeTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses):AppThunk => (dispatch, getState) => {
	const task = getState().tasks[todoListId].find(task => task.id === taskId)
	if (task) {
		todolistAPI.updateTask(todoListId, taskId, {
			status,
			deadline: task.deadline,
			priority: task.priority,
			description: task.description,
			startDate: task.startDate,
			title: task.title
		})
			.then((res) => {
				dispatch(changeTaskStatusAC(taskId, status, todoListId))
			})
	}
}