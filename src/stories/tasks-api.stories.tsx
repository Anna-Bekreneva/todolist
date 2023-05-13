import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6adbc6c7-2a4c-4a6c-993a-f11935f033b0'
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6adbc6c7-2a4c-4a6c-993a-f11935f033b0'
        const title = "TEST"
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '6adbc6c7-2a4c-4a6c-993a-f11935f033b0'
        const taskId = 'dfe418ab-fc49-4760-8dce-6baace0efcde'
        tasksAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '6adbc6c7-2a4c-4a6c-993a-f11935f033b0'
        const taskId = 'dfe418ab-fc49-4760-8dce-6baace0efcde'
        const title = 'REDUX'
        tasksAPI.updateTask(todoId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

