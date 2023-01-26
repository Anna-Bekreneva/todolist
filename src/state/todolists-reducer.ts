import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
	type: "REMOVE-TODOLIST"
	todoListId: string
}

export type AddTodoListAT = {
	type: "ADD-TODOLIST"
	title: string
	todoListId: string
}

type ChangeTodoListFilterAT = {
	type: "CHANGE-TODOLIST-FILTER"
	filter: FilterValuesType
	todoListId: string
}

type ChangeTodoListTitleAT = {
	type: "CHANGE-TODOLIST-TITLE"
	title: string
	todoListId: string
}

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

const initialState: Array<TodoListType> = []

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id !== action.todoListId)
		case 'ADD-TODOLIST':
			const newTodoList: TodoListType = {
				id: action.todoListId,
				title: action.title,
				filter: 'all'
			};
			return [...state, newTodoList]
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
		default:
			return state
	}
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', todoListId: id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: 'ADD-TODOLIST', title: title, todoListId: v1()})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter, todoListId})
export const ChangeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title, todoListId})


