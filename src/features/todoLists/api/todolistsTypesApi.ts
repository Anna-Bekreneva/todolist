import {TodoListDomainType} from "app/App";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ChangeTodoListTitleArgType = {
    id: string,
    title: string
}

export type CreateTodolistArgType = {
    todoList: TodoListDomainType,
    id: string
}