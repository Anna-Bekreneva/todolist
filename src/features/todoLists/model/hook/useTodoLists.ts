import { TodoListDomainType } from "common";
import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../common";
import {selectIsLoggedIn} from "../../../auth";
import {selectTodolists} from "../todolists-selectors";
import {todolistsThunks} from "../todolists-reducer";

export const useTodoLists = () => {
    const todolists = useAppSelector<Array<TodoListDomainType>>(selectTodolists)
    const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => dispatch(todolistsThunks.addTodolist({title})), [dispatch])

    useEffect(() => {
        if (!isLoggedIn) return
        if (!todolists.length) dispatch(todolistsThunks.setTodolists())
    }, [])

    return {todolists, isLoggedIn, dispatch, addTodoList}
}