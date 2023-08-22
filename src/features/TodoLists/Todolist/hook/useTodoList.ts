import {useAppDispatch, useAppSelector} from "app/store";
import {FilterValuesType, TasksStateType} from "app/App";
import {TaskStatuses} from "api/tasks-api";
import {useCallback} from "react";
import {addTaskTC} from "../../Tasks/tasks-reducer";
import {todolistsActions, updateTodoListTC} from "features/TodoLists/todolists-reducer";
import {selectorTasks} from "features/TodoLists/Tasks/tasks-selectors";

export const useTodoList = (filter: FilterValuesType, id: string) => {
    const dispatch = useAppDispatch()

    const allTasks = useAppSelector<TasksStateType>(selectorTasks)
    const tasks = allTasks[id]
    let tasksFiltered = tasks

    if (filter === 'active') {
        tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.New)
    }

    if (filter === 'completed') {
        tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.Completed)
    }

    const addTask = useCallback((title: string) => dispatch(addTaskTC(id, title)), [dispatch, id]);

    const onAllClickHandler = useCallback(() =>
        dispatch(todolistsActions.changeTodoListFilter({filter: 'all', id})), [dispatch, id])
    const onActiveClickHandler = useCallback(() =>
        dispatch(todolistsActions.changeTodoListFilter({filter: 'active', id})), [dispatch, id])
    const onCompletedClickHandler = useCallback(() =>
        dispatch(todolistsActions.changeTodoListFilter({filter: 'completed', id})), [dispatch, id])

    const changeTodoListTitle = useCallback((title: string) => dispatch(updateTodoListTC(id, title)), [dispatch, id])
    const removeTodoList = () => dispatch(todolistsActions.removeTodoList({id}));

    return {tasks, tasksFiltered, dispatch, changeTodoListTitle, removeTodoList, addTask, onAllClickHandler, onActiveClickHandler, onCompletedClickHandler}
}