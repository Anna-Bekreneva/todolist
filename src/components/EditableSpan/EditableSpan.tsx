import React, {memo} from 'react';
import {TextField} from '@mui/material';
import {useEditableSpan} from "./hook/useEditableSpan";

export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {
	const {isEditMode, value, onChangeSetTitle, onEditMode, offEditMode} = useEditableSpan(props.title, props.disabled, props.changeTitle)

	return (
		isEditMode
			? <TextField type="text" onBlur={offEditMode} value={value} onChange={onChangeSetTitle} autoFocus/>
			: <span onDoubleClick={onEditMode}>{props.title}</span>
	)
});

export type EditableSpanPropsType = {
	title: string
	disabled: boolean
	changeTitle: (newTitle: string) => void
}