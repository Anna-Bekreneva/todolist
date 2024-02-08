import React, {useEffect} from 'react';
import '../App.css';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import {Menu} from '@mui/icons-material';
import {CircularProgress, LinearProgress} from "@mui/material";
import {appThunks, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "common/components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "features/auth/model/Login";
import {TodoLists} from "features/todoLists/ui/TodoLists";
import {selectAppIsInitialized, selectAppStatus} from "app/app-selectors";
import {selectIsLoggedIn} from "features/auth/model/auth-selectors";
import {TaskType} from "features/todoLists/api/tasksTypesApi";
import {TodolistType} from "features/todoLists/api/todolistsTypesApi";
import {authThunks} from "features/auth/model/auth-reducer";
import {useAppDispatch, useAppSelector} from "common/hooks";

function App () {
    console.log('App')
    const lineProgressStatus = useAppSelector<RequestStatusType>(selectAppStatus)
    const isInitialized = useAppSelector<boolean>(selectAppIsInitialized)
    const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isInitialized) dispatch(appThunks.setAppInitialized())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logout = () => dispatch(authThunks.logout())

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
                    <Route path={'/todolist'} element={<Navigate to={'/'}/>}></Route>
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