import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {AddItemForm} from '../components/AddItemForm';
import {useAppDispatch, useAppSelector} from './store';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import {Menu} from '@mui/icons-material';
import {LinearProgress} from "@mui/material";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {TaskType, TodolistType} from "../api/todolist-api";
import {addTodoListTC, setTodoListsTC} from "../features/TodolistLists/TodoLists/todolists-reducer";
import TodoList from "../features/TodolistLists/TodoLists/TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

function App () {
    console.log('App')
    const todolists = useAppSelector<Array<TodoListDomainType>>(state => state.todolists)
    const lineProgressStatus = useAppSelector<RequestStatusType>(state => state.app.status)
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
                    <TodoList title={tl.title} id={tl.id} filter={tl.filter} entityStatus={tl.entityStatus}/>
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
                {lineProgressStatus === 'loading' && <LinearProgress />}
            </AppBar>
            <Container style={{paddingTop: "20px"}} fixed>
                <Grid container>
                    <AddItemForm addItem={addTodoList}></AddItemForm>
                </Grid>
                <Grid spacing={4} container>
                    {todoListComponents}
                </Grid>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;