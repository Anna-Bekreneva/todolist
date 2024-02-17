import React, {memo} from 'react';
import {TextField} from '@mui/material';
import {useEditableSpan} from "./hook";

export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {
    const {
        isEditMode,
        value,
        onChangeSetTitle,
        onEditMode,
        offEditMode,
		onKeyPressHandler
    } = useEditableSpan(props.title, props.disabled, props.changeTitle)

    return (
        isEditMode
            ? <TextField type="text" onBlur={offEditMode} value={value} onChange={onChangeSetTitle} onKeyPress={onKeyPressHandler} autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
});

export type EditableSpanPropsType = {
    title: string
    disabled: boolean
    changeTitle: (newTitle: string) => void
}