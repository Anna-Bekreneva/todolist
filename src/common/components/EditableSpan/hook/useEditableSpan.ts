import {ChangeEvent, useState, KeyboardEvent} from "react";

export const useEditableSpan = (title: string, disabled: boolean, changeTitle: (newTitle: string) => void) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setTitle] = useState(title)

    const onEditMode = () => {
        if (disabled) return
        setIsEditMode(true)
    }

    const offEditMode = () => {
        value.trim() ? changeTitle(value) : setTitle(title)
        setIsEditMode(false)
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && offEditMode()


    return {isEditMode, value, onChangeSetTitle, onEditMode, offEditMode, onKeyPressHandler}
}