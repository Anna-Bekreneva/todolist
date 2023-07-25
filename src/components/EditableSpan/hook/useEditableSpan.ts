import {ChangeEvent, useState} from "react";

export const useEditableSpan = (title: string, disabled: boolean, changeTitle: (newTitle: string) => void) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [value, setTitle] = useState<string>(title)

    const onEditMode = () => {
        if (disabled) {
            return
        }
        setIsEditMode(true)
    }

    const offEditMode = () => {
        setIsEditMode(false)
        changeTitle(value)
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return {isEditMode, value, onChangeSetTitle, onEditMode, offEditMode}
}