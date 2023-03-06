import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, ListItem} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {DeleteForeverOutlined} from '@mui/icons-material';
import {TaskType} from './TodoListWithRedux';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

type TaskTypeProps = {
	todolistId: string
	task: TaskType
}

export const TaskWithRedux: React.FC<TaskTypeProps> = memo(({task, todolistId}) => {
	const {id, isDone, title} = task
	const dispatch = useDispatch()

	const onClickHandler = () => dispatch(removeTaskAC(id, todolistId))

	const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(id, event.currentTarget.checked, todolistId)), [dispatch])

	const onTitleChangeHandler = useCallback((newTitle: string) => dispatch(changeTaskTitleAC(id, newTitle, todolistId)), [dispatch])

	return (
		<ListItem className={isDone ? 'isDone' : ''} style={{padding: "0"}}>
			<Checkbox checked={isDone} onChange={onChangeHandler} size={'small'}></Checkbox>
			<EditableSpan title={title} changeTitle={onTitleChangeHandler}></EditableSpan>
			<DeleteForeverOutlined onClick={onClickHandler}></DeleteForeverOutlined>
		</ListItem>
	);
});