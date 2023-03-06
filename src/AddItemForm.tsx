import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton} from '@mui/material';
import {AddBoxOutlined} from '@mui/icons-material';


type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
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
});