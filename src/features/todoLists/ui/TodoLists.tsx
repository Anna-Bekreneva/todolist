import {Grid, Paper} from "@mui/material";
import React, {memo} from "react";
import {Navigate} from "react-router-dom";
import {useTodoLists} from "../model";
import TodoList from "./Todolist/TodoList";
import {AddItemForm} from "../../../common";

export const TodoLists = memo(() => {
    const {todolists, isLoggedIn, dispatch, addTodoList} = useTodoLists()


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
                <AddItemForm callback={addTodoList}></AddItemForm>
            </Grid>
            <Grid spacing={4} container>
                {todoListComponents}
            </Grid>
        </>
    )
})