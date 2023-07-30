import React, {memo} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, List} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from "../Tasks/Task";
import {FilterValuesType, TaskDomainType} from "../../../app/App";
import {RequestStatusType} from "../../../app/app-reducer";
import IconButton from "@mui/material/IconButton";
import {useTodoList} from "./hook/useTodoList";

const TodoList = memo((props: TodoListPropsType) => {

	const {tasks, tasksFiltered, changeTodoListTitle, removeTodoList, addTask, onAllClickHandler, onActiveClickHandler, onCompletedClickHandler}
		= useTodoList(props.filter, props.id)

	const getTasksListItem = (t: TaskDomainType) => {
		return <Task key={t.id} todolistId={props.id} task={t}/>
	}

	const tasksList = tasks.length > 0 ? <List> {tasksFiltered.map(getTasksListItem)} </List> : <span> Your tasks list is empty </span>;

	return (
		<div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} disabled={props.entityStatus === 'loading'}/>
				<IconButton onClick={removeTodoList} disabled={props.entityStatus === 'loading'}>
					<Delete/>
				</IconButton>
            </h3>
            <AddItemForm addItem={addTask} isDisabled={props.entityStatus === 'loading'}></AddItemForm>
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

type TodoListPropsType = {
	id: string
	title: string
	filter: FilterValuesType
	entityStatus: RequestStatusType
}