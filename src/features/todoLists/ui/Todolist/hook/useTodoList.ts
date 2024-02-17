import {useCallback} from "react";
import {FilterValuesType, TasksStateType, TaskStatuses, useAppDispatch, useAppSelector} from "../../../../../common";
import {selectorTasks, tasksThunks} from "../../../tasks";
import {todolistsActions, todolistsThunks} from "../../../model";

export const useTodoList = (filter: FilterValuesType, id: string) => {
    const dispatch = useAppDispatch()

    const allTasks = useAppSelector<TasksStateType>(selectorTasks)
    const tasks = allTasks[id]
    console.log(tasks)
    let tasksFiltered = tasks

    if (filter === 'active') {
        tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.new)
    }

    if (filter === 'completed') {
        tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.completed)
    }

    const addTask = useCallback((title: string) => dispatch(tasksThunks.addTask({todolistId: id, title})), [dispatch, id]);

    const onAllClickHandler = useCallback(() =>
        dispatch(todolistsActions.changeTodoListFilter({filter: 'all', id})), [dispatch, id])
    const onActiveClickHandler = useCallback(() =>
        dispatch(todolistsActions.changeTodoListFilter({filter: 'active', id})), [dispatch, id])
    const onCompletedClickHandler = useCallback(() =>
        dispatch(todolistsActions.changeTodoListFilter({filter: 'completed', id})), [dispatch, id])

    const changeTodoListTitle = useCallback((title: string) => dispatch(todolistsThunks.changeTodoListTitle({id, title})), [dispatch, id])
    const removeTodoList = () => dispatch(todolistsThunks.removeTodolist({id}));

    return {tasks, tasksFiltered, dispatch, changeTodoListTitle, removeTodoList, addTask, onAllClickHandler, onActiveClickHandler, onCompletedClickHandler}
}