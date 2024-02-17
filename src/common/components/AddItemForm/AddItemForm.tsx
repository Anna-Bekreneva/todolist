import React, {FC, memo} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBoxOutlined} from '@mui/icons-material';
import {useAddItemForm} from "./hook";

export const AddItemForm: FC<PropsType> = memo(({callback, isDisabled}) => {
	const {title, error, onChangeSetTitle, onEnterDownAddItem, addItem} = useAddItemForm(callback)
	
	return (
		<div>
			<TextField variant={'outlined'} size={'small'} type="text" value={title} onChange={onChangeSetTitle} onKeyDown={onEnterDownAddItem} error={error} helperText={error && 'Title is required!'} disabled={isDisabled}/>
			<IconButton onClick={addItem} disabled={isDisabled}>
				<AddBoxOutlined/>
			</IconButton>
		</div>
	);
});

type PropsType = {
	callback: (title: string) => void
	isDisabled?: boolean
	todolistId?: string
}
