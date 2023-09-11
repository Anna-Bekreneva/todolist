import {TodoListDomainType} from "app/App";
import {useCallback} from "react";
import {selectIsLoggedIn} from "features/auth/model/auth-selectors";
import {selectTodolists} from "features/todoLists/model/todolists-selectors";
import {todolistsThunks} from "features/todoLists/model/todolists-reducer";
import {useAppDispatch, useAppSelector} from "common/hooks";

export const useTodoLists = () => {
    const todolists = useAppSelector<Array<TodoListDomainType>>(selectTodolists)
    const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => dispatch(todolistsThunks.addTodolist({title})), [dispatch])

    return {todolists, isLoggedIn, dispatch, addTodoList}
}