import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from '../../components/AddItemForm';
import {EditableSpan} from '../../components/EditableSpan';
import {Button, List} from '@mui/material';
import {DeleteForeverOutlined} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../state/store';
import {addTaskTC, setTasksTC} from '../../state/tasks-reducer';
import {changeTodoListFilterAC, removeTodoListTC, updateTodoListTC} from '../../state/todolists-reducer';
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
	id: string
    title: string
    filter: FilterValuesType
}

const TodoList = memo((props: TodoListPropsType) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setTasksTC(props.id))
	}, [])

	const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
	let tasksFiltered = tasks

	if (props.filter === 'active') {
		tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.New)
	}

	if (props.filter === 'completed') {
		tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.Completed)
	}

	const getTasksListItem = (t: TaskType) => {
		return <Task key={t.id} todolistId={props.id} task={t}/>
	}

	const tasksList = tasks.length > 0 ? <List> {tasksFiltered.map(getTasksListItem)} </List> : <span> Your tasks list is empty </span>;

	const addTask = useCallback((title: string) => dispatch(addTaskTC(props.id, title)), [dispatch, props.id]);

	const onAllClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('all', props.id)), [dispatch, props.id])
	const onActiveClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('active', props.id)), [dispatch, props.id])
	const onCompletedClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('completed', props.id)), [dispatch, props.id])

	const changeTodoListTitle = useCallback((title: string) => dispatch(updateTodoListTC(props.id, title)), [dispatch, props.id])
	const removeTodoList = () => dispatch(removeTodoListTC(props.id));

	return (
		<div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <DeleteForeverOutlined onClick={removeTodoList}></DeleteForeverOutlined>
            </h3>
            <AddItemForm addItem={addTask}></AddItemForm>
			{tasksList}
			<div>
				<ButtonWithMemo title={'All'} variant={'contained'} onClick={onAllClickHandler} color={props.filter === 'all' ? 'secondary' : 'primary'}></ButtonWithMemo>
				<ButtonWithMemo title={'Active'} variant={'contained'} onClick={onActiveClickHandler} color={props.filter === 'active' ? 'secondary' : 'primary'}></ButtonWithMemo>
				<ButtonWithMemo title={'Completed'} variant={'contained'} onClick={onCompletedClickHandler} color={props.filter === 'completed' ? 'secondary' : 'primary'}></ButtonWithMemo>
            </div>
        </div>
	);
});

type ButtonWithMemoPropsType = {
	title: string
	onClick: () => void
	color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
	variant: 'text' | 'outlined' | 'contained'
}

const ButtonWithMemo: React.FC<ButtonWithMemoPropsType> = memo((props) => {
	return <Button onClick={props.onClick} variant="contained" color={props.color}>
		{props.title}
	</Button>
});

export default TodoList;