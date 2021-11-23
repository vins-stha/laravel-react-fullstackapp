import React from 'react'
import { AdminHeader } from './AdminHeader'

export const ViewLists = () => {
    return (
        <div>
               <AdminHeader />
            <div className="dashboard flex">
                <div className="dashboardNav">
                    <AdminSideNav />
                </div>
                <div className="dashboardContent flex">

                   <h1>contstn</h1>
                    
                </div>
            </div>
        </div>
    )
}
