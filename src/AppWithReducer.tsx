import React, {Reducer, useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
	ActionsType,
	AddTodoListAC,
	ChangeTodoListTitleAC,
	RemoveTodoListAC,
	todolistsReducer
} from './state/todolists-reducer';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[todoListId: string]: Array<TaskType>
}

function AppWithReducer () {
	const todoListId_1 = v1();
	const todoListId_2 = v1();

	const [todoLists, dispatchToTodoLists] = useReducer<Reducer<Array<TodoListType>, ActionsType>>(todolistsReducer, [
		{id: todoListId_1, title: 'What to learn', filter: 'all'},
		{id: todoListId_2, title: 'What to buy', filter: 'all'}
	]);

	const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
		[todoListId_1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS/TS', isDone: true},
			{id: v1(), title: 'React', isDone: false},
			{id: v1(), title: 'Redux', isDone: false},
			{id: v1(), title: 'RTX', isDone: false},
		],

		[todoListId_2]: [
			{id: v1(), title: 'Water', isDone: true},
			{id: v1(), title: 'Beer', isDone: true},
			{id: v1(), title: 'Toilet paper', isDone: false},
			{id: v1(), title: 'Buckwheat', isDone: false},
			{id: v1(), title: 'Meet', isDone: false},
		],
	});

	const removeTask = (taskId: string, todoListId: string) => dispatchToTasks(removeTaskAC(taskId, todoListId))
	const addTask = (title: string, todoListId: string) => dispatchToTasks(addTaskAC(title, todoListId))
	const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
	const changeTaskTitle = (taskId: string, title: string, todoListId: string) => dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))

	const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
		let tasksForTodoList = tasks;
		if (filter === 'active') {
			tasksForTodoList = tasks.filter(t => !t.isDone);
		}

		if (filter === 'completed') {
			tasksForTodoList = tasks.filter(t => t.isDone);
		}

		return tasksForTodoList;
	};

	// Todolists
	const changeTodoListTitle = (title: string, todoListId: string) => dispatchToTodoLists(ChangeTodoListTitleAC(title, todoListId))
	const removeTodoList = (todoListId: string) => {
		const action = RemoveTodoListAC(todoListId)
		dispatchToTodoLists(action)
		dispatchToTasks(action)
	}
	const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => dispatchToTodoLists(ChangeTodoListTitleAC(filter, todoListId))

	const addTodoList = (title: string) => {
		const action = AddTodoListAC(title)
		dispatchToTodoLists(action)
		dispatchToTasks(action)
	};

	const todoListComponents = todoLists.map(tl => {
		return (
			<Grid key={tl.id} item>
				<Paper style={{padding: "12px"}}>
					<TodoList todoListId={tl.id} tasks={getFilteredTasks(tasks[tl.id], tl.filter)} title={tl.title} filter={tl.filter} changeTodoListFilter={changeTodoListFilter} addTask={addTask} removeTask={removeTask} changeTaskStatus={changeTaskStatus} removeTodoList={removeTodoList} changeTaskTitle={changeTaskTitle} changeTodoListTitle={changeTodoListTitle}/>
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

export default AppWithReducer;