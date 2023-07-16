import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../../components/AddItemForm";
import React, {useCallback, useEffect} from "react";
import {addTodoListTC, setTodoListsTC} from "./todolists-reducer";
import Paper from "@mui/material/Paper";
import TodoList from "./TodoList";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {TodoListDomainType} from "../../../app/App";
import {Navigate} from "react-router-dom";

export const TodoLists = () => {
    const todolists = useAppSelector<Array<TodoListDomainType>>(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodoListsTC())
    }, [])

    const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}></Navigate>
    }

    const todoListComponents = todolists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper style={{padding: "12px"}}>
                    <TodoList title={tl.title} id={tl.id} filter={tl.filter} entityStatus={tl.entityStatus}/>
                </Paper>
            </Grid>
        )
    });

    return (
        <>
            <Grid container>
                <AddItemForm addItem={addTodoList}></AddItemForm>
            </Grid>
            <Grid spacing={4} container>
                {todoListComponents}
            </Grid>
        </>
    )
}