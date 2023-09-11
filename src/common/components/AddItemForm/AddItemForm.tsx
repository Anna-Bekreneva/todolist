import TextField from '@mui/material/TextField/TextField';
import React, {memo} from 'react';
import {IconButton} from '@mui/material';
import {AddBoxOutlined} from '@mui/icons-material';
import {useAddItemForm} from "common/components/AddItemForm/hook/useAddItemForm";

export const AddItemForm: React.FC<AddItemFormPropsType> = memo(({callback, isDisabled}) => {
	const {title, error, onChangeSetTitle, onEnterDownAddItem, addItem} = useAddItemForm(callback)
	
	return (
		<div>
			<TextField variant={'outlined'} size={'small'} type="text" value={title} onChange={onChangeSetTitle} onKeyDown={onEnterDownAddItem} error={error} helperText={error && 'Title is required!'} disabled={isDisabled}/>
			<IconButton onClick={addItem} disabled={isDisabled}>
				<AddBoxOutlined></AddBoxOutlined>
			</IconButton>
		</div>
	);
});

type AddItemFormPropsType = {
	callback: (title: string) => void
	isDisabled?: boolean
	todolistId?: string
}
