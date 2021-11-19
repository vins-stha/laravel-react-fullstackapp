import {React, useEffect, useState} from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router';

import "../../../assets/styles/styles.css";
import { AdminHeader } from './AdminHeader';


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
            <AdminHeader/>
            <h1>admin Dashboard</h1>
        </div>
    )
}
