import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, List, ListItem} from '@mui/material';
import {DeleteForeverOutlined} from '@mui/icons-material';


type TodoListPropsType = {
	todoListId: string
	title: string
	tasks: Array<TaskType>
	filter: FilterValuesType
	removeTask: (taskId: string, todoListId: string) => void
	changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
	addTask: (title: string, todoListId: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
	removeTodoList: (todoListId: string) => void
	changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
	changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

const TodoList = memo((props: TodoListPropsType) => {
	const getTasksListItem = (t: TaskType) => {

		//D:
		const removeTask = () => props.removeTask(t.id, props.todoListId);

		//U:
		const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, event.currentTarget.checked, props.todoListId);
		const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListId);
		return (
			<ListItem key={t.id} className={t.isDone ? 'isDone' : ''} style={{padding: "0"}}>
				<Checkbox checked={t.isDone} onChange={changeTaskStatus} size={'small'}></Checkbox>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}></EditableSpan>
                <DeleteForeverOutlined onClick={removeTask}></DeleteForeverOutlined>
            </ListItem>
		);
	};

	const tasksList = props.tasks.length > 0 ? <List> {props.tasks.map(getTasksListItem)} </List> :
		<span> Your tasks list is empty </span>;

	//C:
	const addTask = useCallback((title: string) => props.addTask(title, props.todoListId), [props.addTask, props.todoListId])

	//U:
	const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId);
	const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId);

	//D:
	const removeTodoList = () => props.removeTodoList(props.todoListId);

	return (
		<div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <DeleteForeverOutlined onClick={removeTodoList}></DeleteForeverOutlined>
            </h3>
            <AddItemForm addItem={addTask}></AddItemForm> {tasksList}
			<div>
                <Button onClick={handlerCreator('all')} style={{marginRight: "4px"}} variant="contained" color={props.filter === 'all' ? 'secondary' : 'primary'} size="small" disableElevation>
					All
				</Button>
                <Button onClick={handlerCreator('active')} style={{marginRight: "4px"}} variant="contained" color={props.filter === 'active' ? 'secondary' : 'primary'} size="small" disableElevation>
					Active
				</Button>
                <Button onClick={handlerCreator('completed')} variant="contained" color={props.filter === 'completed' ? 'secondary' : 'primary'} size="small" disableElevation>
					Completed
				</Button>
            </div>
        </div>
	);
});

export default TodoList;