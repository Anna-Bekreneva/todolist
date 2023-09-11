import Grid from "@mui/material/Grid";
import React, {memo, useEffect} from "react";
import Paper from "@mui/material/Paper";
import TodoList from "features/todoLists/ui/Todolist/TodoList";
import {Navigate} from "react-router-dom";
import {useTodoLists} from "features/todoLists/model/hook/useTodoLists";
import {todolistsThunks} from "features/todoLists/model/todolists-reducer";
import {AddItemForm} from "common/components";

export const TodoLists = memo(() => {
    const {todolists, isLoggedIn, dispatch, addTodoList} = useTodoLists()

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(todolistsThunks.setTodolists())
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
                <AddItemForm callback={addTodoList}></AddItemForm>
            </Grid>
            <Grid spacing={4} container>
                {todoListComponents}
            </Grid>
        </>
    )
})