import React, {FC, memo} from 'react';
import {Grid, IconButton, TextField} from '@mui/material';
import {AddBoxOutlined} from '@mui/icons-material';
import {useAddItemForm} from "./hook";

export const AddItemForm: FC<PropsType> = memo(({callback, isDisabled, label}) => {
	const {title, error, onChangeSetTitle, onEnterDownAddItem, addItem} = useAddItemForm(callback)
	
	return (
		<Grid width={'100%'} display={'flex'} alignItems={"center"}>
			<TextField
				fullWidth={true}
				label={label}
				variant={'outlined'}
				size={'small'}
				type="text"
				value={title}
				onChange={onChangeSetTitle}
				onKeyDown={onEnterDownAddItem}
				error={error}
				helperText={error && 'Title is required!'}
			/>
			<IconButton onClick={addItem} disabled={isDisabled || error}>
				<AddBoxOutlined color={'primary'}/>
			</IconButton>
		</Grid>
	);
});

type PropsType = {
	callback: (title: string) => void
	label: string
	isDisabled?: boolean
	todolistId?: string
}
