import { TodoListDomainType } from "common";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../common";
import {selectIsLoggedIn} from "../../../auth";
import {selectTodolists, todolistsThunks} from "../../model";

export const useTodoLists = () => {
    const todolists = useAppSelector<Array<TodoListDomainType>>(selectTodolists)
    const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const [isDisabledForm, setIsDisabledForm] = useState(false)

    const addTodoList = useCallback((title: string) => {
        setIsDisabledForm(true)
        dispatch(todolistsThunks.addTodolist({title})).then(() => {
            setIsDisabledForm(false)
        })

    }, [dispatch])

    useEffect(() => {
        if (!isLoggedIn) return
        if (!todolists.length) dispatch(todolistsThunks.setTodolists())
    }, [])

    return {todolists, isLoggedIn, dispatch, addTodoList, isDisabledForm}
}