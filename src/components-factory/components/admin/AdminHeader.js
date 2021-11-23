import React from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

export const AdminHeader = () => {
    const cookies = new Cookies()
    const navigate = useNavigate()
    
    const handleLogout =(e) => {
        e.preventDefault();
        console.log('hello')
        cookies.set('isAdminLoggedIn', false, '/');
        cookies.set('isAdmin', false, '/');
        navigate('/admin/login');
    }

    return (
        <div>
            <div className="header flex">
                <div className="header__left">
                    <h2>Hellor Admin!</h2>
                </div>
                <div className="menu flex">
                    <a onClick={handleLogout} className="header__menuTexts">Logout</a>
                    <a href="/admin/profile" className="header__menuTexts">Profile</a>
                    <a className="header__menuTexts">Notifications</a>
                </div>
            </div>
        </div>
    )
}
