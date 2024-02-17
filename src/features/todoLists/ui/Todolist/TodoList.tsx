import React, {FC, memo} from 'react';
import {Button, List, IconButton, Grid, Typography, ListItem} from '@mui/material';
import {AddItemForm, EditableSpan, FilterValuesType, TaskDomainType} from "../../../../common";
import {useTodoList} from "./hook";
import {Task} from "../../tasks";
import {DeleteOutline} from "@mui/icons-material";

export const TodoList: FC<PropsType> = memo(({id, filter, title}) => {

    const {
        tasks,
        entityStatus,
        tasksFiltered,
        changeTodoListTitle,
        removeTodoList,
        addTask,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler
    }
        = useTodoList(filter, id)

    const getTasksListItem = (t: TaskDomainType) => {
        return <Task key={t.id} todolistEntityStatus={entityStatus} todolistId={id} task={t}/>
    }

    const tasksList = tasks.length > 0 ? <List> {tasksFiltered.map(getTasksListItem)} </List> :
        <Typography mt={'revert-layer'} > Your tasks list is empty </Typography>;

    return (
        <div style={{width: '320px'}}>
            <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={'20px'}
                  marginBottom={'12px'} fontSize={'20px'} fontWeight={700}>
                <EditableSpan title={title} changeTitle={changeTodoListTitle} disabled={entityStatus === 'loading'}/>
                <IconButton onClick={removeTodoList} disabled={entityStatus === 'loading'}>
                    <DeleteOutline/>
                </IconButton>
            </Grid>
			<div>
				<AddItemForm callback={addTask} isDisabled={entityStatus === 'loading'} label={'New task'}/>
				{tasksList}

				{tasks.length > 0 &&
					<List style={{display: 'flex', gap: '8px' }}>
						<ListItem disablePadding>
							<FilterButton
								title={'All'}
								variant={filter === 'all' ? 'contained' : 'outlined'}
								onClick={onAllClickHandler}
							/>
						</ListItem>
						<ListItem disablePadding>
							<FilterButton
								title={'Active'}
								variant={filter === 'active' ? 'contained' : 'outlined'}
								onClick={onActiveClickHandler}
							/>
						</ListItem>
						<ListItem disablePadding>
							<FilterButton
								title={'Completed'}
								variant={filter === 'completed' ? 'contained' : 'outlined'}
								onClick={onCompletedClickHandler}
							/>
						</ListItem>
					</List>}
			</div>
        </div>
    );
});

type FilterButtonPropsType = {
    title: string
    onClick: () => void
    variant: 'text' | 'outlined' | 'contained'
}

const FilterButton: FC<FilterButtonPropsType> = memo(({title, variant, onClick}) => {
    return <Button onClick={onClick} variant={variant} size={"small"} type={'button'} fullWidth>
        {title}
    </Button>
});

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}