import React from 'react'

export const AdminHeader = () => {
    return (
        <div>
            <div className="header flex">
                <div className="header__left">
                    <h2>Hellor Admin!</h2>
                </div>
                <div className="menu flex">
                
                        <a className="header__menuTexts">Logout</a>
                        <a className="header__menuTexts">Profile</a>
                        <a className="header__menuTexts">Notifications</a>
                       
                    
                </div>
            </div>
            
        </div>
    )
}
