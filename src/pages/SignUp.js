import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from '@hookstate/core';
import { newUser, isLoggedIn, logOut } from '../firebase'
import { Link as RouteLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignUp() {
    logOut();
    const state = useState(
        {
            validEmail: true,
            validPassword: true,
            validFirstName: true,
            validLastName: true,
        }
    );

    const navigate = useNavigate();
    const redirectHome = () => {
        if (isLoggedIn()) {
            navigate("/");
        }
    }

    const validFirstName = state.get().validFirstName;
    const validLastName = state.get().validLastName;
    const validEmail = state.get().validEmail;
    const validPassword = state.get().validPassword;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let email = data.get('email');
        let password = data.get('password');
        let firstName = data.get('firstName');
        let lastName = data.get('lastName');


        //validation of form data
        if (firstName.trim() === "") {
            state.merge({ validFirstName: false })
        } else {
            state.merge({ validFirstName: true, });
        }

        if (lastName.trim() === "") {
            state.merge({ validLastName: false })
        } else {
            state.merge({ validLastName: true, });
        }

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

        if (state.get().validEmail && state.get().validPassword && state.get().validFirstName && state.get().validLastName) {
            //code inside this if-statement will only execute if all form data is valid
            console.log('creating new user')
            await newUser(email, password, firstName, lastName)
            redirectHome();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={!validFirstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    error={!validLastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={!validEmail}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={!validPassword}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <RouteLink to='/signin'>
                                    Already have an account? Sign in
                                </RouteLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
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