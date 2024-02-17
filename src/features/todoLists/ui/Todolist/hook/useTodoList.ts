import {useCallback, useEffect, useState} from "react";
import {FilterValuesType, TasksStateType, TaskStatuses, useAppDispatch, useAppSelector} from "../../../../../common";
import {selectorTasks, tasksThunks} from "../../../tasks";
import {todolistsActions, todolistsThunks} from "../../../model";
import {RequestStatusType} from "../../../../../app";

export const useTodoList = (filter: FilterValuesType, id: string) => {
    const dispatch = useAppDispatch()
    const [entityStatus, setEntityStatus] = useState<RequestStatusType>("idle")

    const allTasks = useAppSelector<TasksStateType>(selectorTasks)
    const tasks = allTasks[id]
    let tasksFiltered = tasks

    if (filter === 'active') {
        tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.new)
    }

    if (filter === 'completed') {
        tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.completed)
    }

    const addTask = useCallback((title: string) => {
        setEntityStatus('loading')
        dispatch(tasksThunks.addTask({todolistId: id, title}))
            .then(() => setEntityStatus('idle'))
    }, [dispatch, id]);

    const onAllClickHandler = useCallback(() =>
        dispatch(todolistsActions.changeTodoListFilter({filter: 'all', id})), [dispatch, id])
    const onActiveClickHandler = useCallback(() =>
        dispatch(todolistsActions.changeTodoListFilter({filter: 'active', id})), [dispatch, id])
    const onCompletedClickHandler = useCallback(() =>
        dispatch(todolistsActions.changeTodoListFilter({filter: 'completed', id})), [dispatch, id])

    const changeTodoListTitle = useCallback((title: string) => dispatch(todolistsThunks.changeTodoListTitle({id, title})), [dispatch, id])
    const removeTodoList = () => {
        setEntityStatus('loading')
        dispatch(todolistsThunks.removeTodolist({id}))
            .then(() => setEntityStatus('idle'))
    };

    useEffect(() => {
        if (!tasks.length) dispatch(tasksThunks.setTasks({todolistId: id}))
    }, [])

    return {tasks, entityStatus, tasksFiltered, dispatch, changeTodoListTitle, removeTodoList, addTask, onAllClickHandler, onActiveClickHandler, onCompletedClickHandler}
}