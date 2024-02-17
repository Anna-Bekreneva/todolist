import {LoginValuesType} from "../ui";
import {api, BaseResponseType} from "../../../common";

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