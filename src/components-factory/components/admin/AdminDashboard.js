import {React, useEffect, useState} from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router';


export const AdminDashboard = () => {
    const cookies = new Cookies()
    const navigate = useNavigate()

    let isLoggedIn = cookies.get('isLoggedInToken');
    let isAdmin = cookies.get('isAdmin');

    useEffect(()=> {
       
       if( isLoggedIn !== "true" || isAdmin !==  "true"){
        (navigate('/admin/login'))
       } ;

    },[])
    return (
        <div>
            <h1>admin Dashboard</h1>
        </div>
    )
}
