import { React, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router';
import axios from 'axios';
import "../../../assets/styles/styles.css";
import { AdminHeader } from './AdminHeader';
import Forms from './Forms/Forms';
import { AdminSideNav } from './AdminSideNav';


export const AdminDashboard = () => {
    const cookies = new Cookies()
    const navigate = useNavigate()

    let isLoggedIn = cookies.get('isAdminLoggedIn');
    let isAdmin = cookies.get('isAdmin');

    useEffect(() => {
        console.log('isLoggedIn=',isLoggedIn, 'isAdmin', isAdmin);
        if (isLoggedIn !== "true" || isAdmin !== "true") {
            (navigate('/admin/login'))
        };

    }, [])
    return (
        <div>
            <AdminHeader />
            <div className="dashboard flex">
                <div className="dashboardNav">
                    <AdminSideNav />
                </div>
                <div className="dashboardContent flex">

                    <Forms />
                    
                </div>
            </div>


        </div>
    )
}
