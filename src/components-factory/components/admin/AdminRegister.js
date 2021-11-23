import { Avatar, Grid, Paper, TextField, Button, AppBar, Toolbar, Typography, Link } from '@material-ui/core'
import { AddCircleOutlineRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';

export const AdminRegister = () => {
    const paperStyle = { width: '50%', padding: '0.25rem 1rem', textAlign: 'center', margin: '1rem auto', color: "red" }
    const avatar = { backgroundColor: 'green' }
    const loginTab = { padding: '0.25rem', marginLeft: '1rem', color: "green"}

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [repassword, setRepassword] = useState('');

    const navigate = useNavigate()


    function handleFormSubmit(e) {
        e.preventDefault();
        if (password === repassword) {
            const data = {
                email,
                password
            }
            let result = axios.post("http://127.0.0.1:8000/admin/register", data, {
                headers: {
                    "Content-type": "application/json",
                },

            })
                .then((res) => {
                    if (res.status == 200) {

                        localStorage.setItem('user', JSON.stringify(data));
                        console.log('res==>',res)
                        navigate('/admin/login');

                    }
                })
                .catch((error) => {
                    console.log('Error=>', error.request);
                    console.log('status=>', error.response);

                });
        }

    }

    return (
        <div>

            <AppBar position="static" alignitems="center" color="primary">
                <Toolbar>
                    <Grid container wrap="wrap">
                        <Grid item>
                            <Typography variant="h6">Admin Signup</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatar}>
                        <AddCircleOutlineRounded />
                    </Avatar>
                    <h2>Register Admin user </h2>
                </Grid>

                <form onSubmit={handleFormSubmit}>

                    <TextField fullWidth
                        label="Email"
                        type="email"
                        required={true}
                        onChange={(e) => { setEmail(e.target.value); }}>
                    </TextField>

                    <TextField fullWidth
                        label="Password"
                        type="password"
                        required={true}
                        onChange={(e) => { setPassword(e.target.value); }} />

                    <TextField fullWidth
                        label="Confirm password"
                        type="password"
                        required={true}
                        onChange={(e) => { setRepassword(e.target.value); }} />

                    <Button className="register" type="submit" variant='contained'>Register</Button>
                    <Link href="/admin/login" style={loginTab} type="submit" variant='contained'>Already registred? Login here</Link>


                </form>
            </Paper>


        </div>
    )
}
