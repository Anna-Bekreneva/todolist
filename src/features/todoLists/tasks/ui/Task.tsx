import React, {FC, memo} from 'react';
import {Checkbox, ListItem, IconButton} from '@mui/material';
import {DeleteOutline} from '@mui/icons-material';
import {EditableSpan, TaskDomainType, TaskStatuses} from "../../../../common";
import {useTask} from "./hook";
import {RequestStatusType} from "../../../../app";


export const Task: FC<PropsType> = memo(({task, todolistId, todolistEntityStatus}) => {

    const {status, taskEntityStatus, title, onClickHandler, onChangeHandler, onTitleChangeHandler} = useTask(task, todolistId)

    const disabled = todolistEntityStatus === 'loading' || taskEntityStatus === 'loading'

    return (
        <ListItem style={{display: 'flex', alignItems: 'center'}} className={status === TaskStatuses.completed ? 'isDone' : ''} disablePadding>
            <Checkbox checked={status === TaskStatuses.completed} onChange={onChangeHandler} size={'medium'} disabled={disabled}/>
            <EditableSpan title={title} changeTitle={onTitleChangeHandler} disabled={disabled}/>
            <IconButton onClick={onClickHandler} disabled={disabled}>
                <DeleteOutline/>
            </IconButton>
        </ListItem>
    );
});

type PropsType = {
    todolistId: string
    todolistEntityStatus?: RequestStatusType
    task: TaskDomainType
}