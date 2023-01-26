import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
	title: string
	changeTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [title, setTitle] = useState<string>(props.title)

	const onEditMode = () => {
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
}