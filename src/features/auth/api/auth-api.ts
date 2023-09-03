import {api, ResponseType} from "common/api/api";
import {LoginValuesType} from "features/auth/model/Login";

export const authAPI = {
    login(data: LoginValuesType) {
        return api.post<ResponseType<{userId: number}>>('auth/login',data)
    },
    logout() {
        return api.delete<ResponseType<{userId: number}>>('auth/login')
    },
    me() {
        return api.get<ResponseType<LoginValuesType>>('auth/me')
    }
}