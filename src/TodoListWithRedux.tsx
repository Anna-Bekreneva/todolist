import React, {memo, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, List} from '@mui/material';
import {DeleteForeverOutlined} from '@mui/icons-material';
import {TodoListType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC} from './state/tasks-reducer';
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from './state/todolists-reducer';
import {TaskWithRedux} from './TaskWithRedux';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	todolist: TodoListType
}

const TodoListWithRedux = memo(({todolist}: PropsType) => {
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
		return <TaskWithRedux todolistId={id} task={t}/>
	}

	const tasksList = tasks.length > 0 ? <List> {tasksFiltered.map(getTasksListItem)} </List> : <span> Your tasks list is empty </span>;

	const addTask = useCallback((title: string) => dispatch(addTaskAC(title, id)), [dispatch, id]);

	const onAllClickHandler = useCallback(() => dispatch(ChangeTodoListFilterAC('all', id)), [dispatch, id])
	const onActiveClickHandler = useCallback(() => dispatch(ChangeTodoListFilterAC('active', id)), [dispatch, id])
	const onCompletedClickHandler = useCallback(() => dispatch(ChangeTodoListFilterAC('completed', id)), [dispatch, id])

	const changeTodoListTitle = useCallback((title: string) => dispatch(ChangeTodoListTitleAC(title, id)), [dispatch, id])
	const removeTodoList = () => dispatch(RemoveTodoListAC(id));

	return (
		<div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                <DeleteForeverOutlined onClick={removeTodoList}></DeleteForeverOutlined>
            </h3>
            <AddItemForm addItem={addTask}></AddItemForm>
			{tasksList}
			<div>
				<ButtonWithMemo title={'All'} variant={'contained'} onClick={onAllClickHandler} color={filter === 'all' ? 'secondary' : 'primary'}></ButtonWithMemo>
				<ButtonWithMemo title={'Active'} variant={'contained'} onClick={onActiveClickHandler} color={filter === 'active' ? 'secondary' : 'primary'}></ButtonWithMemo>
				<ButtonWithMemo title={'Completed'} variant={'contained'} onClick={onCompletedClickHandler} color={filter === 'completed' ? 'secondary' : 'primary'}></ButtonWithMemo>
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

export default TodoListWithRedux;