import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (callback: (title: string) => void) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem();

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false);
    };

    const addItem = () => {
        const trimmedTitle = title.trim();

        if (trimmedTitle) {
            callback(trimmedTitle);
        } else {
            setError(true);
        }

        setTitle('');
    };

    return {title, error, onChangeSetTitle, onEnterDownAddItem, addItem}
}