import {useAppDispatch} from "../../../../app/store";
import {changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "../tasks-reducer";
import {ChangeEvent, useCallback} from "react";
import {TaskStatuses} from "../../../../api/tasks-api";
import {TaskDomainType} from "../../../../app/App";

export const useTask = (task: TaskDomainType, todolistId: string) => {
    const {id, status, title, entityStatus} = task
    const dispatch = useAppDispatch()
    const onClickHandler = () => dispatch(removeTaskTC(todolistId, id))

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusTC(todolistId, id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, id, todolistId])

    const onTitleChangeHandler = useCallback((newTitle: string) => dispatch(changeTaskTitleTC(todolistId, id, newTitle)), [dispatch, id, todolistId])

    return {status, title, entityStatus, onClickHandler, onChangeHandler, onTitleChangeHandler}
}