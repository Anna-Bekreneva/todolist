import {FilterValuesType, TodoListType} from '../App';

type RemoveTodoListAT = {
	type: "REMOVE-TODOLIST"
	todoListId: string
}

type AddTodoListAT = {
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

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return todolists.filter(tl => tl.id !== action.todoListId)
		case 'ADD-TODOLIST':
			const newTodoList: TodoListType = {
				id: action.todoListId,
				title: action.title,
				filter: 'all'
			};
			return [...todolists, newTodoList]
		case 'CHANGE-TODOLIST-FILTER':
			return todolists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
		case 'CHANGE-TODOLIST-TITLE':
			return todolists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
		default:
			return todolists
	}
}

export const RemoveTodoListAС = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', todoListId: id})
export const AddTodoListAC = (title: string, todoListId: string): AddTodoListAT => ({type: 'ADD-TODOLIST', title: title, todoListId})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter, todoListId})
export const ChangeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title, todoListId})


