import { Avatar, Grid, Paper, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { AddCircleOutlineRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router';

const Signup = () => {
    const paperStyle = { width: '50%', padding: '0.25rem 1rem', textAlign: 'center', margin: '1rem auto' }
    const avatar = { backgroundColor: 'green' }
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('abc@abc.com');
    const [password, setPassword] = useState();
    const [repassword, setRepassword] = useState('abc');
    const [phone, setPhone] = useState(1234);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate()

    const token = document.head.querySelector('meta[name="csrf-token"]');

    function handleFormSubmit(e) {
        e.preventDefault();
        // if(password === repassword ) 
        {
            const data = {
                fname,
                lname,
                email,
                password,
                phone
            }
            // const users = []
            console.log('crf=', data)
            let result = axios.post(" http://127.0.0.1:8000/api/register", data, {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((res) => {
                    if (res.status == 200) {
                        // users.push(data);
                        localStorage.setItem('user', JSON.stringify(data));
                        navigate('/dashboard');               
                        
                    }
                })
                .catch((error) => {
                    console.log('Error=>', error.response);

                });

            console.log(fname, lname);
        }
        const handleOnChange = () => {
            setIsChecked(!isChecked);
            console.log('csrf', token);
        }
    }
    return (
        <div>
            
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatar}>
                        <AddCircleOutlineRounded />
                    </Avatar>
                    <h2>Register for your search</h2>
                </Grid>
                <form onSubmit={handleFormSubmit}>
                    @csrf
                    <TextField fullWidth
                        label="First name"
                        value={fname}
                        onChange={(e) => { setFname(e.target.value); }}
                        error={fname === ""}
                        required={true}
                        helperText={fname === "" ? 'Empty' : ''}


                    ></TextField>
                    <TextField fullWidth
                        label="Lastname"
                        value={lname}
                        required={true}
                        onChange={(e) => { setLname(e.target.value); }}
                    ></TextField>

                    <TextField fullWidth
                        label="Password"
                        type="password"
                        required={true}
                        onChange={(e) => { setPassword(e.target.value); }} />

                    {/* <TextField fullWidth 
                    label="Email" 
                    type="email"
                    required={true}
                    onChange={(e)=>{setEmail(e.target.value); }}></TextField>

                    <TextField fullWidth 
                    label="Contact number"
                    type="number" 
                    required={true}
                    onChange={(e)=>{setPhone(e.target.value); }}/>

                    <TextField fullWidth 
                    label="Password" 
                    type ="password"
                    required={true}
                    onChange={(e)=>{setPassword(e.target.value); }}/>
                    
                    <TextField fullWidth 
                    label="Confirm password" 
                    type="password"
                    required={true}
                    onChange={(e)=>{setRepassword(e.target.value); }}/>
                    
                    <FormControlLabel 
                    control={<Checkbox  
                    label="I agree the terms and conditions" 
                    checked={isChecked} 
                    required={true}
                    onChange={handleOnChange}
                    />} 
                    label="I agree the terms and conditions" /> */}

                    <Button className="register" type="submit" variant='contained'>Register</Button>


                </form>
            </Paper>


        </div>
    )
}




export default Signup

