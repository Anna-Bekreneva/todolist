import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f7924403-26c6-4ed7-ac40-d679f3c4cd6f',
    },
})

export type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}

export enum ResultCode {
    OK = 0,
    ERROR = 1
}

export type ErrorsType = {
    field: string,
    message: string
}