import {ChangeEvent, useCallback, useState} from "react";
import {TaskDomainType, TaskStatuses, useAppDispatch} from "../../../../../common";
import {tasksThunks} from "../../model";
import {RequestStatusType} from "../../../../../app";

export const useTask = (task: TaskDomainType, todolistId: string) => {
    const {id, status, title} = task
    const [taskEntityStatus, setTaskEntityStatus] = useState<RequestStatusType>('idle')
    const dispatch = useAppDispatch()
    const onClickHandler = () => dispatch(tasksThunks.removeTask({taskId: id, todolistId}) )

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTaskEntityStatus('loading')
        const status = event.currentTarget.checked ? TaskStatuses.completed : TaskStatuses.new
        dispatch(tasksThunks.updateTask({taskId: id, todolistId, domainModel: {status}}) )
            .then(() => setTaskEntityStatus('idle'))
    }, [dispatch, id, todolistId])

    const onTitleChangeHandler = useCallback((newTitle: string) => {
        setTaskEntityStatus('loading')
        dispatch(tasksThunks.updateTask({taskId: id, todolistId, domainModel: {title: newTitle}}) )
            .then(() => setTaskEntityStatus('idle'))
    }, [dispatch, id, todolistId])

    return {status, title, taskEntityStatus, onClickHandler, onChangeHandler, onTitleChangeHandler}
}