import React from 'react';
import '../../App.css';
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Navigate, Route, Routes} from "react-router-dom";
import {useApp} from "./hook";
import {ErrorSnackbar} from "../../common";
import {authThunks, Error404, Login, TodoLists} from "../../features";

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
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    {isLoggedIn && <Button color="inherit" variant={'outlined'} onClick={logout}>Logout</Button>}
                </Toolbar>
                {lineProgressStatus === 'loading' && <LinearProgress />}
            </AppBar>
            <Container style={{paddingTop: "80px"}} fixed>
                <Routes>
                    <Route path={'/'} element={<TodoLists/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<Error404/>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                    <Route path={'/todolist'} element={<Navigate to={'/'}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;