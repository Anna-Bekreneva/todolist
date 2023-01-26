import React from 'react';
import './App.css';
import {TaskType} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {AddTodoListAC} from './state/todolists-reducer';
import TodoListWithRedux from './TodoListWithRedux';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[todoListId: string]: Array<TaskType>
}

function AppWithRedux () {

	const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
	const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	// Todolists
	const addTodoList = (title: string) => dispatch(AddTodoListAC(title))

	const todoListComponents = todolists.map(tl => {
		return (
			<Grid key={tl.id} item>
				<Paper style={{padding: "12px"}}>
					<TodoListWithRedux todolist={tl}/>
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

export default AppWithRedux;