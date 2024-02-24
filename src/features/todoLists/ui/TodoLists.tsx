import {Grid, Paper, Typography} from "@mui/material";
import React, {memo} from "react";
import {Navigate} from "react-router-dom";
import {AddItemForm} from "../../../common";
import {useTodoLists} from "./hook";
import {TodoList} from "./Todolist";

export const TodoLists = memo(() => {
    const {todolists, isLoggedIn, addTodoList, isDisabledForm} = useTodoLists()

    const todoListComponents = todolists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper style={{padding: "12px"}}>
                    <TodoList title={tl.title} id={tl.id} filter={tl.filter}/>
                </Paper>
            </Grid>
        )
    });

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid marginBottom={'40px'} container>
                <AddItemForm callback={addTodoList} label={'New todolist'} isDisabled={isDisabledForm}/>
            </Grid>
            <Grid wrap={'nowrap'} overflow={'auto'} spacing={4} paddingBottom={'32px'} container>
                { todolists.length
                    ? todoListComponents
                    : <Typography align={'center'} marginTop={'12px'} width={'100%'} fontSize={'24px'} fontWeight={'600'}>
                        No todolists
                      </Typography> }
            </Grid>
        </>
    )
})