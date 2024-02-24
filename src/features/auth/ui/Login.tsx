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
    captcha?: string
}

export const Login = () => {

    const { isLoggedIn, formik, captcha } = useLogin()

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel style={{marginBottom: '12px'}}>
                    <Typography variant={'body1'} marginBottom={'12px'}>
                        To log in get registered {' '}
                        <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                            here
                        </a> or use common test account credentials:
                    </Typography>
                    <Typography display={'flex'} variant={'body1'} marginBottom={'4px'}>
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
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />

                        {captcha && <>
                            <img src={captcha} alt="captcha"/>
                            <TextField type="text"
                                       label="Enter symbols"
                                       margin="normal"
                                {...formik.getFieldProps('captcha')}/>
                            </>
                        }

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