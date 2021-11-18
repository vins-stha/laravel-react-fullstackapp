import React, { useState, setState, useEffect } from 'react'
import '../../assets/styles/styles.css';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Cookies from 'universal-cookie';

// universal 
const cookies = new Cookies();

export const Header = () => {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    const data = {
        email: username,
        password
    }
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('data=', data)
        let result = axios.post("http://127.0.0.1:8000/api/login", data, {

        })
        .then((res)=>{
            console.log('res=>',res);
            cookies.set('LoggedInToken', true);
            window.location.href="/dashboard";
            setIsLoggedIn(true);
        })
        .catch((error)=>{
            console.log('error', error.response)
        })

      
    }
    const handleLogout = (e) => {
        e.preventDefault();
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", isLoggedIn);
        navigate({pathname:'/register', isLoggedIn: true})
    }

    useEffect(() => {
        console.log('isLoggedIn', isLoggedIn)
    }, [])

    return (
        <div>
            <div className="header flex">
                <div className="header-logo flex">Nav bar Logo</div>
                <div className="header-registration flex-column">

                    { isLoggedIn ?
                        <div>
                            <div className="header-registration__links flex">
                                <a className="header-registration__links__forgot" href="">Change  Password</a>
                                <a href="/register" className="header-registration__links__register">Profile</a>
                                <div className="btn btn-primary"onClick={handleLogout} className="header-registration__links__register">Logout</div>
                            </div>
                        </div>
                        
                        :

                        <div>
                            <div className="header-registration__links flex">
                                <a className="header-registration__links__forgot" href="">Forgot Username</a>
                                <a href="/register" className="header-registration__links__register">Register</a>
                            </div>
                            <div className="header-registration__login">
                                <input placeholder="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                                <input placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                <div className="btn btn-primary" onClick={handleLogin}>login</div>
                            </div>
                        </div>
                    }

                </div>

            </div>


        </div>
    )
}
