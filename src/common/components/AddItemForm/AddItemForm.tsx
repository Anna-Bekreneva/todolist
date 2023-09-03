import TextField from '@mui/material/TextField/TextField';
import React, {memo} from 'react';
import {IconButton} from '@mui/material';
import {AddBoxOutlined} from '@mui/icons-material';
import {useAddItemForm} from "common/components/AddItemForm/hook/useAddItemForm";

export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
	const {title, error, onChangeSetTitle, onEnterDownAddItem, addItem} = useAddItemForm(props.addItem)
	
	return (
		<div>
			<TextField variant={'outlined'} size={'small'} type="text" value={title} onChange={onChangeSetTitle} onKeyDown={onEnterDownAddItem} error={error} helperText={error && 'Title is required!'}/>
			<IconButton onClick={addItem} disabled={props.isDisabled}>
				<AddBoxOutlined></AddBoxOutlined>
			</IconButton>
		</div>
	);
});

type AddItemFormPropsType = {
	addItem: (title: string) => void
	isDisabled?: boolean
}
