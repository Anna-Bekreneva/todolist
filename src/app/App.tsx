import React, {useEffect} from 'react';
import '../App.css';
import {useAppDispatch, useAppSelector} from './store';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import {Menu} from '@mui/icons-material';
import {CircularProgress, LinearProgress} from "@mui/material";
import {RequestStatusType, setAppInitializedTC} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {TodolistType} from "../api/todolist-api";
import {TaskType} from "../api/tasks-api";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";
import {TodoLists} from "../features/TodoLists/TodoLists";

function App () {
    console.log('App')
    const lineProgressStatus = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setAppInitializedTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logout = () => dispatch(logoutTC())

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
                    {isLoggedIn && <Button color="inherit" variant={'outlined'} onClick={logout}>Logout</Button>}
                </Toolbar>
                {lineProgressStatus === 'loading' && <LinearProgress />}
            </AppBar>
            <Container style={{paddingTop: "20px"}} fixed>
                <Routes>
                    <Route path={'/'} element={<TodoLists/>}></Route>
                    <Route path={'/login'} element={<Login/>}></Route>
                    <Route path={'/404'} element={<h1>Page not found</h1>}></Route>
                    <Route path={'*'} element={<Navigate to={'404'}/>}></Route>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

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