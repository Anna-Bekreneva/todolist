import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {tasksAPI} from "api/tasks-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    const [id, setId] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setId(event.currentTarget.value)
    const getTasks = () => {
        tasksAPI.getTasks(id)
            .then((res) => {
                setState(res.data)
            })
        setId('')
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && getTasks()

    // useEffect(() => {
    //     const todolistId = '6adbc6c7-2a4c-4a6c-993a-f11935f033b0'
    //     tasksAPI.getTasks(todolistId)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    //
    // }, [])
    return (
        <div>
            <div>
                <input type="text" value={id} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={getTasks} type="button">get tasks</button>
            </div>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    const [id, setId] = useState('')
    const onChangeHandlerId = (event: ChangeEvent<HTMLInputElement>) => setId(event.currentTarget.value)

    const [title, setTitle] = useState('')
    const onChangeHandlerTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const createTask = () => {
        tasksAPI.createTask(id, title)
            .then((res) => {
                setState(res.data.data)
            })
        setId('')
        setTitle('')
    }

    // useEffect(() => {
    //     const todolistId = '6adbc6c7-2a4c-4a6c-993a-f11935f033b0'
    //     const title = "TEST"
    //     tasksAPI.createTask(todolistId, title)
    //         .then((res) => {
    //             setState(res.data.data)
    //         })
    // }, [])

    return (
        <div>
            <div>
                <input placeholder={"id"} type="text" value={id} onChange={onChangeHandlerId}/>
                <input placeholder={"title"} type="text" value={title} onChange={onChangeHandlerTitle}/>
                <button onClick={createTask} type="button">create task</button>
            </div>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    const [todolistId, setTodolistiId] = useState('')
    const onChangeHandlerTodolistId = (event: ChangeEvent<HTMLInputElement>) => setTodolistiId(event.currentTarget.value)

    const [taskId, setTaskId] = useState('')
    const onChangeHandlerTaskId = (event: ChangeEvent<HTMLInputElement>) => setTaskId(event.currentTarget.value)

    const deleteTask = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
        setTodolistiId('')
        setTaskId('')
    }

    // useEffect(() => {
    //     const todoId = '6adbc6c7-2a4c-4a6c-993a-f11935f033b0'
    //     const taskId = 'dfe418ab-fc49-4760-8dce-6baace0efcde'
    //     tasksAPI.deleteTask(todoId, taskId)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    return (
        <div>
            <div>
                <input placeholder={"todolist id"} type="text" value={todolistId} onChange={onChangeHandlerTodolistId}/>
                <input placeholder={"task id"} type="text" value={taskId} onChange={onChangeHandlerTaskId}/>
                <button onClick={deleteTask} type="button">delete task</button>
            </div>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)

    const [title, setTitle] = useState('')
    const onChangeHandlerTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const [todolistId, setTodolistiId] = useState('')
    const onChangeHandlerTodolistId = (event: ChangeEvent<HTMLInputElement>) => setTodolistiId(event.currentTarget.value)

    const [taskId, setTaskId] = useState('')
    const onChangeHandlerTaskId = (event: ChangeEvent<HTMLInputElement>) => setTaskId(event.currentTarget.value)

    const updateTask = () => {
        tasksAPI.updateTask(todolistId, taskId, {
            status: 1,
            deadline: '',
            priority: 1,
            description: '',
            startDate: '',
            title: 'bla'
        })
            .then((res) => {
                debugger
                setState(res.data)
            })
        setTodolistiId('')
        setTaskId('')
        setTitle('')
    }

    // useEffect(() => {
    //     const todoId = '6adbc6c7-2a4c-4a6c-993a-f11935f033b0'
    //     const taskId = 'dfe418ab-fc49-4760-8dce-6baace0efcde'
    //     const title = 'REDUX'
    //     tasksAPI.updateTask(todoId, taskId, title)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    return (
        <div>
            <div>
                <input placeholder={"todolist id"} type="text" value={todolistId} onChange={onChangeHandlerTodolistId}/>
                <input placeholder={"task id"} type="text" value={taskId} onChange={onChangeHandlerTaskId}/>
                <input placeholder={"title"} type="text" value={title} onChange={onChangeHandlerTitle}/>
                <button onClick={updateTask} type="button">update task</button>
            </div>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}

