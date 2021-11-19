import React, { useState } from 'react';
import { useNavigate } from 'react-router'
import axios from 'axios';
import Cookies from 'universal-cookie'
import { AdminDashboard } from './AdminDashboard';
import {
    Button,
    TextField,
    Grid,
    Paper,
    AppBar,
    Typography,
    Toolbar,
    Link,
} from "@material-ui/core";

const cookie = new Cookies();
export const Login = () => {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const navigate = useNavigate()
    const data = {
        'email': username,
        password
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('data=', data)
        let result = axios.post("http://127.0.0.1:8000/admin/login", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {

                cookie.set('isLoggedInToken', true, { path: '/' });
                cookie.set('isAdmin', true, { path: '/' });

                navigate('/admin/dashboard');

            })
            .catch((error) => {
                console.log('error', error.response)
            })

    }

    return (
        <div >

            <AppBar position="static" alignitems="center" color="primary">
                <Toolbar>
                    <Grid container wrap="wrap">
                        <Grid item>
                            <Typography variant="h6">Admin Login</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div style={{ margin: "0 auto", textAlign: "center", justifyContent: "center" }}>


                <Grid container spacing={0} direction="row" justifyContent="center">
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            spacing={2}
                            className="login-form"
                        >
                            <Paper
                                variant="elevation"
                                elevation={2}
                                className="login-background"
                            >
                                <Grid item>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <TextField
                                                    type="email"
                                                    placeholder="Email"
                                                    fullWidth
                                                    name="username"
                                                    variant="outlined"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)

                                                    }
                                                    required
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    type="password"
                                                    placeholder="Password"
                                                    fullWidth
                                                    name="password"
                                                    variant="outlined"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)

                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    className="button-block"
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Forgot Password?
                                    </Link>
                                    <Link href="/admin/register" className="register" type="submit" variant='contained'>Dont have account? </Link>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
