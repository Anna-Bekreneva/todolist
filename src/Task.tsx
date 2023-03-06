import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, ListItem} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {DeleteForeverOutlined} from '@mui/icons-material';
import {TaskType} from './TodoListWithRedux';

type TaskTypeProps = {
	changeTaskStatus: (id: string, event: ChangeEvent<HTMLInputElement>) => void
	changeTaskTitle: (id: string, newTitle: string) => void
	removeTask: (id: string) => void
	task: TaskType;
}

export const Task: React.FC<TaskTypeProps> = memo(({task, removeTask, changeTaskTitle, changeTaskStatus}) => {
	const {id, isDone, title} = task

	const onClickHandler = () => removeTask(id)

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, event)

	const onTitleChangeHandler = useCallback((newTitle: string) => changeTaskTitle(id, newTitle), [changeTaskTitle, id])

	return (
		<ListItem className={isDone ? 'isDone' : ''} style={{padding: "0"}}>
			<Checkbox checked={isDone} onChange={onChangeHandler} size={'small'}></Checkbox>
			<EditableSpan title={title} changeTitle={onTitleChangeHandler}></EditableSpan>
			<DeleteForeverOutlined onClick={onClickHandler}></DeleteForeverOutlined>
		</ListItem>
	);
});