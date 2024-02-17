import React, {memo} from 'react';
import {TextField} from '@mui/material';
import {useEditableSpan} from "./hook";

export const EditableSpan: React.FC<PropsType> = memo(({title, changeTitle, disabled}) => {
    const {
        isEditMode,
        value,
        onChangeSetTitle,
        onEditMode,
        offEditMode,
		onKeyPressHandler
    } = useEditableSpan(title, disabled, changeTitle)

    return (
        isEditMode
            ? <TextField
                size={'small'}
                type="text"
                onBlur={offEditMode}
                value={value}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressHandler}
                autoFocus
                fullWidth
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
});

export type PropsType = {
    title: string
    disabled: boolean
    changeTitle: (newTitle: string) => void
}