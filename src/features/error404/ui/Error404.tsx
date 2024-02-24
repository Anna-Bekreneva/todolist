import {Grid, Typography} from "@mui/material";
import React from 'react';
import {NavLink} from "react-router-dom";
export const Error404 = () => {
    return (
        <Grid textAlign={'center'}>
            <Typography variant={'h1'}>
                404
            </Typography>
            <NavLink to={'/'}> Return home </NavLink>
        </Grid>
    )
}