import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import {Navigate} from "react-router-dom";
import {useLogin} from "./hook";

export type LoginValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export const Login = () => {

    const { isLoggedIn, formik } = useLogin()

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <Typography variant={'body1'} marginBottom={'8px'}>
                        To log in get registered
                        <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                            here
                        </a> or use common test account credentials:
                    </Typography>
                    <Typography display={'flex'} variant={'body1'}>
                        Email:
                        <Typography variant={'inherit'} fontWeight={600}> free@samuraijs.com </Typography>
                    </Typography>
                    <Typography display={'flex'} variant={'body1'}>
                        Password:
                        <Typography variant={'inherit'} fontWeight={600}> free </Typography>
                    </Typography>
                </FormLabel>
                <form action="features/auth/model/Login#" onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
                        <TextField type="password" label="Password"
                                   margin="normal" {...formik.getFieldProps('password')}/>
                        {formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>}
                        <FormControlLabel label={'Remember me'} control={<Checkbox
                            checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}