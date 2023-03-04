import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, List, ListItem} from '@mui/material';
import {DeleteForeverOutlined} from '@mui/icons-material';
import {TodoListType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from './state/todolists-reducer';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	todolist: TodoListType
}

const TodoListWithRedux = ({todolist}: PropsType) => {
	const {id, title, filter} = todolist

	const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
	let tasksFiltered = tasks

	if (filter === 'active') {
		tasksFiltered = tasksFiltered.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksFiltered = tasksFiltered.filter(task => task.isDone)
	}
	const dispatch = useDispatch()

	const getTasksListItem = (t: TaskType) => {

		const removeTask = () => dispatch(removeTaskAC(t.id, id))

		const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
			dispatch(changeTaskStatusAC(t.id, event.currentTarget.checked, id))
		}

		const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(t.id, title, id))

		return (
			<ListItem key={t.id} className={t.isDone ? 'isDone' : ''} style={{padding: "0"}}>
				<Checkbox checked={t.isDone} onChange={changeTaskStatus} size={'small'}></Checkbox>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}></EditableSpan>
                <DeleteForeverOutlined onClick={removeTask}></DeleteForeverOutlined>
            </ListItem>
		);
	};

	const tasksList = tasks.length > 0 ? <List> {tasksFiltered.map(getTasksListItem)} </List> :
		<span> Your tasks list is empty </span>;

	const addTask = (title: string) => dispatch(addTaskAC(title, id))
	const handlerCreator = (filter: FilterValuesType) => () => dispatch(ChangeTodoListFilterAC(filter, id))
	const changeTodoListTitle = (title: string) => dispatch(ChangeTodoListTitleAC(title, id))
	const removeTodoList = () => dispatch(RemoveTodoListAC(id))

	return (
		<div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                <DeleteForeverOutlined onClick={removeTodoList}></DeleteForeverOutlined>
            </h3>
            <AddItemForm addItem={addTask}></AddItemForm>
			{tasksList}
			<div>
                <Button onClick={handlerCreator('all')} style={{marginRight: "4px"}} variant="contained" color={filter === 'all' ? 'secondary' : 'primary'} size="small" disableElevation>
					All
				</Button>
                <Button onClick={handlerCreator('active')} style={{marginRight: "4px"}} variant="contained" color={filter === 'active' ? 'secondary' : 'primary'} size="small" disableElevation>
					Active
				</Button>
                <Button onClick={handlerCreator('completed')} variant="contained" color={filter === 'completed' ? 'secondary' : 'primary'} size="small" disableElevation>
					Completed
				</Button>
            </div>
        </div>
	);
};

export default TodoListWithRedux;