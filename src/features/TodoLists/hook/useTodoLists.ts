import {useAppDispatch, useAppSelector} from "app/store";
import {TodoListDomainType} from "app/App";
import {useCallback} from "react";
import {addTodoListTC} from "../todolists-reducer";

export const useTodoLists = () => {
    const todolists = useAppSelector<Array<TodoListDomainType>>(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [dispatch])

    return {todolists, isLoggedIn, dispatch, addTodoList}
}