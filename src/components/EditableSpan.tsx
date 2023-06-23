import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
	title: string
	disabled: boolean
	changeTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {

	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [title, setTitle] = useState<string>(props.title)

	const onEditMode = () => {
		if (props.disabled) {
			return
		}
		setIsEditMode(true)
	}

	const offEditMode = () => {
		setIsEditMode(false)
		props.changeTitle(title)
	}

	const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	}

	return (
		isEditMode
			? <TextField type="text" onBlur={offEditMode} value={title} onChange={onChangeSetTitle} autoFocus/>
			: <span onDoubleClick={onEditMode}>{props.title}</span>
	)
});