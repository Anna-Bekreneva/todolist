import React, {memo} from 'react';
import {Checkbox, ListItem} from '@mui/material';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskStatuses} from "../../../api/tasks-api";
import {TaskDomainType} from "../../../app/App";
import IconButton from "@mui/material/IconButton";
import {useTask} from "./hook/useTask";

export const Task: React.FC<TaskTypeProps> = memo(({task, todolistId}) => {

    const {status, title, entityStatus, onClickHandler, onChangeHandler, onTitleChangeHandler} = useTask(task, todolistId)

    return (
        <ListItem className={status === TaskStatuses.Completed ? 'isDone' : ''} style={{padding: "0"}}>
            <Checkbox checked={status === TaskStatuses.Completed} onChange={onChangeHandler} size={'small'} disabled={entityStatus === 'loading'}></Checkbox>
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