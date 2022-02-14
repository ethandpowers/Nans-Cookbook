import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from '@hookstate/core';
import { Link as RouteLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn, logIn, logOut } from '../firebase';
import globalState from '../store';

import Food1 from '../assets/food1.jpeg'
import Food2 from '../assets/food2.jpeg'
import Food3 from '../assets/food3.jpeg'
import Food4 from '../assets/food4.jpeg'
import Food5 from '../assets/food5.jpeg'
import Food6 from '../assets/food6.jpeg'
import Food7 from '../assets/food7.jpeg'
import Food8 from '../assets/food8.jpeg'
import Food9 from '../assets/food9.jpeg'

const theme = createTheme();

export default function SignIn() {
    const gState = useState(globalState)
    gState.set({});
    logOut();
    const state = useState(
        {
            validEmail: true,
            validPassword: true
        }
    );

    const navigate = useNavigate();
    const redirectHome = () => {
        if (isLoggedIn()) {
            navigate("/");
        }
    }

    const validEmail = state.get().validEmail;
    const validPassword = state.get().validPassword;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email')
        let password = data.get('password')

        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            state.merge({ validEmail: false })
        } else {
            state.merge({ validEmail: true, });
        }

        if (password.trim().length < 6) {
            state.merge({ validPassword: false })
        } else {
            state.merge({ validPassword: true, });
        }

        if(state.get().validEmail && state.get().validPassword){
            console.log('form validated')
            await logIn(email, password);
            redirectHome();
        }
    };

    const randomImage = () => {
        let arr = [Food1, Food2, Food3, Food4, Food5, Food6, Food7, Food8, Food9]
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const resetPassword = () => {
        console.log('Password reset is not functional yet')
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${randomImage()})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={!validEmail}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={!validPassword}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" onClick={resetPassword}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <RouteLink to='/signup'>
                                        {"Don't have an account? Sign Up"}
                                    </RouteLink>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            Ethan Powers{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}