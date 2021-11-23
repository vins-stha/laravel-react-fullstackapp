import React from 'react'
import axios from 'axios'

export const AdminSideNav = () => {
    let navItems = ['Religion', 'Caste', 'City', 'Users', 'Admins', 'Product category','Brand','Manufacturer']

    // generate list for nav

    const items = navItems.map((item,id)=>{
        return(
         <div className="dashboardNav__items" key={item.id}  name={item} onClick={(e)=>{e.preventDefault(); handleOnClickUpdateItems(item)}}>Update {item}</div>
        )
    })

    // action for each nav item on click
    const handleOnClickUpdateItems = (item) => {
        const data = {
            'cat' : item
        }

        let res = axios.post('http://127.0.0.1:8000/admin/list/', data, {})
        .then((res)=>{
            console.log('respone =>',res)
        })
        .catch((error)=>{
            console.log(error.response)
        })
    }

    return (
        <div>
            {items}
        </div>
    )
}
