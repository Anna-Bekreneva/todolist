import React, {ChangeEvent, useEffect, useState, KeyboardEvent} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data.data)
            });
        setTitle('')
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && createTodolist()
    // useEffect(() => {
    //     const title = "TEST"
    //     todolistAPI.createTodolist(title)
    //         .then((res) => {
    //             setState(res.data.data)
    //         })
    // }, [])

    return (
        <div>
            <div>
                <input type="text" value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={createTodolist} type="button">create todolist</button>
            </div>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setId(event.currentTarget.value)
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(id)
            .then((res) => {
                setState(res.data)
            })
        setId('')
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && deleteTodolist()

    // useEffect(() => {
    //     const todoId = 'de582b78-fbb0-4751-9e5c-47d69a4b2c91'
    //     todolistAPI.deleteTodolist(todoId)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    return (
        <div>
            <div>
                <input type="text" value={id} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={deleteTodolist} type="button">delete todolist</button>
            </div>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState('')
    const onChangeHandlerId = (event: ChangeEvent<HTMLInputElement>) => setId(event.currentTarget.value)

    const [title, setTitle] = useState('')
    const onChangeHandlerTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const updateTodolist = () => {
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                setState(res.data)
            })
        setId('')
        setTitle('')
    }

    // useEffect(() => {
    //     const todoId = '6adbc6c7-2a4c-4a6c-993a-f11935f033b0'
    //     const title = 'REDUX'
    //     todolistAPI.updateTodolist(todoId, title)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    return (
        <div>
            <div>
                <input placeholder={"id"} type="text" value={id} onChange={onChangeHandlerId}/>
                <input placeholder={"title"} type="text" value={title} onChange={onChangeHandlerTitle}/>
                <button onClick={updateTodolist} type="button">update todolist</button>
            </div>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}

