import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[todoListId: string]: Array<TaskType>
}

function App () {
	const todoListId_1 = v1();
	const todoListId_2 = v1();

	const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
		{id: todoListId_1, title: 'What to learn', filter: 'all'},
		{id: todoListId_2, title: 'What to buy', filter: 'all'}
	]);

	const [tasks, setTasks] = useState<TasksStateType>({
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

	const removeTask = (taskId: string, todoListId: string) => {
		setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)});
	};

	const addTask = (title: string, todoListId: string) => {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false
		};

		setTasks({
			...tasks, [todoListId]: [
				newTask,
				...tasks[todoListId]
			]
		});
	};

	const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
		setTasks({
			...tasks, [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, isDone} : task)
		});
	};

	const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
		setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)});
	};

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
	const changeTodoListTitle = (title: string, todoListId: string) => {
		setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl));
	};

	const removeTodoList = (todoListId: string) => {
		const nextState = todoLists.filter(tl => tl.id !== todoListId)
		setTodoLists(nextState);
	};

	const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
		setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl));
	};

	const addTodoList = (title: string) => {
		const newTodoListId: string = v1();
		const newTodoList: TodoListType = {
			id: newTodoListId,
			title: title,
			filter: 'all'
		};
		const nextState = [...todoLists, newTodoList]
		setTodoLists(nextState);
		setTasks({...tasks, [newTodoListId]: []});
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

export default App;
