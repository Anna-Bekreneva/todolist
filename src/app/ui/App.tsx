import React from 'react';
import '../../App.css';
import {Typography, AppBar, Button, Container, IconButton, Toolbar, CircularProgress, LinearProgress} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {Navigate, Route, Routes} from "react-router-dom";
import {useApp} from "./hook";
import {ErrorSnackbar} from "../../common";
import {authThunks, Login, TodoLists} from "../../features";

function App () {
    const {isInitialized, dispatch, isLoggedIn, lineProgressStatus} = useApp()

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