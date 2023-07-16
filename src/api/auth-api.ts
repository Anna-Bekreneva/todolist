import {instance, ResponseType} from "./instance";
import {LoginValuesType} from "../features/Login/Login";

export const authAPI = {
    login(data: LoginValuesType) {
        return instance.post<ResponseType<{userId: number}>>('auth/login',data)
    },
    logout() {
        return instance.delete<ResponseType<{userId: number}>>('auth/login')
    },
    me() {
        return instance.get<ResponseType<LoginValuesType>>('auth/me')
    }
}