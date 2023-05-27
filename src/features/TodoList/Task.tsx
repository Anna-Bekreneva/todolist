import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, ListItem} from '@mui/material';
import {EditableSpan} from '../../components/EditableSpan';
import {DeleteForeverOutlined} from '@mui/icons-material';
import {changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from '../../state/tasks-reducer';
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {useAppDispatch} from "../../state/store";

type TaskTypeProps = {
    todolistId: string
    task: TaskType
}

export const Task: React.FC<TaskTypeProps> = memo(({task, todolistId}) => {
    const {id, status, title} = task
    const dispatch = useAppDispatch()

    const onClickHandler = () => dispatch(removeTaskTC(todolistId, id))

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusTC(todolistId, id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, id, todolistId])

    const onTitleChangeHandler = useCallback((newTitle: string) => dispatch(changeTaskTitleTC(todolistId, id, newTitle)), [dispatch, id, todolistId])

    return (
        <ListItem className={status === TaskStatuses.Completed ? 'isDone' : ''} style={{padding: "0"}}>
            <Checkbox checked={status === TaskStatuses.Completed} onChange={onChangeHandler} size={'small'}></Checkbox>
            <EditableSpan title={title} changeTitle={onTitleChangeHandler}></EditableSpan>
            <DeleteForeverOutlined onClick={onClickHandler}></DeleteForeverOutlined>
        </ListItem>
    );
});