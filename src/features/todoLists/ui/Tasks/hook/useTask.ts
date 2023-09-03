import {useAppDispatch} from "app/store";
import {ChangeEvent, useCallback} from "react";
import {TaskDomainType} from "app/App";
import {tasksThunks} from "features/todoLists/model/tasks-reducer";
import {TaskStatuses} from "common/enums/enums";

export const useTask = (task: TaskDomainType, todolistId: string) => {
    const {id, status, title, entityStatus} = task
    const dispatch = useAppDispatch()
    const onClickHandler = () => dispatch(tasksThunks.removeTask({taskId: id, todolistId}) )

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const status = event.currentTarget.checked ? TaskStatuses.completed : TaskStatuses.new
        dispatch(tasksThunks.updateTask({taskId: id, todolistId, domainModel: {status}}) )
    }, [dispatch, id, todolistId])

    const onTitleChangeHandler = useCallback((newTitle: string) => dispatch(tasksThunks.updateTask({taskId: id, todolistId, domainModel: {title: newTitle}}) ), [dispatch, id, todolistId])

    return {status, title, entityStatus, onClickHandler, onChangeHandler, onTitleChangeHandler}
}