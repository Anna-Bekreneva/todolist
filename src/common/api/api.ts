import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '4543e18a-8eb0-440f-b622-7c7fde3d0a16',
    },
})

export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
    fieldsErrors: ErrorsType[]
}

export type ErrorsType = {
    error: string
    field: string
}

export const ResultCode = {
    success: 0,
    error: 1,
    captcha: 10
} as const
