import Grid from "@mui/material/Grid";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import React, {memo, useEffect} from "react";
import {setTodoListsTC} from "./todolists-reducer";
import Paper from "@mui/material/Paper";
import TodoList from "./Todolist/TodoList";
import {Navigate} from "react-router-dom";
import {useTodoLists} from "./hook/useTodoLists";

export const TodoLists = memo(() => {
    const {todolists, isLoggedIn, dispatch, addTodoList} = useTodoLists()

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(setTodoListsTC())
    }, [])

    const todoListComponents = todolists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper style={{padding: "12px"}}>
                    <TodoList title={tl.title} id={tl.id} filter={tl.filter} entityStatus={tl.entityStatus}/>
                </Paper>
            </Grid>
        )
    });

    if (!isLoggedIn) {
        return <Navigate to={'/login'}></Navigate>
    }

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
})