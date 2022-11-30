import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBoxOutlined} from '@material-ui/icons';
import {IconButton, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
	const [title, setTitle] = useState<string>('');
	const [error, setError] = useState<boolean>(false);

	const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask();

	const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
		error && setError(false);
	};

	const addTask = () => {
		const trimmedTitle = title.trim();

		if (trimmedTitle) {
			props.addItem(trimmedTitle);
		} else {
			setError(true);
		}

		setTitle('');
	};

	return (
		<div>
			<TextField variant={'outlined'} size={'small'} type="text" value={title} onChange={onChangeSetTitle} onKeyDown={onEnterDownAddItem} error={error} helperText={error && 'Title is required!'}/>
			<IconButton onClick={addTask}>
				<AddBoxOutlined></AddBoxOutlined>
			</IconButton>
		</div>
	);
};