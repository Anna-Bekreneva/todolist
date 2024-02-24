import {BaseResponseType, useAppDispatch, useAppSelector} from "../../../../common";
import {authThunks, selectCaptcha, selectIsLoggedIn} from "../../model";
import {FormikHelpers, useFormik} from "formik";
import * as Yup from "yup";
import {LoginValuesType} from "../Login";

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
    const captcha = useAppSelector<string | null>(selectCaptcha)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: undefined
        },

        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(3).required('Required'),
        }),

        onSubmit: (values, formikHelpers: FormikHelpers<LoginValuesType>) => {
            dispatch(authThunks.setIsLoggedIn({data: values}))
                .unwrap()
                .catch((res: BaseResponseType | null) => {
                    if (res && res.fieldsErrors?.length) {
                        res.fieldsErrors.forEach((field) => {
                            formikHelpers.setFieldError(field.field, field.error)
                        })
                    }
                })
        },
    });

    return { isLoggedIn, formik, captcha }
}