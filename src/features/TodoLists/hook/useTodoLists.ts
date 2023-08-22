import {useAppDispatch, useAppSelector} from "app/store";
import {TodoListDomainType} from "app/App";
import {useCallback} from "react";
import {addTodoListTC} from "../todolists-reducer";
import {selectIsLoggedIn} from "features/Login/auth-selectors";
import {selectTodolists} from "features/TodoLists/todolists-selectors";

export const useTodoLists = () => {
    const todolists = useAppSelector<Array<TodoListDomainType>>(selectTodolists)
    const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [dispatch])

    return {todolists, isLoggedIn, dispatch, addTodoList}
}