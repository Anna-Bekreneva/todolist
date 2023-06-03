import {todolistAPI, TodolistType} from "../api/todolist-api";
import {FilterValuesType, TodoListDomainType} from "../App";
import {AppThunk} from "./store";

export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>

export type TodoListsActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT | SetTodoListsAT

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: TodoListsActionsType): Array<TodoListDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id !== action.todoListId)
		case 'ADD-TODOLIST':
			return [...state, action.todoList]
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
		case "SET-TODOLISTS": {
			return action.todoLists.map(todolist => ({...todolist, filter: "all"}))
		}
		default:
			return state
	}
}

export const removeTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', todoListId: id} as const)
export const addTodoListAC = (todoList: TodoListDomainType, id: string) => ({type: 'ADD-TODOLIST', todoList, id} as const)
export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string) => ({type: 'CHANGE-TODOLIST-FILTER', filter, todoListId} as const)
export const changeTodoListTitleAC = (title: string, todoListId: string) => ({type: 'CHANGE-TODOLIST-TITLE', title, todoListId} as const)
export const setTodoListsAC = (todoLists: TodolistType[]) => ({type: "SET-TODOLISTS", todoLists} as const)

export const setTodoListsTC = (): AppThunk => (dispatch) => {
	todolistAPI.getTodolist()
		.then((res) => {
			dispatch(setTodoListsAC(res.data))
		})
}

export const removeTodoListTC = (id: string): AppThunk => (dispatch) => {
	todolistAPI.deleteTodolist(id)
		.then((res) => {
			dispatch(removeTodoListAC(id))
		})
}

export const addTodoListTC = (title: string): AppThunk => (dispatch) => {
	todolistAPI.createTodolist(title)
		.then((res) => {
			const todoList: TodoListDomainType = {...res.data.data.item, filter: 'all'}
			dispatch(addTodoListAC(todoList, res.data.data.item.id))
		})
}

export const updateTodoListTC = (id: string, title: string): AppThunk => (dispatch) => {
	todolistAPI.updateTodolist(id, title)
		.then((res) => {
			dispatch(changeTodoListTitleAC(title, id))
		})
}