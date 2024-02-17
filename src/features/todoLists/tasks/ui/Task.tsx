import React, {memo} from 'react';
import {Checkbox, ListItem, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {EditableSpan, TaskDomainType, TaskStatuses} from "../../../../common";
import {useTask} from "./hook";


export const Task: React.FC<TaskTypeProps> = memo(({task, todolistId}) => {

    const {status, title, entityStatus, onClickHandler, onChangeHandler, onTitleChangeHandler} = useTask(task, todolistId)

    return (
        <ListItem className={status === TaskStatuses.completed ? 'isDone' : ''} style={{padding: "0"}}>
            <Checkbox checked={status === TaskStatuses.completed} onChange={onChangeHandler} size={'small'} disabled={entityStatus === 'loading'}></Checkbox>
            <EditableSpan title={title} changeTitle={onTitleChangeHandler} disabled={entityStatus === 'loading'}></EditableSpan>
            <IconButton onClick={onClickHandler} disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </ListItem>
    );
});

type TaskTypeProps = {
    todolistId: string
    task: TaskDomainType
}