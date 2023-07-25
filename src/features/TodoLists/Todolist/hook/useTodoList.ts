import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {FilterValuesType, TaskDomainType} from "../../../../app/App";
import {TaskStatuses} from "../../../../api/tasks-api";
import {useCallback} from "react";
import {addTaskTC} from "../../Tasks/tasks-reducer";
import {changeTodoListFilterAC, removeTodoListTC, updateTodoListTC} from "../../todolists-reducer";

export const useTodoList = (filter: FilterValuesType, id: string) => {
    const dispatch = useAppDispatch()

    const tasks = useAppSelector<Array<TaskDomainType>>(state => state.tasks[id])
    let tasksFiltered = tasks

    if (filter === 'active') {
        tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.New)
    }

    if (filter === 'completed') {
        tasksFiltered = tasksFiltered.filter(task => task.status === TaskStatuses.Completed)
    }

    const addTask = useCallback((title: string) => dispatch(addTaskTC(id, title)), [dispatch, id]);

    const onAllClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('all', id)), [dispatch, id])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('active', id)), [dispatch, id])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('completed', id)), [dispatch, id])

    const changeTodoListTitle = useCallback((title: string) => dispatch(updateTodoListTC(id, title)), [dispatch, id])
    const removeTodoList = () => dispatch(removeTodoListTC(id));

    return {tasks, tasksFiltered, dispatch, changeTodoListTitle, removeTodoList, addTask, onAllClickHandler, onActiveClickHandler, onCompletedClickHandler}
}