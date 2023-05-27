import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './components/AddItemForm';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {addTodoListTC, setTodoListsTC} from './state/todolists-reducer';
import TodoList from './features/TodoList/TodoList';
import {TaskType, TodolistType} from "./api/todolist-api";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
}

function App () {
    console.log('App')
    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodoListsTC())
    }, [])

    // Todolists
    const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [dispatch])

    const todoListComponents = todolists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper style={{padding: "12px"}}>
                    <TodoList title={tl.title} id={tl.id} filter={tl.filter}/>
                </Paper>
            </Grid>
        )
    });

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container style={{paddingTop: "20px"}} fixed>
                <Grid container>
                    <AddItemForm addItem={addTodoList}></AddItemForm>
                </Grid>
                <Grid spacing={4} container>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;