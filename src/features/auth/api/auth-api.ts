import {api, BaseResponseType} from "common/api/api";
import {LoginValuesType} from "features/auth/model/Login";

export const authAPI = {
    login(data: LoginValuesType) {
        return api.post<BaseResponseType<{userId: number}>>('auth/login',data)
    },
    logout() {
        return api.delete<BaseResponseType<{userId: number}>>('auth/login')
    },
    me() {
        return api.get<BaseResponseType<LoginValuesType>>('auth/me')
    }
}