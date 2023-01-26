import {TasksStateType} from '../App';
import {TaskType} from '../TodoList';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';

type removeTaskAT = ReturnType<typeof removeTaskAC>
type addTaskAT = ReturnType<typeof addTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
		}

		case 'ADD-TASK': {
			const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
			return {...state, [action.todolistId] : [newTask, ...state[action.todolistId]]}
		}

		case 'CHANGE-STATUS-TASK': {
			return {...state, [action.todolistId] : state[action.todolistId].map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)}
		}

		case 'CHANGE-TITLE-TASK': {
			return {...state, [action.todolistId] : state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)}
		}

		case 'ADD-TODOLIST': {
			return {...state, [action.todoListId] : []}
		}

		case 'REMOVE-TODOLIST': {
			// const copyState = {...state}
			// delete copyState[action.todoListId]
			// return copyState

			const {[action.todoListId] : [], ...rest} = {...state}
			return rest
		}

		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({type: 'CHANGE-STATUS-TASK', taskId, isDone: false, todolistId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TITLE-TASK', taskId, title, todolistId} as const)

